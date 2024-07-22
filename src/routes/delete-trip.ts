import { z } from 'zod'
import { env } from '../env';
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { ClientError } from '../errors/client-error';
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function deleteTrip(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().delete('/trips/:tripId', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      })
    }
  }, async (request, reply) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        participants: {
          where: {
            is_owner: false
          }
        }
      }
    })

    if(!trip){
      throw new ClientError('Trip not found')
    }

    if(trip.is_confirmed){
      throw new ClientError('Trip already confirmed')
    }

    await prisma.trip.delete({
      where: { id: tripId },
    })

    return reply.redirect(`${env.WEB_BASE_URL}`)
  })
}