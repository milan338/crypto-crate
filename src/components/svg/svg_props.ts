import type { SvgProperties } from 'csstype';

export interface SVGProps {
    className?: string;
    color?: SvgProperties['fill'];
    width?: number;
    height?: number;
}
