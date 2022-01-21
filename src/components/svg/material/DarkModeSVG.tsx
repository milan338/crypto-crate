// SVG content adapted from https://github.com/google/material-design-icons/blob/master/src/device/dark_mode/materialicons/24px.svg
// In accordance with its license: https://github.com/google/material-design-icons/blob/master/LICENSE

import type { SVGProps } from '../svg_props';

export default function DarkModeSVG(props: SVGProps) {
    const { className, color, width, height } = props;
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect fill="none" height="24" width="24" />
            <path
                fill={color}
                d="M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36c-0.98,1.37-2.58,2.26-4.4,2.26 c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z"
            />
        </svg>
    );
}
