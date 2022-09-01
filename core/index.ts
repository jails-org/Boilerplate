import path from 'path'
import webpack from 'webpack'

/* Plugins */
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin'

/* Env Config */
import envconfig from  '../env.config.json'

export default ({

	entry,
	dirname,
	output,
	source,
	routes,
	mode = 'production',
	assetsFolder = '',
	version = '1.0',
	metadata = {}

}) => {

	const isdev = mode === 'development'
	const ENVCONFIG = envconfig[ process.env.NODE_ENV || 'production']

	return {

		mode,

		devtool: mode == 'production' ? false : 'eval-source-map',

		entry,
		output,

		resolve: {
			extensions: ['*', '.js', '.ts'],
			modules: [
				source,
				path.resolve(dirname, './node_modules')
			]
		},

		optimization: {

			splitChunks: {
				chunks: 'initial',
				name: 'main'
			},

			minimizer: [
				new TerserPlugin({
					parallel: true
				}),
				new CssMinimizerPlugin()
			]
		},

		devServer: {
			hot: true,
			client : {
				overlay : {
					errors: true
				}
			}
		},

		plugins: [
			new SVGSpritemapPlugin([
				`${source}/assets/icons/*.svg`,
				`${source}/assets/icons/**/*.svg`
			], {
				output: {
					filename: `${output.path}/${assetsFolder}icons/sprite.svg`
				},
				sprite: { prefix: false }
			}),
			new MiniCssExtractPlugin({
				filename: `${assetsFolder}css/[name].css`,
				chunkFilename: `${assetsFolder}css/[name].css`
			}),
		].concat(
			routes.map((route) => {
				const { page } = route
				const file = route.path == '/'? 'index.html' : route.path.substring(1) + '/index.html'
				return new HtmlWebPackPlugin({
					template: `${source}/pages/${page}/index.pug`,
					templateParameters: {
						routes,
						route,
						metadata,
						ENVCONFIG
					},
					filename: `./${file}`,
					inject: false,
					minify: isdev ? false : {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: false,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true
					}
				})
			}),
			isdev ? [] : routes.map(({ path }) => {
				const file = path == '/'? 'index.html' : path.substring(1) + '/index.html'
				return new HtmlCriticalWebpackPlugin({
					base: output.path,
					src: file,
					dest: file,
					inline: true,
					minify: true,
					extract: true,
					width: 1280,
					height: 1980,
					penthouse: {
						blockJSRequests: false
					}
				})
			}),
		).concat(
			new ImageminPlugin({
				disable: isdev,
				test: /\.(jpe?g|png|gif|webp)$/i,
				pngquant: {
					quality: '95-100'
				},
				plugins: [
					imageminMozjpeg({
						quality: 80
					})
				]
			}),
			new webpack.DefinePlugin({
				ENVCONFIG : JSON.stringify(ENVCONFIG),
				metadata: JSON.stringify(metadata),
				site	: JSON.stringify({
					routes,
					version,
					assetsFolder: `/${assetsFolder}`,
					hash: mode == 'production' ? generateHash() : version
				})
			})
		),
		module: {
			rules: [
				{
					test: /\.pug$/,
					loader: 'pug-loader',
					options: {
						root: source,
						basedir: source,
						pretty: true
					}
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.ts$/,
					exclude: [/node_modules/],
					loader: 'ts-loader',
					options: {
						transpileOnly: true
					}
				},
				{
					test: /\.html$/,
					use: [
						{
							loader: 'html-loader',
							options: { minimize: true }
						}
					]
				},
				{
					test: /\.styl$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader'
						},
						{
							loader: 'stylus-loader',
							options: {
								stylusOptions : {
									paths 		: [path.resolve(dirname, 'node_modules'), path.resolve(dirname, 'src')],
									import		:['rupture'],
									resolveURL	: true,
									includeCSS	: true
								}
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: {
						loader: 'css-loader'
					}
				},
				{
					test: /\.(gif|png|jpe?g|svg|webp)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: assetsFolder + 'images/',
								name: file => file.split(/\/(images|node_modules)\//).pop()
							}
						}
					]
				}
			]
		}
	}
}

function generateHash(){
	return Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
}