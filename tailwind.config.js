const elevateConfig = require('@g2crowd/elevate/tailwind');

module.exports = {
  presets: [elevateConfig],
  content: [
    './node_modules/@g2crowd/elevate/src/css/**/*.css',
    './components/**/*.html',
    './index.html'
  ]
};
