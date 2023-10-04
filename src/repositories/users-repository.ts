import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  createUser(data: Prisma.UserCreateInput): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
}
