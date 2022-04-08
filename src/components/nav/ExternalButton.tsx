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

export default function ExternalButton(props: ExternalButtonProps) {
    // TODO optional arrow on hover
    const [hovered, setHovered] = useState(false);
    return (
        <div id={props.id} className={props.className}>
            <button
                className={styles.button}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {props.children}
                {props.showArrow && (
                    <ArrowSVG
                        color="white"
                        width={210}
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
