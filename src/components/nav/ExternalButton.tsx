import styles from '@/styles/components/nav/ExternalButton.module.scss';
import { useState } from 'react';
import ArrowSVG from '../svg/arrow/ArrowSVG';
import type { MouseEventHandler, ReactNode } from 'react';

interface ExternalButtonProps {
    id?: string;
    className?: string;
    showArrow?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: ReactNode;
}

export default function ExternalButton(props: ExternalButtonProps) {
    const { id, className, showArrow, onClick, children } = props;
    const [hovered, setHovered] = useState(false);
    return (
        <div id={id} className={className}>
            <button
                className={styles.button}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={onClick}
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
