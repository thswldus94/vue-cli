const webpack = require('webpack');
const isProd = process.env.NODE_ENV === "production";

module.exports = {
	//publicPath: isProd ? "/vue-argon-dashboard/" : "",
	publicPath: isProd ? "/assets/" : "",
	configureWebpack: {
		// Set up all the aliases we use in our app.
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 6
			})
		],
		devServer: {
			disableHostCheck: true,
		}
	},
	pwa: {
		name: 'Vue Argon Dashboard',
		themeColor: '#172b4d',
		msTileColor: '#172b4d',
		appleMobileWebAppCapable: 'yes',
		appleMobileWebAppStatusBarStyle: '#172b4d'
	},
	css: {
		// Enable CSS source maps.
		sourceMap: process.env.NODE_ENV !== 'production'
	},
	devServer: {
		proxy: { // proxyTable 설정
			'^/get': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {
					
				},
				secure: false
			},
			'^/add': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {
					
				},
				secure: false
			},
			'^/delete': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {

				},
				secure: false
			},
			'^/update': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {

				},
				secure: false
			},
			'^/api': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {

				},
				secure: false
			},
			'^/upload': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {

				},
				secure: false
			},
			'^/socket': {
				target: 'https://127.0.0.1:3000',
				changeOrigin: true,
				ws: true,
				publicPath: {

				},
				secure: false
			}
		}
	}
};
