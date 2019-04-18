'use strict';

const
	qs = require('qs'),
	request = require('request'),
	config = require('../../configs')

function getMainPage(req, res) {
	res.render('pages/index.ejs', {
		url: config.api_url
	});
}
function getLoginPage(req, res) {
	res.render('pages/login.ejs', {
		url: config.api_url
	});
}

function getSignupPage(req,res){
	console.log('/signup 패스 요청됨.');
	res.render('pages/signup.ejs', {
      url: config.api_url
  });
}

function getLogout(req, res){
	console.log('/logout 패스 요청됨.');
	res.redirect('/');
}

function getLostIdPasswordPage (req, res){
	res.render('pages/lost_id_pw.ejs', {
      url: config.api_url
  });
}

function getTermsPage (req, res) {
	res.render('pages/terms.ejs', {
		url: config.api_url
	});
}

function getChatRoomPage (req, res) {
	res.render('pages/chat.ejs', {
		url: config.api_url
	});
}

function getFoodtestPage (req, res) {
	res.render('pages/foodtest.ejs', {
		url: config.api_url
	});
}

function getUnsignedChatRoomPage (req, res) {
	console.log('로그인없이 이용');
	res.render('pages/chat_unsigned.ejs', {
		url: config.api_url
	});
}

function getLobbyPage (req, res) {
	console.log('로그인 후 로비로 이동');
	res.render('pages/lobby.ejs', {
		url: config.api_url
	})
}

function getContentsPage (req, res) {
	console.log('컨텐츠 화면으로 이동');
	res.render('pages/contents.ejs', {
		url: config.api_url
	})
}

module.exports = {
	getMainPage: getMainPage,
	getLoginPage: getLoginPage,
	getSignupPage: getSignupPage,
	getLogout: getLogout,
	getLostIdPasswordPage: getLostIdPasswordPage,
	getTermsPage: getTermsPage,
	getChatRoomPage: getChatRoomPage,
	getUnsignedChatRoomPage: getUnsignedChatRoomPage,
	getLobbyPage: getLobbyPage,
	getContentsPage: getContentsPage,
	getFoodtestPage: getFoodtestPage

}
