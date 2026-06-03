import { NextApiRequest, NextApiResponse } from 'next';
import OngController from 'controllers/ong';
import { withAuth } from 'infra/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': return OngController.list(req, res);
    case 'POST': return OngController.create(req, res);
    case 'PUT': return OngController.update(req, res);
    case 'DELETE': return OngController.remove(req, res);
    default: return res.status(405).json({ error: 'Método não permitido.' });
  }
}
export default withAuth(handler);