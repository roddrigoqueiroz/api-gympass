import { Gym, Prisma } from '@prisma/client'

export interface SearchManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findGymById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  searchManyNearby(location: SearchManyNearbyParams): Promise<Gym[]>
  createGym(data: Prisma.GymCreateInput): Promise<Gym>
}
