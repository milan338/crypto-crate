import { useMemo, useCallback, useEffect } from 'react';

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
        if (observer) observer.disconnect();
        return new IntersectionObserver(cb, options);
    }, [cb, options]);
    useEffect(() => {
        if (target) observer.observe(target);
        return () => {
            observer.disconnect();
        };
    }, [target, observer]);
}
