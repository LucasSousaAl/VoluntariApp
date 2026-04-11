import { Voluntario } from '../models/types';

const PROFILE_KEY = 'voluntariapp_offline_profile';

/**
 * Salva os dados do perfil do voluntário no localStorage
 * para uso offline. Chamado sempre que o perfil é carregado com sucesso.
 */
export function cacheProfileData(data: Voluntario): void {
    try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('[OfflineStorage] Falha ao salvar perfil no cache:', e);
    }
}

/**
 * Recupera os dados do perfil cacheados para uso offline.
 * Retorna null se não houver dados salvos.
 */
export function getCachedProfileData(): Voluntario | null {
    try {
        const raw = localStorage.getItem(PROFILE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as Voluntario;
    } catch (e) {
        console.warn('[OfflineStorage] Falha ao ler perfil do cache:', e);
        return null;
    }
}

/**
 * Remove os dados de perfil do cache (ex: ao fazer logout).
 */
export function clearCachedProfileData(): void {
    try {
        localStorage.removeItem(PROFILE_KEY);
    } catch (e) {
        console.warn('[OfflineStorage] Falha ao limpar cache:', e);
    }
}
