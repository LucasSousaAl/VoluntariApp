import webPush from 'web-push';
import database from './database';

webPush.setVapidDetails(
  'mailto:your-email@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

export async function sendPushNotification(payloadStr: string, userId?: number | string) {
  try {
    let result;
    if (!userId) {
      result = await database.query({
        text: 'SELECT endpoint, p256dh, auth FROM push_subscriptions',
      });
    } else {
      result = await database.query({
        text: 'SELECT endpoint, p256dh, auth FROM push_subscriptions WHERE usuario_id = $1',
        values: [userId],
      });
    }

    if (!result || result.length === 0) return;

    await Promise.all(
      result.map(async (sub: any) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        try {
          await webPush.sendNotification(pushSubscription, payloadStr);
        } catch (error: any) {
          if (error.statusCode === 404 || error.statusCode === 410) {
            await database.query({
              text: 'DELETE FROM push_subscriptions WHERE endpoint = $1',
              values: [sub.endpoint],
            });
          }
        }
      })
    );
  } catch (error) {
    console.error('Core Push Notification Error:', error);
  }
}
