const moment = require('moment');
const Info = require('../../api/info_update');
const index = require('../../server/index');
const info_update = new Info();

const error_msg = '오류가 발생했습니다.';
const random_pick = (arr) => arr[Math.floor(arr.length * Math.random())];
const random_num = (num1, num2) => (num1<num2 ? num1 : num2) + Math.floor((Math.abs(num1-num2)+1) * Math.random());   // num1~num2 사이의 랜덤정수 리턴
const back_button = (stage) => [`MBTI1_${stage}/back`, '뒤로가기'];
const get_started_button = ['get_started', '처음으로 돌아가기'];

let name;
let stack = [];

const EOSPtoType = (E, O, S, P) => {
  let type = '';
  type += (E >= 10) ? 'E' : 'W';
  type += (O >= 10) ? 'O' : 'L';
  type += (S >= 10) ? 'S' : 'M';
  type += (P >= 9) ? 'P' : 'F';
  return type;
};
const SumEOSP = (stack) => {
  let Eindex = Oindex = Sindex = Pindex = 0;
  let result = [];
  if(stack[1] == '1') {
  } else if(stack[1] == '2') {
    Eindex += 5;
  }

  if(stack[2] == '1') {
    Oindex += 1;
  } else if(stack[2] == '2') {
    Oindex += 2;
  } else if(stack[2] == '3') {
    Oindex += 3;
  }

  if(stack[3] == '1') {
    Oindex -= 2;
    Sindex += 1;
  } else if(stack[3] == '2') {
    Sindex -= 1;
  } else if(stack[3] == '3') {
    Sindex += 3;
  } else if(stack[3] == '4') {
    Sindex += 3;
  }

  if(stack[4] == '1') {
  } else if(stack[4] == '2') {
    Oindex += 2;
  } else if(stack[4] == '3') {
    Oindex += 3;
  }

  if(stack[5] == '1') {
  } else if(stack[5] == '2') {
    Sindex += 2;
  } else if(stack[5] == '3') {
    Sindex += 5;
  }

  if(stack[6] == '1') {
  } else if(stack[6] == '2') {
    Sindex += 2;
  } else if(stack[6] == '3') {
    Sindex += 3;
  }

  if(stack[7] == '1') {
  } else if(stack[7] == '2') {
    Pindex += 2;
  } else if(stack[7] == '3') {
    Pindex += 3;
  }

  if(stack[9] == '1') {
    Eindex += 3;
    Sindex += 1;
  } else if(stack[9] == '2') {
  }

  if(stack[10] == '1') {
    Eindex += 2;
    Oindex += 1;
  } else if(stack[10] == '2') {
  }

  if(stack[11] == '1') {
  } else if(stack[11] == '2') {
    Pindex += 1;
  } else if(stack[11] == '3') {
    Pindex += 3;
  }

  if(stack[12] == '1') {
  } else if(stack[12] == '2') {
    Pindex += 3;
  } else if(stack[12] == '3') {
    Pindex += 5;
  }

  if(stack[13] == '1') {
    Pindex += 3;
  } else if(stack[13] == '2') {
    Eindex += 1;
    Pindex += 1;
  } else if(stack[13] == '3') {
    Eindex += 2;
  }

  if(stack[14] == '1') {
  } else if(stack[14] == '2') {
    Oindex += 2;
  } else if(stack[14] == '3') {
    Oindex += 3;
  }

  if(stack[15] == '1') {
  } else if(stack[15] == '2') {
    Pindex += 1;
  } else if(stack[15] == '3') {
    Pindex += 2;
  }

  if(stack[16] == '1') {
  } else if(stack[16] == '2') {
    Pindex += 2;
  } else if(stack[16] == '3') {
    Pindex += 3;
  }

  if(stack[17] == '1') {
    Oindex += 3;
  } else if(stack[17] == '2') {
    Oindex += 2;
  } else if(stack[17] == '3') {
  }

  if(stack[18] == '1') {
  } else if(stack[18] == '2') {
    Oindex += 3;
    Eindex += 2;
  } else if(stack[18] == '3') {
    Oindex += 5;
    Eindex += 4;
  }

  if(stack[19] == '1') {
    Sindex += 3;
  } else if(stack[19] == '2') {
    Sindex += 1;
  } else if(stack[19] == '3') {
  }

  if(stack[20] == '1') {
    Eindex += 4;
    Sindex += 2;
  } else if(stack[20] == '2') {
    Eindex += 1;
    Sindex += 1;
  } else if(stack[20] == '3') {
  }

  if(stack[21] == '1') {
    Sindex += 2;
  } else if(stack[21] == '2') {
    Sindex += 1;
  } else if(stack[21] == '3') {
  }
  return [Eindex, Oindex, Sindex, Pindex];
};

const get_MBTI_info = (type, name) => {
  const MBTI_info = {
    EOSP: {type: 'EOSP', name: '못 먹는게 없는 대륙의 입맛', country: '중국', age1: 38, age2: 45,
    feature: '다리 4개 달린 건 책상과 의자 빼고 모두 먹는다는 대륙의 입맛을 가지고 계시네요!<br>동양적이면서도 자극적인 음식을 좋아하고 평소 맛집에 관심이 많아서 열심히 검색하기도 해요.',
    res: '신논현역 - 하이디라오 (마라탕, 훠궈)<br>압구정로데오역 - 갓포아키 (이자카야)'},

    EOMP: {type: 'EOMP', name: '금융권 비즈니스맨 입맛', country: '홍콩', age1: 42, age2: 51,
    feature: `동양적이면서도 섬세한 입맛을 가진 ${name}님!<br>부드럽게 입안을 감싸는 식감을 가장 좋아하시는 듯 하네요.`,
    res: '압구정로데오역 - 골드피쉬딤섬 퀴진 (딤섬)<br>서울대입구역 - 스시려 (오마카세)'},

    ELMP: {type: 'ELMP', name: '은수저 일본 유학생 입맛', country: '일본', age1: 24, age2: 28,
    feature: `가리는 건 많지만 맛있는 건 기꺼이 찾아 나서는 ${name}님,<br>혹시 정갈하고 아기자기한 일본 가정식이 취향 아니세요?<br>제가 2개만 우선 가져와봤는데, 앞으로 코기와 함께한다면 외식메뉴결정에 머리 아플 필요가 없답니다!`,
    res: '압구정역 - 우마텐 (텐동)<br>강남구청역 - 136길육미 (메밀김밥, 일식)'},

    ELSP: {type: 'ELSP', name: '먹기 위해 사는 사회초년생 입맛', country: '한국', age1: 26, age2: 32,
    feature: `월급의 반 이상이 식비로 나가는게 뭐 어때서!!<br>어차피 먹으려고 사는 거지.<br>동양적이면서도 자극적인 음식을 좋아하고 평소 맛집에 관심이 많아서 열심히 검색하기도 해요.<br>코기가 조금은 까다로운 ${name}님 입맛에 맞는 식당을 맞춰줄 수 있는데, 앞으로 함께 메뉴결정장애 뿌셔보는 것 어때요?`,
    res: '증미역 - 유림 (닭볶음탕)<br>삼전역/잠실새내역 - 담은갈비 (돼지갈비)'},

    EOSF: {type: 'EOSF', name: '땀흘려 일하는 젊은 가장 입맛', country: '태국/중국', age1: 31, age2: 39,
    feature: `술 한잔과 짭쪼름한 저녁으로 하루의 피로를 덜어내는 게 행복 아니겠어요?<br>코기가 입맛에 맞는 식당을 3개 가져와봤어요. 외식코기 어플을 다운받으시면 앞으로 ${name}님의 입맛에 맞는 메뉴결정을 해드릴 수 있답니다!`,
    res: `논현역 - 반피차이 (태국현지식)<br>합정역 - 문차이나 (중식)<br>서울대입구역 - 로향양꼬치 (양꼬치)`},

    EOMF: {type: 'EOMF', name: '동네를 제패한 이장 할아버지', country: '한국', age1: 79, age2: 100,
    feature: `밥과 뜨끈한 국물이면 속이 든든히 채워지는 당신.<br>한식 일품요리 중에서 혼밥도 가능하고, 몸을 따뜻하게 해주는 몇 군데를 뽑아봤어요.<br>외식코기 어플을 다운받으시면 앞으로 쭉 ${name}님의 입맛에 맞는 서울 내 식당을 대신 찾아드려요!`,
    res: `뚝섬역 - 밀본(칼국수)<br>남부터미널역 - 백년옥(두부요리)`},

    ELMF: {type: 'ELMF', name: '대충 먹을게요 입맛', country: '???', age1: 21, age2: 32,
    feature: `있으면 먹고, 없으면 안 먹고...<br>굳이 먹는 것에 많은 노력을 기울이지 않는 당신.<br>저로서는 있을 수 없는 일이지만, 먹는 것에서 행복감을 좀 더 느껴보는 건 어때요?<br>호불호 없이 입맛이 가볍게 도는 음식을 추천해 드릴게요. 외식코기 어플을 다운받으시면 앞으로 쭉 ${name}님의 입맛에 맞는 서울 내 식당을 찾아드려요!`,
    res: `상수역 - 도토리식당(치킨난반, 스키야키)<br>뚝섬역 - 토라식당(일식)<br>서울대입구역 - 텐동요츠야(텐동)`},

    ELSF: {type: 'ELSF', name: '입사지옥 속 청소년 입맛', country: '한국', age1: 17, age2: 19,
    feature: `유년 시절(?)의 입맛을 그대로 갖고 몸만 커버린 당신.<br>세상에 먹을 음식이 이렇게나 많은데, 조금 새로운 시도를 해 보는 건 어때요?<br>${name}님도 거부감 없이 먹어볼만한 식당을 가져왔어요. 외식코기 어플을 다운받으시면 앞으로도 쭈욱 입맛에 맞는 식당을 찾아드릴게요!`,
    res: `녹사평역 - 바오바(대만바오)<br>경복궁역 - 후라토식당(규카츠, 반숙오므라이스)<br>잠실역 - 멘야하나비(마제소바)`},

    WOSF: {type: 'WOSF', name: '축구하고 와서 다 맛있는 입맛', country: '남미 어딘가', age1: 20, age2: 28,
    feature: `가리는 게 거의 없으면서도 서구적인 음식 취향을 가진 ${name}님`,
    res: `이태원역 - 바토스(남미)<br>강남역 - 무차초(부리또, 타코)<br>서울대입구역 - 더멜팅팟(수제버거)`},

    WOMF: {type: 'WOMF', name: '내가 바로 국적 불명의 막입', country: '???', age1: 21, age2: 34,
    feature: `눈감고 콜라 사이다 구분 못할거 같은 타입`,
    res: `한티역 - 파이어벨(버거)<br>강남역 - 브라더후드키친(치킨와플)`},

    WLMF: {type: 'WLMF', name: '미국초딩 입맛', country: '미국', age1: 5, age2: 8,
    feature: `초딩 때 멈춘 입맛으로 몸만 커버린 당신.`,
    res: `홍대입구역 - 버터밀크(팬케이크)<br>석촌역 - 그리지하우스(함박스테이크)<br>종각역 - 후니도니(치즈돈까스)`},

    WLSF: {type: 'WLSF', name: '샨티 샨티 카레카레야', country: '세계음식', age1: 33, age2: 39,
    feature: `이국적인 음식 취향을 가진 까다로운 ${name}님의 취향을 고르고 골라 독특한 음식점을 몇 개 가져와봤어요!`,
    res: `이태원역 - 브라이리퍼블릭(남아공음식)<br>종로3가역 -  포탈라(인도)`},

    WOSP: {type: 'WOSP', name: '영국의 푸드 네비게이터', country: '영국', age1: 37, age2: 43,
    feature: `맛집 불모지라는 영국에서도 꿋꿋하게 최고의 음식을 찾아내는 능력을 가진, 서구적인 입맛의 당신!<br>같은 피자 파스타라도 차원이 다른 곳을 원하는 당신을 위해 몇 군데 추천드려요!`,
    res: `녹사평역 - 매니멀스모크하우스(바비큐플래터)<br>강남역 - 브릭오븐(피자)<br>내방역 - 도우룸(파인다이닝)`},

    WOMP: {type: 'WOMP', name: '프랑스 달팽이 수집가 입맛', country: '프랑스', age1: 37, age2: 43,
    feature: ``,
    res: `홍대입구역 - 다엔조(뇨끼)<br>석촌역 - 엘리스리틀이태리(이탈리안)`},

    WLMP: {type: 'WLMP', name: '신선한 초원의 소녀입맛', country: '뉴질랜드', age1: 36, age2: 41,
    feature: `직접 짠 신선한 치즈와 산 속 이슬을 받은 채소의 프레쉬하다 못해 쌩쌩한 웰빙스러우면서도 너무너무 맛있는 맛집을 골라봤어요!`,
    res: `석촌역 - 뉴질랜드스토리(브런치)<br>이태원-썬댄스플레이스(오픈샌드위치, 카츠산도)<br>신사역 - 더닐크팩토리(비건케이크)`},

    WLSP: {type: 'WLSP', name: '화끈한 투우사 입맛', country: '스페인', age1: 29, age2: 35,
    feature: `자극적이면서도 꽤나 까다로운 ${name}님의 입맛을 저격하는 맛집을 찾아봤어요.`,
    res: `신논현역 - 3MK(스페인)<br>녹사평역 - 페트라(중동음식)<br>한강진역 - 티그레 세비체리아(페루)`},
  }
  return MBTI_info[type];
};

class Food_MBTI {
  constructor(value, socket, user_data) {
    let key = value;
    if (key.startsWith('MBTI1_')) {
      key = 'MBTI1';
    } else if (key.includes('/')) {
      key = key.split('/')[0];
    } else if (!key.startsWith('MBTI')) {     // 이름 입력했을때
      key = 'MBTI0_1';
    }

    this.strategies = {
      'MBTI0': this.MBTI0__start,
      'MBTI0_1': this.MBTI0_1,
      'MBTI1': this.MBTI1,
      'MBTI2': this.MBTI2,
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
        const chlist = ['안녕안녕 반가워! 나는 사람들의 행복한 외식라이프를 도와주는 외식코기야🍜🍖'];
        const emojilist = ['emoji/hello.png', 'emoji/hello2.png', 'emoji/hello3.png', 'emoji/hello4.png'];
        await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist));
        setTimeout(async () => { await index.sendSocketMessage(socket.id, 'chat message button', '넌 이름이 뭐야??😆😆'); })
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
        stack = [];
        const chlist = [`반가워 ${name} ! 오늘은 21가지 질문을 통해 너의 미각유형검사, 일명 Food-MBTI(!!!)을 파악해볼게. 이걸 찾고 나면 너가 좋아할만한 식당도 몇 개 알려줄 수 있어~
                        어때 재밌겠지 궁금하지?? 어서 해보자!🐕🐕🐕`];
        index.sendSocketMessage(socket.id, 'chat message button', random_pick(chlist), ['MBTI1_1', '고고고!!']);
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
        const idx = parseInt(stage.split('MBTI1_')[1]);
        (choiceToUpdate === 'back') ? stack.pop() : stack.push(choiceToUpdate);
        console.log(`Data in Stack: ${stack}`);
        console.log(`stage: ${stage}, idx: ${idx}`);

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
            [back_button(1), ['MBTI1_3/1', '그렇지 않다'], ['MBTI1_3/2', '보통'], ['MBTI1_3/3', '그렇다']],
            [back_button(2), ['MBTI1_4/1', '(아메리카노 안 마심)'], ['MBTI1_4/2', '가격이 싸서'], ['MBTI1_4/3', '맛있어서/단게 싫어서'], ['MBTI1_4/4', '고칼로리 식사에 대한 회개']],
            [back_button(3), ['MBTI1_5/1', '그렇지 않다'], ['MBTI1_5/2', '보통'], ['MBTI1_5/3', '그렇다']],
            [back_button(4), ['MBTI1_6/1', '그렇지 않다'], ['MBTI1_6/2', '보통'], ['MBTI1_6/3', '그렇다']],
            [back_button(5), ['MBTI1_7/1', '감소한다'], ['MBTI1_7/2', '변화 없음'], ['MBTI1_7/3', '증가한다']],
            [back_button(6), ['MBTI1_8/1', '없다'], ['MBTI1_8/2', '1~2개'], ['MBTI1_8/3', '3개 이상']],
            [back_button(7), ['MBTI1_9/1', '그렇지 않다'], ['MBTI1_9/2', '보통'], ['MBTI1_9/3', '그렇다']],
            [back_button(8), ['MBTI1_10/1', '라면'], ['MBTI1_10/2', '파스타']],
            [back_button(9), ['MBTI1_11/1', '뼈'], ['MBTI1_11/2', '순살']],
            [back_button(10), ['MBTI1_12/1', '그렇지 않다'], ['MBTI1_12/2', '보통'], ['MBTI1_12/3', '그렇다']],
            [back_button(11), ['MBTI1_13/1', '그렇지 않다'], ['MBTI1_13/2', '보통'], ['MBTI1_13/3', '그렇다']],
            [back_button(12), ['MBTI1_14/1', '그렇지 않다'], ['MBTI1_14/2', '보통'], ['MBTI1_14/3', '그렇다']],
            [back_button(13), ['MBTI1_15/1', '그렇지 않다'], ['MBTI1_15/2', '보통 (안 해봤지만 먹을 수 있을듯)'], ['MBTI1_15/3', '그렇다']],
            [back_button(14), ['MBTI1_16/1', '없다'], ['MBTI1_16/2', '1~4명'], ['MBTI1_16/3', '5명 이상']],
            [back_button(15), ['MBTI1_17/1', '그렇지 않다'], ['MBTI1_17/2', '보통'], ['MBTI1_17/3', '그렇다']],
            [back_button(16), ['MBTI1_18/1', '그렇지 않다'], ['MBTI1_18/2', '보통'], ['MBTI1_18/3', '그렇다']],
            [back_button(17), ['MBTI1_19/1', '그렇지 않다'], ['MBTI1_19/2', '보통'], ['MBTI1_19/3', '그렇다']],
            [back_button(18), ['MBTI1_20/1', '그렇지 않다'], ['MBTI1_20/2', '가끔'], ['MBTI1_20/3', '자주']],
            [back_button(19), ['MBTI1_21/1', '그렇지 않다'], ['MBTI1_21/2', '가끔'], ['MBTI1_21/3', '자주']],
            [back_button(20), ['MBTI2/1', '그렇지 않다'], ['MBTI2/2', '가끔'], ['MBTI2/3', '자주']],
          ]
        };

        index.sendSocketMessage(socket.id, 'chat message button', contents.question[idx], ...contents.button[idx]);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

  MBTI2(value, socket, user_data) {
    (async function () {
      try {
        console.log("value >> ", value);
        const choiceToUpdate = value.split('/')[1];
        stack.push(choiceToUpdate);
        console.log(`Data in Stack: ${stack}`);
        // 점수 계산 -> mbti_type 계산
        const [E,O,S,P] = SumEOSP(stack);
        console.log(E,O,S,P);
        const type = EOSPtoType(E, O, S, P);
        console.log(type);
        const mbti_info = get_MBTI_info(type, name);
        console.log(mbti_info);

        const chlist = ['기 다 료 방', '두구두구두구...', '열씨미 계산중🐕🐕'];
        const emojilist = ['emoji/calculate.png', 'emoji/calculate2.png', 'emoji/letmesee.PNG'];
        await index.sendSocketMessage(socket.id, 'chat message button', `고생했어!!! 과연 ${name}의 미각 유형은?!`);
        await index.sendSocketMessage(socket.id, 'chat message button image', random_pick(chlist), random_pick(emojilist));
        await index.sendSocketMessage(socket.id, 'chat message loader', 400);
        await index.sendSocketMessage(socket.id, 'chat message button link', `<center>${name}님의 미각유형<br>
                                                                         <i><u>${mbti_info.name}</u></i></center><hr>
                                                                         <u>입맛국적:</u> ${mbti_info.country}<br>
                                                                         <u>입맛나이:</u> ${random_num(mbti_info.age1, mbti_info.age2)}세<br>
                                                                         <u>특징:</u> ${mbti_info.feature}<br>
                                                                         <u>서울 내 추천 식당:</u><br>${mbti_info.res}`,
                                                                        ['button_link', '외식코기로 메뉴결정장애 뿌시기']);
      } catch (e) {
        index.sendSocketMessage(socket.id, 'chat message button', error_msg, get_started_button);
        console.log(e);
      }
    }());
  }

}

module.exports = Food_MBTI;
