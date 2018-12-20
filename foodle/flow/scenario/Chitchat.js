

const Info = require('../../api/info_update');


const index = require('../../server/index');


const info_update = new Info();


const request = require('request');

class Chitchat {
  constructor(value, socket, user_data) {
    let key;
    key = value;

    if (user_data.state === 'chitchat') {
      key = 'chitchat';
    }

    this.strategies = {
      'chitchat': this.chitchat,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '5', key);
    this.strategies[key] == null ? console.log('this strategy does not exist') : this.strategies[key](value, socket, user_data);
  }

  update_state(id, scenario, state) {
    (async function () {
      try {
        await info_update.profile.update_state(id, scenario, state);
      } catch (e) {
        console.log(e);
      }
    }());
  }

  chitchat(value, socket, user_data) {
    if (user_data.state === 'chitchat') {
      const info = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        url: 'http://54.180.114.150:8888/engine/predict',
        json: {
          'content': value,
        },

      };
      request(info, (error, response, body) => {
        if (error) {
          index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
          console.log(`Error at closedown_scheduler : ${error}`);
        } else {
          index.sendSocketMessage(socket.id, 'chat message button', body);
        }
      });
    }
  }
}

module.exports = Chitchat;
