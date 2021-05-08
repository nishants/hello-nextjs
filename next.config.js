const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const sass = require('sass');
const path = require('path');

module.exports = withPlugins([
  [optimizedImages, {}],
  [sass, {
    // cssModules: true,
    // cssLoaderOptions: {
    //   localIdentName: '[path]___[local]___[hash:base64:5]',
    // },
    sassOptions: {
      includePaths: [path.join(__dirname, 'scss')],
    }
  }]
]);
