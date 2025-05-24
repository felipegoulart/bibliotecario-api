import { afterAll, beforeEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { app } from '@src/http'
import { prisma } from '@src/infra/database/prisma'

describe('FUNCTIONAL: Identity', () => {
  beforeEach(async () => {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`)
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
})
