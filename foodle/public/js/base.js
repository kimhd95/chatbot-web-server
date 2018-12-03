const URL = 'http://devapifood.jellylab.io:6001';

function sendReq(info) {
    if(!info.error){
        info.error = function(e){
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
    if(!info.error){
        info.error = function(e){
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