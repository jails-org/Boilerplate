/* NPM Packages */
import path from 'path'
import webpack from 'webpack'
import glob from 'glob'
import rupture from 'rupture'

/* Plugins */
import TerserPlugin from 'terser-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlCriticalWebpackPlugin from 'html-critical-webpack-plugin'
import ImageminPlugin from 'imagemin-webpack-plugin'
import SVGSpritemapPlugin from 'svg-spritemap-webpack-plugin'

/* Local Packages */
import pack from './package.json'
import tasks from './tasks'

/* Source & Dist */
const source = path.resolve(__dirname, 'presentation')
const dist = path.resolve(__dirname, 'dist')

/* Environment Modes */
const mode = process.env.NODE_ENV || 'production'
const config = process.env.ENV == 'dev' ? 'development' : 'production'
const isdev = mode !== 'production'

const entryFiles = glob.sync(`${source}/pages/**/*{.js,.styl}`)
const entryFilesIgnore = /components/

global.APPCONFIG = require('./appconfig')[config]

const assetsFolder = '' // E.g: assets/

export default tasks()
	.then( ([api, routes]) => {

	return {

		mode,

		entry: entryFiles.reduce(entries, {}),

		output: {
			filename: `${assetsFolder}js/[name].js`,
			chunkFilename: `${assetsFolder}js/[name].js`,
			publicPath: '/'
		},

		resolve: {
			extensions: ['*', '.js', '.jsx'],
			modules: [
				source,
				path.resolve(__dirname),
				path.resolve(__dirname, 'node_modules')
			]
		},

		devServer: {
			overlay: true
		},

		optimization: {
			splitChunks: {
				chunks: 'initial',
				name: 'main'
			},
			minimizer: [
				new TerserPlugin({
					parallel: true,
					terserOptions: {
						ecma: 6
					}
				}),
				new OptimizeCSSAssetsPlugin({})
			]
		},

		plugins: [
			new SVGSpritemapPlugin([
				'./assets/icons/*.svg',
				'./assets/icons/**/*.svg'
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
				const { page, file } = route
				return new HtmlWebPackPlugin({
					template: `${source}/pages/${page}/index.pug`,
					templateParameters: {
						page,
						routes,
						route
					},
					filename: `./${file}`,
					inject: false
				})
			}),
			isdev ? [] : routes.map(({ file }) => {
				return new HtmlCriticalWebpackPlugin({
					base: dist,
					src: file,
					dest: file,
					inline: true,
					minify: true,
					extract: true,
					width: 1280,
					height: 1080,
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
				}
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(mode),
				'APPCONFIG'	 : JSON.stringify(APPCONFIG),
				'API'		 : JSON.stringify(api),
				'environment': JSON.stringify(mode),
				'site'		 : JSON.stringify({
					routes,
					assetsFolder: `/${assetsFolder}`,
					version: pack.version,
					hash: mode == 'production' ? generateHash() : pack.version
				})
			}),
			new webpack.LoaderOptionsPlugin({
				test: /\.styl$/,
				stylus: {
					preferPathResolver: 'webpack',
					default: {
						use: [rupture()]
					}
				},
				options: {
					context: __dirname
				}
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
						pretty: isdev
					}
				},
				{
					test: /\.(js|jsx)$/,
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
						'css-loader',
						'stylus-loader?paths[]=./node_modules&paths[]=./presentation&resolve url'
					]
				},
				{
					test: /\.css$/,
					use: [
						'css-loader'
					]
				},
				{
					test: /\.(gif|png|jpe?g|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								outputPath: `${assetsFolder}images/`,
								name: file => file.split(`/images/`).pop()
							}
						}
					]
				}
			]
		}
	}
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
