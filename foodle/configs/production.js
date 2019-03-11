'use strict';

let devConfig = {
	env: 'production',
	hostname: 'fooddev.jellylab.io',
	// hostname: 'corgi.jellylab.io',
	port: 8001,
	viewDir: './views',
	// api_url: 'http://devapifood.jellylab.io', // Dev API Server on AWS is in http.
	api_url: 'http://ec2-13-124-160-236.ap-northeast-2.compute.amazonaws.com',
};

module.exports = devConfig;
