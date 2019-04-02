
const Api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
const Drink = new Api();

Drink.find_subway_drink_type = function (kakaoid, subway, exit_quarter) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'drink.find_subway_drink_type';
    const method = 'POST';
    const url = '/api/v1/users/find_subway_drink_type';
    const json = {
      kakao_id: kakaoid,
      subway,
      exit_quarter,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Drink.get_drink_restaurant = function (kakaoid, subway, price_dinner, mood1, mood2, drink_round, drink_type, lat, lng) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'drink.get_drink_restaurant';
    const method = 'POST';
    const url = '/api/v1/users/get_drink_restaurant';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway,
      price_dinner,
      mood: mood1,
      mood2,
      drink_round,
      drink_type,
      lat,
      lng,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

module.exports = Drink;
