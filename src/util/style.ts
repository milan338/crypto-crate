import { isServer } from '@/hooks/ssr';

export function setCssVar(varName: string, value: string | null) {
    if (isServer()) return;
    document.documentElement.style.setProperty(`--${varName}`, value);
}
