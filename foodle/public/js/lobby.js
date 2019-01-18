$(document).ready(() => {

  $('.nav').slideAndSwipe();

  // let loginValue = sessionStorage.getItem('login');
  // console.log("loginValue: "+loginValue);
  // if (loginValue === '0') {
  //   $('.social-signed-in')[0].style.display = 'none';
  //   $('.email-signed-in')[0].style.display = 'block';
  //   $('.update-password')[0].style.display = 'block';
  // } else {
  //   // $('m').val(sessionStorage.getItem('email'));
  //   $('.social-signed-in')[0].style.display = 'block';
  //   $('.email-signed-in')[0].style.display = 'none';
  //   $('.update-password')[0].style.display = 'none';
  // }
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
              $('#profile-name').addClass('.a');
              $('#profile-name').append(res.name + " 님");
              $('#profile-email').addClass('.a');
              $('#profile-email').append(res.email);
            } else {
              console.log('verifyToken fail');
              console.log(res);
          }
      },
      error: function (e) {
          console.log('ajax call error: login page - verifyToken');
          if (e.status === 404 && e.responseText.includes("API call URL not found.")) {
              console.log("check your URL, method(GET/POST)");
          }else if(e.status === 403){
              if (e.responseText.includes("No token provided.")) {
                  console.log("No token, no problem.");
                  alert('로그인해주세요.');
                  location.href = '/login';
              }
              else if (e.responseText.includes("jwt malformed"))
                  console.log("Malformed token");
              else if (e.responseText.includes("invalid signature"))
                  console.log("Modified token");
              else console.log(e);
          } else if(e.status === 0){
              if(navigator.onLine){
                  console.log('status : 0');
              }else {
                  console.log('internet disconnected');
                  window.location.reload();
              }
          } else{
              console.log('status: ' + e.status + ', message: ' + e.responseText);
              console.log(e);
          }
      }
    }
  //   sendTokenReq(info);
  // }
});
