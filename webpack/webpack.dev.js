// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    hot: true,
    // open: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new ReactRefreshWebpackPlugin(),
  ],
};