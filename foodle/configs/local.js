'use strict';

let devConfig = {
	env: 'local',
	hostname: 'fooddev.jellylab.io',
	port: 8001,
	viewDir: './views',
	api_url: 'http://localhost:6001', // Dev API Server on AWS is in http.
};

module.exports = devConfig;
