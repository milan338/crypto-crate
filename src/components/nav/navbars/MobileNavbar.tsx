import styles from '@/styles/components/nav/Navbar.module.scss';
import { useState } from 'react';
import { useScrollBehavior, usePreventScroll } from '@/hooks/window';
import NavbarTitle from '../parts/NavbarTitle';
import NavMenu from '../menu/NavMenu';
import Hamburger from '../menu/Hamburger';

interface MobileNavbarProps {
    currentSection: number;
    small: boolean;
}

export default function MobileNavbar(props: MobileNavbarProps) {
    const { currentSection, small } = props;
    const [showMenu, setShowMenu] = useState(false);
    useScrollBehavior('auto');
    usePreventScroll(showMenu);
    return (
        <>
            <header
                id="navbar"
                className={`${styles.navbar} ${styles.mobile} ${
                    small || showMenu ? styles.small : ''
                }`}
            >
                <NavbarTitle small={small} hidden={showMenu} />
                <Hamburger active={showMenu} setActive={setShowMenu} />
            </header>
            <NavMenu currentSection={currentSection} visible={showMenu} setVisible={setShowMenu} />
        </>
    );
}
