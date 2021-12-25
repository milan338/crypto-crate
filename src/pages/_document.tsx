import Document, { Html, Head, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';

interface PreloadFontProps {
    href: string;
}

function PreloadFont(props: PreloadFontProps) {
    return <link rel="preload" as="font" crossOrigin="" href={props.href} />;
}

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html>
                <Head>
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Regular.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Medium.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Bold.ttf" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
