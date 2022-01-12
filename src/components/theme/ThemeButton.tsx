import styles from '@/styles/components/theme/ThemeButton.module.scss';
import { useState, useMemo } from 'react';
import DarkModeSVG from '@/components/svg/material/DarkModeSVG';
import LightModeSVG from '@/components/svg/material/LightModeSVG';
import BrightnessAutoSVG from '@/components/svg/material/BrightnessAutoSVG';
import { getSysColorScheme, updateDomTheme } from './ThemeLoader';
import type { SVGProps } from '@/components/svg/svg_props';

const svgProps: SVGProps = {
    width: 30,
    height: 30,
    color: 'black',
};

const themes = ['auto', 'light', 'dark'];
const hidden = styles['theme-hidden'];
const visible = styles['theme-visible'];

export default function ThemeButton() {
    useMemo(updateDomTheme, []);
    const dataset = document.documentElement.dataset;
    const [theme, setTheme] = useState(dataset.theme);
    const [rotateOnHover, setRotateOnHover] = useState(true);
    const getClassName = (themeName: string) => {
        return theme === themeName ? visible : hidden;
    };
    return (
        <button
            className={`${styles['theme-toggle']} ${rotateOnHover && styles['rotate-on-hover']}`}
            title={theme === 'auto' ? 'auto (system theme)' : `${theme} mode`}
            type="button"
            onClick={(event) => {
                event.preventDefault();
                if (theme === undefined) return;
                const i = themes.indexOf(theme);
                const newTheme = themes[i === themes.length - 1 ? 0 : i + 1];
                if (newTheme === 'auto') {
                    localStorage.removeItem('theme');
                    dataset.theme = getSysColorScheme();
                } else {
                    localStorage.setItem('theme', newTheme);
                    dataset.theme = newTheme;
                }
                setTheme(newTheme);
                setRotateOnHover(false);
            }}
            onMouseLeave={() => {
                setRotateOnHover(true);
            }}
        >
            <BrightnessAutoSVG {...svgProps} className={getClassName('auto')} />
            <LightModeSVG {...svgProps} className={getClassName('light')} />
            <DarkModeSVG {...svgProps} className={getClassName('dark')} />
        </button>
    );
}
