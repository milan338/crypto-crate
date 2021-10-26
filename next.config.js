const fs = require('fs');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const ThreeMinifierPlugin = require('@yushijinhun/three-minifier-webpack');
const transformShaderChunk = require('three-minify-shaderchunk');
const shadersToInclude = require('./src/util/three/three_shaders');
const withTM = require('next-transpile-modules')([]);
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const SRC = path.join(__dirname, 'src');
const STYLES = path.join(SRC, 'styles');
const UTIL = path.join(SRC, 'util');
const THREE_EXPORTS = path.join(UTIL, 'three', 'three_exports.ts');
// Ensure aliased, relative imported files exist
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

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer(
    withTM({
        reactStrictMode: true,
        sassOptions: {
            includePaths: [STYLES],
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
                };
            }
            return config;
        },
    })
);

// * https://discourse.threejs.org/t/stripping-out-shaders-from-three-js-to-reduce-size/1359

// ? https://discourse.threejs.org/t/how-to-reduce-bundle-size-with-webpack/14607/5

// TODO https://web.dev/measure/

// TODO https://github.com/leosingleton/webpack-glsl-minify

// TODO switch to preact once ssr suspense is supported
// ? https://darrenwhite.dev/blog/nextjs-replace-react-with-preact
// ? https://github.com/preactjs/next-plugin-preact
// ? https://daily.dev/blog/preact-a-lightweight-alternative-to-react

// https://github.com/mrdoob/three.js/issues/11003
