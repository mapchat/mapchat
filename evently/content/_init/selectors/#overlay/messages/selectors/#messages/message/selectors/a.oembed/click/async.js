function(callback) {
  var url = 'http://api.embed.ly/1/oembed?url=' + $(this).attr('href') +
            '&maxwidth=500&callback=?';

  $$(window).app.require('vendor/mapchat/lib/sandbox').jsonp(url, callback);
}
