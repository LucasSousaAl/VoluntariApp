import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from 'infra/core';
import TrabalhoController from 'controllers/trabalho';
import { withAuth } from 'infra/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  switch (req.method) {
    case 'GET': return TrabalhoController.list(req, res);
    case 'POST': return TrabalhoController.create(req, res);
    case 'PUT': return TrabalhoController.update(req, res);
    case 'DELETE': return TrabalhoController.remove(req, res);
    default: return res.status(405).json({ error: 'Método não permitido.' });
  }
}
export default withAuth(handler);
