/**
 * Sagui configuration object
 * see: http://sagui.js.org/
 */
module.exports = {
  pages: ['index'],

  style: {
    cssModules: false
  },

  webpack: {
    // Enzyme setup
    externals: {
      'cheerio': 'window',
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true
    }
  }
}
