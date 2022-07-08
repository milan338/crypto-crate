import styles from '@/styles/components/container/FloatTextContentContainer.module.scss';
import { useRef } from 'react';
import { useTransientScroll } from '@/hooks/window';
import FloatTextContainer from './FloatTextContainer';
import type { ReactNode } from 'react';
import type { FloatTextContainerProps } from './FloatTextContainer';

interface FloatTextContentContainerProps extends FloatTextContainerProps {
    content: ReactNode;
}

export default function FloatTextContentContainer(props: FloatTextContentContainerProps) {
    const { content, heading, subheading, rightAlign, children } = props;
    const contentRef = useRef<HTMLDivElement>(null);
    useTransientScroll(
        async () => {
            if (!contentRef.current) return;
            contentRef.current.style.transform = `translateY(${
                (contentRef.current.offsetTop - window.scrollY) / 30 + window.scrollY / 100
            }px) translateX(${rightAlign ? '-' : ''}50px)`;
        },
        { throttleMs: 250 }
    );
    return (
        <div
            className={styles.container}
            style={{ flexDirection: rightAlign ? 'row' : 'row-reverse' }}
        >
            <div ref={contentRef} className={styles['content-container']} style={{ zIndex: 2 }}>
                {content}
            </div>
            <FloatTextContainer {...{ heading, subheading, rightAlign }}>
                {children}
            </FloatTextContainer>
        </div>
    );
}
