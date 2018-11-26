const URL = 'http://devapifood.jellylab.io';

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