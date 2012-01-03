// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(self, params) {
  if (arguments.length != 2) return;

  $(this).unbind('_init');

  var data = $$(this);

  var Convert = $$(window).app.require('vendor/mapchat/lib/convert'),
      loc = Convert.toFixed(parseFloat(params.lat), parseFloat(params.lng));

  data.loc = loc;
  data.visible = true;

  // Move to this point - so we will watch correct _changes feed
  var map = $$(window).map,
      oldCenter = map.getCenter();

  if (oldCenter.lat() != loc[0] || oldCenter.lng() != loc[1]) {
    map.setCenter(new google.maps.LatLng(loc[0], loc[1]));
  }

  // Google analytics
  _gaq.push(['_trackPageview', '#/point/' + params.lat + '/' + params.lng]);
}
