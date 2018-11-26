'use strict';

const
	authRoute = require('./auth');

function init(app) {
	app.get('*', function (req, res, next) {
		console.log('Request was made to: ' + req.originalUrl);
		return next();
  });
  
	app.use('/', authRoute)


	app.use('/error', function(req, res){
		res.render('pages/error', {
			title: 'Error'
		})
	})
	app.use((req,res) => {
		res.redirect('/error');
	})
}

module.exports = {
	init: init
};
