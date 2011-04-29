// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(callback) {
  var url = 'http://api.embed.ly/1/oembed?url=' + $(this).attr('href') +
            '&maxwidth=500&callback=?';

  $$(window).app.require('vendor/mapchat/lib/sandbox').jsonp(url, callback);
}
