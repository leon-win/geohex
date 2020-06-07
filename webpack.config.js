const path = require('path')

module.exports = [
  {
    name: 'library',
    mode: 'production',
    entry: './src/index.js',
    output: {
      filename: 'geohex.min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
]
