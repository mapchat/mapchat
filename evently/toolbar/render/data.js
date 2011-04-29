// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(context, data) {
  var logined = $$(window).userCtx && $$(window).userCtx.name;
  
  data.login = data.login && {
    logined: logined,
    'class': logined ? 'logout' : 'login',
    title: logined ? 'Profile' : 'Login'
  };
  return data;
}
