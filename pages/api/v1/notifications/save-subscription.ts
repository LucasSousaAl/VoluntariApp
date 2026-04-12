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
    const { subscription } = req.body;

    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return res.status(400).json({ error: 'Invalid subscription object' });
    }

    const { endpoint, keys: { p256dh, auth } } = subscription;

    await database.query({
      text: `
        INSERT INTO push_subscriptions (usuario_id, endpoint, p256dh, auth)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (endpoint) DO UPDATE 
        SET usuario_id = $1, p256dh = $3, auth = $4, updated_at = NOW()
      `,
      values: [userId, endpoint, p256dh, auth],
    });

    return res.status(200).json({ message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Error saving subscription:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
