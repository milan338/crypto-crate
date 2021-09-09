const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const SRC = path.join(__dirname, 'src');
const STYLES = path.join(SRC, 'styles');

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    webpack: (config, options) => {
        config.plugins.push(
            new StyleLintPlugin({
                configFile: '.stylelintrc',
                context: STYLES,
                emitError: true,
                emitWarning: true,
            })
        );
        return config;
    },
    sassOptions: {
        includePaths: [STYLES],
    },
};
