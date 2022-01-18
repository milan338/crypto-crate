import styles from '@/styles/components/nav/Navbar.module.scss';
import { forwardRef } from 'react';
import ThemeButton from '@/components/theme/ThemeButton';
import NavbarLink from '../parts/NavbarLink';
import NavbarTitle from '../parts/NavbarTitle';
import type { RefObject } from 'react';

// TODO will need to change color based on scroll as well with themes

export type AnchorData = { href: string; offsetWidth: number; offsetLeft: number };

interface DesktopNavbarProps {
    navListRef: RefObject<HTMLUListElement>;
    currentAnchorData: AnchorData;
    scrollY: number;
}

// TODO maybe slight gradient on top of page

// TODO scroll to top button in bottom right as well with little animation

// TODO only show navbar button when main button is scrolled out of view

const DesktopNavbar = forwardRef<HTMLUListElement, DesktopNavbarProps>((props, ref) => {
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
