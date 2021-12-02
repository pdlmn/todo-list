const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.js',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    // new CopyPlugin({
      //   patterns: [
        //     { from: './img', to: './img' },
        //   ],
      // }),
    new MiniCssExtractPlugin(),
  ],
};
