const fs = require('fs');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const ThreeMinifierPlugin = require('@yushijinhun/three-minifier-webpack');
const transformShaderChunk = require('three-minify-shaderchunk');
const shadersToInclude = require('./src/util/three/three_shaders');
const genCssTypings = require('css-modules-typescript-generator')({
    stylesDir: path.join(__dirname, 'src', 'styles'),
});
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// !
// TODO migrate to r3f v8, react 18, and nextjs12
// https://docs.pmnd.rs/react-three-fiber/tutorials/v8-migration-guide
// !

const SRC = path.join(__dirname, 'src');
const STYLES = path.join(SRC, 'styles');
const UTIL = path.join(SRC, 'util');
const THREE_EXPORTS = path.join(UTIL, 'three', 'three_exports.ts');
// Ensure aliased, relative imported files exist
// TODO move this into a separate module
const ALIASED_FILES = [
    'node_modules/three/src/renderers/WebGLRenderer.js',
    'node_modules/three/src/renderers/webxr/WebXRManager.js',
    'node_modules/three/src/renderers/webgl/WebGLCubeMaps.js',
    'node_modules/three/src/renderers/webgl/WebGLCubeUVMaps.js',
    'node_modules/three/src/renderers/webgl/WebGLMorphtargets.js',
    'node_modules/three/src/renderers/webgl/WebGLAnimation.js',
    'node_modules/three/src/renderers/webgl/WebGLShadowMap.js',
];
for (const file of ALIASED_FILES) {
    const filePath = path.join(__dirname, file);
    try {
        if (!fs.existsSync(filePath)) {
            throw new Error(`File ${filePath} doesn't exist. Please update next.config.js`);
        }
    } catch (err) {
        console.error(err);
    }
}

// * Have to set 'unsafe-eval' to enable WASM
const ContentSecurityPolicy = `
    default-src 'self';
    base-uri 'self';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data:;
    worker-src 'self' blob:;
    script-src 'self' 'unsafe-eval';
    script-src-attr 'none';
    connect-src 'self' https://www.gstatic.com/draco/versioned/decoders/1.4.3/;
    frame-ancestors 'self';
    form-action 'self';
`;

// TODO index files for components instead of importing them from the file directly

// TODO update postcss config

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer({
    reactStrictMode: true,
    swcMinify: false, // TODO currently outputs larger bundle sizes
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    sassOptions: {
        includePaths: [STYLES],
        additionalData: (content, { resourcePath }) => {
            genCssTypings(content, resourcePath);
            return null;
        },
    },
    webpack: (config, { isServer, dev }) => {
        config.performance.hints = 'warning';
        config.plugins.push(
            new StyleLintPlugin({
                configFile: '.stylelintrc',
                context: STYLES,
                emitError: true,
                emitWarning: true,
            })
        );
        if (process.env.ANALYZE === 'true') {
            config.profile = true;
            config.plugins.push(
                new StatsWriterPlugin({
                    filename: 'stats.json',
                    stats: {
                        context: './src',
                        assets: true,
                        entrypoints: true,
                        chunks: true,
                        chunkModules: true,
                        modules: true,
                        children: true,
                        cached: true,
                        reasons: true,
                    },
                })
            );
        }
        config.module.rules.push(
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: /node_modules/,
                type: 'asset/source',
                use: 'glslify-loader',
            },
            {
                test: /\.worker\.(js|cjs|mjs|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'worker-loader',
            },
            {
                test: /ShaderChunk.js$/,
                loader: 'string-replace-loader',
                include: path.resolve('./node_modules/three/src/renderers/shaders'),
                options: {
                    search: /[\s\S]*/,
                    replace: transformShaderChunk(shadersToInclude),
                    strict: true,
                },
            }
        );
        if (!isServer) {
            if (!dev) {
                config.cache = false;
                const threeMinifier = new ThreeMinifierPlugin();
                config.plugins.unshift(threeMinifier);
                config.resolve.plugins.unshift(threeMinifier.resolver);
            }
            config.resolve.alias = {
                ...config.resolve.alias,
                three$: THREE_EXPORTS,
                './webxr/WebXRManager.js': THREE_EXPORTS,
                './webgl/WebGLCubeMaps.js': THREE_EXPORTS,
                './webgl/WebGLCubeUVMaps.js': THREE_EXPORTS,
                './webgl/WebGLMorphtargets.js': THREE_EXPORTS,
                './webgl/WebGLAnimation.js': THREE_EXPORTS,
                './webgl/WebGLShadowMap.js': THREE_EXPORTS,
                // TODO ...
            };
        }
        return config;
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Permitted-Cross-Domain-Policies',
                        value: 'none',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '0',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
                    },
                    {
                        key: 'Origin-Agent-Cluster',
                        value: '?1',
                    },
                    {
                        key: 'cross-origin-opener-policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'cross-origin-resource-policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'cross-origin-embedder-policy',
                        value: 'require-corp',
                    },
                ],
            },
        ];
    },
});

// * https://discourse.threejs.org/t/stripping-out-shaders-from-three-js-to-reduce-size/1359

// ? https://discourse.threejs.org/t/how-to-reduce-bundle-size-with-webpack/14607/5

// TODO https://web.dev/measure/

// TODO https://github.com/leosingleton/webpack-glsl-minify

// TODO switch to preact once ssr suspense is supported
// ? https://darrenwhite.dev/blog/nextjs-replace-react-with-preact
// ? https://github.com/preactjs/next-plugin-preact
// ? https://daily.dev/blog/preact-a-lightweight-alternative-to-react

// https://github.com/mrdoob/three.js/issues/11003
