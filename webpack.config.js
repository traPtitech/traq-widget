/* eslint-disable @typescript-eslint/no-var-requires */
const { EnvironmentPlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: './src/main.ts',
  output: {
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: '/node_modules/',
        use: 'ts-loader'
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: { implementation: require('sass') }
          }
        ]
      }
    ]
  },
  plugins: [
    new EnvironmentPlugin(['NODE_ENV']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      scriptLoading: 'defer'
    }),
    new MiniCssExtractPlugin({ filename: '[name].[chunkhash].css' }),
    new PreloadWebpackPlugin({
      chunks: 'app',
      rel: 'preload',
      include: 'allAssets',
      fileBlacklist: [/\.(?:LICENSE\.txt|map)$/]
    }),
    new FixStyleOnlyEntriesPlugin()
  ],
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: 2015,
          output: {
            beautify: false
          }
        },
        extractComments: 'some'
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            'advanced',
            {
              cssDeclarationSorter: {
                order: 'alphabetically',
                keepOverrides: true
              },
              discardUnused: false,
              mergeIdents: false,
              reduceIdents: false,
              zindex: false
            }
          ]
        }
      }),
      new BrotliPlugin({
        asset: '[path].br[query]',
        test: /\.(js|css)$/,
        threshold: 1024,
        minRatio: 0.9
      })
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 8500,
    proxy: {
      '/api/v3/*': {
        target: 'https://q.trap.jp/',
        changeOrigin: true
      }
    }
  }
}
