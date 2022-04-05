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

// TODO optional arrow on hover that animates

// TODO maybe change display from 'inline-block' to something else on all the components
// TODO to fix the weird main canvas issues

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
                        width={200}
                        height={200}
                        style={{
                            transform: hovered ? 'translateX(26px) scaleX(111%)' : '',
                        }}
                    />
                )}
            </button>
        </div>
    );
}
