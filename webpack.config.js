import WorkboxWebpackPlugin from "workbox-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { fileURLToPath } from "url";
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );
const isProduction = process.env.NODE_ENV == 'production';

const config = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve( __dirname, 'dist' ),
    filename: '[name]-bundle.js',
  },
  devServer: {
    hot: true,
    host: 'localhost',
    historyApiFallback: true,
    compress: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin( {
      template: './src/index.html'
    } ),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [ {
      test: /\.(png|jpe?g|gif|svg|ttf|woff2)$/i,
      type: "asset/resource",
    },
    {
      test: /\.m?jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-flow"
          ],
          plugins: [
            "@babel/syntax-dynamic-import",
            [
              "babel-plugin-inferno",
              {
                "modules": false,
                "imports": true
              }
            ]
          ]
        }
      }
    },
    {
      test: /\.(le|c)ss$/i,
      use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader' ],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
      type: 'asset',
    } ],
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
  resolve: {
    extensions: [ '.js', '.jsx' ],
    alias: {
      inferno: path.resolve( __dirname, 'node_modules/inferno/dist', isProduction ? 'index.dev.esm.js' : 'index.esm.js' )
    }
  }
};

if ( isProduction ) {
  config.mode = 'production';
  config.plugins.push( new WorkboxWebpackPlugin.GenerateSW() );
} else {
  config.mode = 'development';
}

export default ( config );
