function(e, name, pass) {
  var elem = $(this);
  
  elem.trigger('startload');
  $.couch.signup({
    name : name
  }, pass, {
    success : function() {
      // Google analytics
      _gaq.push(['_trackEvent', 'signup', 'succeded']);

      elem.trigger('doLogin', [name, pass]).trigger('endload');
    },
    error: function(status, error, reason) {
      // Google analytics
      _gaq.push(['_trackEvent', 'signup', 'error']);
    
      $.error('Signup', 'Signup failed! Probably, your username is already used!' +
                        ' (Tech Reason:' + reason + ')');
      elem.trigger('endload');
    }
  });
}
