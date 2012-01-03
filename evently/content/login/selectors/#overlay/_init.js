// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var elem = $(this);
  $$(this).userCtx = null;

  elem.trigger('startload');

  $.couch.session({
    success : function(r) {
      var userCtx = r.userCtx;

      // Expose userCtx
      $$(window).userCtx = userCtx;

      if (userCtx.name) {
        elem.trigger("loggedIn", [r]);
      } else if (userCtx.roles.indexOf("_admin") != -1) {
        elem.trigger("adminParty");
      } else {
        elem.trigger("loginForm");
      };
      $$(elem).visible && elem.show();

      elem.trigger('endload');
    },
    error: function(status, error, reason) {
      $.error('Session', 'Failed to get info about current session! Reason:' + reason);
      elem.trigger('endload');
    }
  });
}
