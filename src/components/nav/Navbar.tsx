import { useState, useEffect, useRef } from 'react';
import { useTransientScroll, useWindowSize } from '@/hooks/window';
import { DESKTOP_MIN_W } from '@/util/constants';
import { isServer } from '@/hooks/ssr';
import DesktopNavbar from './navbars/DesktopNavbar';
import MobileNavbar from './navbars/MobileNavbar';
import type { MouseEventHandler } from 'react';
import type { AnchorData } from './navbars/DesktopNavbar';

// TODO clicking link required twice to go to the part when manually scrolled on some chrome versions

interface NavbarProps {
    onExternalButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export default function Navbar(props: NavbarProps) {
    const { onExternalButtonClick } = props;
    const navListRef = useRef<HTMLUListElement>(null);
    const windowSize = useWindowSize();
    const [currentSection, setCurrentSection] = useState(0);
    const [small, setSmall] = useState(isServer() ? false : !!window.scrollY);
    const [anchorData, setAnchorData] = useState<AnchorData[]>([]);
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const [windowW, windowH] = windowSize;
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
    }, [navListRef, windowSize]);
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
    const scrollCb = async () => {
        let activeSection = 0;
        if (window.scrollY > windowH - 100) {
            for (const section of sections) {
                if (window.scrollY > section.offsetTop - 100) activeSection++;
            }
        }
        if (activeSection !== currentSection) {
            if (anchorData[activeSection])
                history.pushState({}, '', anchorData[activeSection].href);
            setCurrentSection(activeSection);
        }
        if (!small && window.scrollY) setSmall(true);
        else if (small && !window.scrollY) setSmall(false);
    };
    useTransientScroll(scrollCb, {
        deps: [sections, currentSection, small],
        throttleMs: small ? 100 : 10,
    });
    if (!isServer()) scrollCb(); // Update section on page load
    // Handle trying to read non-existent anchor data when resizing the window
    const currentAnchorData = anchorData[currentSection] || { offsetLeft: 0, offsetWidth: 0 };
    return (
        <>
            {windowW >= DESKTOP_MIN_W + 50 ? (
                <DesktopNavbar
                    ref={navListRef}
                    navListRef={navListRef}
                    currentAnchorData={currentAnchorData}
                    onExternalButtonClick={onExternalButtonClick}
                    small={small}
                />
            ) : (
                <MobileNavbar currentSection={currentSection} small={small} />
            )}
        </>
    );
}
