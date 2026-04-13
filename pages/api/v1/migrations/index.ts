import { NextApiRequest, NextApiResponse } from 'next';
import pgMigrations from 'node-pg-migrate';
import { join } from 'node:path';
import { withRole } from 'infra/middleware';

async function migrations(req: NextApiRequest, res: NextApiResponse) {
  try {
    const migrationResults = await pgMigrations({
      databaseUrl: process.env.DATABASE_URL,
      dryRun: req.method === 'GET',
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    });
    return res.status(200).json({ message: 'Migrations ran successfully', responseBody: migrationResults });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}

export default /* withRole("admin") */(migrations);
