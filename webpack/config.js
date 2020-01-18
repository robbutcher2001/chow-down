const webpack = require('webpack');
const path = require('path');
const htmlWebpack = require('html-webpack-plugin');
const webpackPwaManifest = require('webpack-pwa-manifest');

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
          'file-loader'
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
      template: path.join(path.resolve(__dirname, '../src'), 'index.html')
    }),
    new webpack.EnvironmentPlugin({
      API_BASE: process.env.API_BASE ? process.env.API_BASE : ''
    }),
    new webpackPwaManifest({
      name: 'Chow Down',
      short_name: 'Chow Down',
      description: 'Chow down on a weekly plan of your evening meals',
      background_color: '#222',
      inject: true,
      fingerprints: true,
      ios: {
        'apple-mobile-web-app-title': 'Chow Down',
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': '#222'
      },
      icons: [
        {
          src: path.resolve('src/splash.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          ios: true
        },
        {
          src: path.resolve('src/splash.png'),
          size: '1024x1024',
          ios: 'startup'
        }
      ]
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8080
  }
};
