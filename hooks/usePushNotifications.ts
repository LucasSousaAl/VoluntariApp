import { useState, useEffect } from 'react';
import { message } from 'antd';

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const usePushNotifications = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      setPermission(Notification.permission);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        setIsSubscribed(true);
        setSubscription(sub);
      }
    } catch (error) {
      console.error('Error checking push subscription', error);
    }
  };

  const subscribeToPush = async () => {
    if (!isSupported) return;

    try {
      const registration = await navigator.serviceWorker.ready;
      const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
      if (!publicVapidKey) {
        throw new Error('No public VAPID key found');
      }

      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      // Send to server
      const response = await fetch('/api/v1/notifications/save-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscription: sub }),
      });

      if (!response.ok) {
        throw new Error('Failed to save subscription on server');
      }

      setSubscription(sub);
      setIsSubscribed(true);
      setPermission('granted');
      message.success('Notificações ativadas com sucesso!');

    } catch (error) {
      console.error('Error subscribing to push notifications', error);
      message.error('Erro ao ativar notificações. Verifique as permissões do seu navegador.');
      if (Notification.permission === 'denied') {
        setPermission('denied');
      }
    }
  };

  const unsubscribeFromPush = async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();

      await fetch('/api/v1/notifications/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });

      setSubscription(null);
      setIsSubscribed(false);
      message.success('Notificações desativadas.');
    } catch (error) {
      console.error('Error unsubscribing', error);
      message.error('Erro ao desativar notificações.');
    }
  };

  return {
    isSupported,
    isSubscribed,
    permission,
    subscribeToPush,
    unsubscribeFromPush,
  };
};
