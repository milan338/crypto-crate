import styles from '@/styles/components/nav/Navbar.module.scss';
import { useState, forwardRef } from 'react';
import { useScrollBehavior } from '@/hooks/window';
import { useIntersectionObserver } from '@/hooks/observer';
import ThemeButton from '@/components/theme/ThemeButton';
import ExternalButton from '../ExternalButton';
import NavbarLink from '../parts/NavbarLink';
import NavbarTitle from '../parts/NavbarTitle';
import type { RefObject } from 'react';

export type AnchorData = { href: string; offsetWidth: number; offsetLeft: number };

interface DesktopNavbarProps {
    navListRef: RefObject<HTMLUListElement>;
    currentAnchorData: AnchorData;
    scrollY: number;
}

// TODO looks like some jank with the showing of the external button on firefox

const DesktopNavbar = forwardRef<HTMLUListElement, DesktopNavbarProps>((props, ref) => {
    const [btnVisible, setBtnVisible] = useState(false);
    useScrollBehavior('smooth');
    useIntersectionObserver(
        (entry) => setBtnVisible(!entry.isIntersecting),
        document.getElementById('external-button') ?? undefined,
        { rootMargin: '-210px' }
    );
    return (
        <header id="navbar" className={`${styles.navbar} ${props.scrollY ? styles.small : ''}`}>
            <NavbarTitle scrollY={props.scrollY} />
            <nav>
                {/* ONLY use NavbarLink components in this list */}
                <ul className={styles['navbar-links']} ref={ref}>
                    <NavbarLink href="#about">About</NavbarLink>
                    <NavbarLink href="#collectors">Collectors</NavbarLink>
                    <NavbarLink href="#creators">Creators</NavbarLink>
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
            <ExternalButton
                className={`${styles['external-button']} ${
                    btnVisible ? styles.visible : styles.hidden
                }`}
            >
                Open App
            </ExternalButton>
        </header>
    );
});
DesktopNavbar.displayName = 'DesktopNavbar';

export default DesktopNavbar;
