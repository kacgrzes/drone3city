//REQUIRES FOR CONFIG
var webpack = require('webpack');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var path = require('path');
var babelJest = require('babel-jest');
var webpackAlias = require('jest-webpack-alias');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  node_modules: path.join(__dirname, 'node_modules')
};

// if build is false then You are in development mode (use "npm run dev");
var build = false;
var cfg = {}

// configuration for entry
cfg.entry = build ? {
    app: [
        path.resolve(PATHS.app, 'App.jsx')
    ],
    vendors: ['react']
} :
{
    app: [
        path.resolve(PATHS.app, 'App.jsx')
    ]
};

// configuration for plugins
cfg.plugins = build ? [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'build/index.html'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ] : [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Kanban app',
            template: 'build/index.html'
        })
    ];



//WEBPACK CONFIG
var config = {
    addVendor: function (name, path) {
        this.resolve.alias[name] = path;
        this.module.noParse.push(new RegExp('^' + name + '$'));
    },
    entry: cfg.entry,
    resolve: {
        alias: {}
    },
    devServer: {
        contentBase: PATHS.build,
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT
    },
    plugins: cfg.plugins,
    output: {
        path: PATHS.build,
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
                },
                include: PATHS.app
            },
            {
                test: /\.css$/,
                loader: 'style!css',
                include: PATHS.app
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
            },
            {
                test: /\.jpg$/,
                loader: "url-loader?limit=10000&minetype=image/jpg"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=10000&minetype=image/png"
            }
        ]
    }
};

if(build) {
   // PATHS TO MODULES
    var pathToReact = path.resolve(PATHS.node_modules, 'react/dist/react-with-addons.js');
    var pathToReactDOM = path.resolve(PATHS.node_modules, 'react-dom/dist/react-dom.js');
    var pathToInject = path.resolve(PATHS.node_modules, 'react-tap-event-plugin/src/injectTapEventPlugin.js');
    var pathToReactMDL = path.resolve(PATHS.node_modules, 'react-mdl/index.js');
    var mdl = path.resolve(PATHS.node_modules, 'material-ui/lib/index.js');

    config.addVendor('react', pathToReact);
    config.addVendor('react-dom', pathToReactDOM);
    config.addVendor('react-mdl', pathToReactMDL);
    config.addVendor('react-tap-event-plugin', pathToInject);
    config.addVendor('material-ui', mdl);
}

module.exports = config;
