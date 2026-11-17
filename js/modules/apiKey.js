const API_KEY_STORAGE = 'nexo_gemini_api_key';

export function getApiKey() {
    return localStorage.getItem(API_KEY_STORAGE) || '';
}

export function saveApiKey(apiKey) {
    if (typeof apiKey !== 'string' || !apiKey.trim()) {
        return false;
    }

    localStorage.setItem(API_KEY_STORAGE, apiKey.trim());
    return true;
}

export function removeApiKey() {
    localStorage.removeItem(API_KEY_STORAGE);
}

export function hasApiKey() {
    return Boolean(getApiKey());
}
