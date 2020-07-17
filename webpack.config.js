const webpack = require('webpack');
const path = require('path');
console.log('👠', path.resolve(__dirname, '/public'));
module.exports = {
  entry: path.join(__dirname, 'client/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0']
        }
      }
    ]
  },
  externals: {
    'react/addons': true, // important!!
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  }
};