import { useRef } from 'react';
import { useScrollPosition, useWindowSize } from '@/hooks/window';
import type { ReactNode } from 'react';

interface FadeInTextProps {
    maxOpacity: number;
    fadeIn: number;
    children?: ReactNode;
}

export default function FadeInText(props: FadeInTextProps) {
    const { maxOpacity, fadeIn, children } = props;
    const ref = useRef<HTMLHeadingElement>(null);
    const [, windowH] = useWindowSize();
    useScrollPosition(10);
    const delta = 1 - (ref.current?.getBoundingClientRect().top ?? 0) / windowH;
    const opacity = Math.min(delta / fadeIn, maxOpacity);
    return (
        <h1
            ref={ref}
            style={
                ref.current
                    ? /* eslint-disable indent */
                      {
                          opacity: opacity,
                          transition: 'opacity 0.1s ease-out',
                      }
                    : { opacity: 0 }
                /* eslint-enable indent */
            }
        >
            {children}
        </h1>
    );
}
