import styles from '@/styles/svg/Key.module.scss';
import type { SVGProps } from '../svg_props';

export default function KeySVG(props: SVGProps) {
    const { color, width, height } = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill="none"
            className={styles['svg-key']}
            style={{ color: color }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx={357} cy={155} r={130} stroke={color} fill="none" strokeWidth={35} />
            <g fill={color}>
                {/* Shaft */}
                <path d="M51.47 459.812c-7.81-7.81-7.81-20.473 0-28.284l205.062-205.061 28.284 28.284L79.755 459.812c-7.81 7.811-20.474 7.811-28.284 0z" />
                {/* Bits */}
                <path d="M155.506 373l37.123 37.123c6.834 6.834 6.834 17.915 0 24.749s-17.914 6.834-24.749 0l-37.123-37.123L155.506 373zM118.749 410l37.123 37.123c6.834 6.834 6.834 17.915 0 24.749s-17.915 6.834-24.749 0L94 434.749 118.749 410z" />
            </g>
        </svg>
    );
}
