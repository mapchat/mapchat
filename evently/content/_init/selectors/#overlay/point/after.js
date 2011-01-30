function(messages) {
  var that = $(this),
      loc = $$(this).loc.join('-').replace(/\./g, '-'),
      options = {},
      url = encodeURIComponent('http://' + location.host + location.pathname +
                               '?hash=' + location.hash.replace(/^#/, ''));
  
  options.submit_form ={
    url: url,
    twitter_code: '<a href="http://twitter.com/share?url=' + url + '" class="twitter-share-button" data-text="Talk with me at #MapChat !" data-count="none">Tweet</a><script type="text/javascript" src="http://platform.twitter.com/widgets.js"></script>',
    twitter_sandbox: $$(window).app.require('vendor/mapchat/lib/sandbox').encode('twitter-sandbox', {
      width: 55,
      height: 20
    }, '')
  };
  
  function insert(e, message) {
    if (options.insertMessage(message) === false) {
      $(window).unbind('chat-message-' + loc, insert);
      return;
    }
    
    $$().set(loc, {
      updated_at: message.created_at
    });
  }

  that.trigger('messages', options);
  
  messages.forEach(function(message) {
    insert(null, message);    
  });
  
  
  $(window).bind('chat-message-' + loc, insert);
  $(window).trigger('resize');
  
  $$(window).current_point = loc;  
}
