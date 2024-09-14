const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = (envVars) => {
  const { env } = envVars;  
  const envConfig = require(`./webpack.${env}.js`);
  return merge(common, envConfig);
}