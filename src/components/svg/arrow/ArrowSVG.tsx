import styles from '@/styles/svg/Arrow.module.scss';
import type { CSSProperties } from 'react';
import type { SVGProps } from '../svg_props';

interface ArrowSVGProps extends SVGProps {
    style?: CSSProperties;
}

export default function ArrowSVG(props: ArrowSVGProps) {
    const { color, width, height, className, style } = props;
    return (
        <svg
            className={`${className} ${styles['svg-arrow']}`}
            style={style}
            width={width}
            height={height}
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill={color}
                d="M88 243.5C81.0964 243.5 75.5 249.096 75.5 256C75.5 262.904 81.0964 268.5 88 268.5V243.5ZM387.839 264.839C392.72 259.957 392.72 252.043 387.839 247.161L308.289 167.612C303.408 162.73 295.493 162.73 290.612 167.612C285.73 172.493 285.73 180.408 290.612 185.289L361.322 256L290.612 326.711C285.73 331.592 285.73 339.507 290.612 344.388C295.493 349.27 303.408 349.27 308.289 344.388L387.839 264.839ZM88 268.5H379V243.5H88V268.5Z"
            />
        </svg>
    );
}
