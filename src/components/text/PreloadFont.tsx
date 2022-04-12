interface PreloadFontProps {
    href: string;
}

export default function PreloadFont(props: PreloadFontProps) {
    return <link rel="preload" as="font" crossOrigin="" href={props.href} />;
}
