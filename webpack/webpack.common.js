const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '..', './src/index.tsx'),
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(?:ico|png|svg|jpg|jpeg|gif|ttf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', './build'),
    filename: '[name][contenthash].js',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html'),
    }),
    // this code is for copying the assets folder to the build folder
    // it allows us to use direct paths of the assets in the code
    // otherwise we have to use the require method to import the assets
    // always use the require method to import the assets,
    // it will be better for the performance
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '..', './src/assets'),
          to: 'assets',
        },
      ],
    }),
    new Dotenv({
      path: './.env.local',
    }),
  ],
};
