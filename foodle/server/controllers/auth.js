'use strict';

const
	express = require('express'),
	authService = require('./../services/auth'),
	nodemailer = require('nodemailer')

let router = express.Router();

// 홈 화면
router.get('/', authService.getMainPage);

router.get('/signup', authService.getSignupPage);
// router.post('/signup', authService.postSignup);

router.get('/find', authService.getLostIdPasswordPage);
// router.post('/login', authService.postLogin);

router.get('/login', authService.getLoginPage);
// router.post('/login', authService.postLogin);

router.get('/logout', authService.getLogout);

router.get('/access-terms', authService.getTermsPage);
router.get('/data-terms', authService.getTermsPage);
router.get('/chat', authService.getChatRoomPage);
router.get('/chat_unsigned', authService.getUnsignedChatRoomPage);
router.get('/lobby', authService.getLobbyPage);
router.get('/lobby_unsigned', authService.getUnsignedLobbyPage);

router.post('/sendNewPassword', function (req, res) {
	let transporter = nodemailer.createTransport({
		service:'gmail',
		auth: {
			type: 'OAuth2',
			user: 'support@jellylab.io',
			clientId: '732880438602-u5pbho778b6i4bsvig2ma7v13n7hk4nb.apps.googleusercontent.com', //환경변수로 설정해 놓는 것을 권장합니다.
			clientSecret: '6-XLCJjd-AWJ-qYkkBOO-CUr', //환경변수로 설정해 놓는 것을 권장합니다.
			refreshToken: '1/jU0ghdET2MC5LMmJ0FpyG1CJRQNWGcmJ20Jvwh0pW-c', //환경변수로 설정해 놓는 것을 권장합니다.
			accessToken: 'ya29.GlsOBsVLRfET8HR609HWOO65krRrwAJUFXbyROg6mrIG91NBFWL6sN3wz0KP71zp1LkxMQXKNcUf8RoLV-PnFkRIni-vA75BWLfXz2REQQVzmTxy4d_1IdmUpIGi', //환경변수로 설정해 놓는 것을 권장합니다.
			expires: 3600
		}
	});

	let mailOptions = {
		from: '젤리랩 <support@jellylab.io>',
		to: `${req.body.email}`,
		subject: '변경된 임시 비밀번호를 전달해드립니다.',
		html: `변경된 임시 비밀번호는 <b>${req.body.newPassword}</b>입니다. 임시 비밀번호로 로그인 후 비밀번호를 변경하여 이용 부탁드립니다.`
	}

	transporter.sendMail(mailOptions, function(err, info) {
		if ( err ) {
			console.error('Send Mail error : ', err);
		}
		else {
			console.log('Message sent : ', info);
			return res.json({ success: true });
		}
	});
});

router.post('/sendInquiry', function (req, res) {
	let transporter = nodemailer.createTransport({
		service:'gmail',
		auth: {
			type: 'OAuth2',
			user: 'support@jellylab.io',
			clientId: '732880438602-u5pbho778b6i4bsvig2ma7v13n7hk4nb.apps.googleusercontent.com', //환경변수로 설정해 놓는 것을 권장합니다.
			clientSecret: '6-XLCJjd-AWJ-qYkkBOO-CUr', //환경변수로 설정해 놓는 것을 권장합니다.
			refreshToken: '1/jU0ghdET2MC5LMmJ0FpyG1CJRQNWGcmJ20Jvwh0pW-c', //환경변수로 설정해 놓는 것을 권장합니다.
			accessToken: 'ya29.GlsOBsVLRfET8HR609HWOO65krRrwAJUFXbyROg6mrIG91NBFWL6sN3wz0KP71zp1LkxMQXKNcUf8RoLV-PnFkRIni-vA75BWLfXz2REQQVzmTxy4d_1IdmUpIGi', //환경변수로 설정해 놓는 것을 권장합니다.
			expires: 3600
		}
	});

	let mailOptions = {
		from: `${req.body.name} <${req.body.email}>`,
		to: 'support@jellylab.io',
		subject: `[외식코기]${req.body.subject}`,
		html: `<b>연락받을 이메일: ${req.body.email}<b><br><br>${req.body.message}`
	}

	transporter.sendMail(mailOptions, function(err, info) {
		if ( err ) {
			console.error('Send Mail error : ', err);
		}
		else {
			console.log('Message sent : ', info);
			res.json({ success: true });
		}
	});

})
module.exports = router;
