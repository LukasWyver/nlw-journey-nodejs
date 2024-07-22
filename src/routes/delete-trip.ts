import { z } from 'zod'
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
  }, async (request) => {
    const { tripId } = request.params

    const trip = await prisma.trip.findUnique({
      where: { id: tripId }
    })

    if(!trip){
      throw new ClientError('Trip not found')
    }

    await prisma.trip.delete({
      where: { id: tripId },
    })

    return { tripId: trip.id }
  })
}