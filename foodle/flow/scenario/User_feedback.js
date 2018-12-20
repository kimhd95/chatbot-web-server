

const Info = require('../../api/info_update');

const index = require('../../server/index');

const info_update = new Info();


class User_feedback {
  constructor(value, socket, user_data) {
    let key;
    key = value;

    if (user_data.state === 'user_feedback_write') {
      key = 'user_feedback_end';
    }

    this.strategies = {
      'user_feedback_write': this.user_feedback_write,
      'user_feedback_end': this.user_feedback_end,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '3', key);
    this.strategies[key] == null ? console.log('this strategy does not exist') : this.strategies[key](value, socket, user_data);
  }

  update_state(id, scenario, state) {
    (async function (id, scenario, state) {
      try {
        await info_update.profile.update_state(id, scenario, state);
      } catch (e) {
        console.log(e);
      }
    }(id, scenario, state));
  }

  user_feedback_write(value, socket, user_data) {
    (async function () {
      try {
        await index.sendSocketMessage(socket.id, 'chat message button', '개발팀에게 전할 말을 적어줘!');
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }

  user_feedback_end(value, socket, user_data) {
    (async function () {
      try {
        await info_update.profile.create_user_feedback(user_data.kakao_id, null, null, null, value);
        index.sendSocketMessage(socket.id, 'chat message button', '개발팀에게 소중한 의견이 전달되었어요!', ['get_started', '처음으로 돌아가기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', '오류가 발생했습니다.', ['get_started', '처음으로 돌아가기']);
        console.log(e);
      }
    }());
  }
}

module.exports = User_feedback;
