
const Api = require('../api_prototype');

const Food = new Api();

Food.get_restaurant_info = function (kakaoid, id) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_restaurant_info';
    const method = 'POST';
    const url = '/api/v1/users/get_restaurant_info';
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

Food.update_user_start = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.update_user_start';
    const method = 'POST';
    const url = '/api/v1/users/update_user_start';
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

Food.get_restaurant = function (kakaoid, subway, exit_quarter, price_lunch, price_dinner, with_mood, mood2, taste, hate_food,food_type, food_name) {
  console.log('subway: '+subway);
  console.log('exit_quarter: '+exit_quarter);
  console.log('price_lunch: '+price_lunch);
  console.log('price_dinner: '+price_dinner);
  console.log('mood: '+with_mood);
  console.log('mood2: '+mood2);
  console.log('taste: '+taste);
  console.log('hate_food: '+hate_food);
  console.log('food_type: '+food_type);
  console.log('food_name: '+food_name);
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_restaurant';
    const method = 'POST';
    const url = '/api/v1/users/get_restaurant';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway: subway,
      exit_quarter: exit_quarter,
      price_lunch: price_lunch,
      price_dinner: price_dinner,
      mood: with_mood,
      mood2: mood2,
      taste: taste,
      hate_food: hate_food,
      food_type: food_type,
      food_name: food_name,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_two_restaurant = function (kakaoid, rest1, rest2) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_two_restaurant';
    const method = 'POST';
    const url = '/api/v1/users/get_two_restaurant';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      rest1,
      rest2,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_similar_restaurant = function (kakaoid, rest) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_similar_restaurant';
    const method = 'POST';
    const url = '/api/v1/users/get_similar_restaurant';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      rest,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_last_history = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_last_history';
    const method = 'POST';
    const url = '/api/v1/users/get_last_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_all_history = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_all_history';
    const method = 'POST';
    const url = '/api/v1/users/get_all_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_today_history = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_today_history';
    const method = 'POST';
    const url = '/api/v1/users/get_today_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_count_history = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_count_history';
    const method = 'POST';
    const url = '/api/v1/users/get_count_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_three_history = function (kakaoid) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_three_history';
    const method = 'POST';
    const url = '/api/v1/users/get_three_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_subway_history = function (kakaoid, subway) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_subway_history';
    const method = 'POST';
    const url = '/api/v1/users/get_subway_history';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.message)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};


Food.verify_search_food = function (kakaoid, search_food, subway) {
    const self = this;
    return new Promise(((resolve, reject) => {
        const name = 'food.verify_search_food';
        const method = 'POST';
        const url = '/api/v1/users/verify_search_food';
        const json = {
            apikey: '9Y3-7bE-Ud3-7Ja',
            search_food: search_food,
            subway: subway
        };

        const func = function (error, response, body) {
            error === null
                ? resolve(body.result)
                : reject(error);
        };
        self.apicall(kakaoid, name, method, url, json, func);
    }));
};

Food.verify_mood2 = function (kakaoid, subway) {
    const self = this;
    return new Promise(((resolve, reject) => {
        const name = 'food.verify_mood2';
        const method = 'POST';
        const url = '/api/v1/users/verify_mood2';
        const json = {
            apikey: '9Y3-7bE-Ud3-7Ja',
            subway: subway,
        };

        const func = function (error, response, body) {
            error === null
                ? resolve(body.result)
                : reject(error);
        };
        self.apicall(kakaoid, name, method, url, json, func);
    }));
};

Food.verify_subway = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.verify_subway';
    const method = 'POST';
    const url = '/api/v1/users/verify_subway';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      subway: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.result)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.verify_subway_drinktype = function (kakaoid, value) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.verify_subway_drinktype';
    const method = 'POST';
    const url = '/api/v1/users/verify_subway_drinktype';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      subway: value,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body.result)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.crawl_two_image = function (kakaoid, res1, res2) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_two_image';
    const method = 'POST';
    const url = '/api/v1/users/crawl_two_image';
    const json = {
      content1: res1,
      content2: res2,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.crawl_image = function (kakaoid, res1) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.crawl_image';
    const method = 'POST';
    const url = '/api/v1/users/crawl_image';
    const json = {
      res1,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.get_two_image_url = function (kakaoid, res1, res2) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const method = 'POST';
    const url = 'http://jellynlp-dev.ap-northeast-2.elasticbeanstalk.com/image_crawl/two';
    const json = {
      content: res1,
      content2: res2,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall_worry(kakaoid, method, url, json, func);
  }));
};

Food.get_image_url = function (kakaoid, message) {
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

Food.get_all_subway = function (kakaoid, term) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.get_all_subway';
    const method = 'GET';
    const url = '/api/v1/users/get_all_subway?term='+term;
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
};

Food.verify_result_exist = function (kakaoid, subway, price_lunch, price_dinner, hate_food, taste_list) {
  const self = this;
  return new Promise(((resolve, reject) => {
    const name = 'food.verify_result_exist';
    const method = 'POST';
    const url = '/api/v1/users/verify_result_exist';
    const json = {
      apikey: '9Y3-7bE-Ud3-7Ja',
      kakao_id: kakaoid,
      subway: subway,
      price_lunch: price_lunch,
      price_dinner: price_dinner,
      hate_food: hate_food,
      taste_list: taste_list,
    };

    const func = function (error, response, body) {
      error === null
        ? resolve(body)
        : reject(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
  }));
}

module.exports = Food;
