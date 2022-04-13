import { useEffect, useState, useRef, useCallback } from 'react';
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

export function useScrollPosition(debounceDelay: number) {
    const [scrollY, setScrollY] = useState(isServer() ? 0 : window.scrollY);
    const _scrollY = useRef(scrollY);
    const wait = useRef(false);
    useEffect(() => {
        const updateScrollY = () => {
            const oldScroll = _scrollY.current;
            _scrollY.current = window.scrollY;
            // If scrolled to or from top, don't delay
            if (!!oldScroll === !!_scrollY.current) setScrollY(_scrollY.current);
            // Debounce delay
            if (wait.current) return;
            wait.current = true;
            // Update in future after wait period
            setTimeout(() => {
                wait.current = false;
                setScrollY(_scrollY.current);
            }, debounceDelay);
        };
        window.addEventListener('scroll', updateScrollY);
        return () => {
            window.removeEventListener('scroll', updateScrollY);
        };
    }, [debounceDelay]);
    return scrollY;
}

export function useBeforeUnload(message: string) {
    const handleWindowClose = useCallback(
        (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = message;
            return event;
        },
        [message]
    );
    const disableReload = useCallback(() => {
        window.addEventListener('beforeunload', handleWindowClose);
    }, [handleWindowClose]);
    const enableReload = useCallback(() => {
        window.removeEventListener('beforeunload', handleWindowClose);
    }, [handleWindowClose]);
    useEffect(() => {
        return () => enableReload();
    });
    return [disableReload, enableReload];
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
