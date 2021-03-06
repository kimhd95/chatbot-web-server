// 개발 서버
// const URL = 'https://devapifood.jellylab.io:6001';
// 운영 서버
const URL = 'https://foodprod.jellylab.io:6001';
// const URL = 'http://ec2-13-124-160-236.ap-northeast-2.compute.amazonaws.com:6001';

// connect to the 테스트서버
// const URL = 'http://devapifoodprod.jellylab.io:6001';
// const URL = 'http://localhost:6001';

let opts = {
    lines: 10,
    length: 20,
    width: 12,
    radius: 42,
    scale: 1,
    corners: 1,
    color: '#61451b',
    fadeColor: '#9b805b',
    opacity: 0.25,
    rotate: 0,
    direction: 1,
    speed: 1,
    trail: 60,
    fps: 20,
    zIndex: 2e9,
    className: 'spinner',
    top: '50%',
    left: '50%',
    shadow: false,
    hwaccel: false,
    position: 'absolute',
}
let target = document.getElementById('spinner');
let spinner;


function sendReq(info) {
    if (!info.error) {
        info.error = function(e) {
            console.log('ajax call error');
            console.log(e);
            console.log(e.responseText);
        }
    }

    $.ajax(URL + info.url, {
        method: info.method,
        data: info.body,
        success: info.success,
        error: info.error
    });
}

function sendTokenReq(info) {
    if (!info.error) {
        info.error = function(e) {
            console.log('ajax call error');
            console.log(e);
        }
    }

    $.ajax(URL + info.url, {
        method: info.method,
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: info.body,
        success: info.success,
        error: info.error
    });
}

function recheckTokenExist (reqName) {
    const info = {
        url: "/api/v1/users/verify_token",
        method: "POST",
        success: function(res){
            if(res.success) {
                console.log('dashboard : recheckTokenExist - token exists! fail');
                alert(reqName + '에 실패했습니다.');
            }else {
                console.log("dashboard : recheckTokenExist - token may not exists......(Not sure)");
                console.log(res);
                window.location.replace(window.location.origin);
            }
        },
        error: function(e){
            console.log('ajax call error dashboard : reCheckTokenExist ');
            if(!navigator.onLine){
                console.log("internet disconnected");
                window.location.reload();
            } else if(e.status===0){
                console.log("status: 0");
            } else {
                if (e.status === 403) {
                    if (e.responseText.includes("No token provided."))
                        console.log("No token.");
                    else if (e.responseText.includes("jwt malformed"))
                        console.log("Malformed token");
                    else if (e.responseText.includes("invalid signature"))
                        console.log("Modified token");
                    window.location.replace(window.location.origin);
                } else if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
                    console.log("check your URL, method(GET/POST)");
                    alert(reqName + "에 실패했습니다.");
                } else {
                    console.log("token may not exists......(Not sure)");
                    console.log('status: ' + e.status + ', message: ' + e.responseText);
                    console.log(e);
                    window.location.replace(window.location.origin);
                }
            }
        }
    };
    sendTokenReq(info);
}
