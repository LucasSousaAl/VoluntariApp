import { NextApiRequest, NextApiResponse } from 'next';
import AuthController from 'controllers/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  return AuthController.logout(req, res);
}
