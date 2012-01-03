// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e, name, pass) {
  var elem = $(this);
  elem.trigger('startload');
  $.couch.login({
    name : name,
    password : pass,
    success : function(r) {
      // Google analytics
      _gaq.push(['_trackEvent', 'login', 'succeded']);

      elem.trigger("_init").trigger('endload');
    },
    error: function(status, error, reason) {
      // Google analytics
      _gaq.push(['_trackEvent', 'login', 'error']);

      $.error('Login', 'Login failed! Probably, incorrect username or password. ' +
                       '(Tech Reason:' + reason + ')');
      elem.trigger('endload');
    }
  });
}
