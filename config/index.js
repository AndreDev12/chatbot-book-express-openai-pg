process.loadEnvFile();

import OpenAI from 'openai';
import pg from 'pg';

// Configuración de PostgreSQL
export const pool = new pg.Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
});

// Configuración de OpenAI
// const openaiConfiguration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// export const openai = new OpenAIApi(openaiConfiguration);

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
