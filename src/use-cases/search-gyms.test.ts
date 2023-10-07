import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
// sut = system under test
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  test('Should return a list gyms given the query', async () => {
    await gymsRepository.createGym({
      name: `My Gym`,
      latitude: 0,
      longitude: 0,
    })

    await gymsRepository.createGym({
      name: `Your Gym`,
      latitude: 10,
      longitude: 10,
    })

    const { gyms } = await sut.execute({
      query: 'Your',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Your Gym' })])
  })

  test('Should return a list gyms given the query of a selected page', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.createGym({
        name: `Gym-${i}`,
        latitude: 0,
        longitude: 0,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Gym-21' }),
      expect.objectContaining({ name: 'Gym-22' }),
    ])
  })
})
