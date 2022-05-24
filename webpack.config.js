const path = require('path');
const Webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ImageMinPlugin = require('imagemin-webpack-plugin').default;

const ENVIRONMENT = process.env.NODE_ENV;
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production';

// directory configs
const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');

// includes a hash in the filename on each compilation and defines entry point
const htmlPlugin = new HtmlWebPackPlugin({
  template: './index.html',
  filename: './index.html',
  favicon: '../assets/images/favicon.ico',
});

// creates a CSS file per JS file and supports On-Demand-Loading of CSS and SourceMaps
const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: '[name].[hash].css',
  chunkFilename: '[id].css',
});

// to uglify and minify the js files
const uglifyJsPlugin = new UglifyJsPlugin({
  cache: true,
  parallel: true,
  sourceMap: true, // set to true if you want JS source maps
});

// declare the constant configurations here that can be accessed throughout te application  
const definePlugin = new Webpack.DefinePlugin({
  ENVIRONMENT: JSON.stringify(ENVIRONMENT),
  BASE_URL: JSON.stringify(''),
});

module.exports = {
  context: `${APP_DIR}`,
  entry: `${APP_DIR}/index.jsx`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['src', 'node_modules'],
  },
  devServer: {
    port: 5000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.j(s|sx)$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'eslint-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // fallback to style-loader in development for hot reloading of style changes
          ENVIRONMENT !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // for images smaller than 8000 bytes, it is converted to base64 format and passed as the src of the
              // image for faster loading, file-loader plugin acts as default fallback for larger images
              limit: 8000,
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    htmlPlugin,
    miniCssExtractPlugin,
    definePlugin,
    new ImageMinPlugin({
      disable: IS_DEVELOPMENT, // Disable during development
      pngquant: {
        quality: '65-90',
      },
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      uglifyJsPlugin,
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  devtool: IS_DEVELOPMENT ? 'eval-source-map' : 'none',
};
