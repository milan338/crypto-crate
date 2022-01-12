import { useEffect, useLayoutEffect, useState } from 'react';

export function useWindowSize() {
    const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useLayoutEffect(() => {
        const resizeListener = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        };
    }, []);
    return size;
}

export function useScrollPosition() {
    const [scrollY, setScrollY] = useState(window.scrollY);
    useEffect(() => {
        const updateScrollY = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', updateScrollY);
        return () => {
            window.removeEventListener('scroll', updateScrollY);
        };
    }, []);
    return scrollY;
}
