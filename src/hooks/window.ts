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

export function useScrollPosition(root?: HTMLElement) {
    const [scrollY, setScrollY] = useState(root ? root.scrollTop : window.scrollY);
    useEffect(() => {
        const updateScrollY = () => {
            setScrollY(root ? root.scrollTop : window.scrollY);
        };
        if (root) root.addEventListener('scroll', updateScrollY);
        else window.addEventListener('scroll', updateScrollY);
        return () => {
            window.removeEventListener('scroll', updateScrollY);
        };
    }, [root]);
    return scrollY;
}

export function useScrollBehavior(behavior: 'auto' | 'smooth') {
    useEffect(() => {
        document.documentElement.style.scrollBehavior = behavior;
    }, [behavior]);
}

export function usePreventScroll(prevent: boolean) {
    useEffect(() => {
        document.documentElement.style.overflow = prevent ? 'hidden' : 'auto';
    }, [prevent]);
}
