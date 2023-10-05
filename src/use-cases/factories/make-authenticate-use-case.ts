import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function makeAuthenticateUseCase() {
  const authenticateUseCase = new AuthenticateUseCase(
    new PrismaUsersRepository(),
  )

  return authenticateUseCase
}
