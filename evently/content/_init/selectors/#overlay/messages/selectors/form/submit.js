// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e) {
  e.preventDefault();  
  
  var that = $(this),
      text_field = $('input#text', that),
      fields = $('input', that);
      text = text_field.val(),
      loc = $$(that.parents('#overlay')).loc;
  
  // Can't send empty message
  if (!text) return;
  
  // Disable fields
  fields.addClass('disabled').prop('disabled', true);
  
  var userCtx = $$(window).userCtx,
      profile = $$(window).profile;
  
  if (userCtx.name) {
    var doc = {
      type: 'message',
      loc: loc,
      author: userCtx.name,
      gravatar_url: profile && profile.gravatar_url,
      text: text
    };
    
    function complete() {
      // Enable fields
      fields.removeClass('disabled').prop('disabled', false);
      
      // Reset value
      text_field.val('');
    }
    
    $$(window).app.db.saveDoc(doc, {
      update: 'mapchat/message',
      success: function() {
        complete();
        _gaq && _gaq.push(['_trackEvent', 'message', 'posted']);
      },
      error: function(status, error, reason) {
        $.error('Message delivery', 'Failed to send message.\r\n' +
                'Got server error: ' + (reason || ''));
        complete();
        _gaq && _gaq.push(['_trackEvent', 'message', 'failed']);
      }
    });
        
    
  } else {
    $.error('Message delivery', 'Only registered users are able to post messages!\r\n' +
                                'Please <a href="#/login">login</a> first!', true);
  }
}
