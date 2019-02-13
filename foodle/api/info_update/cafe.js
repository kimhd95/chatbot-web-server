
const Api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
const Cafe = new Api();

Cafe.verify_subway_thema = function (kakaoid, subway_cafe) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.verify_subway_thema';
    const method = 'POST';
    const url = '/api/v1/users/verify_subway_thema';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      subway : subway_cafe,
    };

    const func = function(error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.verify_subway_detail_thema = function (kakaoid, subway_cafe, category_list) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.verify_subway_detail_thema';
    const method = 'POST';
    const url = '/api/v1/users/verify_subway_detail_thema';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      subway : subway_cafe,
      category_list : category_list,
    };

    const func = function(error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe = function (kakaoid, subway_cafe, exit_quarter, mainmenu_type) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.get_cafe';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway_cafe,
      exit_quarter,
      mainmenu_type,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe2 = function (kakaoid, subway_cafe, exit_quarter, mainmenu_type, mood1) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.get_cafe2';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe2';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway_cafe,
      exit_quarter,
      mainmenu_type,
      mood1,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe3 = function (kakaoid, subway_cafe, exit_quarter, mood1) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.get_cafe3';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe3';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway_cafe,
      exit_quarter,
      mood1,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe4 = function (kakaoid, subway_cafe, exit_quarter, mainmenu_type, food_name, mood2) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.get_cafe4';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe4';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway_cafe,
      exit_quarter,
      mainmenu_type,
      food_name,
      mood2,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe5 = function (kakaoid, subway_cafe, exit_quarter, mainmenu_type, food_name) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'cafe.get_cafe5';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe5';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway_cafe,
      exit_quarter,
      mainmenu_type,
      food_name,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Cafe.get_cafe_info = function (kakaoid, id) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_cafe_info';
    const method = 'POST';
    const url = '/api/v1/users/get_cafe_info';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      id,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

module.exports = Cafe;
