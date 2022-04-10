import { useMemo, useCallback, useEffect } from 'react';
import { isServer } from './ssr';

export function useIntersectionObserver(
    callback: (entry: IntersectionObserverEntry) => void,
    target?: Element,
    options?: IntersectionObserverInit
) {
    const cb = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [entry] = entries;
            callback(entry);
        },
        [callback]
    );
    const observer = useMemo(() => {
        try {
            if (observer) observer.disconnect();
        } catch (err) {
            if (!(err instanceof ReferenceError)) throw err;
        }
        // Prevent calling serverside
        if (isServer()) return undefined;
        return new IntersectionObserver(cb, options);
    }, [cb, options]);
    useEffect(() => {
        if (target && observer) observer.observe(target);
        return () => {
            if (observer) observer.disconnect();
        };
    }, [target, observer]);
}
