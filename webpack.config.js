const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'geohex.min.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'geohex',
    libraryTarget: 'umd',
    globalObject: 'this'
  }
}
