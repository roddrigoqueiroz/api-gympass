import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
// sut = system under test
let sut: CreateGymUseCase

describe('Create Gym', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  test('Should create a new gym', async () => {
    const { gym } = await sut.execute({
      name: 'Some Gym',
      description: 'Some description',
      phone: '999999999',
      latitude: -18.9162663,
      longitude: -48.2499756,
    })

    expect(gym.name).toEqual('Some Gym')
  })
})
