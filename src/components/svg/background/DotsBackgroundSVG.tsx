import styles from '@/styles/svg/DotsBackgroundSVG.module.scss';
import { useMemo } from 'react';
import { useWindowSize } from '@/hooks/window';
import type { SVGProps } from '../svg_props';

interface DotsBackgroundSVGProps extends SVGProps {
    element?: HTMLElement;
    spacing: number;
    radius: number;
    fadeConst: number;
    fadeN: number;
    padHeight?: number;
}

export default function DotsBackgroundSVG(props: DotsBackgroundSVGProps) {
    const { element, radius, spacing, fadeConst, fadeN, padHeight } = props;
    useWindowSize();
    const width = element?.clientWidth ?? 0;
    const height = element?.clientHeight ?? 0;
    const dots = useMemo(() => {
        const w = width - spacing;
        const h = height - spacing - (padHeight ?? 0);
        const d = 2 * radius;
        const delta = spacing + d;
        // Number of dots in x, y directions
        const nX = Math.ceil(w / (d + spacing));
        const nY = Math.ceil(h / (d + spacing));
        // Extra space in x,y directions, used for centering
        const offsetX = (width - delta * nX) / 2;
        const offsetY = (height - delta * nY) / 2;
        // Array of dot SVG components
        const dotComponents = new Array<JSX.IntrinsicElements['circle']>(nX * nY);
        const halfNY = Math.floor(nY / 2);
        let i = 0;
        for (let x = 0; x < nX; x++) {
            const cx = x * delta + d + offsetX;
            // Radius that gets smaller as the dot is closer to the edge
            const r = radius * (fadeConst - (Math.abs(cx - width / 2) * 2) / width);
            for (let y = 0; y < nY; y++) {
                const yTransform = halfNY - Math.abs(y - halfNY);
                const opacity = yTransform < fadeN ? (yTransform + 1) / fadeN : 1;
                const cy = y * delta + d + offsetY;
                dotComponents[i] = (
                    <circle key={`BG-DOT-${i++}`} cx={cx} cy={cy} r={r} opacity={opacity} />
                );
            }
        }
        return dotComponents;
    }, [width, spacing, height, padHeight, radius, fadeConst, fadeN]);
    return (
        <svg
            className={styles.container}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {dots}
        </svg>
    );
}
