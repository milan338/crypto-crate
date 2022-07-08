import Document, { Html, Head, Main, NextScript } from 'next/document';
import PreloadFont from '@/components/text/PreloadFont';
import type { DocumentContext } from 'next/document';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }

    render() {
        return (
            <Html>
                <Head>
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Light.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Medium.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Regular.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-Bold.ttf" />
                    <PreloadFont href="/fonts/Ubuntu/Ubuntu-BoldItalic.ttf" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
