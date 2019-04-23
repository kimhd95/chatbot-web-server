
const Api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
const Mbti = new Api();

Mbti.update_MBTI_logs = function (kakaoid, user_name, type, E, O, S, P, stack) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'mbti.update_MBTI_logs';
    const method = 'POST';
    const url = '/api/v1/users/update_MBTI_logs';
    const json = {
      socket_id: kakaoid,
      user_name,
      type,
      E,
      O,
      S,
      P,
      stack,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

module.exports = Mbti;
