import { app } from '@src/http'
import type { Prisma } from '@src/infra/database/generated/prisma'
import { prisma } from '@src/infra/database/prisma'
import { Password } from '@src/modules/identity/value-objects/password'
import { ulid } from 'ulid'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

describe('GET: /books', () => {
  let user: Prisma.UserCreateInput
  let accessToken: string

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

    const response = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: {
        email: user.email,
        password: 'password'
      }
    })

    accessToken = response.json().accessToken
  })

  afterAll(async () => {
    await prisma.user.deleteMany()
  })

  it('should return a list of books', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/books',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    expect(result.statusCode).toBe(200)
    expect(result.json()).toEqual([])
  })
})
