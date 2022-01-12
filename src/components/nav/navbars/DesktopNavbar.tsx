import styles from '@/styles/components/navbar/Navbar.module.scss';
import { useRef, useState, useEffect } from 'react';
import lazyImport from '@/util/lazy_import';
import LogoSVG from '@/components/svg/logo/LogoSVG';
import { useScrollPosition } from '@/hooks/window';
import NavbarLink from '../NavbarLink';
import type { LogoSVGProps } from '@/components/svg/logo/LogoSVG';

// TODO will need to change color based on scroll as well with themes

type AnchorData = { href: string; offsetWidth: number; offsetLeft: number };

interface DesktopNavbarProps {
    windowSize: number[];
}

const ThemeButton = lazyImport(() => import('@/components/theme/ThemeButton'));

const logoSvgProps: LogoSVGProps = {
    width: 80,
    height: 80,
    color: 'white',
};

// TODO maybe slight gradient on top of page

// TODO scroll to top button in bottom right as well with little animation

// TODO only show navbar button when main button is scrolled out of view

export default function DesktopNavbar(props: DesktopNavbarProps) {
    const navListRef = useRef<HTMLUListElement>(null);
    const [currentSection, setCurrentSection] = useState(0);
    const [anchorData, setAnchorData] = useState<AnchorData[]>([]);
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const scrollY = useScrollPosition();
    // Setup navbar links
    useEffect(() => {
        if (navListRef.current) {
            const navLinks: HTMLAnchorElement[] = [];
            navListRef.current.childNodes.forEach((ulChild) => {
                const liChildren = ulChild.childNodes;
                const anchor = liChildren[0] as HTMLAnchorElement;
                navLinks.push(anchor);
            });
            const aData = navLinks.map((link) => {
                return {
                    href: link.href,
                    offsetWidth: link.offsetWidth,
                    offsetLeft: link.offsetLeft,
                };
            });
            // Home page of index 0 must be added as the first array entry
            aData.unshift({ href: '#', offsetWidth: 0, offsetLeft: 0 });
            setAnchorData(aData);
        }
    }, [navListRef, props.windowSize]);
    // Get all available sections
    useEffect(() => {
        const main = document.getElementById('main-content');
        if (!main) throw new Error('Navbar must have access to main document content');
        const mainSections = Array.from(main.getElementsByTagName('section'));
        // Remove home page section
        mainSections.shift();
        setSections(mainSections);
    }, []);
    // Update current section based on scroll
    let activeSection = 0;
    for (const section of sections) {
        if (scrollY > section.offsetTop - 40) activeSection++;
    }
    if (activeSection !== currentSection) {
        history.pushState({}, '', anchorData[activeSection].href);
        setCurrentSection(activeSection);
    }
    return (
        <header className={`${styles.navbar} ${scrollY ? styles.small : styles.full}`}>
            <div className={styles['navbar-title']}>
                <LogoSVG
                    {...logoSvgProps}
                    monochrome={!!scrollY}
                    className={scrollY ? styles.small : styles.full}
                />
                <h1
                    className={scrollY ? styles.visible : styles.hidden}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    CryptoCrate
                </h1>
            </div>
            <nav>
                {/* ONLY use NavbarLink components in this list */}
                <ul className={styles['navbar-links']} ref={navListRef}>
                    <NavbarLink className={styles.active} href="#about">
                        About
                    </NavbarLink>
                    <NavbarLink href="#buyers">Buyers</NavbarLink>
                    <NavbarLink href="#sellers">Sellers</NavbarLink>
                </ul>
                {navListRef.current && (
                    <span
                        className={styles['navbar-indicator']}
                        style={{
                            transform: `translateX(${anchorData[currentSection].offsetLeft}px)`,
                            width: `${anchorData[currentSection].offsetWidth}px`,
                        }}
                    />
                )}
            </nav>
            <ThemeButton />
            <button className={`${styles['main-button']} ${styles['visible']}`}>Button</button>
        </header>
    );
}
