import styles from '@/styles/components/nav/Navbar.module.scss';
import { useState } from 'react';
import { useScrollBehavior, usePreventScroll } from '@/hooks/window';
import NavbarTitle from '../parts/NavbarTitle';
import NavMenu from '../menu/NavMenu';
import Hamburger from '../menu/Hamburger';

interface MobileNavbarProps {
    currentSection: number;
    scrollY: number;
}

export default function MobileNavbar(props: MobileNavbarProps) {
    const [showMenu, setShowMenu] = useState(false);
    useScrollBehavior('auto');
    usePreventScroll(showMenu);
    return (
        <>
            <header
                id="navbar"
                className={`${styles.navbar} ${styles.mobile} ${
                    props.scrollY || showMenu ? styles.small : ''
                }`}
            >
                <NavbarTitle scrollY={props.scrollY} hidden={showMenu} />
                <Hamburger active={showMenu} setActive={setShowMenu} />
            </header>
            <NavMenu
                currentSection={props.currentSection}
                visible={showMenu}
                setVisible={setShowMenu}
            />
        </>
    );
}
