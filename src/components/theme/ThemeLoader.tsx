import { useEffect } from 'react';
import { useUser } from '@/hooks/context';
import type { Theme } from '@/contexts/user/UserProvider';

export function getSysColorScheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function updateDomTheme() {
    const sysTheme = getSysColorScheme();
    const themePreference = localStorage.getItem('theme');
    let theme = themePreference;
    if (!theme) theme = sysTheme;
    document.documentElement.dataset.theme = theme;
}

export default function ThemeLoader() {
    const { dispatchUser } = useUser();
    useEffect(() => {
        updateDomTheme();
        dispatchUser({ theme: document.documentElement.dataset.theme as Theme });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}
