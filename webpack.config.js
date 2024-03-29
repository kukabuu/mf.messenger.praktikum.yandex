const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  entry: ['./src/core/Main/main.ts', './src/less/main.less'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'main-[hash].js'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      handlebars: "handlebars/dist/handlebars.min.js",
    },
  },
  module: {
    rules: [
      {
        test:/\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: 'babel.config.browser.js',
            ignore: './src/test'
          }
        },
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.less$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpeg|jpg)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[contenthash][ext]'
        }
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[contenthash].css',
    }),
    new ESLintPlugin({
      eslintPath: require.resolve('eslint'),
      fix: true
    }),
    new StylelintPlugin({
      configFile: '.stylelintrc',
      files: '**/*.less',
      fix: true
    })
  ],
  devServer: {
    historyApiFallback: true,
    compress: true,
    writeToDisk: true,
    host: 'localhost',
    port: 3000,
  },
};
