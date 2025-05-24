import { afterAll, beforeEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { app } from '@src/http'
import { prisma } from '@src/infra/database/prisma'
import { Password } from '@src/value-objects/password'
import { ulid } from 'ulid'

describe('FUNCTIONAL: Authentication', () => {
  const userExists = {
    id: ulid(),
    email: 'john@test.com',
    name: 'John Due',
    password: '12345678'
  }

  beforeEach(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`)

    const hashedPassword = await Password.create(userExists.password)

    await prisma.user.create({
      data: {
        ...userExists,
        password: hashedPassword.value
      }
    })
  })

  beforeAll(async () => {
    await app.ready()
    prisma.$connect()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('POST /auth/register', async () => {
    it('should return 201', async () => {
      const result = await app.inject({
        method: 'POST',
        url: '/auth/register',
        body: {
          email: 'user@test.com',
          name: 'John Due',
          password: '12345678'
        }
      })

      expect(result.statusCode).toEqual(201)
    })

    it('should return 400', async () => {
      const result = await app.inject({
        method: 'POST',
        url: '/auth/register',
        body: {
          email: 'user@test.com',
          name: 'John Due',
          password: '123456'
        }
      })

      expect(result.statusCode).toEqual(400)
    })

    it('should register a new user', async () => {
      const result = await app.inject({
        method: 'POST',
        url: '/auth/register',
        body: {
          email: 'user@test.com',
          name: 'John Due',
          password: '12345678'
        }
      })

      expect(result.statusCode).toEqual(201)

      const user = await prisma.user.findFirst({
        where: {
          email: 'user@test.com'
        }
      })

      expect(user).not.toBeNull()
    })
  })

  describe('POST /auth/login', async () => {
    it('should return 200', async () => {
      const result = await app.inject({
        method: 'POST',
        url: '/auth/login',
        body: {
          email: userExists.email,
          password: userExists.password
        }
      })

      expect(result.statusCode).toEqual(200)
    })

    it('should return accessToken', async () => {
      const result = await app.inject({
        method: 'POST',
        url: '/auth/login',
        body: {
          email: userExists.email,
          password: userExists.password
        }
      })

      const body = result.json()

      expect(result.statusCode).toEqual(200)
      expect(body).toEqual(
        expect.objectContaining({
          accessToken: expect.any(String)
        })
      )
    })
  })
})
