import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'infra/middleware';
import TrabalhoController from 'controllers/trabalho';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: `Method ${req.method} not allowed` });
  return TrabalhoController.quit(req, res);
}

export default withAuth(handler);
