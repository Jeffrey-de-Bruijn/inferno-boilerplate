const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const path = require('path');

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = 'style-loader';

const config = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
	},
	devServer: {
		open: true,
        hot: true,
		host: 'localhost',
	},
	plugins: [
		new WindiCSSWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [stylesHandler, 'css-loader'],
			},
			{
				test: /\.less$/i,
				use: ['less-loader'],
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
				type: 'asset',
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							"@babel/preset-flow"
						],
						plugins: [
							[
								"babel-plugin-inferno",
								{
									"imports": true
								}
							]
						]
					}
				}
			}
		],
	},
};

module.exports = () => {
	if (isProduction) {
		config.mode = 'production';


	} else {
		config.mode = 'development';
	}
	return config;
};
