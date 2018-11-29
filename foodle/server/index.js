/**
 * Server Index
 *
 * @date 2017-12-29
 * @author 김지원
 * @update 2018-01-04
 */

// Express 기본 모듈 불러오기
const
	express = require('express'),
	path = require('path');

// Express 미들웨어 불러오기
const
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	morgan = require('morgan');

module.exports = function(){
	let
		server = express(),
		create,
		start;

	create = function(config){
		let routes = require('./routes');

		console.log('config.api_url: ' + config.api_url)

		// Server settings
		server.set('env', config.env);
		server.set('port', config.port);
    	server.set('hostname', config.hostname);

		// ---------------- View Part ---------------- //
		// Mapping the EJS template engine to ".html" files
		// server.engine('html', require('ejs').renderFile);
		server.set('view engine', 'ejs');

		// -------------- Middleware -------------- //
		// server.use(bodyParser.json()); // MW: parse json
		server.use(bodyParser.urlencoded({
			extended: true
		}));
		server.use(cookieParser());

		// -------------- Forward HTTP to HTTPS ---------- //
		console.log('process.env.NODE_ENV: ' + process.env.NODE_ENV)
		if (config.env === 'dev' || config.env === 'local') {
			server.use(morgan('dev'));      // MW: log requests to console
		} else {
			server.enable('trust proxy');
			server.use(function (req, res, next) {
				if (req.secure) {
					next();
				} else {
					res.redirect('https://' + req.headers.host + req.url);
				}
			});
			server.set('trust proxy', 1)
		}

		// Refer to https://stackoverflow.com/questions/16452123/how-to-create-global-variables-accessible-in-all-views-using-express-node-js/45326030
		server.locals.api_url = config.api_url

		// public 폴더를 static으로 오픈 - 이렇게 해야만 EJS 에서 엑세스 가능
		server.use(express.static('public')); // 이 코드도 가능.
		server.use('/public', serveStatic(path.join(__dirname, 'public')));

		// Set up routes
		routes.init(server);
	}

	//===== 서버 시작 =====//
	start = function() {

		let
			hostname = server.get('hostname'),
			port = server.get('port');

		//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
		process.on('uncaughtException', function (err) {
			console.log('uncaughtException 발생 : ' + err);
			console.log('서버 프로세스 종료하지 않고 유지함.');
			console.log(err.stack);
		});

		// 프로세스 종료 시에 데이터베이스 연결 해제
		process.on('SIGTERM', function () {
			console.log("프로세스가 종료됩니다.");
			server.close();
		});

		server.on('close', function () {
			console.log("Express 서버 객체가 종료됩니다.");
		});

		server.listen(process.env.PORT || port, function () {
			console.log('process.env.PORT || server.get(\'port\') || 3000: ' + (process.env.PORT || port) + '. Environment (server.get(env)): ' + server.get('env'));
		});
	};

	return {
		create: create,
		start: start
	};
}
