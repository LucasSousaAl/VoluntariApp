import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Typography } from 'antd';
import { useApp } from '../../context/AppContext';
import styles from './index.module.css';

const { Title, Text } = Typography;

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function WelcomePage() {
    const { setUserType } = useApp();
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showInstall, setShowInstall] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        // Verifica se já está rodando como app (standalone) ou se já instalou antes (via localStorage)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        const hasInstalledFlag = localStorage.getItem('pwaAppInstalled') === 'true';

        if (isStandalone || hasInstalledFlag) {
            setInstalled(true);
            return; // Se já está instalado, não precisamos mostrar o prompt
        }

        // Verifica se o evento já foi capturado antes do componente montar
        const savedPrompt = (window as any).__pwaInstallPrompt;
        if (savedPrompt) {
            setDeferredPrompt(savedPrompt as BeforeInstallPromptEvent);
            setShowInstall(true);
        }

        // Continua ouvindo caso o evento dispare depois
        const handler = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setShowInstall(true);
            (window as any).__pwaInstallPrompt = e;
        };

        const installedHandler = () => {
            setShowInstall(false);
            setInstalled(true);
            localStorage.setItem('pwaAppInstalled', 'true');
            (window as any).__pwaInstallPrompt = null;
        };

        window.addEventListener('beforeinstallprompt', handler);
        window.addEventListener('appinstalled', installedHandler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
            window.removeEventListener('appinstalled', installedHandler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setShowInstall(false);
            setInstalled(true);
            localStorage.setItem('pwaAppInstalled', 'true');
        }
        setDeferredPrompt(null);
    };

    return (
        <div className={styles.welcome}>
            <div className={styles.welcome_inner}>
                <div className={styles.welcome_emoji}>
                    <img
                        src="/icon-transparent.png"
                        alt="VoluntariApp Logo"
                        style={{ width: '4.2em', height: '4.2em', objectFit: 'contain' }}
                    />
                </div>

                <Title level={1} className={styles.welcome_title}>
                    Transforme seu{' '}
                    <span className={styles.welcome_highlight}>tempo em impacto</span>
                </Title>

                <Text className={styles.welcome_subtitle}>
                    Conectamos voluntários a ONGs que precisam de você.
                    Juntos construímos um futuro melhor.
                </Text>

                <div className={styles.welcome_actions}>
                    <Link href="/Register" onClick={() => setUserType('volunteer')}>
                        <Button type="primary" block size="large">
                            Quero me voluntariar →
                        </Button>
                    </Link>

                    <Link href="/Register" onClick={() => setUserType('ong')}>
                        <Button type="default" block size="large">
                            Sou uma ONG
                        </Button>
                    </Link>
                </div>

                {/* ── Botão de Instalação PWA ── */}
                {showInstall && (
                    <button
                        className={styles.install_btn}
                        onClick={handleInstallClick}
                        id="pwa-install-button"
                        aria-label="Instalar aplicativo"
                    >
                        <span className={styles.install_btn_icon}>📲</span>
                        <span>Instalar aplicativo</span>
                    </button>
                )}

                {installed && (
                    <div className={styles.install_success}>
                        ✅ App instalado com sucesso!
                    </div>
                )}
            </div>
        </div>
    );
}
