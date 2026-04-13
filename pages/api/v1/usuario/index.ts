import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from 'infra/core';
import UsuarioController from 'controllers/usuario';
import { withAuth } from 'infra/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  switch (req.method) {
    case 'GET': return UsuarioController.list(req, res);
    default: return res.status(405).json({ error: 'Método não permitido.' });
  }
}
export default withAuth(handler);
