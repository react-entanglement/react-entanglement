var sagui = require('sagui')

module.exports = sagui().webpack({
  sagui: {
    pages: ['demo', 'demo-plain'],

    enabledPresets: [
      'babel',
      'base',
      'clean',
      'coverage',
      'defineNodeENV',
      'eslint',
      'fonts',
      'images',
      'json',
      'library',
      'optimize',
      'pages',
      'style',
      'videos'
    ]
  }
})
