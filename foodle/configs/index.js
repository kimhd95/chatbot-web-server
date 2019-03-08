'use strict';

const
	env = process.env.NODE_ENV || 'local',
	envConfig = require('./' + env);

console.log(env);
module.exports = envConfig;
