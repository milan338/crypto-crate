import { useState, useEffect, useRef } from 'react';
import { useScrollPosition, useWindowSize } from '@/hooks/window';
import { DESKTOP_MIN_W } from '@/util/constants';
import DesktopNavbar from './navbars/DesktopNavbar';
import MobileNavbar from './navbars/MobileNavbar';
import type { AnchorData } from './navbars/DesktopNavbar';

export default function Navbar() {
    const navListRef = useRef<HTMLUListElement>(null);
    const windowSize = useWindowSize();
    const [currentSection, setCurrentSection] = useState(0);
    const [anchorData, setAnchorData] = useState<AnchorData[]>([]);
    const [sections, setSections] = useState<HTMLElement[]>([]);
    const [windowW] = windowSize;
    const scrollY = useScrollPosition(100);
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
    let activeSection = 0;
    for (const section of sections) {
        if (scrollY > section.offsetTop - 100) activeSection++;
    }
    if (activeSection !== currentSection) {
        if (anchorData[activeSection]) history.pushState({}, '', anchorData[activeSection].href);
        setCurrentSection(activeSection);
    }
    // Handle trying to read non-existent anchor data when resizing the window
    const currentAnchorData = anchorData[currentSection] || { offsetLeft: 0, offsetWidth: 0 };
    return (
        <>
            {windowW >= DESKTOP_MIN_W ? (
                <DesktopNavbar
                    ref={navListRef}
                    navListRef={navListRef}
                    currentAnchorData={currentAnchorData}
                    scrollY={scrollY}
                />
            ) : (
                <MobileNavbar currentSection={currentSection} scrollY={scrollY} />
            )}
        </>
    );
}
