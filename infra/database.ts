import { Client, QueryConfig, QueryResultRow } from "pg";

export async function query<T extends QueryResultRow = any>(queryObject: string | QueryConfig): Promise<T[]> {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "production" && process.env.POSTGRES_HOST !== "localhost" ? true : false
  });
  try {
    await client.connect();
    const res = await client.query<T>(queryObject);
    return res.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
  finally {
    await client.end();
  }
}

export default {
  query
};
