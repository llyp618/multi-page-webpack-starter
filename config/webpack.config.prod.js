// 引入基础配置文件
const webpackBase = require("./webpack.config.base")
// webpack-merge插件
const webpackMerge = require("webpack-merge")
// 引入 webpack
const webpack = require("webpack")

// 合并配置文件
module.exports = webpackMerge(webpackBase, {
	plugins: [
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			//开启 sourceMap
			sourceMap: true
		}),
		// 提取 公共 Javascript 代码
		new webpack.optimize.CommonsChunkPlugin({
			// chunk 名为 commons
			name: "commons",
			filename: "[name].bundle.js"
		})
	]
})