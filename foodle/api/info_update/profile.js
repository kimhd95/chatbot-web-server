
const Api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
const Profile = new Api();

Profile.update_price_level = function (kakaoid, lunch, dinner) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_price_level';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      price_lunch: lunch,
      price_dinner: dinner
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};


Profile.update_subway = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_subway';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_exit_quarter = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_exit_quarter';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      exit_quarter: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_with_mood = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_with_mood';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      with_mood: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_mood2 = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_mood2';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      mood2: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_taste = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_taste';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      taste: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_food_type = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_food_type';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      food_type: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_rest2 = function (kakaoid, rest1, rest2) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.update_rest2';
    const method = 'POST';
    const url = '/api/v1/users/update_rest2';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      rest1,
      rest2,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_place_info = function (kakaoid, lat, lng, cnt) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.update_place_info';
    const method = 'POST';
    const url = '/api/v1/users/update_place_info';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      lat,
      lng,
      cnt,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_mid_info = function (kakaoid, mid_lat, mid_lng) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.update_mid_info';
    const method = 'POST';
    const url = '/api/v1/users/update_mid_info';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      mid_lat,
      mid_lng,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_rest_final = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_rest_final';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      rest_final: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_lat = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_lat';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      lat: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_lng = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_lng';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      lng: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_mid_lat = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_mid_lat';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      mid_lat: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_mid_lng = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_mid_lng';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      mid_lng: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_cnt = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_cnt';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      cnt: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_chat_log = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_chat_log';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      chat_log: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_freq_subway = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_freq_subway';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      freq_subway: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_drink_before = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_drink_before';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      drink_before: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_drink_type = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_drink_type';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      drink_type: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_drink_round = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_drink_round';
    const method = 'POST';
    const url = '/api/v1/users/update_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      drink_round: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};


Profile.create_decide_history = function (kakaoid, rest1, rest2, rest_winner, res_name, subway) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.create_decide_history';
    const method = 'POST';
    const url = '/api/v1/users/create_decide_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      rest1,
      rest2,
      rest_winner,
      res_name,
      subway,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.create_bot_log = function (kakaoid, type, content, state) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.create_bot_log';
    const method = 'POST';
    const url = '/api/v1/users/create_user_log';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: 'foodle',
      scenario: null,
      state,
      content,
      type,
      answer_num: null,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.create_user_log = function (kakaoid, scenario, state, content) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.create_user_log';
    const method = 'POST';
    const url = '/api/v1/users/create_user_log';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      scenario,
      state,
      content,
      type: null,
      answer_num: null,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.create_user_feedback = function (kakaoid, sex, birthday, job, feedback_content) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.create_user_feedback';
    const method = 'POST';
    const url = '/api/v1/users/create_user_feedback';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      sex,
      birthday,
      job,
      feedback_content,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.get_feedback_info = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_feedback_info';
    const method = 'POST';
    const url = '/api/v1/users/get_feedback_info';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve((body.message)[0])
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.get_image_url = function (kakaoid, message) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const method = 'POST';
    const url = 'http://jellynlp-dev.ap-northeast-2.elasticbeanstalk.com/image_crawl/';
    const json = {
      content: message,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall_worry(kakaoid, method, url, json, func);
  }));
};

Profile.geocoder = function (kakaoid, message) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const address = encodeURIComponent(message);
    const method = 'GET';
    const url = `http://dapi.kakao.com/v2/local/search/keyword.json?query=${address}`;

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall_geocoder(kakaoid, method, url, func);
  }));
};

Profile.update_place_start = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_place_start';
    const method = 'POST';
    const url = '/api/v1/users/update_place_start';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_drink_start = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_drink_start';
    const method = 'POST';
    const url = '/api/v1/users/update_drink_start';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_limit_cnt = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_limit_cnt';
    const method = 'POST';
    const url = '/api/v1/users/update_limit_cnt';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      limit_cnt: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.verify_limit = function (kakaoid, limit_cnt, decide_updated_at) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.verify_limit';
    const method = 'POST';
    const url = '/api/v1/users/verify_limit';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      decide_updated_at,
      limit_cnt,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_limit_cnt_drink = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_limit_cnt_drink';
    const method = 'POST';
    const url = '/api/v1/users/update_limit_cnt_drink';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      limit_cnt_drink: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.verify_limit_drink = function (kakaoid, limit_cnt_drink, decide_updated_at_drink) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.verify_limit_drink';
    const method = 'POST';
    const url = '/api/v1/users/verify_limit_drink';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      decide_updated_at_drink,
      limit_cnt_drink,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.register = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.previous_register_user';
    const method = 'post';
    const url = '/api/v1/users/previous_register_user';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, res, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.update_state = function (kakaoid, scenario, state) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'profile.update_state';
    const method = 'post';
    const url = '/api/v1/users/update_state';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      scenario,
      state,
    };

    const func = function (error, res, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.load_user = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'flow_update.load_user';
    const method = 'get';
    const url = `/api/v1/users/get_user_info/${kakaoid}`;
    const json = null;

    const func = function (error, res, body) {
      error === null
        ? resolve(JSON.parse(body).user_info)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Profile.chitchat = function (kakaoid, message) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const method = 'POST';
    const url = 'http://54.180.114.150:8888/engine/predict';
    const json = {
      content: message,
    };

    const func = function (error, response, body) {
      error === null && response.statusCode === 200
        ? resolve(body)
        : reject(error);
    };
    self.apicall_worry(kakaoid, method, url, json, func);
  }));
};

module.exports = Profile;
