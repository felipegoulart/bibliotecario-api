import { ulid } from 'ulid'
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest'

import type { InputBookCreateDto } from '../dto/create.dto'
import type { Prisma } from '@src/infra/database/generated/prisma'
import { Password } from '@src/modules/identity/value-objects/password'
import { app } from '@src/http'
import { prisma } from '@src/infra/database/prisma'

describe('POST: /books', () => {
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
    await prisma.author.deleteMany()
    await prisma.book.deleteMany()
    await prisma.location.deleteMany()
    await prisma.publisher.deleteMany()
  })

  it('should create a new book', async () => {
    const { id: authorId } = await prisma.author.create({
      data: {
        id: ulid(),
        name: 'Test Author'
      }
    })

    const { id: locationId } = await prisma.location.create({
      data: {
        id: ulid(),
        name: 'Test Location'
      }
    })

    const { id: publisherId } = await prisma.publisher.create({
      data: {
        id: ulid(),
        name: 'Test Publisher'
      }
    })

    const payload: InputBookCreateDto = {
      title: 'Test Book',
      authorId,
      locationId,
      publisherId,
      userId: user.id
    }

    const result = await app.inject({
      method: 'POST',
      url: '/books',
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: payload
    })

    expect(result.statusCode).toBe(201)
  })
})
