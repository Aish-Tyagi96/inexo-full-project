const path = require('node:path');
const dotenv = require('dotenv');
const { z } = require('zod');

dotenv.config();

const booleanFromEnv = z.preprocess((value) => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }

  return false;
}, z.boolean());

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  APP_NAME: z.string().default('Inexo Backend'),
  PORT: z.coerce.number().int().positive().default(4000),
  API_PREFIX: z.string().default('/api/v1'),
  CORS_ORIGIN: z.string().default('*'),
  LOG_LEVEL: z.string().default('info'),
  JWT_SECRET: z.string().min(16).default('change-this-to-a-long-random-secret'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  DB_DIALECT: z.enum(['mysql', 'sqlite']).default('sqlite'),
  DB_HOST: z.string().default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_NAME: z.string().default('inexo_backend'),
  DB_USER: z.string().default('root'),
  DB_PASSWORD: z.string().default(''),
  DB_STORAGE: z.string().default('.data/inexo.sqlite'),
  DB_SYNC_ALTER: booleanFromEnv.default(false),
  DB_SYNC_FORCE: booleanFromEnv.default(false),
  SEED_CATALOG: booleanFromEnv.default(true),
  SEED_DEFAULT_ADMIN: booleanFromEnv.default(true),
  DEFAULT_ADMIN_NAME: z.string().default('Primary Admin'),
  DEFAULT_ADMIN_EMAIL: z.string().email().default('admin@inexo.com'),
  DEFAULT_ADMIN_PHONE: z.string().default('1234567890'),
  DEFAULT_ADMIN_PASSWORD: z.string().min(8).default('Admin@12345'),
  DEFAULT_ROLES: z.string().default('Admin'),
});


const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  throw new Error(`Invalid environment configuration: ${parsedEnv.error.message}`);
}

const env = parsedEnv.data;
env.DB_STORAGE = path.resolve(process.cwd(), env.DB_STORAGE);

module.exports = env;
