import styles from '@/styles/components/nav/Navbar.module.scss';
import { forwardRef } from 'react';
import { useScrollBehavior } from '@/hooks/window';
import ThemeButton from '@/components/theme/ThemeButton';
import NavbarLink from '../parts/NavbarLink';
import NavbarTitle from '../parts/NavbarTitle';
import type { RefObject } from 'react';

export type AnchorData = { href: string; offsetWidth: number; offsetLeft: number };

interface DesktopNavbarProps {
    navListRef: RefObject<HTMLUListElement>;
    currentAnchorData: AnchorData;
    scrollY: number;
}

// TODO only show navbar button when main button is scrolled out of view

const DesktopNavbar = forwardRef<HTMLUListElement, DesktopNavbarProps>((props, ref) => {
    useScrollBehavior('smooth');
    return (
        <header className={`${styles.navbar} ${props.scrollY ? styles.small : ''}`}>
            <NavbarTitle scrollY={props.scrollY} />
            <nav>
                {/* ONLY use NavbarLink components in this list */}
                <ul className={styles['navbar-links']} ref={ref}>
                    <NavbarLink href="#about">About</NavbarLink>
                    <NavbarLink href="#buyers">Buyers</NavbarLink>
                    <NavbarLink href="#sellers">Sellers</NavbarLink>
                </ul>
                {props.navListRef.current && (
                    <span
                        className={styles['navbar-indicator']}
                        style={{
                            transform: `translateX(${props.currentAnchorData.offsetLeft}px)`,
                            width: `${props.currentAnchorData.offsetWidth}px`,
                        }}
                    />
                )}
            </nav>
            <ThemeButton />
            <button className={`${styles['main-button']} ${styles['visible']}`}>Button</button>
        </header>
    );
});
DesktopNavbar.displayName = 'DesktopNavbar';

export default DesktopNavbar;
