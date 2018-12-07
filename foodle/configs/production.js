'use strict';

let devConfig = {
	env: 'production',
	hostname: 'fooddev.jellylab.io',
	port: 8001,
	viewDir: './views',
	api_url: 'http://devapifood.jellylab.io', // Dev API Server on AWS is in http.
};

module.exports = devConfig;
