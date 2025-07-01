const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry file for your JS code
    output: {
        path: path.resolve(__dirname, '../themes/julioedi/assets/js'), // Output directory for the compiled file
        filename: 'blocks.js', // Output filename
    },
    resolve: {
        alias: {
            // Resolving @wordpress/element explicitly to ensure correct `createElement`
            // '@wordpress/element': path.resolve(__dirname, 'node_modules', '@wordpress/element'),
        },
        extensions: ['.js', '.jsx'], // Add .jsx to resolve JSX files
    },
    externals: {
        '@wordpress/plugins': ['wp', 'plugins'],
        '@wordpress/editor': ['wp', 'editor'],
        '@wordpress/block-editor': ['wp', 'blockEditor'],
        '@wordpress/blocks': ["wp","blocks"],
        '@wordpress/element': ['wp', 'element'],
        '@wordpress/components': ['wp', 'components'],
        '@wordpress/i18n': ['wp', 'i18n'],
        '@wordpress/hooks': ['wp', 'hooks'],
        '@wordpress/element': ['wp', 'element'],
        '@wordpress/data': ['wp', 'data'],
        '@wordpress/core-data': ['wp','coreData'],
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Handle .js and .jsx files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',  // Ensure compatibility across browsers
                            '@babel/preset-react' // Transpile JSX to JavaScript
                        ],
                        plugins: [
                            '@babel/plugin-transform-runtime', // Helps with async/await and generator functions
                        ],
                    },
                },
            },
        ],
    },
    mode: 'development', // or 'production' for production builds
};
