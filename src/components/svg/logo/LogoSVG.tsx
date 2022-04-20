import styles from '@/styles/components/svg/Logo.module.scss';
import LinearGradientSVG, { LINEAR_GRADIENT } from '../misc/LinearGradientSVG';
import type { SVGProps } from '../svg_props';

export interface LogoSVGProps extends SVGProps {
    monochrome?: boolean;
}

export default function LogoSVG(props: LogoSVGProps) {
    const { color, width, height, monochrome, className } = props;
    return (
        <svg
            className={className}
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <LinearGradientSVG />
            </defs>
            {/* Box */}
            <path
                className={styles['logo-bg']}
                style={{
                    fill: LINEAR_GRADIENT,
                    opacity: monochrome ? 0 : 1,
                    strokeWidth: 1.65052593,
                }}
                d="M473.366 381.497 255.999 506.993 38.633 381.497V130.503L255.999 5.007l217.367 125.496Z"
            />
            <g fill={color}>
                {/* Top C */}
                <path
                    style={{ clipRule: 'evenodd', fillRule: 'evenodd' }}
                    d="M385.291 181.354c40.454-34.575 33.836-82.167-19.622-113.031-60.568-34.97-158.328-35.224-218.352-.568-60.025 34.655-59.583 91.096.985 126.065 53.458 30.864 135.888 34.685 195.774 11.33l-66.352-38.31c-22.409 4.097-48.013.966-65.904-9.364-25.485-14.714-25.67-38.463-.414-53.045 25.257-14.582 66.392-14.475 91.878.239 18.118 10.46 23.45 25.488 15.942 38.541l66.065 38.143"
                />
                {/* Bottom C */}
                <path
                    style={{ clipRule: 'evenodd', fillRule: 'evenodd' }}
                    d="M256 357.7c-9.716-63.54-54.24-133.017-107.699-163.88C87.733 158.85 38.633 186.69 38.633 256c0 69.309 49.1 153.843 109.668 188.813 53.458 30.864 97.983 12.8 107.7-39.521l-66.354-38.31c-7.657 12.614-23.17 15.308-41.061 4.979-25.486-14.714-46.146-50.285-46.146-79.449s20.66-40.878 46.146-26.164c18.118 10.46 33.798 31.463 41.349 53.21l66.066 38.143"
                />
                {/* Front square */}
                <path
                    style={{ fillOpacity: 1, strokeWidth: 1.65052593 }}
                    d="M473.366 130.503 256 256v250.995l217.367-125.498v-250.99z"
                />
            </g>
        </svg>
    );
}
