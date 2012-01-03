// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var that = $(this),
      data = $$(that),
      $$window = $$(window);

  data.map = $('#map', that);
  data.overlay = $('#overlay', that);
  data.loading = 0;

  var player = $('#clicksound')[0];

  player.autoload = 'auto';
  player.load();

  $$window.muted = false;

  $(window).bind('notification', function() {
    // DOM ERR 11 Fast Fix
    try {
      if (!$$window.muted) {
        // play sound!
        player.pause();
        player.currentTime = 0;
        player.play();
      }
    } catch (e) {
    }

    document.title = 'MapChat - New messages';

    setTimeout(function() {
      document.title = 'MapChat';
    }, 0);
  });

  $(window).bind('leaved-point', function() {
    $$(window).current_point = null;
  });

}
