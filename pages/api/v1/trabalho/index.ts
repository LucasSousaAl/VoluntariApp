import { NextApiRequest, NextApiResponse } from 'next';
import TrabalhoController from 'controllers/trabalho';
import { withAuth } from 'infra/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': return TrabalhoController.list(req, res);
    case 'POST': return TrabalhoController.create(req, res);
    case 'PUT': return TrabalhoController.update(req, res);
    case 'DELETE': return TrabalhoController.remove(req, res);
    default: return res.status(405).json({ error: 'Método não permitido.' });
  }
}
export default withAuth(handler);
