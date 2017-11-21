const webpackBase = require("./webpack.config.base")

const webpackMerge = require("webpack-merge")

const config = require("./config")

module.exports = webpackMerge(webpackBase, {
	module: {
		rules: [
			{
				test: /\.js$/,
				// 强制先进行Eslint 检查
				enforce: "pre",
				exclude: /node_modules|lib/,
				loader: "eslint-loader",
				options: {
					// 启动自动修复
					fix: true,
					// 启动警告信息
					emitWarning: true
				}
			}
		]
	},
	devServer: {
		contentBase: config.devServerOutputPath,
		overlay: {
			errors: true,
			warnings: true
		}
	}
})