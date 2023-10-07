import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
// sut = system under test
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch Users Check-ins History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  test('Should return a list of check-ins', async () => {
    await checkInsRepository.createCheckIn({
      gym_id: 'gym-id',
      user_id: 'user-id',
    })

    await checkInsRepository.createCheckIn({
      gym_id: 'gym-id2',
      user_id: 'user-id',
    })

    await checkInsRepository.createCheckIn({
      gym_id: 'gym-id3',
      user_id: 'user-id',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 1,
    })

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id' }),
      expect.objectContaining({ gym_id: 'gym-id2' }),
      expect.objectContaining({ gym_id: 'gym-id3' }),
    ])
  })

  test('Should return a list of a selected page of check-ins', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.createCheckIn({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-id',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-id-21' }),
      expect.objectContaining({ gym_id: 'gym-id-22' }),
    ])
  })
})
