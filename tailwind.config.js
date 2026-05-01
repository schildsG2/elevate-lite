const elevateConfig = require('@g2crowd/elevate/tailwind');

module.exports = {
  presets: [elevateConfig],
  content: [
    './components/**/*.html',
    './index.html'
  ]
};
