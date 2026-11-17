const THEME_STORAGE = 'nexo-theme';

const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
};

const LOGOS = {
    light: 'assets/nexo-day.png',
    dark: 'assets/nexo-night.png'
};

export function getSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE);

    return Object.values(THEMES).includes(savedTheme)
        ? savedTheme
        : THEMES.DARK;
}

export function applyTheme(theme, logoElement) {
    if (!Object.values(THEMES).includes(theme)) {
        return;
    }

    document.body.dataset.theme = theme;

    if (logoElement) {
        logoElement.src = LOGOS[theme];
    }

    localStorage.setItem(THEME_STORAGE, theme);
}

export function toggleTheme(logoElement) {
    const currentTheme = getSavedTheme();

    const newTheme = currentTheme === THEMES.DARK
        ? THEMES.LIGHT
        : THEMES.DARK;

    applyTheme(newTheme, logoElement);

    return newTheme;
}
