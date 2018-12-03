/* jshint node: true, devel: true */
'use strict';

const info = require('../../api/info_update'),
      index = require('../../server/index'),
      async = require('async'),
      moment = require('moment'),

      info_update = new info();

class Decide_menu {
  constructor(value,socket,user_data) {
      let key;
      key = value;
      if(user_data.state ==='decide_menu'){
        key = 'exitnum';
      }else if(key.includes('exit/') || key === '서울 어디든 좋아'){
        key = 'mood';
      }else if(key.includes('mood/')){
        key = 'before_decide';
      }else if(key.includes('semi_final1/')){
        key = 'semi_final2';
      }else if(key.includes('semi_final2/')){
        key = 'before_final';
      }else if(key.includes('final/')){
        key = 'final';
      }else if(key.includes('final_direct/')){
        key = 'final_direct';
      }

      this.strategies = {
          'exitnum': this.exitnum,
          'mood': this.mood,
          'mood2': this.mood2,
          'before_decide': this.before_decide,
          'semi_final1': this.semi_final1,
          'semi_final2': this.semi_final2,
          'before_final': this.before_final,
          'decide_final': this.decide_final,
          'decide_final_direct': this.decide_final_direct,
          'final': this.final,
          'final_direct': this.final_direct,
          'final_info_direct': this.final_info_direct,
          'show_image': this.show_image
      };
      this.execute(key,value,socket,user_data);

  }

    execute(key,value,socket,user_data) {
        this.update_state(socket.id,'1',key);
        this.strategies[key] == null ? console.log("this strategy does not exist") : this.strategies[key](value,socket,user_data);
    }

    update_state(id, scenario, state){
      info_update.profile.update_state(id, scenario, state, function (err) {
          if(err){
              console.log("에러 : " + err);
              return err;
          }else{
          return;
        }
      });
    }

    exitnum(value,socket,user_data) {

      let subway = '';
      if(value.slice(-1) !== '역'){
        value = value+'역';
      }
      info_update.food.verify_subway(socket.id, value, function (error, verify_value) {
          if(error){
              console.log("에러 : " + error);
              return error;
          }else{
            if(verify_value.result === 'success'){
              info_update.profile.update_subway(socket.id, value, function (error) {
                  if(error){
                      console.log("에러 : " + error);
                      return error;
                  }
                  return;
              });
              switch (value) {
                case '강남역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['gangnamexit/4','1,2,3,4번'],['gangnamexit/3','5,6,7,8번'],['gangnamexit/2','9,10번'],['gangnamexit/1','11,12번'],['gangnamexit/999','상관없어']);
                break;
                case '서울대입구역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['seoulunivexit/4','1,2번'],['seoulunivexit/3','3,4번'],['seoulunivexit/2','5,6번'],['seoulunivexit/1','7,8번'],['seoulunivexit/999','상관없어']);
                break;
                case '성수역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['seongsuexit/2','1번'],['seongsuexit/1','2번'],['seongsuexit/4','3번'],['seongsuexit/3','4번'],['seongsuexit/999','상관없어']);
                break;
                case '신사역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['sinsaexit/4','1,2,3번'],['sinsaexit/3','4번'],['sinsaexit/2','5번'],['sinsaexit/1','6,7,8(가로수길)번'],['sinsaexit/999','상관없어']);
                break;
                case '신촌역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['sinchonexit/2','1,2번'],['sinchonexit/1','3,4번'],['sinchonexit/4','5,6번'],['sinchonexit/3','7,8번'],['sinchonexit/999','상관없어']);
                break;
                case '서면역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['seomyeonexit/3','1,3,5,7번'],['seomyeonexit/4','2,4,6번'],['seomyeonexit/1','8,10,12번'],['seomyeonexit/2','9,11,13,15번'],['seomyeonexit/999','상관없어']);
                break;
                case '센텀시티역':
                  index.sendSocketMessage(socket.id, 'chat message button', value +' 몇 번 출구?',['centumcityexit/4','1,3,5번'],['centumcityexit/1','2,4,6,8번'],['centumcityexit/3','7,9,11,13번'],['centumcityexit/2','10,12번'],['centumcityexit/999','상관없어']);
                break;
              }
            }else{
              index.sendSocketMessage(socket.id, 'chat message button', value+' 맛집을 아직 잘 모르겠어... 다시 선택해줘!');
            }
          }
          return;
      });
    }

    mood(value,socket,user_data) {
      if(value.includes('exit/')){
      let user_quarter = parseInt(value.split('/')[1]);
      info_update.profile.update_exit_quarter(socket.id, user_quarter, function (error) {
          if(error){
              console.log("에러 : " + error);
              return error;
          }
          return;
      });
      }
      let mood_list = [ '오늘은 밥 누구랑 먹어?',
          '무슨 약속이야?',
          '어떤 약속이야?',
          '누구랑 먹는거야?',
          '나는 결정장애를 위해 존재하지. 밥 누구랑 먹어?',
          '요새 사람들중에 80%가 결정장애래. 너만 그런거 아니니까 걱정마 ㅋㅋㅋ 밥 누구랑 먹게?',
          '누구랑 먹는지에 따라 추천이 달라져! 누구랑 먹어?',
          '같이 밥 먹는 사람이 누구야?(꺄아)',
          '누구랑 밥 먹는거야?',
          '지금 누구랑 밥 먹어?ㅎㅎ'];
      let mood_leng = mood_list.length;
      let mood_rand = Math.floor(mood_leng * Math.random());

      //예전 버젼
      // index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand],['workmood','직장/비즈니스'],['datemood','데이트'],['friendsum','친구랑 약속'],['family_mood','가족외식'],['alone_mood','혼밥']);

      index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand],['mood/초저렴','초저렴 한끼'],['mood/캐주얼','캐주얼한 식사'],['mood2','친구 or 애인과의 약속']);
    }

    mood2(value,socket,user_data) {
      info_update.profile.update_with_mood(socket.id, '약속', function (error) {
          if(error){
              console.log("에러 : " + error);
              return error;
          }
          return;
      });
      let mood_list = [ '오늘은 밥 누구랑 먹어?',
          '무슨 약속이야?',
          '어떤 약속이야?',
          '누구랑 먹는거야?',
          '나는 결정장애를 위해 존재하지. 밥 누구랑 먹어?',
          '요새 사람들중에 80%가 결정장애래. 너만 그런거 아니니까 걱정마 ㅋㅋㅋ 밥 누구랑 먹게?',
          '누구랑 먹는지에 따라 추천이 달라져! 누구랑 먹어?',
          '같이 밥 먹는 사람이 누구야?(꺄아)',
          '누구랑 밥 먹는거야?',
          '지금 누구랑 밥 먹어?ㅎㅎ'];
      let mood_leng = mood_list.length;
      let mood_rand = Math.floor(mood_leng * Math.random());

      index.sendSocketMessage(socket.id, 'chat message button', mood_list[mood_rand],['mood/초저렴','초저렴 한끼'],['mood/캐주얼','캐주얼한 식사'],['mood/약속','친구 or 애인과의 약속']);
    }

    before_decide(value,socket,user_data) {
      let user_mood = value.split('/')[1];
        async.waterfall([
        function(callback) {
            info_update.profile.update_with_mood(socket.id, user_mood, function (error) {
                if(error){
                    return callback(error);
                }
                return callback(null);
            });
        },
        function(callback) {
          let user_allergy = 'x';
          info_update.food.get_restaurant(socket.id, user_data.subway, user_data.exit_quarter, user_mood, user_allergy, function(error, value, comment){
            if(error){
              return callback(error);
            }else{
              callback(null, value.length, value, comment);
              return;
            }
          });
        }
      ], function (err, length, value, comment) {
        if(err){
          console.log('Error :' + err);
        }
        switch (length) {
          case 0:
          index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 식당이 없어요....ㅠ<br>다시 해주세요....',['get_started','처음으로 돌아가기']);
          break;

          case 1:
            info_update.profile.update_rest_final(user_data.kakao_id, value[0].id, function (error) {
                if(error){
                    return error;
                }
                //TODO 하나만 나온거
                index.sendSocketMessage(socket.id, 'chat message button', '조건에 맞는 음식점이 하나밖예 없는데... 이거라도 보여줄까...?',['final_info_direct','볼래!'],['get_started','처음으로 돌아가기']);
                return;
            });
          break;

          case 2: case 3:
            info_update.profile.update_limit_cnt(user_data.kakao_id, (user_data.limit_cnt+1), function (error) {
                if(error){
                    console.log(error);
                    return error;
                }
                return ;
            });
            info_update.profile.update_rest_only2(user_data.kakao_id, value[0].id, value[1].id, function (error) {
                if(error){
                    return error;
                }
                index.sendSocketMessage(socket.id, 'chat message button', '2곳을 골라줄테니까 한 번 골라봐!',['decide_final_direct','고고'],['get_started','안할래']);
                return;
            });
          break;

          case 4:
            info_update.profile.update_limit_cnt(user_data.kakao_id, (user_data.limit_cnt+1), function (error) {
                if(error){
                    console.log(error);
                    return error;
                }
                return ;
            });
            info_update.profile.update_rest4(user_data.kakao_id, value[0].id, value[1].id, value[2].id, value[3].id, function (error) {
                if(error){
                    return error;
                }
                index.sendSocketMessage(socket.id, 'chat message button', comment,['semi_final1','고고'],['get_started','안할래']);
                return;
            });
          break;
        }
      });
    }

    semi_final1(value,socket,user_data) {
      info_update.food.get_two_restaurant(socket.id, user_data.rest1, user_data.rest2, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else{
          let first_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
          let second_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[1].subway + ' ' + value[1].res_name;
          let first_map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';
          let second_map_url = 'https://map.naver.com/index.nhn?query='+value[1].subway + ' ' + value[1].res_name+'&tab=1';

          info_update.food.crawl_two_image(socket.id, (value[0].subway.slice(0,-1))+' '+value[0].res_name, (value[1].subway.slice(0,-1))+' '+value[1].res_name, function(error, image){
            if(error){
              index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              console.log("에러 : " + error);
              return error;
            }else{
              if(image.res1 === 'no image'){
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 1<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card no image', ['semi_final1/1',value[0].res_name],['semi_final1/2',value[1].res_name],['semi_final1/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url]);
              }else{
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 1<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card', ['semi_final1/1',value[0].res_name],['semi_final1/2',value[1].res_name],['semi_final1/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url, image.res1[0],image.res1[1],image.res1[2]],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url,image.res2[0],image.res2[1],image.res2[2]]);
                return;
              }
            }
          });
          return ;
        }
      });
    }

    semi_final2(value,socket,user_data) {
      let semi_final1_value;
      let user_select = parseInt(value.split('/')[1]);

      switch (user_select) {
        case 1:
          info_update.profile.update_rest5(socket.id, user_data.rest1, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          semi_final1_value = user_data.rest1;
        break;
        case 2:
          info_update.profile.update_rest5(socket.id, user_data.rest2, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          semi_final1_value = user_data.rest2;
        break;
        case 3:
          let user_select_value = [user_data.rest1, user_data.rest2];
          let rand_select = Math.floor(user_select_value.length * Math.random());
          semi_final1_value = user_select_value[rand_select];
          info_update.profile.update_rest5(socket.id, user_select_value[rand_select], function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]), function(err, val){
            if(err){
              console.log(err);
              return err;
            }else{
              index.sendSocketMessage(socket.id, 'chat message button', '챗봇의 선택 : '+val[0].res_name);
              return;
            }
            });
        break;
      }

      info_update.food.get_two_restaurant(socket.id, semi_final1_value, user_data.rest3, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else{
          let first_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
          let second_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[1].subway + ' ' + value[1].res_name;
          let first_map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';
          let second_map_url = 'https://map.naver.com/index.nhn?query='+value[1].subway + ' ' + value[1].res_name+'&tab=1';


          info_update.food.crawl_two_image(socket.id, (value[0].subway.slice(0,-1))+' '+value[0].res_name, (value[1].subway.slice(0,-1))+' '+value[1].res_name, function(error, image){
            if(error){
              index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              console.log("에러 : " + error);
              return error;
            }else{
              if(image.res1 === 'no image'){
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 2<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card no image', ['semi_final1/1',value[0].res_name],['semi_final1/2',value[1].res_name],['semi_final1/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url]);
              }else{
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 2<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card', ['semi_final2/1',value[0].res_name],['semi_final2/2',value[1].res_name],['semi_final2/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url, image.res1[0],image.res1[1],image.res1[2]],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url,image.res2[0],image.res2[1],image.res2[2]]);
                return;
              }
            }
          });
          return ;
        }
      });
    }

    before_final(value,socket,user_data) {
      let semi_final2_value;
      let user_select = parseInt(value.split('/')[1]);

      switch (user_select) {
        case 1:
          info_update.profile.update_rest6(socket.id, user_data.rest5, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          semi_final2_value = user_data.rest5;
        break;
        case 2:
          info_update.profile.update_rest6(socket.id, user_data.rest3, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          semi_final2_value = user_data.rest3;
        break;
        case 3:
          let user_select_value = [user_data.rest5, user_data.rest3];
          let rand_select = Math.floor(user_select_value.length * Math.random());
          semi_final2_value = user_select_value[rand_select];
          info_update.profile.update_rest6(socket.id, user_select_value[rand_select], function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]), function(err, val){
            if(err){
              console.log(err);
              return err;
            }else{
              index.sendSocketMessage(socket.id, 'chat message button', '챗봇의 선택 : '+val[0].res_name);
              return;
            }
            });
        break;
      }

      setTimeout(function() {
        index.sendSocketMessage(socket.id, 'chat message button', '대망의 결승전 고고?' ,['decide_final','고고'],['get_started','처음으로 돌아가기']);
      }, 300);
    }

    decide_final(value,socket,user_data) {
      info_update.food.get_two_restaurant(socket.id, user_data.rest6, user_data.rest4, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else{
          let first_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
          let second_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[1].subway + ' ' + value[1].res_name;
          let first_map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';
          let second_map_url = 'https://map.naver.com/index.nhn?query='+value[1].subway + ' ' + value[1].res_name+'&tab=1';


          info_update.food.crawl_two_image(socket.id, (value[0].subway.slice(0,-1))+' '+value[0].res_name, (value[1].subway.slice(0,-1))+' '+value[1].res_name, function(error, image){
            if(error){
              index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              console.log("에러 : " + error);
              return error;
            }else{
              if(image.res1 === 'no image'){
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 3<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card no image', ['semi_final1/1',value[0].res_name],['semi_final1/2',value[1].res_name],['semi_final1/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url]);
              }else{
                index.sendSocketMessage(socket.id, 'chat message button', 'Round 3<br>2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card', ['final/1',value[0].res_name],['final/2',value[1].res_name],['final/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name,first_url,first_map_url,image.res1[0],image.res1[1],image.res1[2]],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url,image.res2[0],image.res2[1],image.res2[2]]);
                return;
              }
            }
          });
          return ;
        }
      });
    }

    decide_final_direct(value,socket,user_data) {
      info_update.food.get_two_restaurant(socket.id, user_data.rest6, user_data.rest4, function(error, value){
        if(error){
          console.log("에러 : " + error);
          throw error;
        }else{
          let first_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
          let second_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[1].subway + ' ' + value[1].res_name;
          let first_map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';
          let second_map_url = 'https://map.naver.com/index.nhn?query='+value[1].subway + ' ' + value[1].res_name+'&tab=1';


          info_update.food.crawl_two_image(socket.id, (value[0].subway.slice(0,-1))+' '+value[0].res_name, (value[1].subway.slice(0,-1))+' '+value[1].res_name, function(error, image){
            if(error){
              index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              console.log("에러 : " + error);
              return error;
            }else{
              if(image.res1 === 'no image'){
                index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card no image', ['semi_final1/1',value[0].res_name],['semi_final1/2',value[1].res_name],['semi_final1/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name, first_url, first_map_url],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url]);
              }else{
                index.sendSocketMessage(socket.id, 'chat message button', '2개 음식점중 더 가고싶은 곳을 골라줘!');
                index.sendSocketMessage(socket.id, 'chat message card', ['final_direct/1',value[0].res_name],['final_direct/2',value[1].res_name],['final_direct/3','챗봇이 골라주기'],[value[0].res_name,value[0].food_type,value[0].food_name,first_url,first_map_url,image.res1[0],image.res1[1],image.res1[2]],[value[1].res_name,value[1].food_type,value[1].food_name,second_url,second_map_url,image.res2[0],image.res2[1],image.res2[2]]);
                return;
              }
            }
          });
          return ;
        }
      });
    }

    final(value,socket,user_data) {
      let user_select = parseInt(value.split('/')[1]);
      let final_value;

      switch (user_select) {
        case 1:
          info_update.profile.update_rest_final(socket.id, user_data.rest6, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          final_value = user_data.rest6;
        break;
        case 2:
          info_update.profile.update_rest_final(socket.id, user_data.rest4, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          final_value = user_data.rest4;
        break;
        case 3:
          let user_select_value = [user_data.rest6, user_data.rest4];
          let rand_select = Math.floor(user_select_value.length * Math.random());

          info_update.profile.update_rest_final(socket.id, user_select_value[rand_select], function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              }
              return;
          });
          info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]), function(err, val){
            if(err){
              console.log(err);
              return err;
            }else{
              index.sendSocketMessage(socket.id, 'chat message button', '챗봇의 선택 : '+val[0].res_name);
              return;
            }
            });
          final_value = user_select_value[rand_select];
        break;
      }

      info_update.food.get_restaurant_info(socket.id, final_value, function(error, value){
        if(error){
          console.log("에러 : " + error);
          return error;
        }else{
          info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, user_data.rest3, user_data.rest4, user_data.rest5, user_data.rest6, final_value, value[0].res_name, value[0].subway, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              } else {
                  let naver_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
                  let map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';

                  if(moment().format('HH') >= 10 && moment().format('HH') <= 15 && value[0].lunch_option === 1){
                    index.sendSocketMessage(socket.id, 'chat message button', '오늘의 선택: ' + value[0].res_name + '<br>' + value[0].subway + '에 있는 ' + value[0].food_name + '을 파는 ' + value[0].food_type + '집이야!<br>(런치메뉴 있음)'+
                    '<hr class="link-line"><a href="'+naver_url+'" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>', ['show_image','사진 보기'],['후기 보기','후기 보기'],
                    ['decide_final','결승전 다시하기'],['get_started','처음으로 돌아가기']);
                  }else{
                    index.sendSocketMessage(socket.id, 'chat message button', '오늘의 선택: ' + value[0].res_name + '<br>' + value[0].subway + '에 있는 ' + value[0].food_name + '을 파는 ' + value[0].food_type + '집이야!'+
                    '<hr class="link-line"><a href="'+map_url+'" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="'+naver_url+'" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>', ['show_image','사진 보기'],['후기 보기','후기 보기'],
                    ['decide_final','결승전 다시하기'],['get_started','처음으로 돌아가기']);
                  }
                  return;
              }
          });
        }
      });
    }

    final_direct(value,socket,user_data) {
      let user_select = parseInt(value.split('/')[1]);
      let final_value;
      if(user_select === 1){
        info_update.profile.update_rest_final(socket.id, user_data.rest6, function (error) {
            if(error){
                console.log("에러 : " + error);
                return error;
            }
            return;
        });
        final_value = user_data.rest6;
      }else if(user_select === 2){
        info_update.profile.update_rest_final(socket.id, user_data.rest4, function (error) {
            if(error){
                console.log("에러 : " + error);
                return error;
            }
            return;
        });
        final_value = user_data.rest4;
      }else if(user_select === 3){
        let user_select_value = [user_data.rest6, user_data.rest4];
        let rand_select = Math.floor(user_select_value.length * Math.random());

        info_update.profile.update_rest_final(socket.id, user_select_value[rand_select], function (error) {
            if(error){
                console.log("에러 : " + error);
                return error;
            }
            return;
        });
        info_update.food.get_restaurant_info(socket.id, parseInt(user_select_value[rand_select]), function(err, val){
          if(err){
            console.log(err);
            return err;
          }else{
            index.sendSocketMessage(socket.id, 'chat message button', '챗봇의 선택 : '+val[0].res_name);
            return;
          }
          });
        final_value = user_select_value[rand_select];
      }
      info_update.food.get_restaurant_info(socket.id, final_value, function(error, value){
        if(error){
          console.log("에러 : " + error);
          return error;
        }else{
          info_update.profile.create_decide_history(socket.id, user_data.rest1, user_data.rest2, user_data.rest3, user_data.rest4, user_data.rest5, user_data.rest6, final_value, value[0].res_name, value[0].subway, function (error) {
              if(error){
                  console.log("에러 : " + error);
                  return error;
              } else {
                  let naver_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
                  let map_url = 'https://map.naver.com/index.nhn?query='+value[0].subway + ' ' + value[0].res_name+'&tab=1';

                  if(moment().format('HH') >= 10 && moment().format('HH') <= 15 && value[0].lunch_option === 1){
                    index.sendSocketMessage(socket.id, 'chat message button', '오늘의 선택: ' + value[0].res_name + '<br>' + value[0].subway + '에 있는 ' + value[0].food_name + '을 파는 ' + value[0].food_type + '집이야!<br>(런치메뉴 있음)'+
                    '<hr class="link-line"><a href="'+naver_url+'" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>', ['show_image','사진 보기'],['후기 보기','후기 보기'],
                    ['decide_final_direct','결승전 다시하기'],['get_started','처음으로 돌아가기']);
                  }else{
                    index.sendSocketMessage(socket.id, 'chat message button', '오늘의 선택: ' + value[0].res_name + '<br>' + value[0].subway + '에 있는 ' + value[0].food_name + '을 파는 ' + value[0].food_type + '집이야!'+
                    '<hr class="link-line"><a href="'+map_url+'" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a><br><a href="'+naver_url+'" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>', ['show_image','사진 보기'],['후기 보기','후기 보기'],
                    ['decide_final_direct','결승전 다시하기'],['get_started','처음으로 돌아가기']);
                  }
                  return;
              }
          });
        }
      });
    }

    final_info_direct(value,socket,user_data) {
      info_update.food.get_restaurant_info(socket.id, user_data.rest_final, function(error, value){
        if(error){
          console.log("에러 : " + error);
          return error;
        }else{
          let naver_url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=' + value[0].subway + ' ' + value[0].res_name;
          index.sendSocketMessage(socket.id, 'chat message button', '오늘의 선택: ' + value[0].res_name + '<br>' + value[0].subway + '에 있는 ' + value[0].food_name + '을 파는 ' + value[0].food_type + '집이야!'+
          '<hr class="link-line"><a href="'+naver_url+'" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a>', ['show_image','사진 보기'],['후기 보기','후기 보기'],
          ['decide_final','결승전 다시하기'],['get_started','처음으로 돌아가기']);
          return;
        }
      });
    }

    show_image(value,socket,user_data) {
      info_update.food.get_restaurant_info(socket.id, user_data.rest_final, function(error, value){
        if(error){
          console.log("에러 : " + error);
          return error;
        }else{
          info_update.food.crawl_image(socket.id, (value[0].subway.slice(0,-1))+' '+value[0].res_name, function(error, image){
            if(error){
              index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              console.log("에러 : " + error);
              return error;
            }else{
              if(image.res1 === 'no image'){
                index.sendSocketMessage(socket.id, 'chat message button', '아직 '+ value[0].subway + ' '+ value[0].res_name+'에 대한 사진이 없어요..ㅠㅠㅠ' ,['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기']);
              }else{
              image = image.res1;
              index.sendSocketMessage(socket.id, 'chat message image','사진만 봐도 가고싶지 않나요~~~?',['final_info_direct','돌아가기'],['get_started','처음으로 돌아가기'],image[0],image.length,image.splice(1));
              return;
              }
            }
          });
          return;
        }
      });
    }

}

module.exports = Decide_menu;
