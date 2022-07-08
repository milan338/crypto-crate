import { useEffect, useState, useRef, useCallback } from 'react';
import { useIsomorphicLayoutEffect } from './helper';
import { isServer } from './ssr';
import type { DependencyList } from 'react';

export type EnableReloadCb = () => void;
export type DisableReloadCb = () => void;

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

// Run onscroll callback without triggering a rerender
export function useTransientScroll(cb: () => void, deps?: DependencyList) {
    useEffect(
        () => {
            const scrollListener = cb;
            window.addEventListener('scroll', scrollListener);
            return () => {
                window.removeEventListener('scroll', scrollListener);
            };
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deps ?? []
    );
}

export function useBeforeUnload(message: string): [DisableReloadCb, EnableReloadCb] {
    const handleWindowClose = useCallback(
        (event: BeforeUnloadEvent) => {
            event.preventDefault();
            event.returnValue = message;
            return event;
        },
        [message]
    );
    const disableReload: DisableReloadCb = useCallback(() => {
        window.addEventListener('beforeunload', handleWindowClose);
    }, [handleWindowClose]);
    const enableReload: EnableReloadCb = useCallback(() => {
        window.removeEventListener('beforeunload', handleWindowClose);
    }, [handleWindowClose]);
    useEffect(() => {
        return () => {
            enableReload();
        };
    }, [enableReload]);
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
