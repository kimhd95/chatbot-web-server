const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();

const error_msg = '오류가 발생했습니다.';
const random_pick = (arr) => arr[Math.floor(arr.length * Math.random())];
const back_button = (stage, choice) => [`MBTI${stage}/back:${choice}`, '뒤로가기'];
const get_started_button = ['get_started', '처음으로 돌아가기'];

let E = O = S = P;
let name;
const stack = [];

class Food_MBTI {
  constructor(value, socket, user_data) {
    let key = value;
    if (key.startsWith('MBTI1_')) {
      key = 'MBTI1';
    } else if (key.includes('/')) {
      key = key.split('/')[0];
    } else if (!key.startsWith('MBTI')) {
      key = 'MBTI0_1';
    }

    this.strategies = {
      'MBTI0': this.MBTI0__start,
      'MBTI0_1': this.MBTI0_1,
      'MBTI1': this.MBTI1,
      'MBTI1_1': this.MBTI1_1,
      'MBTI1_2': this.MBTI1_2,
      'MBTI1_3': this.MBTI1_3,
      'MBTI1_4': this.MBTI1_4,
      'MBTI1_5': this.MBTI1_5,
      'MBTI1_6': this.MBTI1_6,
      'MBTI1_7': this.MBTI1_7,
      'MBTI1_8': this.MBTI1_8,
      'MBTI1_9': this.MBTI1_9,
      'MBTI1_10': this.MBTI1_10,
      'MBTI1_11': this.MBTI1_11,
      'MBTI1_12': this.MBTI1_12,
      'MBTI1_13': this.MBTI1_13,
      'MBTI1_14': this.MBTI1_14,
      'MBTI1_15': this.MBTI1_15,
      'MBTI1_16': this.MBTI1_16,
      'MBTI1_17': this.MBTI1_17,
      'MBTI1_18': this.MBTI1_18,
      'MBTI1_19': this.MBTI1_19,
      'MBTI1_20': this.MBTI1_20,
      'MBTI1_21': this.MBTI1_21,
      'MBTI2_1': this.MBTI2_1,
      'MBTI2_2': this.MBTI2_2,
      'MBTI3': this.MBTI3,
    };
    this.execute(key, value, socket, user_data);
  }

  execute(key, value, socket, user_data) {
    this.update_state(socket.id, '6', key);
    this.strategies[key] == null ? index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button)
                                 : this.strategies[key](value, socket, user_data);
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

  MBTI0__start(value, socket, user_data) {
    (async function () {
      try {
        // await info_update.profile.update_drink_start(socket.id);
        // await info_update.profile.update_stack(socket.id, `{"state": "${user_data.state}", "value": "${value}"}`);
        const chlist = ['안녕안녕 반가워! 나는 사람들의 행복한 외식라이프를 도와주는 외식코기야🍜🍖'];
        const emojilist = ['emoji/hello.png', 'emoji/hello2.png', 'emoji/hello3.png', 'emoji/hello4.png'];
        await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist));
        setTimeout(async () => { await index.sendSocketMessage(socket.id, 'chat message button', '넌 이름이 뭐야??😆😆') })
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  MBTI0_1(value, socket, user_data) {
    (async function () {
      try {
        console.log("0_1 value >> ", value);
        name = value;
        E = O = S = P = 0;
        const chlist = [`반가워 ${name} ! 오늘은 21가지 질문을 통해 너의 미각유형검사, 일명 Food-MBTI(!!!)을 파악해볼게. 이걸 찾고 나면 너가 좋아할만한 식당도 몇 개 알려줄 수 있어~
                        어때 재밌겠지 궁금하지?? 어서 해보자!🐕🐕🐕`];
        index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist), ['MBTI1_1', '고고고!!']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  MBTI1_1(value, socket, user_data) {
    (async function () {
      try {
        console.log("1_1 value >> ", value);
        const choiceToDelete = value.split('back:')[1];  // 뒤로가기 로 왔을 경우
        if (choiceToDelete) { stack.pop(); }
        console.log(`Data in Stack: ${stack}`);

        const msg = '[1/21] 어떤 게 더 쉬워?
        밥 없이 1달 살기 vs 밀가루 없이 1달 살기';
        index.sendSocketMessage(socket.id, 'chat message button', msg, ['MBTI1_2/1', '밥 없이 1달'], ['MBTI1_2/2', '밀가루 없이 1달']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }
  MBTI1_2(value, socket, user_data) {
    (async function () {
      try {
        console.log("1_2 value >> ", value);
        const choiceToUpdate = value.split('/')[1];
        const choiceToDelete = value.split('back:')[1];  // 뒤로가기 로 왔을 경우

        if (choiceToDelete) {
          stack.pop();
        } else {
          stack.push(choiceToUpdate);
        }
        console.log(`Data in Stack: ${stack}`);

        const msg = '[2/21] 고수(향신료)를 잘 먹는다.';
        index.sendSocketMessage(socket.id, 'chat message button', msg, back_button('1_1', choiceToUpdate), ['MBTI1_3/1', '그렇지 않다'], ['MBTI1_3/2', '보통'], ['MBTI1_3/3', '그렇다']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  MBTI1_3(value, socket, user_data) {
    (async function () {
      try {
        console.log("1_3 value >> ", value);
        const choiceToUpdate = value.split('/')[1];
        const choiceToDelete = value.split('back:')[1];  // 뒤로가기 로 왔을 경우
        if (choiceToDelete) { stack.pop(); }
        else { stack.push(choiceToUpdate); }
        console.log(`Data in Stack: ${stack}`);

        const msg = '[3/21] 라떼/프라푸치노 대신 아메리카노를 마시는 이유는 OOO이다.';
        index.sendSocketMessage(socket.id, 'chat message button', msg, back_button('1_2', choiceToUpdate), ['MBTI1_4/1', '(아메리카노 안 마심)'], ['MBTI1_4/2', '가격이 싸서'], ['MBTI1_4/3', '맛있어서/단게 싫어서'], ['MBTI1_4/4', '고칼로리 식사에 대한 회개']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  MBTI1(value, socket, user_data) {
    (async function () {
      try {
        console.log("value >> ", value);
        const [stage, choiceToUpdate] = value.split('/');
        const idx = stage.split('MBTI')[1];
        const choiceToDelete = value.split('back:')[1];  // 뒤로가기 로 왔을 경우
        if (choiceToDelete) { stack.pop(); }
        else { stack.push(choiceToUpdate); }
        console.log(`Data in Stack: ${stack}`);

        const contents = {
          question: [,
            '[1/21] 어떤 게 더 쉬워?\n밥 없이 1달 살기 vs 밀가루 없이 1달 살기',
            '[2/21] 고수(향신료)를 잘 먹는다.',
            '[3/21] 라떼/프라푸치노 대신 아메리카노를 마시는 이유는 ㅇㅇㅇ이다.',
            '[4/21] 새우(대하)를 먹을 때 머리까지 빨아먹는다.',
            '[5/21] 매운 음식을 잘 먹는다.',
            '[6/21] 스트레스를 받으면 식욕이 ㅇㅇ한다.',
            '[7/21] 내 휴대폰에 맛집 관련 어플이 ㅇㅇ개 있다.',
            '[8/21] 식사 속도가 빠르다.',
            '[9/21] 라면 vs 파스타',
            '[10/21] 뼈 있는 치킨 vs 순살치킨',
            '[11/21] 먹기 전 음식사진을 찍는 것이 습관화 되어있다.',
            '[12/21] 외식을 할 때 1인 2만원은 거뜬히 넘는다.',
            '[13/21] 혼자 집에 있을 땐 대충 먹는다.\n("대충 먹는다"의 예시: 밥+김+김치, 밥+계란+케찹 등)',
            '[14/21] 우유에 밥을 말아먹을 수 있다.',
            '[15/21] 내 얼굴을 아는 단골 음식점 사장님이 ㅇㅇ분 계신다.',
            '[16/21] 맛이 평범하다는 후기를 봐도 음식/인테리어의 비주얼이 예쁜 곳은 찾아간다.',
            '[17/21] 싫어하는 야채/채소가 많은 편이다',
            '[18/21] 내장류(곱창, 막창, 순대내장 등), 발류(족발, 닭발)를 좋아한다',
            '[19/21] 끼니 대용으로 샐러드를 먹기도 한다.',
            '[20/21] 끼니 대용으로 카페(스*벅스 등)의 샌드위치를 먹기도 한다.',
            '[21/21] 귀찮음이 식욕을 이길 때가 있다.',
          ],
          button: [,
            [['MBTI1_2/1', '밥 없이 1달'], ['MBTI1_2/2', '밀가루 없이 1달']],
            [['MBTI1_3/1', '그렇지 않다'], ['MBTI1_3/2', '보통'], ['MBTI1_3/3', '그렇다']],
            [['MBTI1_4/1', '(아메리카노 안 마심)'], ['MBTI1_4/2', '가격이 싸서'], ['MBTI1_4/3', '맛있어서/단게 싫어서'], ['MBTI1_4/4', '고칼로리 식사에 대한 회개']],
            [['MBTI1_5/1', '그렇지 않다'], ['MBTI1_5/2', '보통'], ['MBTI1_5/3', '그렇다']],
            [['MBTI1_6/1', '그렇지 않다'], ['MBTI1_6/2', '보통'], ['MBTI1_6/3', '그렇다']],
            [['MBTI1_7/1', '감소한다'], ['MBTI1_7/2', '변화 없음'], ['MBTI1_7/3', '증가한다']],
            [['MBTI1_8/1', '없다'], ['MBTI1_8/2', '1~2개'], ['MBTI1_8/3', '3개 이상']],
            [['MBTI1_9/1', '그렇지 않다'], ['MBTI1_9/2', '보통'], ['MBTI1_9/3', '그렇다']],
            [['MBTI1_10/1', '라면'], ['MBTI1_10/2', '파스타']],
            [['MBTI1_11/1', '뼈'], ['MBTI1_11/2', '순살']],
            [['MBTI1_12/1', '그렇지 않다'], ['MBTI1_12/2', '보통'], ['MBTI1_12/3', '그렇다']],
            [['MBTI1_13/1', '그렇지 않다'], ['MBTI1_13/2', '보통'], ['MBTI1_13/3', '그렇다']],
            [['MBTI1_14/1', '그렇지 않다'], ['MBTI1_14/2', '보통'], ['MBTI1_14/3', '그렇다']],
            [['MBTI1_15/1', '그렇지 않다'], ['MBTI1_15/2', '보통 (안 해봤지만 먹을 수 있을듯)'], ['MBTI1_15/3', '그렇다']],
            [['MBTI1_16/1', '없다'], ['MBTI1_16/2', '1~4명'], ['MBTI1_16/3', '5명 이상']],
            [['MBTI1_17/1', '그렇지 않다'], ['MBTI1_17/2', '보통'], ['MBTI1_17/3', '그렇다']],
            [['MBTI1_18/1', '그렇지 않다'], ['MBTI1_18/2', '보통'], ['MBTI1_18/3', '그렇다']],
            [['MBTI1_19/1', '그렇지 않다'], ['MBTI1_19/2', '보통'], ['MBTI1_19/3', '그렇다']],
            [['MBTI1_20/1', '그렇지 않다'], ['MBTI1_20/2', '가끔'], ['MBTI1_20/3', '자주']],
            [['MBTI1_21/1', '그렇지 않다'], ['MBTI1_21/2', '가끔'], ['MBTI1_21/3', '자주']],
            [['MBTI2_1/1', '그렇지 않다'], ['MBTI2_1/2', '가끔'], ['MBTI2_1/3', '자주']],
          ]
        };

        index.sendSocketMessage(socket.id, 'chat message button', contents.question[idx], ...contents.button[idx]);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

}

module.exports = Decide_drink;
