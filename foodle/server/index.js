/**
 * Server Index
 *
 * @date 2017-12-29
 * @author 김지원
 * @update 2018-01-04
 */

// Express 기본 모듈 불러오기
const
	fs = require('fs');
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
	Canvas = require('canvas');
	// https = require('https');

module.exports = function(){
	let
		server = express(),
		create,
		start;

	let httpserver = http.createServer(server);
	let io = require('socket.io').listen(httpserver);
	// let httpsserver = https.createServer(server);
	// let io = require('socket.io').listen(httpsserver);

	io.on('connection', function(socket){
		// console.log(socket);
		console.log(socket.id+' user connected');
		io.to(socket.id).emit('chat register', socket.id);
		// info_update.profile.register(socket.id, function(err){ // previous_register_user
		// 	if(err){
		// 		console.log(err);
		// 		return err;
		// 	}else{
		// 		return;
		// 	}
		// });
		socket.on('give file number', function(img_flag, index){
			const testFolder = './public/contents';
			const allfile = [];
			fs.readdirSync(testFolder).forEach(file => {
				if(file.includes(img_flag)) {
					allfile.push(file);
				}
			});
			io.to(socket.id).emit('file number', allfile.length, index);
		});

		socket.on('save screenshot', function(a, msg) {
			console.log("save screenshot 에 들어옴");
			var base64Data = a.replace(/^data:image\/png;base64,/, "");
			const testFolder = './public/screenshots';
			fs.writeFile(testFolder + `/${socket.id}.png`, base64Data, 'base64', function(err) {
				console.log("write");
				io.to(socket.id).emit('saved screenshot', `https://corgi.jellylab.io/screenshots/${socket.id}.png`, msg);
			});
		})

		socket.on('delete screenshot', function() {
			fs.unlink(`./public/screenshots/${socket.id}.png`, function(err){
				if(err) {
					console.log(err);
				}
			});
		});

		socket.on('disconnect', function(){
			console.log(socket.id + 'user disconnected');
		});

		// function previousRegisterUser (req, res) {
		//      let email_example = String(Math.floor(Math.random() * 100000) + 1);
		//      let kakao_id;
		//      if (req.body){
		//          kakao_id = req.body.kakao_id
		//      } else {
		//          return res.status(400).json({success: false, message: 'Parameters not properly given. Check parameter names (kakao_id).'})
		//      }
		//      if (!kakao_id){
		//          return res.status(403).json({success: false, message: 'Kakao_id not given in Body. Check parameters.'})
		//      }
		//      models.User.findOne({
		//          where: {
		//              kakao_id: kakao_id
		//          }
		//      }).then(user => {
		//          if (user){
		//              models.User.update(
		//                {
		//                  scenario: '100',
		//                  state: 'init'
		//                },     // What to update
		//                {where: {
		//                        kakao_id: kakao_id}
		//                })  // Condition
		//                .then(result => {
		//                  return res.status(403).json({success: false, message: 'user with same kakao_id already exists'});
		//                })
		//          } else {
		//              models.User.create({
		//                  kakao_id: kakao_id,
		//                  //encrypted_kakao_id: encrypted_kakao_id,
		//                  scenario: '100',
		//                  state: 'init',
		//                  registered: '0',
		//                  email: email_example
		//              }).then(user => {
		//                  return res.status(201).json({success: true, message: 'user created.', user: user})
		//              }).catch(function (err){
		//                  return res.status(500).json({success: false, message: 'Error while creating User in DB.', error: err.message, err: err})
		//              });
		//          }
		//      })
		//  }

		socket.on('chat message', function(msg){
			io.to(socket.id).emit('chat message_self', msg);
			console.log('message: '+msg+', socket: '+socket);
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
			// console.log('val: '+val);
			// console.log('socket: '+socket);
			scenario_rule.scenario_rule(val, socket);
			// io.emit('chat message', msg);
			// console.log('message: ' + msg);
		});

		socket.on('chat message button rule previous', function(msg, val){
			console.log('chat message button rule previous 에 들어옴');
			console.log(msg);
			console.log(val);
			scenario_rule.scenario_rule(val, socket);
		});

	});

	exports.sendSocketMessage = function (socket_id, message_type, message, ...args) {
	  return new Promise(((resolve, reject) => {
			if(message_type == 'chat message loader') {
		    info_update.profile.create_bot_log(socket_id, message_type, String(message), JSON.stringify(args)).then((result) => {
		      return io.to(socket_id).emit(message_type, message, ...args);
		    }).then((result) => {
		      setTimeout(() => {
		        resolve('finish');
		      }, message + 400);
		    }).catch((e) => {
		      reject(e);
		    });
			} else {
				info_update.profile.create_bot_log(socket_id, message_type, String(message), JSON.stringify(args)).then((result) => {
		      resolve(io.to(socket_id).emit(message_type, socket_id, message, ...args));
		    }).catch((e) => {
		      reject(e);
		    });
			}
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
			console.log("config.env 는 dev 또는 local")
			server.use(morgan('dev'));      // MW: log requests to console
		} else {
			server.enable('trust proxy');
			server.use(function (req, res, next) {
				if (req.secure) {
					console.log("sequre");
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
			console.log(`port : ${port}`);
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
		// httpsserver.listen(process.env.PORT || port, function () {
			// console.log('process.env.PORT || server.get(\'port\') || 3000: ' + (process.env.PORT || port) + '. Environment (server.get(env)): ' + server.get('env'));
		// });
	};

	return {
		create: create,
		start: start
	};
}
