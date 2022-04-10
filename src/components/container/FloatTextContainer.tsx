import styles from '@/styles/components/container/FloatTextContainer.module.scss';
import { useState, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/observer';
import { useHasMounted } from '@/hooks/ssr';
import type { ReactNode } from 'react';

export interface FloatTextContainerProps {
    heading?: string;
    subheading?: string;
    rightAlign?: boolean;
    children?: ReactNode;
}

// Intersection ratio threshold values to run intersection observer callbacks at
const thresholds = Array.apply(null, Array(11)).map((_, i) => i / 10);

export default function FloatTextContainer(props: FloatTextContainerProps) {
    const { heading, subheading, rightAlign, children } = props;
    const [intRatio, setIntRatio] = useState(0);
    const hasMounted = useHasMounted();
    const ref = useRef<HTMLDivElement>(null);
    useIntersectionObserver(
        (event) => {
            // Prevent fading out at top of screen - only fade in from bottom
            if (event.intersectionRect.y > 0) setIntRatio(event.intersectionRatio);
        },
        ref.current ?? undefined,
        { threshold: thresholds }
    );
    return (
        <div
            ref={ref}
            className={styles.container}
            style={{
                marginLeft: rightAlign ? 'auto' : 0,
                marginRight: rightAlign ? 0 : 'auto',
                opacity: hasMounted ? intRatio : 1,
                transform: hasMounted ? `translateY(${50 * (1 - intRatio)}px)` : '',
            }}
        >
            <h2>{subheading}</h2>
            <h1>{heading}</h1>
            <p>{children}</p>
        </div>
    );
}
