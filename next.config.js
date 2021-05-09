const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

// const customNextConfig = {
//   trailingSlash: false,
//   // webpack(config, options) {
//   //   return config;
//   // }
// };

// const customPlugin = async (nextConfig = {}, nextComposePlugins = {}) => {
//   return Object.assign({}, nextConfig, customNextConfig);
// };
//
// module.exports = withPlugins([
//   [customPlugin, {}],
//   [optimizedImages, { }],
// ]);

module.exports = {
  trailingSlash: true
}
