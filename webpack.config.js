var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var Clean = require('clean-webpack-plugin');
var precss = require('precss');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PROD = process.env.NODE_ENV === 'production';
var TEST = JSON.parse(process.env.TEST || "0");

var entry;
var cssLoader;

//Если потребуется в скриптах/модулях знать в каком режиме работает приложение, то можно использовать переменную PROD
var definePlugin = new webpack.DefinePlugin({
	PROD: PROD,
	TEST: TEST,
	'process.env': {
		NODE_ENV: PROD ? '"production"' : '"development"'
	}
});

var plugins = [
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin({noInfo: true}),
	new webpack.NoErrorsPlugin(),
	definePlugin
];


var loaders = [
	{
		loaders: ['react-hot', 'babel-loader'],
		include: [
			path.resolve(__dirname, "src")
		],
		test: /\.js$/,
		exclude: /(node_modules)/,
		plugins: ['transform-runtime']
	},
	{
		test: /.*\.(gif|png|jpe?g)$/i,
		loaders: [
			'file?hash=sha512&digest=hex&name=[hash].[ext]',
			'image-webpack' + (PROD ? '?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}' : '')
		]
	},

	{ test: /\.css$/, loader: "style-loader!css-loader" },

	{ test: /\.svg$/, loader: 'babel!svg-react' },

	{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },

	{ test: /\.ico$/, loader: "file-loader?name=[name].[ext]!url-loader?mimetype=image/x-icon" }
];

if (PROD) {
	var mergeCss = new ExtractTextPlugin(
		"styles-min.css",
		{
			allChunks: true
		}
	);

	entry = [
		'./src/index',
		'./less/template_styles.less'
	];

	cssLoader = {
		test: /\.less$/,
		loader: mergeCss.extract(
			'style',
			'css?modules&importLoaders=[hash:base64:5]!less'
		)
	};

	loaders.push(cssLoader);
	plugins.push(mergeCss);

	plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			minimize: true,
			output: {
				comments: false
			},
			unsafe: true,
			compress: {
				drop_console: true,
				warnings: false
			}
		})
	);
	plugins.push(new Clean(['build']));

} else {
	entry = [
		'webpack-hot-middleware/client',
		'babel-polyfill',
		'./src/index',
		'./less/template_styles.less'
	];

	cssLoader = {
		test: /\.less$/,
		exclude: /(node_modules)/,
		include: [
			path.resolve(__dirname, "less/template_styles.less"),
			path.resolve(__dirname, "src")
		],
		loaders: [
			'style?sourceMap',
			'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
			'less?sourceMap'
		]
	};

	loaders.push(cssLoader);
}


module.exports = {
	devtool: PROD ? null : 'cheap-inline-module-source-map',
	entry: entry,
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js',
		publicPath: PROD ? './build/' : 'http://localhost:3000/'
	},
	styleLoader: require('extract-text-webpack-plugin').extract('style-loader', 'css-loader!less-loader'),
	styles: {
		"mixins": true,

		"core": true,
		"icons": true,

		"larger": true,
		"path": true,
	},

	plugins: plugins,
	module: {

		loaders: loaders
	},
	postcss: function () {
		return [autoprefixer, precss];
	},
	resolve: {
		modulesDirectories: ['node_modules']
	}
};