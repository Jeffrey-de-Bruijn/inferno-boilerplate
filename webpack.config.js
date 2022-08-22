const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV == 'production';

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		hot: true,
		host: 'localhost',
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new WindiCSSWebpackPlugin(),
	],
	module: {
		rules: [
			{
				// https://webpack.js.org/guides/asset-modules/
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
							"@babel/plugin-syntax-jsx",
							[
								"babel-plugin-inferno",
								{
									"imports": true
								}
							]
						]
					}
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.less$/i,
				use: ['less-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
		],
	},
	resolve: {
		alias: {
			'react': 'inferno-compat',
			'react-dom': 'inferno-compat'
		}
	}
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';


	} else {
		config.mode = 'development';
	}
	return config;
};
