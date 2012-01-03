// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var context = this,
      that = $(this)

  getCoordinates(function(center) {
    var map = new google.maps.Map(context, {
      center: center || new google.maps.LatLng(45, 45),
      mapTypeId: 'OSM',
      mapTypeControl: false,
      streetViewControl: false,
      disableDoubleClickZoom: true,
      zoom: 8
    });

    map.mapTypes.set("OSM", new google.maps.ImageMapType({
      getTileUrl: function(coord, zoom) {
        return "http://tile.openstreetmap.org/" + zoom + "/" +
               coord.x + "/" + coord.y + ".png";
      },
      tileSize: new google.maps.Size(256, 256),
      name: "OpenStreetMap",
      maxZoom: 18
    }));

    $$(window).map = map;
    $$(window).geo = new google.maps.Geocoder();
    $$(window).points = {};

    $(window).trigger('mapready');

    var timeout;

    google.maps.event.addListener(map, 'idle', function() {
      // prevent executing idle too often
      timeout && clearTimeout(timeout);
      timeout = setTimeout(function() {
        that.trigger('idle');
      }, 1000);
    });

    google.maps.event.addListener(map, 'dblclick', function(event) {
      map.setCenter(event.latLng);
      $('#toolbar li.point').click();

      // Google analytics
      _gaq.push(['_trackEvent', 'map', 'dblclick']);
    });
  });

  function getCoordinates(finish) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(a) {
        finish(new google.maps.LatLng(
          a.coords.latitude,
          a.coords.longitude
        ));
      }, function() {
        finish();
      }, {timeout: 2000});
    } else {
      finish();
    }
  }
}
