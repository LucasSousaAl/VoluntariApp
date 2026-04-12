import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'infra/middleware';
import UsuarioController from 'controllers/usuario';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') return res.status(405).json({ error: `Method ${req.method} not allowed` });
  return UsuarioController.updateMe(req, res);
}

export default withAuth(handler);
