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
	path = require('path'),
	request = require('request'),
	scenario_rule = require('../flow/scenario_rule'),
	info = require('../api/info_update'),
	info_update = new info();

// Express 미들웨어 불러오기
const
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	serveStatic = require('serve-static'),
	morgan = require('morgan'),
	http = require('http');

module.exports = function(){
	let
		server = express(),
		create,
		start;



	let httpserver = http.createServer(server);
	let io = require('socket.io').listen(httpserver);

	io.on('connection', function(socket){
		console.log(socket.id+' user connected');
		io.to(socket.id).emit('chat register', socket.id);
		// info_update.profile.register(socket.id, function(err){
		// 	if(err){
		// 		console.log(err);
		// 		return err;
		// 	}else{
		// 		return;
		// 	}
		// });

		socket.on('disconnect', function(){
			console.log(socket.id + 'user disconnected');
		});


		socket.on('chat message', function(msg){
			io.to(socket.id).emit('chat message_self', msg);
			scenario_rule.scenario_rule(msg, socket);
			// let info = {
			//     method: 'POST',
			//     headers: {'content-type' : 'application/json'},
			//     url: 'http://jellynlp2-dev.ap-northeast-2.elasticbeanstalk.com/nlp/',
			//     json: {
			//         "content" : msg
			//     },
			// };
			// request(info, function (error, response, body) {
			//     let botMessage = '몰라';
			//     botMessage = body;
			//     io.to(socket.id).emit('chat message', botMessage);
			//     console.log('message: ' + botMessage);
			// });

			// io.emit('chat message', msg);
			// console.log('message: ' + msg);
		});

		socket.on('chat message button', function(msg){
			io.to(socket.id).emit('chat message_self', msg);
			let info = {
					method: 'POST',
					headers: {'content-type' : 'application/json'},
					url: 'http://jellynlp2-dev.ap-northeast-2.elasticbeanstalk.com/nlp/',
					json: {
							"content" : msg
					},
			};
			request(info, function (error, response, body) {
					let botMessage = '몰라';
					botMessage = body;
					io.to(socket.id).emit('chat message button', botMessage, ['first', '버튼1'], ['second', '버튼2'], ['third', '버튼3']);
					console.log('message: ' + botMessage);
			});
			// io.emit('chat message', msg);
			// console.log('message: ' + msg);
		});

		socket.on('chat message button rule', function(msg, val){
			io.to(socket.id).emit('chat message_self', msg);
			// io.to(socket.id).emit('chat message button', buttonRule(val, user_id));
			scenario_rule.scenario_rule(val, socket);
			// io.emit('chat message', msg);
			// console.log('message: ' + msg);
		});

	});

	exports.sendSocketMessage = function (socket_id, message_type, message, ...args) {
	  return new Promise(((resolve, reject) => {
					info_update.profile.create_bot_log(socket_id, message_type, String(message), JSON.stringify(args)).then((result) => {
			      resolve(io.to(socket_id).emit(message_type, socket_id, message, ...args));
			    }).catch((e) => {
			      reject(e);
			    });
	  }));
	};

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
		server.use(bodyParser.json({limit:'50mb'})); // MW: parse json
		server.use(bodyParser.urlencoded({
			limit: '50mb',
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

		httpserver.listen(process.env.PORT || port, function () {
			console.log('process.env.PORT || server.get(\'port\') || 3000: ' + (process.env.PORT || port) + '. Environment (server.get(env)): ' + server.get('env'));
		});
	};

	return {
		create: create,
		start: start
	};
}
