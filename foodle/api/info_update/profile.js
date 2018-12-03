'use strict';
const api = require('../api_prototype');

// TODO : apikey 값이 하드코딩 되어있는데 config 파일에서 불러오도록 리팩토링 필요
let Profile = new api();

Profile.update_subway = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_subway';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        subway : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_exit_quarter = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_exit_quarter';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        exit_quarter : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_with_mood = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_with_mood';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        with_mood : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_price = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_price';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        price : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_rest4 = function(kakaoid, rest1, rest2, rest3, rest4, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.update_rest4';
    method = 'POST';
    url = '/api/v1/users/update_rest4';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest1 : rest1,
        rest2 : rest2,
        rest3 : rest3,
        rest4 : rest4
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_rest_only2 = function(kakaoid, rest1, rest2, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.update_rest_only2';
    method = 'POST';
    url = '/api/v1/users/update_rest_only2';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest1 : rest1,
        rest2 : rest2
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_place_info = function(kakaoid, lat, lng, cnt, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.update_place_info';
    method = 'POST';
    url = '/api/v1/users/update_place_info';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        lat : lat,
        lng : lng,
        cnt : cnt
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_mid_info = function(kakaoid, mid_lat, mid_lng, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.update_mid_info';
    method = 'POST';
    url = '/api/v1/users/update_mid_info';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        mid_lat : mid_lat,
        mid_lng : mid_lng
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_rest5 = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_rest5';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest5 : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_rest6 = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_rest6';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest6 : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_rest_final = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_rest_final';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest_final : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_lat = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_lat';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        lat : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_lng = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_lng';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        lng : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_mid_lat = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_mid_lat';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        mid_lat : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_mid_lng = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_mid_lng';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        mid_lng : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_cnt = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_cnt';
    method = 'POST';
    url = '/api/v1/users/update_user';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        cnt : value
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};


Profile.create_decide_history = function(kakaoid, rest1, rest2, rest3, rest4, round1, round2, round3, res_name, subway, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.create_decide_history';
    method = 'POST';
    url = '/api/v1/users/create_decide_history';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        rest1 : rest1,
        rest2 : rest2,
        rest3 : rest3,
        rest4 : rest4,
        round1 : round1,
        round2 : round2,
        round3 : round3,
        res_name : res_name,
        subway : subway
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.create_user_feedback = function(kakaoid, sex, birthday, job, feedback_content, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.create_user_feedback';
    method = 'POST';
    url = '/api/v1/users/create_user_feedback';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        sex : sex,
        birthday : birthday,
        job : job,
        feedback_content : feedback_content
    };

    let func =  function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.get_feedback_info = function(kakaoid,callback){
    const self = this;
    let name, method, url, json = {};
    name = 'food.get_feedback_info';
    method = 'POST';
    url = '/api/v1/users/get_feedback_info';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakaoid : kakaoid
    };

    let func = function(error, response, body){
        if(error){
            console.log(body);
            callback(error, body);
            return;
        }
        body = (body.message)[0];
        callback(error, body);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.get_image_url = function(kakaoid, message, callback) {
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

Profile.geocoder = function(kakaoid, message, callback) {
    const self = this;
    let method, url, json = {};
    let address = encodeURIComponent(message);
    method = 'GET';
    url = 'http://dapi.kakao.com/v2/local/search/keyword.json?query='+address;

    let func = function(error, response, body) {
        if(error){
            callback(error, null);
            return;
        }
        callback(error, body);
        return;
    };
    self.apicall_geocoder(kakaoid, method, url, func);
};

Profile.update_place_start = function(kakaoid, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_place_start';
    method = 'POST';
    url = '/api/v1/users/update_place_start';
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

Profile.update_limit_cnt = function(kakaoid, value, callback){
    const self = this;
    let name, method, url, json = {};
    name = 'profile.update_limit_cnt';
    method = 'POST';
    url = '/api/v1/users/update_limit_cnt';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id : kakaoid,
        limit_cnt: value
    };

    let func = function(error, response, body){
        callback(error);
        return;
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.verify_limit = function(kakaoid, limit_cnt, decide_updated_at, callback) {
    const self = this;
    let name, method, url, json = {};
    name = 'profile.verify_limit';
    method = 'POST';
    url = '/api/v1/users/verify_limit';
    json = {
        apikey : '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid,
        decide_updated_at: decide_updated_at,
        limit_cnt: limit_cnt
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

Profile.register = function(kakaoid, callback){
    const self = this;

    let name, method, url, json = {};
    name = 'profile.previous_register_user';
    method = 'post';
    url = '/api/v1/users/previous_register_user';
    json = {
        apikey: '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid,
    };

    let func = function(error, res, body){
        callback(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.update_state = function(kakaoid, scenario, state, callback){
    const self = this;

    let name, method, url, json = {};
    name = 'profile.update_state';
    method = 'post';
    url = '/api/v1/users/update_state';
    json = {
        apikey: '9Y3-7bE-Ud3-7Ja',
        kakao_id: kakaoid,
        scenario: scenario,
        state: state
    };

    let func = function(error, res, body){
        callback(error);
    };
    self.apicall(kakaoid, name, method, url, json, func);
};

Profile.load_user = function(kakaoid, callback){
    const self = this;

    let name, method, url, json = {};
    name = 'flow_update.load_user';
    method = 'get';
    url = '/api/v1/users/get_user_info/'+kakaoid;
    json = null;

    let func = function(error, res, body){
        try {
            if (error) {
                throw error;
            }
            let Body = JSON.parse(body);
            callback(error, Body.user_info, Body.user_log);
        }
        catch(err){
            console.error('Error: at '+name+' '+err.message);
            callback(err, null, null);
        }
    };

    self.apicall(kakaoid, name, method, url, json, func);

};

module.exports = Profile;
