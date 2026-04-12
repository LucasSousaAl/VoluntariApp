import { NextApiRequest, NextApiResponse } from 'next';
import { withAuth } from 'infra/middleware';
import { sendPushNotification } from '../../../../infra/pushService';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // O withAuth já verifica o token e injeta os dados decodificados em req.user
    // @ts-ignore
    const user = req.user;

    // Opcionalmente podemos receber e usar o userId validado, se quem disparou foi o dono, mas não obrigatoriamente
    // Adicionamos a flag "broadcast" para poder mandar para todos!
    const { userId = user.id, title, body, icon, url, broadcast } = req.body;

    if (!userId && !broadcast) {
      return res.status(400).json({ error: 'Missing userId or broadcast flag to send notification to' });
    }

    const payloadStr = JSON.stringify({
      title: title || 'Notificação do VoluntariApp',
      body: body || 'Você tem uma nova mensagem.',
      icon: icon || '/icon-192x192.png',
      data: { url: url || '/' }
    });

    if (broadcast) {
      await sendPushNotification(payloadStr);
    } else {
      await sendPushNotification(payloadStr, userId);
    }

    return res.status(200).json({ message: 'Notifications processed successfully' });
  } catch (error) {
    console.error('Error in send-notification:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default withAuth(handler);
