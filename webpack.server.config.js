var fs = require('fs')
var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/server/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'server.bundle.js',
  },
  target: 'node',
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules'))
    .reduce(function (ext, mod) {
      ext[mod] = 'commonjs ' + mod
      return ext
    }, {}),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      },
    ],
  },
}
