import { env } from './env';
import fastify from 'fastify'
import cors from '@fastify/cors'
import { getLinks } from './routes/get-links';
import { errorHandler } from './error-handler';
import { createTrip } from './routes/create-trip'
import { updateTrip } from './routes/update-trip';
import { createLink } from './routes/create-link';
import { confirmTrip } from './routes/confirm-trip';
import { createInvite } from './routes/create-invite';
import { getActivities } from './routes/get-activities';
import { getParticipant } from './routes/get-participant';
import { createActivity } from './routes/create-activity';
import { getTripDetails } from './routes/get-trip-details';
import { getParticipants } from './routes/get-participants';
import { confirmParticipant } from './routes/confirm-participant';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

const app = fastify()

app.register(cors, {
  origin: '*'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler)

app.register(createTrip)
app.register(updateTrip)
app.register(confirmTrip)
app.register(getTripDetails)

app.register(confirmParticipant)
app.register(getParticipants)
app.register(getParticipant)

app.register(createInvite)

app.register(createActivity)
app.register(getActivities)

app.register(createLink)
app.register(getLinks)

app.listen({ port: env.PORT }).then(() => {
  console.log('Server is runnnig! 🚀')
})