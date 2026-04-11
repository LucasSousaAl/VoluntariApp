import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function OfflineBanner() {
    const [isOffline, setIsOffline] = useState(false);
    const [show, setShow] = useState(false);
    const router = useRouter();

    useEffect(() => {
        // Verificar estado inicial
        if (!navigator.onLine && router.pathname !== '/offline') {
            router.push('/offline');
        } else if (!navigator.onLine) {
            setIsOffline(true);
            setShow(true);
        }

        const handleOffline = () => {
            setIsOffline(true);
            setShow(true);
            setTimeout(() => setShow(false), 1000);
            if (router.pathname !== '/offline') {
                router.push('/offline');
            }
        };

        const handleOnline = () => {
            setIsOffline(false);
            setShow(true);
            // Delay para mostrar "Conexão restaurada" antes de sair
            setTimeout(() => setShow(false), 2000);

            // Sempre que a internet voltar, redirecionamos forçadamente para a Home
            // Dessa forma o cache "offline" fica pra trás e o app carrega os dados vivos
            router.push('/home');
        };

        window.addEventListener('offline', handleOffline);
        window.addEventListener('online', handleOnline);

        return () => {
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('online', handleOnline);
        };
    }, [router]);

    if (!show) return null;

    return (
        <div
            className={`offline-banner ${isOffline ? 'offline-banner--visible' : 'offline-banner--hidden'}`}
            role="alert"
            aria-live="polite"
        >
            <span className="offline-banner__icon">📡</span>
            <span className="offline-banner__text">
                {isOffline
                    ? 'Você está offline — exibindo dados salvos'
                    : 'Conexão restaurada ✓'}
            </span>
        </div>
    );
}
