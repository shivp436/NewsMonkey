// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|jsx|ts|tsx|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
        }),
  ],
  optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 10000,
            maxSize: 250000,
            minChunks: 1,
            automaticNameDelimiter: '_',
        },
        runtimeChunk: 'single',
        moduleIds: 'deterministic',
        minimize: true,
    },
};