import { test, expect, describe, beforeEach } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
// sut = system under test
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  test("Should get user's profile ", async () => {
    const { id } = await usersRepository.createUser({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      id,
    })

    expect(user.name).toEqual('John Doe')
  })

  test('Should not get profile when id is not found', async () => {
    await usersRepository.createUser({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        id: 'not-valid-id',
      }),
    ).rejects.toThrow(ResourceNotFoundError)
  })
})
