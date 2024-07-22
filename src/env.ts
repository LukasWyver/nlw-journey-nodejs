import dotenv from 'dotenv';
import { z } from 'zod'

// Carregar as variáveis de ambiente do .env
dotenv.config();

// Definir o esquema de validação com Zod
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  PORT: z.coerce.number().default(3333),
})

// Validar as variáveis de ambiente
export const env = envSchema.parse(process.env)