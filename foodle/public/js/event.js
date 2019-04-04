function getToday() {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const date = new Date().getDate();
  let day;
  switch (new Date().getDay()) {
    case 0:
      day = '일요일';
      break;
    case 1:
      day = '월요일';
      break;
    case 2:
      day = '화요일';
      break;
    case 3:
      day = '수요일';
      break;
    case 4:
      day = '목요일';
      break;
    case 5:
      day = '금요일';
      break;
    case 6:
      day = '토요일';
      break;
  }
  return `${year}년  ${month}월  ${date}일  ${day}`;
}

function getTime() {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) {
    date = `오후 ${hour % 12}:0${min}`;
  } else {
    date = `오후 ${hour % 12}:${min}`;
  }
  return date;
}

function bot_messaging(message) {
  let message_info = `<div class="bot-message">
      <div class="message-text">
          ${message}
      </div>
  </div>
  `;
  return (message_info);
}

function bot_messaging_image(image) {
  let message_info = `<div class="bot-message">
          <img class="img-fluid rest-img" src="${image}"></img>
      </div>
  `;
  return (message_info);
}

function bot_messaging_image_carousel(image) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  const message_info = `<div class="bot-message">
        <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
          <div class="carousel-inner">
            <div class="carousel-item active">
            <img class="d-block w-100 rest-img" src="${image}" alt="First slide">
            </div>
          </div>
          <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
            <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
  `;
  return (message_info);
}

function carousel_inner(image) {
  const message_info = `
  <div class="carousel-item">
                <img class="d-block w-100 rest-img" src="${image}" alt="slide">
  </div>
  `;
  return (message_info);
}

function bot_messaging_button(button_id, message) {
  const message_info = `
          <button type="button" class="messaging-button" id="${button_id}" name="${message}">${message}</button>
  `;
  return (message_info);
}

function bot_messaging_button_finish_checkbox(button_id, message) {
  const message_info = `
          <br><button type="button" class="messaging-button complete-button" id="${button_id}" name="${message}">${message}</button>
  `;
  return (message_info);
}

function bot_messaging_button_checkbox(button_id, message) {
  let message_info = `
        <button type="button" class="messaging-button-checkbox" id="${button_id}" name="${message}"><input type="checkbox" id="${button_id}" class="checkbox" name="${message}"></input>${message}</button>
  `;
  return (message_info);
}

// TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
function user_list_update(id) {
  const message_info = `
  <p class="user_id">${id}</p>
  `;
  return (message_info);
}


function user_messaging(message) {
  let date = getTime();
  const message_info = `<div class="user-message">
      <div class="message-info">
          <span class="time">${date}</span>
      </div>
      <div class="message-text">
        ${message}
      </div>
  </div>
`;
  return (message_info);
}

function bot_messaging_card(res_name, res_type, food_name, naver_url, map_url, image, image2, image3) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  let message_info = `<div class="bot-message">
            <div class="choice_carousel">
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              <div class="choice_card_content">
                <h5 class="card-title">${res_name}</h5>
                <p class="card-text">${res_type} / ${food_name}</p>
                <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
              </div>
            </div>
          </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `<div class="bot-message">
              <div class="choice_carousel">
                <div class="choice_card">
                  <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="rest-img" src="${image}" alt="First slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image2}" alt="slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image3}" alt="slide">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                      <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
            </div>
        `;
  }
  return (message_info);
}

function bot_messaging_card_distance(res_name, res_type, food_name, naver_url, map_url, image, image2, image3, distance) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  let message_info = `<div class="bot-message">
            <div class="choice_carousel">
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
              <div class="choice_card_content">
                <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                <p class="card-text">${res_type} / ${food_name}</p>
                <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
              </div>
            </div>
          </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `<div class="bot-message">
              <div class="choice_carousel">
                <div class="choice_card">
                  <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="rest-img" src="${image}" alt="First slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image2}" alt="slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image3}" alt="slide">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                      <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                  <p class="card-text">${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
            </div>
        `;
  }
  return (message_info);
}

function bot_messaging_card_inner(res_name, res_type, food_name, naver_url, map_url, image, image2, image3) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  let message_info = `
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `
                <div class="choice_card">
                  <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="rest-img" src="${image}" alt="First slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image2}" alt="slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image3}" alt="slide">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                      <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
        `;
  }
  return (message_info);
}

function bot_messaging_card_inner_distance(res_name, res_type, food_name, naver_url, map_url, image, image2, image3, distance) {
  const carousel_id = `carousel${String(Math.floor(Math.random() * 10000) + 1)}`;
  let message_info = `
              <div class="choice_card">
                <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img class="rest-img" src="${image}" alt="First slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image2}" alt="slide">
                    </div>
                    <div class="carousel-item">
                      <img class="rest-img" src="${image3}" alt="slide">
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                    <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `
                <div class="choice_card">
                  <div id="${carousel_id}" class="carousel slide" data-ride="carousel" data-wrap="false">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img class="rest-img" src="${image}" alt="First slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image2}" alt="slide">
                      </div>
                      <div class="carousel-item">
                        <img class="rest-img" src="${image3}" alt="slide">
                      </div>
                    </div>
                    <a class="carousel-control-prev" href="#${carousel_id}" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                    </a>
                      <a class="carousel-control-next" href="#${carousel_id}" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                    </a>
                  </div>
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
        `;
  }
  return (message_info);
}

function bot_messaging_card_no_image(res_name, res_type, food_name, naver_url, map_url) {
  let message_info = `<div class="bot-message">
            <button type="button" class="btn btn-light arrow-left"><</button>
            <button type="button" class="btn btn-light arrow-right">></button>
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
          </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `<div class="bot-message">
              <button type="button" class="btn btn-light arrow-left"><</button>
              <button type="button" class="btn btn-light arrow-right">></button>
                <div class="choice_card">
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
            </div>
        `;
  }
  return (message_info);
}
function bot_messaging_card_no_image_distance(res_name, res_type, food_name, naver_url, map_url, distance) {
  let message_info = `<div class="bot-message">
            <button type="button" class="btn btn-light arrow-left"><</button>
            <button type="button" class="btn btn-light arrow-right">></button>
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
          </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `<div class="bot-message">
              <button type="button" class="btn btn-light arrow-left"><</button>
              <button type="button" class="btn btn-light arrow-right">></button>
                <div class="choice_card">
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
            </div>
        `;
  }
  return (message_info);
}

function bot_messaging_card_inner_no_image(res_name, res_type, food_name, naver_url, map_url) {
  let message_info = `
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `
                <div class="choice_card">
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
        `;
  }
  return (message_info);
}
function bot_messaging_card_inner_no_image_distance(res_name, res_type, food_name, naver_url, map_url, distance) {
  let message_info = `
              <div class="choice_card">
                <div class="choice_card_content">
                  <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                  <p class="card-text">${res_type} / ${food_name}</p>
                  <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                  <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                </div>
              </div>
      `;
  if (res_type === null || res_type === undefined) {
    message_info = `
                <div class="choice_card">
                  <div class="choice_card_content">
                    <h5 class="card-title">${res_name +' ('+distance+'m)'}</h5>
                    <p class="card-text">${food_name}</p>
                    <p class="card-text"><a href="${map_url}" target="_blank" class="card-link" style="bottom:8%;"><i class="fas fa-map-marked-alt link-icon" style="margin-right: 4px;"></i>지도 보기</a></p>
                    <p class="card-text"><a href="${naver_url}" target="_blank" class="card-link"><i class="fas fa-link link-icon"></i>네이버 검색 결과</a></p>
                  </div>
                </div>
        `;
  }
  return (message_info);
}

function bot_messaging_map(subway, url){
  let roughMap;
  roughMap = `<div>
    <a href= 'http://map.daum.net/link/search/${subway}' target='_blank' ><image class="image" src='${url}' style="width: 300px; height: 200px;"></image></a>
    <p>이미지 클릭시 지도 자세히 보기</p>
  </div> `;
  return roughMap;
}

function bot_messaging_loader(loader_id) {
  let date;
  const hour = new Date().getHours();
  const min = new Date().getMinutes();
  if (hour < 12) {
    if (min < 10) date = `오전 ${hour}:0${min}`;
    else date = `오전 ${hour}:${min}`;
  } else if (hour === 12) {
    if (min < 10) date = `오후 ${hour}:0${min}`;
    else date = `오후 ${hour}:${min}`;
  } else if (min < 10) {
    date = `오후 ${hour % 12}:0${min}`;
  } else {
    date = `오후 ${hour % 12}:${min}`;
  }
  let message_info = `<div class="bot-message">
      <div id="${loader_id}" class="message-text">
        <img class="loader" src="/images/loader.gif" alt="loader"></img>
      </div>
  </div>
  `;
  if ($('.bot-message > .message-info > .time').last().text() === date) {
    if ($('#messages > div:last-child').attr('class') === 'bot-message') {
      message_info = `<div class="bot-message">
          <div id="${loader_id}" class="message-text">
            <img class="loader" src="/images/loader.gif" alt="loader"></img>
          </div>
      </div>
      `;
    }
  }
  return (message_info);
}

// google sdk load
function onLoad () {
  gapi.load('auth2', () => {
      gapi.auth2.init();
  });
}

// google logout
function googleSignOut() {
  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
  });
}

function logout(loginValue) {
  if (loginValue === '0' || loginValue === null) {
    const info = {
      url: "/api/v1/users/logout",
      method: "POST",
      data: {
        'token': sessionStorage.getItem('social_token')
      },
      success: function (res) {
          if (res.success) {
              console.log('logout Request: success!');
              localStorage.clear();
              sessionStorage.clear();
              alert('로그아웃 되었습니다.');
              window.location.replace(window.location.origin);
          } else {
              console.log('logout Request: fail!');
              console.log(res);
              recheckTokenExist("로그아웃");
          }
      },
      error: function (e) {
          console.log('ajax call error: dashboard - LgOutReq');
          if(!navigator.onLine){
              console.log("internet disconnected");
              window.location.reload();
          } else{
              if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                  console.log("check your URL, method(GET/POST)");
                  alert("로그아웃에 실패했습니다.");
              } else if(e.status===403 && e.responseText.includes("No token")){
                  console.log('No token given');
                  window.location.replace(window.location.origin);
              } else {
                  console.log("status: " + e.status+ ", message: " + e.responseText);
                  recheckTokenExist("로그아웃");
              }
          }
      }
    };
    sendTokenReq(info);
  } /*else if (loginValue === '1') {
    console.log('naver logout');
    alert('로그아웃 되었습니다.');
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  } else if (loginValue === '2') {
    console.log('facebook logout');
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  } else if (loginValue === '3') {
    console.log('google logout');
    googleSignOut();
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  }*/
}

function updatePartLog(email, stage) {
    let targetcol;
    if (stage === 'decide_menu') {
      targetcol = 'menu_chat_log';
    } else if (stage === 'decide_drink') {
      targetcol = 'drink_chat_log';
    } else if (stage === 'decide_place') {
      targetcol = 'middle_chat_log';
    }

    let chat_log = $("#messages")[0].innerHTML;
    const latestidx = chat_log.lastIndexOf('<hr>');
    if (chat_log.lastIndexOf('<hr>') !== -1) {
      chat_log = chat_log.slice(latestidx+4) + `<hr>`;
    } else{
      chat_log = chat_log + `<hr>`;
    }
    const info = {
        method: "POST",
        url: '/api/v1/users/update_part_log',
        body: {
            email: email,
            chat_log: chat_log,
            col: targetcol,
        },
        success: function (res) {
            if (res.success){
                console.log("update partlog: success!");
            }else {
                console.log("updatepartlog: fail!");
                console.log(res);
            }
        },
        error: function(e) {
            console.log('ajax call error: signup page - singUpReq');
            if (e.status === 404 && e.responseText.includes("API call URL not found."))
                console.log("check your URL, method(GET/POST)");
            else if ((e.status === 400 && e.responseText.includes("not provided"))
                || (e.status === 500 && e.responseText.includes("Cannot read property"))) {
                console.log("check your parameters");
            } else if (e.status === 0) {
                if (navigator.onLine) {
                    console.log('status : 0');
                } else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            } else {
                console.log('status: ' + e.status + ', message: ' + e.responseText);
            }
            alert(e.responseText);
        }
    };
    sendReq(info);
}

function getPartLog(email, stage) {
    let targetcol;
    if (stage === 'decide_menu') {
      targetcol = 'menu_chat_log';
    } else if (stage === 'decide_drink') {
      targetcol = 'drink_chat_log';
    } else if (stage === 'decide_place') {
      targetcol = 'middle_chat_log';
    } else if (stage === 'decide_cafe') {
      targetcol = 'cafe_chat_log';
    }
    const info = {
        method: "POST",
        url: '/api/v1/users/get_part_log',
        body: {
            email: email,
            col: targetcol,
        },
        success: function (res) {
            if (res.success) {
                console.log("get partlog: success!");
                const init_html = `<br>
                  <div class="bot-message">
                    <div class="message-info">
                        <img class="image" src="/images/logo.png" alt="외식코기" style="width: 30px; height: 30px; border-radius: 50%;">
                        <span class="name">외식코기</span>
                        <span class="time"></span>
                    </div>
                    <div class="message-text">
                        안녕! 나는 결정장애를 치료해주는 음식 결정 챗봇 외식코기야!
                    </div>
                    <br>
                    <div class="message-button">
                        <button type="button" class="messaging-button" id="decide_menu" name="메뉴 고르기">메뉴 고르기</button>
                        <button type="button" class="messaging-button" id="decide_drink" name="술집 고르기">술집 고르기</button>
                       <button type="button" class="messaging-button" id="decide_cafe" name="카페 고르기">카페 고르기</button>
                        <button type="button" class="messaging-button" id="user_feedback" name="개발팀에게 피드백하기">개발팀에게 피드백하기</button>
                        <button type="button" class="messaging-button" id="chitchat" name="외식코기랑 대화하기">코기랑 대화하기</button>
                    </div>
                </div>`;
                //  <button type="button" class="messaging-button" id="decide_place" name="중간지점 찾기(서울)">중간지점 찾기(서울)</button>
                //  <button type="button" class="messaging-button" id="decide_history" name="기록 보기">기록 보기</button>
                //  <button type="button" class="messaging-button" id="chitchat" name="외식코기랑 대화하기">외식코기랑 대화하기</button>

                let user_html = res.message;
                if (user_html !== null) {
                  user_html = user_html
                  .replace(/class="messaging-button"/gi,`style="display: none;"`)
                  .replace(/class="messaging-button-checkbox"/gi,`style="display: none;"`)
                  .replace(/class="messaging-button-checkbox messaging-button-checkbox-checked"/gi,`style="display: none;"`)
                  .replace(/class="messaging-button complete-button"/gi, `style="display: none;"`);
                  if (res.disconn_type === 'permanent') {
                    $('#messages').html(user_html+init_html);
                    $(".bot-message").css({ opacity: 1 });
                    $(".user-message").css({ opacity: 1 });
                    $('.messaging-button').hide();
                    $('.messaging-button-checkbox').hide();
                    $('.messaging-button').slice(-6).show();
                  } else {
                    $('#messages').html(user_html);
                    $(".bot-message").css({ opacity: 1 });
                    $(".user-message").css({ opacity: 1 });
                    // $('.messaging-button').hide();
                    if ($('#messages').children().last().attr('class') !== 'messaging-button' && $('#messages').children().last().attr('class') !== 'message-button') {
                      $('#m').prop('disabled', false);
                      $('#input-button').attr('disabled', false);
                    }
                  }
                  $('#messages').scrollTop(1E10);
                }
            } else {
                console.log("getpartlog: fail!");
                console.log(res);
            }
        },
        error: function(e) {
            console.log('ajax call error: signup page - singUpReq');
            if (e.status === 404 && e.responseText.includes("API call URL not found."))
                console.log("check your URL, method(GET/POST)");
            else if ((e.status === 400 && e.responseText.includes("not provided"))
                || (e.status === 500 && e.responseText.includes("Cannot read property"))) {
                console.log("check your parameters");
            } else if (e.status === 0){
                if (navigator.onLine){
                    console.log('status : 0');
                } else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            } else {
                console.log('status: ' + e.status + ', message: ' + e.responseText);
            }
            alert("채팅로그 불러오기가 실패했습니다.");
        }
    };
    sendReq(info);
}

function getLocation2(callback) {
  return new Promise(function (resolve, reject) {
    let arr = new Object();
    if (navigator.geolocation) {
      let geo_options = {
        enableHighAccuracy: false,
        maximumAge: 300000,   // 반환받을 캐시된 위치값의 최대수명
        timeout: 10000,
      }
      function error(err){
        console.log(err);
        console.warn(`ERROR(${err.code}): ${err.message}`);
        // code 1: 권한없음 2: 위치확인 불가 3: 시간초과
        if(err.code == 1) {
          alert("gps 권한이 없습니다. gps를 켜주세요");
          resolve(arr);
        } else if(err.code == 2) {
          alert("현재 사용자 위치 확인이 불가합니다.");
          resolve(arr);
        } else if(err.code == 3) {
          alert("사용자 위치를 확인하는데 시간이 초과하였습니다.");
          resolve(arr);
        } else {
          alert("알 수 없는 에러가 발생하였습니다.");
          resolve(arr);
        }
      }
      navigator.geolocation.getCurrentPosition(function(position) {
        let current_lat=position.coords.latitude;
        let current_lng=position.coords.longitude;
        console.log(current_lat);
        console.log(current_lng);
        arr['lat']=current_lat;
        arr['lng']=current_lng;
        resolve(arr);
      }, error, geo_options);

    } else {
      alert('geolocation not supported');
      console.log('geolocation not supported');
      resolve(arr);
    }
  });
}

function getLocation(socket_id) {
  let arr = new Object();
  if (navigator.geolocation) {
    let geo_options = {
      enableHighAccuracy: false,
      maximumAge: Infinity,
      timeout: 30000,
    }
    function error(err){
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.watchPosition(function(position) {
      let current_lat=position.coords.latitude;
      let current_lng=position.coords.longitude;
      console.log(current_lat);
      console.log(current_lng);
      arr['lat']=current_lat;
      arr['lng']=current_lng;
    }, error, geo_options);

    return arr;
  } else {
    alert('geolocation not supported');
    console.log('geolocation not supported');
    return;
  }
}

let loginValue = sessionStorage.getItem('login');
let clickNum=0;

$(function () {
  var socket = io();

  $('#kakao-btn').click(function() {
    $('#kakao-btn').attr({
      "data-dismiss": 'modal',
      "aria-hidden": true
    });

    setTimeout(function() {
      html2canvas($('#chat-room'), {
         onrendered: function(canvas) {
           var imgData = canvas.toDataURL('image/png');
           //이미지 리사이징 할때 쓰는 코드
           // var resizedCanvas = document.createElement("canvas");
           // var resizedContext = resizedCanvas.getContext("2d");
           // resizedCanvas.height = "512";
           // resizedCanvas.width = "512";
           // resizedContext.drawImage(canvas, 0, 0, 512, 512);
           // var myResizedData = resizedCanvas.toDataURL('image/png');
           socket.emit('save screenshot', imgData, 'kakao');
         }
       });
    }, 300);
  });

  $('#facebook-btn').click(function() {
    $('#facebook-btn').attr({
      "data-dismiss": 'modal',
      "aria-hidden": true
    });
    setTimeout(function() {
      html2canvas($('#chat-room'), {
         onrendered: function(canvas) {
           var imgData = canvas.toDataURL('image/png');
           socket.emit('save screenshot', imgData, 'facebook');
         }
       });
    }, 300);
  });

  socket.on('saved screenshot', function(url, msg) {
    if(msg == 'kakao') {
      // function sendLink(callback) {
        // return new Promise(function(resolve, reject) {
        Kakao.Link.scrapImage({
          imageUrl: url
        }).then(function(res){
          console.log(res.infos.original.url);
          socket.emit('delete screenshot')
          Kakao.Link.sendDefault({
            objectType: 'feed',
            content: {
              title: '외식코기 베리베리굳',
              description: '#어플 #추천 #선택장애 #맛집추천 #술집추천 #카페추천',
              imageUrl: res.infos.original.url,
              link: {
                mobileWebUrl: res.infos.original.url,
                webUrl: res.infos.original.url
              }
            },
            buttons: [
              {
                title: '외식코기에게 추천 받으러 가기',
                link: {
                  mobileWebUrl: 'https://corgi.jellylab.io',
                  webUrl: 'https://corgi.jellylab.io'
                }
              },
            ]
          });
          // resolve('finish');
        }).catch(function(err) {
          console.log("카카오톡 scrap api catch");
          console.log(err);
          socket.emit('delete screenshot')
          // reject('error');
        })
        // });
       // }
       // sendLink().then(function(msg) {
       //   console.log(msg);
       //   socket.emit('delete screenshot');
       // }).catch(function (err) {
       //   console.log("err");
       //   socket.emit('delete screenshot');
       // })
    } else if(msg == 'facebook') {
      Kakao.Link.scrapImage({
        imageUrl: url
      }).then(function(res){
        socket.emit('delete screenshot')
        console.log(res.infos.original.url)
        FB.ui({
          method: 'share_open_graph',
          hashtag: '#외식코기',
          action_type: 'og.likes',
          action_properties: JSON.stringify({
            object: {
              'og:url': 'https://corgi.jellylab.io',
              'og:title': '외식코기 베리베리굳',
              'og:description': '#어플 #추천 #선택장애 #맛집추천 #술집추천 #카페추천',
              'og:image': res.infos.original.url,
            }
          })
        });
      }).catch(function(err) {
        console.log("카카오톡 scrap api catch");
        console.log(err);
        socket.emit('delete screenshot')
      })
    }
  });

  $('.back-btn').click(function(){
    location.href='/lobby';
    sessionStorage.removeItem('stage');
    sessionStorage.removeItem('name');
  })

  $('body').on('click', '.messaging-button', (e) => {
    clickNum=0;

    if($(e.target).attr('id')==='get_started'){
      sessionStorage.removeItem('stage');
    }
    if($(e.target).attr('id') === 'decide_place'){
      sessionStorage.setItem('stage', 'decide_place');
      sessionStorage.setItem('name', '중간지점 찾기(서울)')
    }
    if ($(e.target).attr('id') === 'decide_menu' || $(e.target).attr('id') === 'decide_drink') {
      sessionStorage.setItem('stage',$(e.target).attr('id'));
      if($(e.target).attr('id')==='decide_menu'){
        sessionStorage.setItem('name','메뉴 고르기');
      } else if($(e.target).attr('id')==='decide_drink'){
        sessionStorage.setItem('name','술집 고르기');
      }

      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    if ($(e.target).attr('id') === ('mood2/') || $(e.target).attr('id') === ('exit/') || $(e.target).attr('id') === ('S4/') || $(e.target).attr('id') === ('price/') ||  $(e.target).attr('id') === ('hobulho_hate/')) {
      console.log("messaging button의 exit/눌렸을경우");
      console.log($(e.target).attr('id'));
      const checked_array = [];
      const checked_name_array = [];
      $('.checkbox:checked').each(function () {
        // 이전으로 돌아가기 버튼 아닌경우에만 checked_array에 추가
        console.log(this);
        if ($(e.target).attr('id').includes('previous')) {
          console.log("이전으로 돌아가기 버튼");
        } else {
          checked_array.push(this.id);
          checked_name_array.push(this.name);
        }
      });

      if (checked_array.length === 0) {
        switch ($(e.target).attr('id')) {
          case 'mood2/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_mood2');
            break;
          case 'exit/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_exit');
            break;
          case 'S4/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_drink_type');
            break;
          case 'price/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_price');
            break;
          case 'hobulho_hate/':
            socket.emit('chat message button rule', $(e.target).attr('name'), 'no_hobulho_hate');
            break;
        }
      } else {
        socket.emit('chat message button rule', checked_name_array, ($(e.target).attr('id') + checked_array));
        $('.messaging-button').hide();
        $('.messaging-button-checkbox').hide();
        $('.messaging-button-checkbox').children('input[type=checkbox]').prop('checked', false);
      }
    } else if ($(e.target).attr('id')==='location/current'){
      let arr = getLocation(socket.id);
      var temp = setTimeout(function() {
        socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id') + '_'+ arr.lat + '/' + arr.lng);
      }, 2000);
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    } else if ($(e.target).attr('id')==='search_near') {
      console.log("search_near clicked");
      getLocation2().then(function (arr) {
        console.log(arr);
        if(arr.lat == undefined || arr.lng == undefined) {
          socket.emit('chat message button rule', $(e.target).attr('name'), 'geolocation_err');
        } else {
          socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id') + '_'+ arr.lat + '/' + arr.lng);
        }
      });
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    } else if ($(e.target).attr('id')==='S2_2/gps') {
      console.log("S2_2/gps clicked");
      getLocation2().then(function (arr) {
        console.log(arr);
        if(arr.lat == undefined || arr.lng == undefined) {
          socket.emit('chat message button rule', $(e.target).attr('name'), 'geolocation_err');
        } else {
          socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id') + `:${arr.lat},${arr.lng}`);
        }
      });
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    } else if($(e.target).attr('id').includes('previous')) {
        console.log('previous1 clicked');
        let userStack = $(e.target).attr('id').replace(/@/gi, `"`).slice(9);
        console.log(userStack);
        let stack = JSON.parse("["+userStack+"]");
        // console.log(stack);
        let element = stack.pop();
        console.log(element.state);
        // console.log(stack);
        stack = JSON.stringify(stack);
        // console.log(stack);
        stack = stack.slice(1, -1);
        console.log(stack);
        function getFinalStack(callback) {
          return new Promise(function (resolve, reject) {
            if(stack === '') {
              console.log("stack 빔");
              resolve('null');
            } else {
              console.log("Stack 남아있음");
              resolve(stack);
            }
          });
        }
        getFinalStack().then(function (stack){
          console.log(stack);
          const info = {
            url: "/api/v1/users/update_user",
            method: 'POST',
            body: {
              kakao_id: socket.id,
              stack: stack,
            },
            success: function(res) {
              console.log("== 일반 이전버튼에서 메세지지우기 ==");
              const prevElement = $('.bot-message').children(':last').parent().prev();
              if (prevElement.attr('class') == 'bot-message') {
                if (prevElement.children(':last').attr('class') == 'img-fluid rest-img') {
                  prevElement.hide();
                }
              }
              $('#m').prop('disabled', true);
              $('#input-button').attr('disabled', true);
              $('.messaging-button').hide();
              $('.messaging-button-checkbox').hide();
              $('.bot-message').children(':last').hide();
              const info2 ={
                url: "/api/v1/users/update_user",
                method: 'POST',
                body: {
                  kakao_id: socket.id,
                  state: element.state,
                },
                success: function(res) {
                  socket.emit('chat message button rule previous', stack, element.value);
                },
                error: function (e) {
                  console.log(e);
                }
              }
              sendReq(info2);
            },
            error: function (e) {
              console.log(e);
            }
          }
          sendReq(info);
        });

    } else {
      socket.emit('chat message button rule', $(e.target).attr('name'), $(e.target).attr('id'));
      $('.checkbox:checked').attr('checked', false);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
    }
  });

  $('body').on('click', '.messaging-button-checkbox', (e) => {
    if ($(e.target).attr('name') === '메뉴 고르기' || $(e.target).attr('name') === '술집 고르기') {
      $('#m').autocomplete('enable');
    } else {
      $('#m').autocomplete('disable');
    }
    if ($(e.target).attr('id') === '999' || $(e.target).attr('id') === '998' || $(e.target).attr('id') === '900' || $(e.target).attr('id') === '888' || $(e.target).attr('id') === '상관없음' || $(e.target).attr('id') === '없음') {
      clickNum=0;
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').prop('checked', false);
      $('.messaging-button-checkbox:not(:hidden)').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');
      $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', true);
      $('.messaging-button').hide();
      $('.messaging-button-checkbox').hide();
      if($(e.target).attr('id') === '999'){
        socket.emit('chat message button rule', $(e.target).attr('name'), 'exit/'+$(e.target).attr('id'));
      } else if ($(e.target).attr('id') === '998'){
        socket.emit('chat message button rule', $(e.target).attr('name'), 'mood2/'+$(e.target).attr('id'));
      } else if ($(e.target).attr('id') === '900'){
          socket.emit('chat message button rule', $(e.target).attr('name'), 'hobulho_hate/'+$(e.target).attr('id'));
      } else {
        socket.emit('chat message button rule', $(e.target).attr('name'), 'S4/'+$(e.target).attr('id'));
      }
    } else if($(e.target).attr('id').includes('previous')) {
        $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').prop('checked', false);
        $('.messaging-button-checkbox:not(hidden)').removeClass('messaging-button-checkbox-checked');
        $('.messaging-button-checkbox:not(:hidden)').children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');

        let userStack = $(e.target).attr('id').replace(/@/gi, `"`).slice(9);
        console.log(userStack);
        let stack = JSON.parse("["+userStack+"]");
        let element = stack.pop();
        console.log(element.state);
        stack = JSON.stringify(stack);
        stack = stack.slice(1, -1);
        console.log(stack);
        function getFinalStack(callback) {
          return new Promise(function (resolve, reject) {
            if(stack === '') {
              console.log("stack 빔");
              resolve('null');
            } else {
              console.log("Stack 남아있음");
              resolve(stack);
            }
          });
        }
        getFinalStack().then(function (stack){
          console.log(stack);
          const info = {
            url: "/api/v1/users/update_user",
            method: 'POST',
            body: {
              kakao_id: socket.id,
              stack: stack,
            },
            success: function(res) {
              console.log("== 체크박스 이전버튼에서 메세지 지우기 ==");
              const parentElement = $('.bot-message').children(':last').parent(); // bot message요소의 <div> parent
              // img 포함일때 지우기
              if (parentElement.prev().attr('class') == 'bot-message') {
                if (parentElement.prev().children(':last').attr('class') == 'img-fluid rest-img') {
                  parentElement.prev().hide();
                }
              }
              // map 포함일때 지우기
              else if (parentElement.next().children(':first').attr('href') != null) {
                parentElement.next().hide();
              }
              $('#m').prop('disabled', true);
              $('#input-button').attr('disabled', true);
              $('.messaging-button').hide();
              $('.messaging-button-checkbox').hide();
              $('.bot-message').children(':last').hide();
              const info2 ={
                url: "/api/v1/users/update_user",
                method: 'POST',
                body: {
                  kakao_id: socket.id,
                  state: element.state,
                },
                success: function(res) {
                  socket.emit('chat message button rule previous', stack, element.value);
                },
                error: function (e) {
                  console.log(e);
                }
              }
              sendReq(info2);
            },
            error: function (e) {
              console.log(e);
            }
          }
          sendReq(info);
        });

    } else {
      // $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').prop('checked', false);
      // $('.messaging-button-checkbox:not(:hidden)').first().removeClass('messaging-button-checkbox-checked');
      // $('.messaging-button-checkbox:not(:hidden)').first().children('input[type=checkbox]').removeClass('messaging-button-checkbox-checked');

      // $(e.target).children('input[type=checkbox]').click();
    }

    if($(e.target).children('input[type=checkbox]').prop('checked')){
      $(e.target).children('input[type=checkbox]').prop('checked', false);
      $(e.target).toggleClass('messaging-button-checkbox-checked');
      // $(e.target).children('input[type=checkbox]').toggleClass('messaging-button-checkbox-checked');
      console.log($(e.target).attr('id'));
      console.log("체크박스 선택 해제");
      if ($(e.target).attr('id') != '999' && $(e.target).attr('id') != '998')
        clickNum--;
    } else{
      if($(e.target).attr('id').includes('previous')) {
        clickNum = 0;
        console.log("이전으로 돌아가기 버튼 클릭");
      } else {
        console.log("체크박스 선택");
        $(e.target).children('input[type=checkbox]').prop('checked', true);
        // console.log($(e.target).children('input[type=checkbox]').attr('checked'));
        $(e.target).toggleClass('messaging-button-checkbox-checked');
        // $(e.target).children('input[type=checkbox]').toggleClass('messaging-button-checkbox-checked');
        clickNum++;
      }
    }
    console.log(clickNum);
    (clickNum > 0) ? $('.complete-button').prop('disabled', false)
                   : $('.complete-button').prop('disabled', true);
  });

  $('body').on("submit", "form", function(){
    if($('#m').val() === "버튼보여줘"){
      socket.emit('chat message button', $('#m').val());
      $("input").prop('disabled', true);
    } else {
      socket.emit('chat message', $('#m').val());
    }
    $('#m').val('');
    return false;
  });

  socket.on('chat register', function(socket_id){
    let user_email = sessionStorage.getItem('email');
    let stage = sessionStorage.getItem('stage');
    let name =sessionStorage.getItem('name');

    const info = {
        method: "POST",
        url: '/api/v1/users/update_socket',
        body: {
            email: user_email,
            socket_id: socket_id,
        },
        success: function (res) {
            if (res.success){
                console.log("signUpReq: success!");
                console.log(stage);
                console.log(loginValue);
                if(stage!==null){
                  if(loginValue!=='-1'){
                    getPartLog(user_email, sessionStorage.getItem('stage'));
                  }
                  socket.emit('chat message button rule', name, stage);

                  $('.checkbox:checked').attr('checked', false);
                  $('.messaging-button').hide();
                  $('.messaging-button-checkbox').hide();
                }
            }else {
                console.log("signUpReq: fail!");
                console.log(res);
            }
        },
        error: function(e) {
            console.log('ajax call error: signup page - singUpReq');
            if (e.status === 404 && e.responseText.includes("API call URL not found."))
                console.log("check your URL, method(GET/POST)");
            else if ((e.status === 400 && e.responseText.includes("not provided"))
                || (e.status === 500 && e.responseText.includes("Cannot read property"))) {
                console.log("check your parameters");
            } else if(e.status === 0){
                if(navigator.onLine){
                    console.log('status : 0');
                }else {
                    console.log('internet disconnected');
                    window.location.reload();
                }
            } else {
                console.log('status: ' + e.status + ', message: ' + e.responseText);
            }
            alert("정보 업데이트가 실패했습니다.");
        }
    };
    sendReq(info);
  });

  socket.on('chat message', (answer) => {
    $('#messages').append(bot_messaging(answer));
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message_self', (msg) => {
    $('#messages').append(user_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    if(msg.includes("처음으로") || msg.includes("돌아가기") || msg.includes("안할래")){
      $('#messages').append(`<hr>`);
    }
    // $('#messages').append($('<li>').text(answer));
    // window.scrollTo(0, document.body.scrollHeight);
  });

  // TODO : 임시로 만들어 놓은 현재 접속자 -> 추후 삭제 해야함
  socket.on('user_list', (clients) => {
    $('.user_id').remove();
    clients.forEach((elements) => {
      $('#user_list').append(user_list_update(elements));
    });
  });

  socket.on('chat message button', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    for (let i = 0; i < args.length; i += 1) {
        $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
    }
    if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);


    if(loginValue!=='-1'){
      if(msg.includes("오늘의 선택")){
        updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
      }
    }
  });

  socket.on('chat message button checkbox price', (socket_id, msg, ...args) => {
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    const args_length = args.length;
    for (let i = 0; i < args_length - 1; i += 1) {
      $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
    $('.complete-button').prop('disabled', true);
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message button checkbox', (socket_id, msg, ...args) => {
    console.log(args[0], args[1], args[2], args[3], args[4]);
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    const args_length = args.length;
    for (let i = 0; i < args_length - 1; i += 1) {
      console.log(`${args[i][0]}, ${args[i][1]}`);
      $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
    $('.complete-button').prop('disabled', true);
    $('#messages').scrollTop(1E10);
  });

  //parameter 배열로 받는 체크박스 이벤트
  socket.on('chat message button checkbox array', (socket_id, msg, optionArr) => {
    const len = optionArr.length;
    if (len === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    for (let i = 0; i < len-1; i++) {
      $('#messages').append(bot_messaging_button_checkbox(optionArr[i][0], optionArr[i][1]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(optionArr[len - 1][0], optionArr[len - 1][1]));
    $('.complete-button').prop('disabled', true);
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message button dynamic checkbox', (socket_id, msg, ...args) => {
    $('#messages').append(bot_messaging(msg)).children(':last').hide()
      .fadeIn(150);
    $('#messages').append(bot_messaging_button_checkbox(args[0][0], args[0][1]));
    const args_length = args[1].length;
    for (let i = 0; i < args_length; i += 1) {
      $('#messages').append(bot_messaging_button_checkbox(args[1][i], args[1][i]));
    }
    $('#messages').append(bot_messaging_button_finish_checkbox(args[2][0], args[2][1]));
    if (args.length === 0) {
      $('#m').prop('disabled', false);
      $('#input-button').attr('disabled', false);
    } else {
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
    }
    $('#messages').scrollTop(1E10);
  });

  socket.on('chat message map', (msg, ...args) => {
      $('#messages').append(bot_messaging_map(msg, ...args)).children(':last');
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
      $('#messages').scrollTop(1e4);
    });

  socket.on('chat message button checkbox map', (socket_id, msg, ...args) => {
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args.length;
      $('#messages').append(bot_messaging_map(args[0], args[1]));
      for (let i = 2; i < args_length - 1; i += 1) {
        $('#messages').append(bot_messaging_button_checkbox(args[i][0], args[i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[args_length - 1][0], args[args_length - 1][1]));
      $('.complete-button').prop('disabled', true);
      $('#messages').scrollTop(1E10);
  });

  socket.on('chat message image', (socket_id, msg, button1, button2, ...args) => {
    $('#messages').append(bot_messaging_image_carousel(args[0]));
    for (let i = 0; i < args[1] - 1; i += 1) {
      $('.carousel-inner').last().append(carousel_inner(args[2][i]));
    }
    $('#messages').append(bot_messaging(msg)).scrollTop(1E10);
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1]));
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
  });

  socket.on('chat message card', (socket_id, button1, button2, button3, button4, rest1, rest2) => {
    $('#messages').append(bot_messaging_card(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], rest1[5], rest1[6], rest1[7]));
    $('.choice_carousel').last().append(bot_messaging_card_inner(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4], rest2[5], rest2[6], rest2[7]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    if (button4.length > 0) {
      $('#messages').append(bot_messaging_button(button4[0], button4[1]));
    }
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card single', (socket_id, button1, button3, rest1) => {
    $('#messages').append(bot_messaging_card(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], rest1[5], rest1[6], rest1[7]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card cafe', (socket_id, button1, button2, button3, rest1, rest2) => {
    $('#messages').append(bot_messaging_card(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], rest1[5], rest1[6], rest1[7]));
    $('.choice_carousel').last().append(bot_messaging_card_inner(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4], rest2[5], rest2[6], rest2[7]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card distance', (socket_id, button1, button2, button3, button4, rest1, rest2, distance1, distance2) => {
    $('#messages').append(bot_messaging_card_distance(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], rest1[5], rest1[6], rest1[7], distance1));
    $('.choice_carousel').last().append(bot_messaging_card_inner_distance(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4], rest2[5], rest2[6], rest2[7], distance2));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    if (button4.length > 0) {
      $('#messages').append(bot_messaging_button(button4[0], button4[1]));
    }
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card single distance', (socket_id, button1, button3, rest1, distance1) => {
    $('#messages').append(bot_messaging_card_distance(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], rest1[5], rest1[6], rest1[7], distance1));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    $('#input-button').attr('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  /* 이미지, 메세지, 버튼 같이 사용 */
  socket.on('chat message button image', (socket_id, msg, img, ...args) => {
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging_image(img));
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      const args_length = args.length;

      for (let i = 0; i < args_length; i += 1) {
        $('#messages').append(bot_messaging_button(args[i][0], args[i][1]));
      }
      $('#messages').scrollTop(1E10);
      if(loginValue!=='-1'){
        if(msg.includes("오늘의 선택")){
          updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
        }
      }
  });

  /* 이미지, 메세지, 중복체크버튼을 같이 사용 */
  socket.on('chat message button checkbox image', (socket_id, msg, img, ...args) => {  // msg:메세지, img: 이미지, args: 버튼들
      if (args.length === 0) {
        $('#m').prop('disabled', false);
        $('#input-button').attr('disabled', false);
      } else {
        $('#m').prop('disabled', true);
        $('#input-button').attr('disabled', true);
      }
      $('#messages').append(bot_messaging(msg)).children(':last').hide()
        .fadeIn(150);
      // console.log(args);
      console.log(args[0]);
      const args_length = args[0].length;
      console.log(`args_length : ${args_length}`);
      $('#messages').append(bot_messaging_image(img));
      for (let i = 0; i < args_length - 1; i += 1) {
        $('#messages').append(bot_messaging_button_checkbox(args[0][i][0], args[0][i][1]));
      }
      $('#messages').append(bot_messaging_button_finish_checkbox(args[0][args_length - 1][0], args[0][args_length - 1][1]));
      $('.complete-button').prop('disabled', true);
      $('#messages').scrollTop(1E10);
  });

  socket.on('chat message card no image', (socket_id, button1, button2, button3, button4, rest1, rest2) => {
    $('#messages').append(bot_messaging_card_no_image(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4]));
    $('.choice_carousel').last().append(bot_messaging_card_inner_no_image(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    if (button4.length > 0) {
      $('#messages').append(bot_messaging_button(button4[0], button4[1]));
    }
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card no image single', (socket_id, button1, button3, rest1) => {
    $('#messages').append(bot_messaging_card_no_image(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card no image cafe', (socket_id, button1, button2, button3, rest1, rest2) => {
    console.log("Present stage: "+sessionStorage.getItem('stage'));
    $('#messages').append(bot_messaging_card_no_image(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4]));
    $('.choice_carousel').last().append(bot_messaging_card_inner_no_image(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4]));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card no image distance', (socket_id, button1, button2, button3, button4, rest1, rest2, distance1, distance2) => {
    $('#messages').append(bot_messaging_card_no_image_distance(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], distance1));
    $('.choice_carousel').last().append(bot_messaging_card_inner_no_image_distance(rest2[0], rest2[1], rest2[2], rest2[3], rest2[4], distance2));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1])).append(bot_messaging_button(button3[0], button3[1]));
    if (button4.length > 0) {
      $('#messages').append(bot_messaging_button(button4[0], button4[1]));
    }
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message card no image single distance', (socket_id, button1, button2, rest1, distance1) => {
    $('#messages').append(bot_messaging_card_no_image_distance(rest1[0], rest1[1], rest1[2], rest1[3], rest1[4], distance1));
    $('#messages').append(bot_messaging_button(button1[0], button1[1])).append(bot_messaging_button(button2[0], button2[1]));
    $('#m').prop('disabled', true);
    setTimeout(() => {
      $('#messages').scrollTop(1E10);
    }, 100);
    if(loginValue!=='-1'){
      updatePartLog(sessionStorage.getItem('email'), sessionStorage.getItem('stage'));
    }
  });

  socket.on('chat message loader', (time) => {
      const loader_id = `loader${String(Math.floor(Math.random() * 10000) + 1)}`;
      $('#messages').append(bot_messaging_loader(loader_id)).children(':last').hide()
        .fadeIn(150);
      $(`#${loader_id}`).delay(time + 300).fadeOut(150);
      $('#m').prop('disabled', true);
      $('#input-button').attr('disabled', true);
      $('#messages').scrollTop(1E10);
  });
});



$(document).ready(() => {
  let loginValue = sessionStorage.getItem('login');
  if (loginValue === '0') {
    $('.email-signed-in')[0].style.display = 'block';
    $('.update-password')[0].style.display = 'block';
  } else {
    $('#logout-btn')[0].style.display = 'none';
    $('.email-signed-in')[0].style.display = 'none';
    $('.update-password')[0].style.display = 'none';
  }
  // if (loginValue === '0') {
  const info = {
    url: '/api/v1/users/verify_token',
    method: 'POST',
    data: null,
    async: true,
    crossDomain: true,
    redirect: 'follow',
    xhrFields: {
        withCredentials: true
    },
    success: function (res) {
        if (res.success) {
            console.log(res);
            console.log('verifyToken success');
            if(sessionStorage.getItem('login') === '0' || sessionStorage.getItem('login') === null){
              sessionStorage.setItem('login', '0');
              sessionStorage.setItem('email', res.email);
            }
          } else {
            console.log('verifyToken fail');
            console.log(res);
        }
    },
    error: function (e) {
        console.log('ajax call error: login page - verifyToken');
        if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
            console.log("check your URL, method(GET/POST)");
        } else if (e.status === 403) {
            if (e.responseText.includes("No token provided.")) {
                console.log("No token, no problem.");
                alert('로그인해주세요.');
                location.href = '/';
            }
            else if (e.responseText.includes("jwt malformed"))
                console.log("Malformed token");
            else if (e.responseText.includes("invalid signature"))
                console.log("Modified token");
            else console.log(e);
        } else if (e.status === 0) {
            if (navigator.onLine) {
                console.log('status : 0');
            } else {
                console.log('internet disconnected');
                window.location.reload();
            }
        } else {
            console.log('status: ' + e.status + ', message: ' + e.responseText);
            console.log(e);
        }
    }
  }
  sendTokenReq(info);
  // }

  let nowTime;
  $('.card-body').on('click', '.arrow-right', function(){
    $(this).siblings('.choice_carousel').animate({
    scrollLeft: "+=150px"
    }, 300);
  });

  $('.card-body').on('click', '.arrow-left', function(){
    $(this).siblings('.choice_carousel').animate({
    scrollLeft: "-=150px"
    }, 300);
  });

  $('#m').autocomplete({
    minLength: 0,
    source: function( request, response ) {
      let term = request.term;
      let cache = {};
      if ( term in cache ) {
        response( cache[ term ] );
        return;
      }

      let user_email = sessionStorage.getItem('email');
      if (term === '') {
        // $.getJSON( "http://ec2-13-124-160-236.ap-northeast-2.compute.amazonaws.com:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
          // cache[ term ] = data;
          // response( data );
        // });
        $.getJSON( "https://devapifood.jellylab.io:6001/api/v1/users/get_subway_list_history?email="+user_email, request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
      } else {
        // $.getJSON( "http://ec2-13-124-160-236.ap-northeast-2.compute.amazonaws.com:6001/api/v1/users/get_all_subway", request, function( data, status, xhr ) {
        //   cache[ term ] = data;
        //   response( data );
        // });
        $.getJSON( "https://devapifood.jellylab.io:6001/api/v1/users/get_all_subway", request, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
      }
    },
    select: function(event, ui) {
            if(ui.item.subway) {
              $('#m').val(ui.item.subway);
              $('#input-button').click();
            } else {
              $('#m').val(ui.item.value);
              $('#input-button').click();
            }
            return false;
    },
    focus: function(event, ui) {
            if(ui.item.subway) {
              $('#m').val(ui.item.subway);
            } else {
              $('#m').val(ui.item.value);
            }
            return false;
    },
    appendTo: ".card-footer",
    autoFocus: false,
    position: { my : "right bottom", at: "right top" },
  }).data('ui-autocomplete')._renderItem = function(ul, item) {
    if(item.subway) {
      return $('<li></li>')
          .data('ui-autocomplete-item', item)
          .append('<div style="display:flex; justify-content:space-between;"><span>' + item.subway + '</span>' + '<span>' + item.date + '</span></div>')
          .appendTo(ul);
    } else {
      return $('<li></li>')
          .data('ui-autocomplete-item', item)
          .append(`<div>${item.value}</div>`)
          .appendTo(ul);
    }
  };

  $('#m').focus(function(){
     		$(this).autocomplete("search", $(this).val());
  });

  $('#logout-btn').click(function() {
    logout(loginValue);
  });

  $('#delete-log-btn').click(function() {
    if (confirm('채팅기록을 지우시겠습니까? 모든 기록이 지워집니다.')) {
      const currentStage=sessionStorage.getItem('stage');
      console.log(currentStage);
      let targetcol='chat_log';
      if(currentStage==='decide_menu'){
        // targetAPI="/api/v1/users/delete_menu_log";
        targetcol='menu_chat_log';
      } else if(currentStage==='decide_drink'){
        // targetAPI="/api/v1/users/delete_drink_log";
        targetcol='drink_chat_log';
      } else if(currentStage==='decide_place'){
        // targetAPI="/api/v1/users/delete_middle_log";
        targetcol='middle_chat_log';
      }
      console.log(targetcol);
      //sessionStorage.removeItem('stage');

      const info = {
        url: "/api/v1/users/delete_part_log",
        method: 'POST',
        body: {
          email: sessionStorage.getItem('email'),
          col: targetcol,
        },
        success: function(res) {
          if (res.success) {
            alert('채팅로그를 지웠습니다.');
            // getPartLog(sessionStorage.getItem('email'), currentStage);
            window.location.replace('/chat');
          }
        },
        error: function (e) {
          console.log(e);
        }
      }
      sendReq(info);
    }
  });

  $('.decide-withdrawl').click(function() {
    if (confirm('정말 탈퇴하시겠습니까? 탈퇴하시면 모든 데이터가 소멸됩니다.')) {
      const info = {
        url: '/api/v1/users/member_withdraw',
        method: 'POST',
        body: {
          email: sessionStorage.getItem('email'),
          password: $('.password').val()
        },
        success: function(res) {
          if (res.success) {
            sessionStorage.clear();
            localStorage.clear();
            alert('탈퇴했습니다.');
            window.location.replace(res.redirect);
          }
        },
        error: function (e) {
          console.log(e.responseJSON);
          if(e.responseJSON.message.indexOf('not match') !== -1) {
            alert('비밀번호가 틀렸습니다.');
          }
        }
      }
      sendTokenReq(info);
    }
  });

  $('.decide-update-password').click(function() {
    if ($('.cur-password').val() === '') {
      alert('현재 비밀번호를 입력하세요.');
      return;
    }
    if ($('.new-password').val() === '') {
      alert('새 비밀번호를 입력하세요.');
      return;
    }
    if ($('.verify-new-password').val() === '') {
      alert('새 비밀번호(확인)을 입력하세요.');
      return;
    }
    if ($('.new-password').val() !== $('.verify-new-password').val()) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }
    if ($('.cur-password').val() === $('.new-password').val()) {
      alert('새 비밀번호가 기존 비밀번호와 일치합니다.');
      return;
    }
    const info = {
      url: '/api/v1/users/update_password',
      method: 'POST',
      body: {
        email: sessionStorage.getItem('email'),
        curPassword: $('.cur-password').val(),
        newPassword: $('.new-password').val(),
      },
      success: function (res) {
        if (res.success) {
          alert('비밀번호가 변경되었습니다. 변경된 비밀번호로 로그인 바랍니다.');
          $('.decide-update-password').attr('data-dismiss', 'modal');
          $('#config-modal').on('hidden.bs.modal', () => {
            $('.decide-update-password').removeAttr('data-dismiss');
          })
          logout(loginValue);
        }
      },
      error: function (e) {
        if (e.responseJSON.message.indexOf('current') !== -1) {
          alert('현재 비밀번호가 잘못되었습니다.');
          return;
        }
        else if (e.responseJSON.message.indexOf('longer') !== -1) {
          alert('비밀번호는 8자리 이상이어야 합니다.');
          return;
        }
        else if (e.responseJSON.message.indexOf('digit') !== -1) {
          alert('비밀번호는 숫자, 영문, 특수문자 중 2가지 이상을 혼합해야 합니다.');
          return;
        }
        else {
          alert('비밀번호가 제대로 전달되지 못했습니다. 네트워크를 확인해주세요.');
          return;
        }
      }
    }
    sendTokenReq(info);

  });
  if (new Date().getHours() < 12) {
    nowTime = `오전 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else if (new Date().getHours() === 12) {
    nowTime = `오후 ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else {
    nowTime = `오후 ${new Date().getHours()%12}:${new Date().getMinutes()}`;
  }
  $('.message-info .time')[0].innerHTML = nowTime;
});
