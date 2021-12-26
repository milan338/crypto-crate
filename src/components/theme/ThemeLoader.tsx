export function getSysColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export default function ThemeLoader() {
    const sysTheme = getSysColorScheme();
    const themePreference = localStorage.getItem('theme');
    let theme = themePreference;
    if (!theme) theme = sysTheme;
    document.documentElement.dataset.theme = theme;
    return null;
}
