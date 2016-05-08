var penthouse = require('penthouse'),
	path = require('path'),
	fs = require('fs'),
	__basedir = './';

penthouse({
	url : 'http://192.168.0.155:8888/procraft/',
	css : [path.join(__basedir + 'build/styles-min.css')],
	// OPTIONAL params
	width : 1300,   // viewport width
	height : 900,   // viewport height
	forceInclude : [
		'.keepMeEvenIfNotSeenInDom',
		/^\.regexWorksToo/
	],
	timeout: 30000, // ms; abort critical css generation after this timeout
	strict: false, // set to true to throw on css errors (will run faster if no errors)
	maxEmbeddedBase64Length: 1000, // charaters; strip out inline base64 encoded resources larger than this
	userAgent: 'Penthouse Critical Path CSS Generator', // specify which user agent string when loading the page
	phantomJsOptions: { // see `phantomjs --help` for the list of all available options
		'proxy': 'http://proxy.company.com:8080',
		'ssl-protocol': 'SSLv3'
	}
}, function(err, criticalCss) {
	if (err) {
		//handle error
	}

	fs.writeFileSync('critical_css.css', criticalCss);
});