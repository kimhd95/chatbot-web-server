const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();

const error_msg = '오류가 발생했습니다.';
const random_pick = (arr) => arr[Math.floor(arr.length * Math.random())];
const random_num = (num1, num2) => (num1<num2 ? num1 : num2) + Math.floor((Math.abs(num1-num2)+1) * Math.random());   // num1~num2 사이의 랜덤정수 리턴
const retest_button = ['tour0', 'Go back to the beginning'];

class Tour {
  constructor(value, socket, sessionItems) {
    let key = value;
    console.log("constructor 함수안");
    console.log(key, sessionItems);
    if (!key.startsWith('tour')) {
      if (sessionItems.stage === 'input_name') {
        key = 'tour1_1';
      } else if (sessionItems.stage === 'input_savenumber') {
        if (sessionItems.save_number) {
          key = 'tour3';
        } else {
          if (sessionItems.rewrite_password) {
            key = 'tour1_3';
          } else {
            key = 'tour1_2';
          }
        }
      }
    }

    this.strategies = {
      'tour0': this.tour0,

      'tour1': this.tour1,
      'tour1_0': this.tour1_0,
      'tour1_1': this.tour1_1,
      'tour1_2': this.tour1_2,
      'tour1_3': this.tour1_3,

      'tour2': this.tour2,
      'tour2_1': this.tour2_1,
      'tour2_2': this.tour2_2,
      'tour2_3': this.tour2_3,

      'tour3': this.tour3,
      'tour3_1': this.tour3_1,
      'tour3_2': this.tour3_2,
      'tour3_3': this.tour3_3,

      'tour4': this.tour4,

      'tour11': this.tour11,
      'tour11_1': this.tour11_1,
      'tour11_2': this.tour11_2,
      'tour11_3': this.tour11_3,

      'tour12_1': this.tour12_1,
      'tour12_2': this.tour12_2,
      'tour12_3': this.tour12_3,

      'tour13_1': this.tour13_1,
      'tour13_2': this.tour13_2,
      'tour13_3': this.tour13_3,

      'tour14_1': this.tour14_1,
      'tour14_2': this.tour14_2,
      'tour14_3': this.tour14_3,

      'tour15_1': this.tour15_1,
      'tour15_2': this.tour15_2,
      'tour15_3': this.tour15_3,

      'tour16_1': this.tour16_1,
      'tour16_2': this.tour16_2,
      'tour16_3': this.tour16_3,

      'tour17_1': this.tour17_1,
      'tour17_2': this.tour17_2,
      'tour17_3': this.tour17_3,

      'tour18_1': this.tour18_1,
      'tour18_2': this.tour18_2,
      'tour18_3': this.tour18_3,
    };
    this.execute(key, value, socket, sessionItems);
  }

  execute(key, value, socket, sessionItems) {
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button)
                                 : this.strategies[key](value, socket, sessionItems);
  }

  tour0(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = 'Hi😊 I will be your tour guide during your stay in Korea. How can I help you?';
        const button = [['tour1_1', 'Make a new plan'], ['tour2_1', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Okay, Let's make an unforgettable plan for your Korea trip. What's your first name?`;
        // const button = [['tour1_1', 'Make a new plan'], ['tour2_1', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'input_name');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour1_0(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Please rewrite your first name.`;
        // const button = [['tour1_1', 'Make a new plan'], ['tour2_1', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'input_name');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour1_1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Welcome to Korea, ${sessionItems.tour_name}!`;
        const button = [['tour1_2', '✈🚀'], ['tour1_0', 'Rewrite']];
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour1_2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Please assign a 4-digit number in order to save your own trip plan. (You must remember it!)`;
        // const button = [['tour1_1', 'Make a new plan'], ['tour2_1', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'input_savenumber');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }


  tour1_3(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `It should be 4 numbers! (ex: 1234) Please rewrite it.`;
        // const button = [['tour1_1', 'Make a new plan'], ['tour2_1', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `To find your existing plan, let me know your first name.`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour2_1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `It's you, ${sessionItems.tour_name}! Do you remember the 4-digit code you assigned to this plan? Please write it.`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2_1');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour2_2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Incorrect passcode😭😨 You can either try another code again or make a new plan. `;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2_2');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }


  tour3(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = [`Now all things have been set, let's begin!`, `How many hours (approximately) do you have before your connecting flight?`];
        const button = [['tour3_1', 'less than 6hr'], ['tour3_2', 'more than 6hr']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour3');
        await index.sendSocketMessage(socket.id, 'chat message button', msg[0]);
        await index.sendSocketMessage(socket.id, 'chat message button', msg[1], ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour3_1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Since you only have limited time, I guess visiting the closest town around here would be the best choice! Are you hungry?`;
        const button = [['tour3', 'Go back'], ['tour11', 'Yes, I need something to eat.'], ['tour12', 'No, a cup of coffee would be good☕']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour3_1');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour3_2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Among these, which option interests you the most?`;
        const button = [['tour13', 'Activities (Waterpark)'], ['tour14', 'City Tour (A new and fancy city in Incheon)'], ['tour4', 'Enjoying Korean-Chinese Tradition']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour3_2');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

  tour4(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `TRADITION!!!👑👑 Which place/experience attracts you the most?`;
        const button = [['tour15', 'Local Market'], ['tour16', 'Costume Experience'], ['tour17', 'Park'], ['tour18', 'Trick Art Museum for children']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour4');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, retest_button);
        console.log(e);
      }
    }());
  }

}

module.exports = Tour;
