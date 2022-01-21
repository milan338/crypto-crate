// SVG content adapted from https://github.com/google/material-design-icons/blob/master/src/device/brightness_auto/materialicons/24px.svg
// In accordance with its license: https://github.com/google/material-design-icons/blob/master/LICENSE

import type { SVGProps } from '../svg_props';

export default function BrightnessAutoSVG(props: SVGProps) {
    const { className, color, width, height } = props;
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
                fill={color}
                d="M10.85 12.65h2.3L12 9l-1.15 3.65zM20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zM14.3 16l-.7-2h-3.2l-.7 2H7.8L11 7h2l3.2 9h-1.9z"
            />
        </svg>
    );
}
