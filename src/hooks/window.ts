import { useEffect, useState, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './helper';
import { isServer } from './ssr';

export function useWindowSize() {
    const [size, setSize] = useState(isServer() ? [1, 1] : [window.innerWidth, window.innerHeight]);
    useIsomorphicLayoutEffect(() => {
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

// Get live scroll positions from window
// Set bool to true to only get updates when element changes from 0 scroll to > 0 scroll
export function useScrollPosition(debounceDelay: number, bool = false) {
    const [scrollY, setScrollY] = useState(isServer() ? 0 : window.scrollY);
    const _scrollY = useRef(scrollY);
    const wait = useRef(false);
    useEffect(() => {
        const updateScrollY = () => {
            // Don't rerender component if scrolled state hasn't changed
            const oldScroll = _scrollY.current;
            _scrollY.current = window.scrollY;
            if (bool && !!oldScroll === !!_scrollY.current) return;
            // Debounce delay - don't delay if scrolled to top, prevent missing scroll state changes
            if (wait.current && _scrollY.current) return;
            // Not waiting - wait next times
            setTimeout(() => {
                wait.current = false;
                // Update with new position to avoid missing updates
                setScrollY(_scrollY.current);
            }, debounceDelay);
            wait.current = true;
            // Update scroll state and rerender component
            setScrollY(_scrollY.current);
        };
        window.addEventListener('scroll', updateScrollY);
        return () => {
            window.removeEventListener('scroll', updateScrollY);
        };
    }, [debounceDelay, bool]);
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
