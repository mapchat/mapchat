// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(cb, overlay, params) {
  var loc = $$(this).loc,
      that = $(this);
      
  that.trigger('startload');
  
  $$(window).app.db.view('mapchat/mentions', {
    descending: true,
    startkey: [$$(window).userCtx.name, 'z'],
    endkey: [$$(window).userCtx.name],
    limit: 50,
    success: function(response) {
      var messages = response.rows.reverse().map(function(row) {
        return row.value;
      });
      
      cb(messages);
      that.trigger('endload');
    },
    error: function(status, error, reason) {
      $.error('Mentions window', 'Failed to load messages! Reason:' + reason);
      that.trigger('endload');
    }
  });
}
