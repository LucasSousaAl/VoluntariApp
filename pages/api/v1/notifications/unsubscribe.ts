import { NextApiRequest, NextApiResponse } from 'next';
import database from '../../../../infra/database';
import { withAuth } from 'infra/middleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // @ts-ignore
    const userId = req.user.id;
    const { endpoint } = req.body;

    if (!endpoint) {
      return res.status(400).json({ error: 'Missing endpoint' });
    }

    await database.query({
      text: 'DELETE FROM push_subscriptions WHERE usuario_id = $1 AND endpoint = $2',
      values: [userId, endpoint],
    });

    return res.status(200).json({ message: 'Subscription removed successfully' });
  } catch (error) {
    console.error('Error removing subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
