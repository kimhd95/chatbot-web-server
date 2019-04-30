'use strict';

let devConfig = {
	env: 'dev',
	// hostname: 'fooddev.jellylab.io',
	hostname: 'corgi.jellylab.io',
	port: 8001,
	viewDir: './views',
	//개발서버
	api_url: 'https://devapifood.jellylab.io', // Dev API Server on AWS is in http.
	//운영서버
	// api_url: 'https://foodprod.jellylab.io', // Dev API Server on AWS is in http.
	// api_url: 'http://ec2-13-124-160-236.ap-northeast-2.compute.amazonaws.com',
};

module.exports = devConfig;
