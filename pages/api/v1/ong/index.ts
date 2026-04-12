import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from 'infra/core';
import OngController from 'controllers/ong';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  switch (req.method) {
    case 'GET':    return OngController.list(req, res);
    case 'POST':   return OngController.create(req, res);
    case 'PUT':    return OngController.update(req, res);
    case 'DELETE': return OngController.remove(req, res);
    default:       return res.status(405).json({ error: 'Método não permitido.' });
  }
}
