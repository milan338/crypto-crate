export default function ThemeLoader() {
    const sysTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const themePreference = localStorage.getItem('theme');
    let theme = themePreference;
    if (!theme) theme = sysTheme;
    document.documentElement.dataset.theme = theme;
    return null;
}
