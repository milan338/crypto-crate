import styles from '@/styles/components/container/FloatTextContainer.module.scss';
import { useState, useRef } from 'react';
import { useHasMounted } from '@/hooks/ssr';
import type { ReactNode } from 'react';

export interface FloatTextContainerProps {
    heading?: string;
    subheading?: string;
    rightAlign?: boolean;
    children?: ReactNode;
}

export default function FloatTextContainer(props: FloatTextContainerProps) {
    const { heading, subheading, rightAlign, children } = props;
    const [hovered, setHovered] = useState(false);
    const hasMounted = useHasMounted();
    const ref = useRef<HTMLDivElement>(null);
    return (
        <div
            ref={ref}
            className={`${styles.container} ${hovered ? styles.hovered : ''}`}
            style={
                hasMounted
                    ? /* eslint-disable indent */
                      {
                          marginLeft: rightAlign ? 'auto' : 0,
                          marginRight: rightAlign ? 0 : 'auto',
                      }
                    : {}
                /* eslint-enable indent */
            }
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h2>{subheading}</h2>
            <h1>{heading}</h1>
            <p>{children}</p>
        </div>
    );
}
