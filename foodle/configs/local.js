'use strict';

let devConfig = {
	env: 'dev',
	hostname: 'fooddev.jellylab.io',
	port: 3000,
	viewDir: './views',
	api_url: 'http://devapifood.jellylab.io', // Dev API Server on AWS is in http.
};

module.exports = devConfig;
