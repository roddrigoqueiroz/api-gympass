import { test, expect, describe, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
// sut = system under test
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  test('Should authenticate the user', async () => {
    await usersRepository.createUser({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'email@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should not authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'email@example.com',
        password: '123456',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })

  test('Should not authenticate with wrong password', async () => {
    await usersRepository.createUser({
      name: 'John Doe',
      email: 'email@example.com',
      password_hash: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'email@example.com',
        password: '123123',
      }),
    ).rejects.toThrow(InvalidCredentialsError)
  })
})
