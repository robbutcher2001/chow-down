const webpack = require('webpack');
const path = require('path');
const htmlWebpack = require('html-webpack-plugin');
const faviconsWebpackPlugin = require('favicons-webpack-plugin');
const offlinePlugin = require('offline-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.tsx'
  ],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'app-bundle.js'
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              'babel-plugin-styled-components'
            ]
          }
        }
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'url-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.jpg']
  },
  plugins: [
    new htmlWebpack({
      title: 'Chow Down',
      template: path.join(path.resolve(__dirname, '../src'), 'index.html'),
      meta: {
        description: 'Chow down on a weekly plan of your evening meals'
      }
    }),
    new webpack.EnvironmentPlugin({
      API_BASE: process.env.API_BASE ? process.env.API_BASE : ''
    }),
    new faviconsWebpackPlugin({
      logo: './src/chef.png',
      cache: true,
      inject: true,
      favicons: {
        appName: 'Chow Down',
        appDescription: 'Chow down on a weekly plan of your evening meals',
        developerName: 'Rob Butcher',
        background: '#4acaa8',
        theme_color: '#000',
        start_url: '/',
        appleStatusBarStyle: 'default'
      }
    }),
    new offlinePlugin({
      responseStrategy: 'network-first',
      externals: [
        '/api/recipes',
        '/api/ingredients',
        '/api/units'
      ],
      autoUpdate: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080
  }
};
