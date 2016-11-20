var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/dist/');
var APP_DIR = path.resolve(__dirname, 'src/lib/js');

var config = {
    entry: {
        bundle: [APP_DIR + "/index.jsx"]
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel'
            }
        ]
    }
};

module.exports = config;
