import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchNearbyGymsUseCase } from './search-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
// sut = system under test
let sut: SearchNearbyGymsUseCase

describe('Search Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchNearbyGymsUseCase(gymsRepository)
  })

  test('Should return a list of nearby gyms', async () => {
    await gymsRepository.createGym({
      name: `Near Gym`,
      latitude: 10,
      longitude: 1,
    })
    await gymsRepository.createGym({
      name: `Far Gym`,
      latitude: 20,
      longitude: 10,
    })

    const { gyms } = await sut.execute({
      userLatitude: 10.00001,
      userLongitude: 1.00001,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
