const path = require("path")
// 引入插件
const HTMLWebpackPlugin = require("html-webpack-plugin")
// 抽取css
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// 引入多页面文件列表
const config = require("./config")
// 通过html-webpack-plugin 生成的HTML集合
let HTMLPlugins = []
// 入口文件集合
let Entries = {}

// 生成多页面的集合
config.HTMLDirs.forEach((page) => {
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: 'html-withimg-loader!' + path.resolve(__dirname, `../app/html/${page}.html`),
		chunks: [page, 'commons'],
		minify: false
	})
	HTMLPlugins.push(htmlPlugin)
	Entries[page] = path.resolve(__dirname, `../app/js/${page}.js`)
})

module.exports = {
	entry: Entries,
	devtool: "cheap-module-source-map",
	output:{
		filename:"js/[name].bundle.[hash].js",
		path:path.resolve(__dirname, '../dist')
	},
	// 加载器
	module: {
		rules: [
			{
				// 对css后缀名进行处理
				test: /\.css$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {
								// css压缩
								minimize: true,
							}
						},
						{
							loader: "postcss-loader"
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use:{
					loader:"file-loader",
					options: {
						// 打包生成图片的名字
						name: "[name].[ext]",
						outputPath: config.imgOutputPath
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ["file-loader"]
			}
		]
	},
	resolve: {
		alias:{
			'@': path.resolve(__dirname, '../app')
		}
	},
	plugins: [
		// css抽取
		new ExtractTextPlugin({
			filename: 'css/[name].css',
      allChunks: true,
		}),
		// 自动生成HTML插件
		...HTMLPlugins
	]
}