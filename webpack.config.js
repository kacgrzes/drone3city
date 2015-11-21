var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

var config = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8080',    
        path.resolve(__dirname, 'app/main.js')
    ],
    resolve: {
        alias: {
            'react': pathToReact
        }
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'jsx'
            },
            {
                test: /\.css$/, 
                loader: 'style!css'
            }
        ],
        noParse: [pathToReact]
    }
};

module.exports = config;