const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();

const error_msg = '오류가 발생했습니다.';
const random_pick = (arr) => arr[Math.floor(arr.length * Math.random())];
const random_num = (num1, num2) => (num1<num2 ? num1 : num2) + Math.floor((Math.abs(num1-num2)+1) * Math.random());   // num1~num2 사이의 랜덤정수 리턴
const get_started_button = ['tour0', 'Go back to the beginning'];
const back_button = (scenario) => [scenario, 'Go back'];

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
    } else if (key.startsWith('tour_type') && key != 'tour_type_11') {
      key = 'tour_type';
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

      'tour4': this.tour4,

      'tour_type_11': this.tour11_1,
      'tour11_2': this.tour11_2,
      'tour11_3': this.tour11_3,
      'tour11_4': this.tour11_4,
      'tour11_5': this.tour11_5,
      'tour11_6': this.tour11_6,
      'tour11_7': this.tour11_7,
      'tour11_8': this.tour11_8,
      'tour11_9': this.tour11_9,
      'tour11_10': this.tour11_10,
      'tour11_11': this.tour11_11,

      'tour_type': this.tour_type,
    };
    this.execute(key, value, socket, sessionItems);
  }

  execute(key, value, socket, sessionItems) {
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button)
                                 : this.strategies[key](value, socket, sessionItems);
  }

  tour0(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = 'Hi😊 I will be your tour guide during your stay in Korea. How can I help you?';
        const button = [['tour1', 'Make a new plan'], ['tour2', 'Show my plan']];
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Okay, Let's make an unforgettable plan for your Korea trip. What's your first name?`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'input_name');
        await index.sendSocketMessage(socket.id, 'chat message button text', msg, back_button('tour0'));
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour1_0(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Please rewrite your first name.`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'input_name');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
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
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
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
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
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
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `To find your existing plan, let me know your first name.`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2');
        await index.sendSocketMessage(socket.id, 'chat message button text', msg, back_button('tour0'));
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour2_1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `It's you, ${sessionItems.tour_name}! Do you remember the 4-digit code you assigned to this plan? Please write it.`;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2_1');
        await index.sendSocketMessage(socket.id, 'chat message button text', msg, back_button('tour0'));
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour2_2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Incorrect passcode😭😨 You can either try another code again or make a new plan. `;
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2_2');
        await index.sendSocketMessage(socket.id, 'chat message button text', msg, ['tour1_2', 'Make a new plan']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour2_3(value, socket, sessionItems) {
    (async function () {
      try {
        const search_name = sessionItems.tour_name;
        const search_code = sessionItems.save_number;
        const result = await info_update.tourAPI.search_plan(socket.id, search_name, search_code);
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour2_3');
        console.log("**** RESULT ****");
        console.log(result);
        if (result.success) {
          const msg = `Gotcha! Your plan was like...`;
          await index.sendSocketMessage(socket.id, 'chat message button', msg, get_started_button);
        } else {
          // tour2_2 로 가도록
          let object = new Tour('tour2_2', socket, sessionItems);

          // const msg = `Todo: tour2_2로 가도록 구현`;
          // await index.sendSocketMessage(socket.id, 'chat message button', msg, get_started_button);
        }
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
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
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour3_1(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Since you only have limited time, I guess visiting the closest town around here would be the best choice! Are you hungry?`;
        const button = [back_button('tour_type_11'), ['tour_type_11', 'Yes, I need something to eat.'], ['tour_type_12', 'No, a cup of coffee would be good☕']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour3_1');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour3_2(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Among these, which option interests you the most?`;
        const button = [['tour_type_13', 'Activities (Waterpark)'], ['tour_type_14', 'City Tour (A new and fancy city in Incheon)'], ['tour4', 'Enjoying Korean-Chinese Tradition']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour3_2');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour4(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `TRADITION!!!👑👑 Which place/experience attracts you the most?`;
        const button = [['tour_type_15', 'Local Market'], ['tour_type_16', 'Costume Experience'], ['tour_type_17', 'Park'], ['tour_type_18', 'Trick Art Museum for children']];
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour4');
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour_type(value, socket, sessionItems) {
    (async function () {
      try {
        const msg = `Wait a second, making your own plan...`;
        const type = 'type' + value.slice(-1) + random_num(1, 3);
        const button = [['tour0', 'Finish']];
        await info_update.tourAPI.save_plan(socket.id, sessionItems.tour_name, sessionItems.save_number, type);
        await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour_type');
        await index.sendSocketMessage(socket.id, 'chat message button', msg);
        await index.sendSocketMessage(socket.id, 'chat message loader', 500);
        await index.sendSocketMessage(socket.id, 'chat message button', type, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

// 여기서부터 새로 시나리오 작업을 시작해야함
// 사용자 응답은 db가 아닌 클라이언트 세션에 저장해놓고 최종 시나리오에서 db에 저장한다.
  tour11_1(value, socket, sessionItems) {
    (async function () {
      try {
        console.log("tour11_1")
        const msg = `Would you like to try Korean food?`;
        // const type = 'type' + value.slice(-1) + random_num(1, 3);
        const button = [['tour11_2', 'yes'], ['tour11_6', 'no']];
        //await info_update.tourAPI.save_plan(socket.id, sessionItems.tour_name, sessionItems.save_number, type);
        // await index.sendSocketMessage(socket.id, 'set session item', 'stage', 'tour_type');
        // await index.sendSocketMessage(socket.id, 'chat message button', msg);
        // await index.sendSocketMessage(socket.id, 'chat message loader', 500);
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  tour11_2(value, socket, sessionItems) {
    (async function () {
      try {
        console.log("tour11_2")
        const msg = `Which one would you like to try?`;
        // const button = [['tour11_2', 'yes'], ['tour11_6', 'no']];
        // await index.sendSocketMessage(socket.id, 'chat message button', msg);
        // await index.sendSocketMessage(socket.id, 'chat message loader', 500);
        await index.sendSocketMessage(socket.id, 'chat message button', msg, ...button);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

}

module.exports = Tour;
