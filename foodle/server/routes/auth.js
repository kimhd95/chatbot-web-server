'use strict';

const
	express = require('express'),
	authController = require('../controllers/auth');

let router = express.Router();

router.use('/', authController);

module.exports = router;
