import styles from '@/styles/components/nav/NavMenu.module.scss';
import { useCallback } from 'react';
import ThemeButton from '@/components/theme/ThemeButton';
import NavbarLink from '../parts/NavbarLink';
import type { Dispatch, SetStateAction } from 'react';
import type { NavbarLinkProps } from '../parts/NavbarLink';

interface NavMenuProps {
    currentSection: number;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export default function NavMenu(props: NavMenuProps) {
    const { setVisible, currentSection } = props;
    const linkProps = useCallback(
        (i: number): NavbarLinkProps => {
            return {
                onClick: () => {
                    setTimeout(() => setVisible(false), 100);
                },
                className: `${styles['nav-menu-link']} ${
                    currentSection === i ? styles.active : ''
                }`,
            };
        },
        [setVisible, currentSection]
    );
    return (
        <nav className={`${styles['nav-menu']} ${props.visible ? styles.visible : styles.hidden}`}>
            <ul>
                <NavbarLink {...linkProps(1)} href="#about">
                    About
                </NavbarLink>
                <NavbarLink {...linkProps(2)} href="#collectors">
                    Collectors
                </NavbarLink>
                <NavbarLink {...linkProps(3)} href="#creators">
                    Creators
                </NavbarLink>
            </ul>
            <ThemeButton />
        </nav>
    );
}
