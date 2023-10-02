import { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '@/lib/db-connection'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  await prisma.user.create({
    data: {
      name,
      email,
      pasword_hash: password,
    },
  })

  return reply.status(201).send()
}
