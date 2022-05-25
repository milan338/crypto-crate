import styles from '@/styles/components/container/FloatTextContentContainer.module.scss';
import { useRef } from 'react';
import { useScrollPosition } from '@/hooks/window';
import { useHasMounted } from '@/hooks/ssr';
import FloatTextContainer from './FloatTextContainer';
import type { ReactNode } from 'react';
import type { FloatTextContainerProps } from './FloatTextContainer';

interface FloatTextContentContainerProps extends FloatTextContainerProps {
    content: ReactNode;
}

export default function FloatTextContentContainer(props: FloatTextContentContainerProps) {
    const { content, heading, subheading, rightAlign, children } = props;
    const scrollY = useScrollPosition(100);
    const hasMounted = useHasMounted();
    const contentRef = useRef<HTMLDivElement>(null);
    return (
        <div
            className={styles.container}
            style={{ flexDirection: rightAlign ? 'row' : 'row-reverse' }}
        >
            <div
                ref={contentRef}
                className={styles['content-container']}
                style={
                    hasMounted && contentRef.current
                        ? /* eslint-disable indent */
                          {
                              zIndex: 2,
                              transform: `translateY(${
                                  (contentRef.current.offsetTop - scrollY) / 30 + scrollY / 100
                              }px)
                               translateX(${rightAlign ? '-' : ''}50px)`,
                          }
                        : {}
                    /* eslint-enable indent */
                }
            >
                {content}
            </div>
            <FloatTextContainer {...{ heading, subheading, rightAlign }}>
                {children}
            </FloatTextContainer>
        </div>
    );
}
