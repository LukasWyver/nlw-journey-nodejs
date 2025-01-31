import { z } from 'zod'
import { prisma } from '../lib/prisma';
import { FastifyInstance } from "fastify";
import { ClientError } from '../errors/client-error';
import { ZodTypeProvider } from "fastify-type-provider-zod";

export async function getLinks(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().get('/trips/:tripId/links', {
    schema: {
      params: z.object({
        tripId: z.string().uuid(),
      })
    }
  }, async (request) => {
    const { tripId } = request.params
    
    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: { links: true }
    })

    if(!trip){
      throw new ClientError('Trip not found')
    }

    return { links: trip.links }
  })
}