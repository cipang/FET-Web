const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: '/'
  },
  module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader",
         options: {
           presets: ["@babel/preset-env", "@babel/preset-react"],
           plugins: [
             ['import', { libraryName: "antd", style: true }],
             ["@babel/plugin-proposal-class-properties"]
           ]
         }
       }
     },
     {
       test: /\.html$/,
       use: [
         {
           loader: "html-loader"
         }
       ]
     },
     {
       test: /\.(png|jp(e*)g|svg)$/,
       use: [{
           loader: 'url-loader',
           options: {
               limit: 8000, // Convert images < 8kb to base64 strings
               name: 'images/[hash]-[name].[ext]'
           }
       }]
     },
     //css loader
     {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
     },
     {
       test: /\.less$/,
       use: [{
           loader: 'style-loader' // creates style nodes from JS strings
       },
       {
           loader: 'css-loader' // translates CSS into CommonJ
       },
       {
           loader: 'less-loader', // compiles Less to CSS
           options: {
               javascriptEnabled: true
           }
       }
     ]}
   ]
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new webpack.DefinePlugin({
        "process.env": {
          FIREBASE_CONFIG:JSON.stringify({
            apiKey: "AIzaSyDcWtQqtqJeQ0QvxGEXtIRyiyoc42lWmmc",
            authDomain: "fet-web.firebaseapp.com",
            databaseURL: "https://fet-web.firebaseio.com",
            projectId: "fet-web",
            storageBucket: "fet-web.appspot.com",
            messagingSenderId: "594488385508",
            appId: "1:594488385508:web:0681f5d828166939"
          }),
          REACT_APP_BACKEND_URL:JSON.stringify("http://127.0.0.1:5000/")
        }
    })
  ]
};
