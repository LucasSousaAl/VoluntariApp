import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from 'infra/core';
import TrabalhoController from 'controllers/trabalho';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (cors(req, res)) return;

  if (req.method === 'GET') {
    return TrabalhoController.listByProximity(req, res);
  }

  return res.status(405).json({ error: 'Método não permitido.' });
}
