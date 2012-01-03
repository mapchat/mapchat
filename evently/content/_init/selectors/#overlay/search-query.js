// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event, text) {
  var that = $(this);
  $.pathbinder.go('/');

  if (/^@/.test(text)) {
    // Search by username

    that.trigger('startload');

    $$(window).app.db.view('mapchat/messages_by_author', {
      descending: true,
      startkey: [text.substr(1), 'z'],
      limit: 1,
      success:  function(response) {
        if (response.rows[0]) {
          var loc = response.rows[0].value.loc;
          $.pathbinder.go('/point/' + loc[0] + '/' + loc[1]);
        }
        that.trigger('endload');
      },
      error: function(status, error, reason) {
        $.error('Search', 'Failed to load user messages! Reason:' + reason);
        that.trigger('endload');
      }
    });

    return;
  }

  // Otherwise search by location

  var query = {address: text, language: "en"};

  $$(window).geo.geocode(query, function (response, status) {

    if (status === google.maps.GeocoderStatus.OK &&
        response && response.length !== 0) {
      $$(window).map.fitBounds(response[0].geometry.bounds);
    }

  });

}
