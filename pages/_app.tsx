import type { AppProps } from 'next/app';
import { AppProvider } from '../context/AppContext';
import OfflineBanner from '../components/OfflineBanner';
import 'antd/dist/reset.css';
import '../styles/globals.css';

declare global {
    interface Window {
        __pwaInstallPrompt: Event | null;
    }
}

// Captura o evento beforeinstallprompt o mais cedo possível
if (typeof window !== 'undefined') {
    window.__pwaInstallPrompt = null;
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        window.__pwaInstallPrompt = e;
    });
}

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <AppProvider>
            <OfflineBanner />
            <Component {...pageProps} />
        </AppProvider>
    );
}
