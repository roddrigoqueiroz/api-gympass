import { test, expect, describe, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
// sut = system under test
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  test('Should return a list of check-ins', async () => {
    for (let i = 1; i <= 20; i++) {
      await checkInsRepository.createCheckIn({
        gym_id: `gym-id-${i}`,
        user_id: 'user-id',
      })
    }

    const { numberOfCheckIns } = await sut.execute({
      userId: 'user-id',
    })

    expect(numberOfCheckIns).toEqual(20)
  })
})
