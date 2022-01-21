// SVG content adapted from https://codepen.io/ainalem/pen/LJYRxz

import styles from '@/styles/components/nav/Hamburger.module.scss';
import type { Dispatch, SetStateAction } from 'react';

interface HamburgerProps {
    active: boolean;
    setActive: Dispatch<SetStateAction<boolean>>;
}

export default function Hamburger(props: HamburgerProps) {
    return (
        <button
            className={styles.hamburger}
            onClick={() => {
                if (props.setActive) props.setActive(!props.active);
            }}
        >
            <svg
                className={props.active ? styles.active : ''}
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
                width="75"
                fill="none"
                stroke="white"
                strokeWidth={5}
                strokeLinecap="round"
            >
                <path
                    className={`${styles.line} ${styles.top}`}
                    d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
                />
                <path className={styles.line} d="m 70,50 h -25" />
                <path
                    className={`${styles.line} ${styles.bottom}`}
                    d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
                />
            </svg>
        </button>
    );
}
