
const Api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
const TourAPI = new Api();

TourAPI.save_plan = function (kakaoid, tour_name, password, plan_type) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'tourAPI.save_plan';
    const method = 'POST';
    const url = '/api/v1/users/save_plan';
    const json = {
      name: tour_name,
      password,
      plan_type,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

TourAPI.search_plan = function (kakaoid, search_name, search_code) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'tourAPI.search_plan';
    const method = 'POST';
    const url = '/api/v1/users/search_plan';
    const json = {
      name: search_name,
      password: search_code,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

module.exports = TourAPI;
