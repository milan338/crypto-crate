const ID = 'gradient';
export const LINEAR_GRADIENT = `url(#${ID})`;

export default function LinearGradientSVG() {
    return (
        <>
            <linearGradient
                gradientTransform="translate(-.001)"
                gradientUnits="userSpaceOnUse"
                xlinkHref="#a"
                id={ID}
                x1="38.634"
                y1="381.497"
                x2="473.368"
                y2="130.505"
            />
            <linearGradient id="a">
                <stop style={{ stopColor: '#b20080', stopOpacity: 1 }} offset="0" />
                <stop style={{ stopColor: '#2165ff', stopOpacity: 1 }} offset="1" />
            </linearGradient>
        </>
    );
}
