var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var getHtmlConfig = function(name){
    return {
          template : './src/view/'+name+'.html',
            filename : 'view/'+name+'.html',
            inject : true,
            hash : true,
            chunks : ['common', name]
    }
}

var config = {
     entry: {
        'common':['./src/page/common/index.js'],
     	'index':['./src/page/index/index.js'],
     	'login':['./src/page/login/index.js'],
     },
     output: {
         path: path.resolve(__dirname, './dist'),
         publicPath : '/dist',
         filename: 'js/[name].js'
     },
     externals:{
     	'jquery':'window.jQuery'
     },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
     module: {
         rules: [
            { test: /\.css$/,                 

            loader: ExtractTextPlugin.extract({ 
                fallback: 'style-loader', use: 'css-loader' }),
            }, 
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                   'url-loader'
                ]
            },
           {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                  'file-loader'
                ]
            }
        ]   
     },
     plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'           
        }),
        new ExtractTextPlugin("css/[name].css"),

        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),

     ]
 };
 module.exports = config;