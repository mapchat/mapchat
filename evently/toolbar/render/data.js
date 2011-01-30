function(context, data) {
  var logined = $$(window).userCtx && $$(window).userCtx.name;
  
  data.login = data.login && {
    logined: logined,
    'class': logined ? 'logout' : 'login',
    title: logined ? 'Profile' : 'Login'
  };
  return data;
}
