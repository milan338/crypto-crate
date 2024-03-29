import LinearGradientSVG, { LINEAR_GRADIENT } from '../misc/LinearGradientSVG';

interface UnderlineSVGProps {
    z?: number;
    rot?: number;
    width?: number | string;
    height?: number | string;
    tX?: number | string;
    tY?: number | string;
}

export default function TextUnderlineSVG(props: UnderlineSVGProps) {
    const { z, rot, width, height, tX, tY } = props;
    return (
        <svg
            viewBox="0 0 100 100"
            width={width}
            height={height}
            fill="none"
            style={{
                zIndex: z,
                position: 'absolute',
                transform: `translate(${tX ?? 0}, ${tY ?? 0})`,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <LinearGradientSVG />
            </defs>
            <path
                transform={`rotate(${rot}) translate(${rot})`}
                d="M2.725 17.387c19.845-9.663 64.184-24.516 82.774-6.62"
                style={{ stroke: LINEAR_GRADIENT }}
                strokeWidth={5.5}
                strokeLinecap="round"
            />
        </svg>
    );
}
