import { useEffect, useLayoutEffect, useRef } from 'react';
import { isServer } from './ssr';

export const useIsomorphicLayoutEffect = isServer() ? useEffect : useLayoutEffect;

export function useThrottle(ms: number) {
    const throttled = useRef(false);
    return (cb: () => void) => {
        return () => {
            if (!throttled.current) {
                throttled.current = true;
                setTimeout(() => {
                    throttled.current = false;
                    cb();
                }, ms);
            }
        };
    };
}
