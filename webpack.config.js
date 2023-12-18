const path = require('path');

module.exports = {
  entry: './src/index.js', // Main file of your block
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'index.js', // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  mode: 'development',
};
