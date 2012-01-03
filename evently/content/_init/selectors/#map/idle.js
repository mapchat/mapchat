// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var $$window = $$(window),
      map = $$window.map,
      points = $$window.points,
      bounds = map.getBounds(),
      storage = $$(this),
      app = storage.app,
      that = $(this),
      icon_url = location.host == 'mapchat.me' ?
                     RESOURCES_FOLDER + 'images/iconset.png' :
                     app.db.uri + app.ddoc._id + '/images/iconset.png',
      read_icon = new google.maps.MarkerImage(
                icon_url,
                new google.maps.Size(32, 32, 'px', 'px'),
                new google.maps.Point(128, 0)
             ),
      unread_icon = new google.maps.MarkerImage(
                icon_url,
                new google.maps.Size(32, 32, 'px', 'px'),
                new google.maps.Point(304, 0)
              );

  storage._changes && storage._changes.stop();

  storage._changes = storage.app.db.changes(storage.last_seq || 0, {
    filter: 'mapchat/bbox',
    bbox: bounds.toUrlValue(),
    include_docs: true
  });

  app.db.getDbProperty('_design/mapchat/_spatial/_list/grouped/messages', {
    success: function(response) {
      onChange({
        results: response.map(function(row) {
          return {doc: row};
        })
      }, true);
    },
    error: function(status, error, reason) {
      $.error('Points delivery', 'Failed to get points in current viewport.\r\n' +
              'Got server error: ' + (reason || ''));
    },
    bbox: bounds.toUrlValue(),
    plane_bounds: '-90,-180,90,180'
  });

  function onChange(response, bootstrap) {
    if (!response || !response.results) return;

    if (response.last_seq) storage.last_seq = response.last_seq;

    $.forIn(response.results, function(i, result) {
      var doc = result.doc,
          id = doc.loc.join('-'),
          event_id = doc.loc.join('-').replace(/\./g, '-'),
          event_doc = {
            author: doc.author,
            gravatar_url: doc.gravatar_url,
            created_at: doc.created_at,
            text: doc.text
          },
          updated_at = ($$().get(event_id).updated_at || 0);

      if (!bootstrap) {
        // Trigger point listeners if exists
        $(window).trigger('chat-message-' + event_id, event_doc);
      }

      // If point exists - no need to create marker
      if (points[id]) {
        // Just animate it and return
        var point = points[id],
            marker = point.marker;

        if (point.last_updated == updated_at ||
            point.last_updated >= doc.created_at ||
            updated_at >= doc.created_at) {
          return;
        }

        point.created_at = doc.created_at;
        point.last_updated = updated_at;

        if (!marker.getAnimation() && event_id !== $$window.current_point) {

          marker.setAnimation(google.maps.Animation.BOUNCE);
          marker.setIcon(unread_icon);

          setTimeout(function() {
            marker.setAnimation(null);
          }, 4000);
        }
      } else {

        var is_fresh = doc.created_at > updated_at,
            marker = new google.maps.Marker({
              icon: is_fresh ? unread_icon : read_icon,
              position: new google.maps.LatLng(doc.loc[0], doc.loc[1]),
              map: map
            });

        google.maps.event.addListener(marker, 'click', function() {
          $.pathbinder.go(['/point', doc.loc[0], doc.loc[1]].join('/'));
          marker.setIcon(read_icon);
        });

        points[id] = {
          marker: marker,
          created_at: doc.created_at,
          last_updated: updated_at || doc.created_at
        };
      }

    });
  }

  storage._changes.onChange(onChange);
}
