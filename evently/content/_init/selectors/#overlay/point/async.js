function(cb, overlay, params) {
  var loc = $$(this).loc,
      that = $(this);
      
  that.trigger('startload');
  
  $$(window).app.db.view('mapchat/messages', {
    descending: true,
    startkey: loc.concat(['z']),
    endkey: loc,
    limit: 50,
    success: function(response) {
      var messages = response.rows.reverse().map(function(row) {
        return row.value;
      });
      
      cb(messages);
      that.trigger('endload');
    },
    error: function(status, error, reason) {
      $.error('Messages window', 'Failed to load messages! Reason:' + reason);
      that.trigger('endload');
    }
  });
}
