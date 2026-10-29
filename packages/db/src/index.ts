import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export * from './schema';
export * from 'drizzle-orm';

// Database connection URL setup (fetched from environment variables)
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/leaner';

// Initialize postgres client
const client = postgres(databaseUrl, {
  max: process.env.DB_MAX_CONNECTIONS ? parseInt(process.env.DB_MAX_CONNECTIONS) : 10,
});

// Initialize drizzle ORM instance
export const db = drizzle(client, { schema });
export type Database = typeof db;
export { client as pgClient };
