/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('push', (event: PushEvent) => {
  const data = event.data?.json() ?? {};
  
  const title = data.title || 'Nova notificação!';
  const options: NotificationOptions = {
    body: data.body || 'Você tem uma nova notificação.',
    icon: data.icon || '/icon-192x192.png',
    badge: data.badge || '/icon-192x192.png', // ideally a small monochrome icon
    data: data.data || { url: '/' },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event: NotificationEvent) => {
  event.notification.close();

  const urlToOpen = new URL(event.notification.data?.url || '/', self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      let matchingClient = null;

      for (const client of windowClients) {
        if (client.url === urlToOpen) {
          matchingClient = client;
          break;
        }
      }

      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});

export {}; // Ensure it's treated as a module
