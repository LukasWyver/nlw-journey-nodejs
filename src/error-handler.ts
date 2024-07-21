import { ZodError } from "zod"
import type { FastifyInstance } from "fastify"
import { ClientError } from "./errors/client-error"

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Invalid input',
      errors: error.flatten().fieldErrors
    })
  }

  if (error instanceof ClientError) {
    return reply.status(400).send({
      message: error.message
    })
  }
  
  return reply.status(500).send({ message: 'Internal server error' })
}