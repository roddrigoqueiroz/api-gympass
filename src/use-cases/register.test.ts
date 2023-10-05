import { test, expect, describe, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
// sut = system under test
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  test('Should create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  test('Should hash the user password', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'email@example.com',
      password: '123456',
    })

    const isPassowrdCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPassowrdCorrectlyHashed).toBe(true)
  })

  test('Should allow register user with same email', async () => {
    const email = 'email@example.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toThrow(UserAlreadyExistsError)
  })
})
