Api = function () {
  // this.config = require('../configs');
  this.hostname = 'http://devbotfood.jellylab.io';
  this.request = require('request');
};


Api.prototype.apicall = function (kakaoid, name, method, url, json, func) {
  const self = this;
  const info = {
    method,
    headers: { 'content-type': 'application/json' },
    url: `${this.hostname}:6001${url}`,
    json,

  };

  self.request(info, (error, response, body) => {
    console.log('- - - - - - - - - -apicall- - - - - - - - - -');
    console.log(`${kakaoid}, ${name}`);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body);
    console.log('- - - - - - - - - - - - - - - - - - - - - - -');
    if (error) {
      console.error(`Error: at api/api_update with ${name}: ${error.message}`);
    }

    // you can add error situations
    if (body === undefined) {
      const err = new Error(`undefined body at'${name}'`);
      console.error(`Error: ${err.message}`);
      func(err, response, body);
      return;
    }
    func(error, response, body);
  });
};

Api.prototype.apicall_worry = function (kakaoid, method, url, json, func) {
  const self = this;
  const info = {
    method,
    headers: { 'content-type': 'application/json' },
    url,
    json,

  };

  self.request(info, (error, response, body) => {
    console.log('- - - - - - - - - -apicall- - - - - - - - - -');
    console.log(kakaoid);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body);
    console.log('- - - - - - - - - - - - - - - - - - - - - - -');
    if (error) {
      console.error(`Error: at api/api_update with ${error.message}`);
    }

    // you can add error situations
    if (body === undefined) {
      const err = new Error('undefined body at');
      console.error(`Error: ${err.message}`);
      func(err, response, body);
      return;
    }
    func(error, response, body);
  });
};

Api.prototype.apicall_geocoder = function (kakaoid, method, url, func) {
  const self = this;
  const info = {
    method,
    headers: { 'Authorization': 'KakaoAK daae456d4a8ab0187cb9ecc44402183d' },
    url,
  };

  self.request(info, (error, response, body) => {
    console.log('- - - - - - - - - -apicall- - - - - - - - - -');
    console.log(kakaoid);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body);
    console.log('- - - - - - - - - - - - - - - - - - - - - - -');
    if (error) {
      console.error(`Error: at api/api_update with ${error.message}`);
    }

    // you can add error situations
    if (body === undefined) {
      const err = new Error('undefined body at');
      console.error(`Error: ${err.message}`);
      func(err, response, body);
      return;
    }
    func(error, response, body);
  });
};

module.exports = Api;
