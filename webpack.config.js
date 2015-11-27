//REQUIRES FOR CONFIG
var webpack = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');

//WEBPACK CONFIG
var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },
    entry: {
        app: [ 
            path.resolve(__dirname, 'app/App.jsx')
        ]
        // vendors: ['react']
    },
    // resolve: {
    //     alias: {}
    // },
    plugins: [
        // new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'build/index.html'
        })
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        noParse: [],
        loaders: [
            {
                test: /.jsx|js?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                  presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css$/, 
                loader: 'style!css'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            { 
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "url-loader?limit=10000&minetype=application/font-woff" 
            },
            { 
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
                loader: "file-loader" 
            }
        ]
    }
};

//PATHS TO MODULES
// var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
// var pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.js');
// var pathToInject = path.resolve(node_modules, 'react-tap-event-plugin/src/injectTapEventPlugin.js');
// var pathToReactMDL = path.resolve(node_modules, 'react-mdl/index.js');
// var mdl = path.resolve(node_modules, 'material-ui/lib/index.js');

// config.addVendor('react', pathToReact);
// config.addVendor('react-dom', pathToReactDOM);
// config.addVendor('react-mdl', pathToReactMDL);
// config.addVendor('react-tap-event-plugin', pathToInject);
// config.addVendor('material-ui', mdl);

module.exports = config;