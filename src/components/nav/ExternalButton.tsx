import styles from '@/styles/components/nav/ExternalButton.module.scss';
import { useState } from 'react';
import ArrowSVG from '../svg/arrow/ArrowSVG';
import type { ReactNode } from 'react';

interface ExternalButtonProps {
    id?: string;
    className?: string;
    showArrow?: boolean;
    children?: ReactNode;
}

// TODO show modal on click

export default function ExternalButton(props: ExternalButtonProps) {
    const { id, className, showArrow, children } = props;
    const [hovered, setHovered] = useState(false);
    return (
        <div id={id} className={className}>
            <button
                className={styles.button}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {children}
                {showArrow && (
                    <ArrowSVG
                        color="white"
                        width={140}
                        height={200}
                        style={{
                            transform: hovered
                                ? 'translateX(45px) scaleX(106%)'
                                : 'translateX(35px)',
                        }}
                    />
                )}
            </button>
        </div>
    );
}
