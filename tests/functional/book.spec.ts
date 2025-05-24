import { app } from '@src/http'
import type { Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'
import { Password } from '@src/value-objects/password'
import { ulid } from 'ulid'
import { beforeAll, describe, expect, it, test } from 'vitest'

describe('FUNCTIONAL: Books', () => {
  let user: Prisma.UserCreateInput

  beforeAll(async () => {
    const userPassword = await Password.create('password')
    user = {
      id: ulid(),
      name: 'John Doe',
      email: 'test@test.com',
      password: userPassword.value
    }

    await prisma.user.create({
      data: user
    })
  })

  describe('GET /books', async () => {
    it('should return a list of books', async () => {
      const result = await app.inject({
        method: 'GET',
        url: '/books'
      })

      expect(result.statusCode).toBe(200)
      expect(result.json()).toEqual([])
    })
  })

  describe('POST /books', async () => {
    it('should create a new book', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/login',

        payload: {
          email: user.email,
          password: 'password'
        }
      })

      const { accessToken } = response.json()

      const result = await app.inject({
        method: 'POST',
        url: '/books',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        body: {}
      })

      expect(result.statusCode).toBe(201)
    })
  })
})
