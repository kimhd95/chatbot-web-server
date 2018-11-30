'use strict';
const api = require('../api_prototype');
let Food = new api();

Food.get_restaurant_info = function(kakaoid, id, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_restaurant_info';
    method = 'POST';
    url = '/api/v1/users/get_restaurant_info';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        id: id
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.update_user_start = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.update_user_start';
    method = 'POST';
    url = '/api/v1/users/update_user_start';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_restaurant = function(kakaoid, subway, exit_quarter, with_mood, food_ingre, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_restaurant';
    method = 'POST';
    url = '/api/v1/users/get_restaurant';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        subway: subway,
        exit_quarter: exit_quarter,
        mood: with_mood,
        food_ingre: food_ingre
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        let comment = (body.comment);
        body = (body.message);
        callback(error, body, comment);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_two_restaurant = function(kakaoid, rest3, rest4, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_two_restaurant';
    method = 'POST';
    url = '/api/v1/users/get_two_restaurant';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        rest3: rest3,
        rest4: rest4
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_last_history = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_last_history';
    method = 'POST';
    url = '/api/v1/users/get_last_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_all_history = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_all_history';
    method = 'POST';
    url = '/api/v1/users/get_all_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_today_history = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_today_history';
    method = 'POST';
    url = '/api/v1/users/get_today_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_count_history = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_count_history';
    method = 'POST';
    url = '/api/v1/users/get_count_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_three_history = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_three_history';
    method = 'POST';
    url = '/api/v1/users/get_three_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_subway_history = function(kakaoid, subway, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_subway_history';
    method = 'POST';
    url = '/api/v1/users/get_subway_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid,
        subway: subway
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message);
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.verify_subway = function(kakaoid, value, callback) {
    const self = this;
    let name, method, url, json = {};
    name = 'profile.verify_subway';
    method = 'POST';
    url = '/api/v1/users/verify_subway';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        subway : value
    };

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.crawl_two_image = function(kakaoid, res1, res2, callback) {
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_two_image';
    method = 'POST';
    url = '/api/v1/users/crawl_two_image';
    json = {
      content1: res1,
      content2: res2
    };

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.crawl_image = function(kakaoid, res1, callback) {
    const self = this;
    let name, method, url, json = {};
    name = 'food.crawl_image';
    method = 'POST';
    url = '/api/v1/users/crawl_image';
    json = {
      res1: res1
        };

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Food.get_two_image_url = function(kakaoid, res1, res2, callback) {
    const self = this;
    let method, url, json = {};
    method = 'POST';
    url = 'http://jellynlp-dev.ap-northeast-2.elasticbeanstalk.com/image_crawl/two';
    json = {
      content: res1,
      content2: res2
    };

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall_worry(kakaoid, method, url, json, func);
};

Food.get_image_url = function(kakaoid, message, callback) {
    const self = this;
    let method, url, json = {};
    method = 'POST';
    url = 'http://jellynlp-dev.ap-northeast-2.elasticbeanstalk.com/image_crawl/';
    json = {
      content: message
    };

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall_worry(kakaoid, method, url, json, func);
};

module.exports = Food;
