/* NPM Packages */
import path from 'path'
import webpack from 'webpack'
import glob from 'glob'

/* Plugins */
import TerserPlugin from 'terser-webpack-plugin'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import imageminMozjpeg from 'imagemin-mozjpeg'
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

/* Local Packages */
import pack from './package.json'
import tasks from './pipeline'

/* Source & Dist */
const source = path.resolve(__dirname, './src')
const dist 	 = path.resolve(__dirname, './dist')

/* Environment Modes */
const mode = process.env.NODE_ENV || 'production'
const config = process.env.ENV == 'dev' ? 'development' : 'production'
const isdev = mode !== 'production'

const entryFiles = glob.sync(`${source}/pages/**/*{.js,.styl}`)
const entryFilesIgnore = /components/

global.APPCONFIG = require('./appconfig.json')[config]

const assetsFolder = '' // E.g: assets/

export default tasks().then( ([api, routes]) => {

	const config = {

		mode,

		devtool: isdev ? 'eval-source-map' : false,

		entry: entryFiles.reduce(entries, {}),

		output: {
			filename: `${assetsFolder}js/[name].js`,
			chunkFilename: `${assetsFolder}js/[name].js`,
			publicPath: '/'
		},

		resolve: {
			extensions: ['*', '.js'],
			modules: [
				source,
				path.resolve(__dirname, './node_modules')
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
			hot: false,
			client : {
				overlay : {
					errors: true
				}
			}
		},

		plugins: [
			new SVGSpritemapPlugin([
				'./src/assets/icons/*.svg',
				'./src/assets/icons/**/*.svg'
			], {
				output: {
					filename: `${assetsFolder}icons/sprite.svg`
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
					templateParameters: getPugConfig({ routes, route, api }),
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
					base: dist,
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
				test: /\.(jpe?g|png|gif)$/i,
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
				'process.env.NODE_ENV': JSON.stringify(mode),
				APPCONFIG: JSON.stringify(global.APPCONFIG),
				site: JSON.stringify({
					routes,
					assetsFolder: `/${assetsFolder}`,
					version: pack.version,
					hash: mode == 'production' ? generateHash() : pack.version
				})
			}),
			new CopyPlugin({
				patterns: [
					{ from: 'src/robots.txt', to: 'robots.txt' }
				]
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
									paths 		: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src')],
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
					test: /\.(gif|png|jpe?g|svg)$/i,
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

	return config

})

// Helpers
function entries(acc, file) {
	if (file.match(entryFilesIgnore) )
		return acc
	const dirname = path.basename(path.dirname(file))
	acc[dirname] = dirname in acc ? acc[dirname].concat(file) : [file]
	return acc
}

function generateHash(){
	return Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
}

function getPugConfig({ routes, route = {}, api }) {
	return {
		routes,
		route,
		API: api,
		page: route.page,
		environment: mode,
		site: {
			routes,
			assetsFolder: `/${assetsFolder}`,
			version: pack.version,
			hash: mode == 'production' ? generateHash() : pack.version
		}
	}
}
