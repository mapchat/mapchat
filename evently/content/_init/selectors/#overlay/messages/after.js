// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event, options) {
  var msgs = $('#messages', this),
      notification = false,
      $$window = $$(window);
  
  function insert(message) {
    if (!msgs.parents('#overlay:first').length) {
      // Chat window was closed - remove all event listeners
      $(window).unbind('resize', onresize).unbind('keydown', onkeydown);
      return false;
    }
  
    if (notification) $(window).trigger('notification');   
    
    msgs.trigger('message', message).trigger('scrollDown');
    
  }
  
  // Calculate desired height
  function adaptHeight() {        
    msgs.hide().css('height', $(window).height() -
                              (options.submit_form ? 179 : 96)).show();
  }

  $(this).show();    
  $('#text', this).focus();
  
  // We have inserted old messages - can notificate since now!
  notification = true;
  
  $(window).bind('resize', onresize).bind('keydown', onkeydown);
  
  function onresize() {    
    adaptHeight();
    msgs.trigger('scrollDown');
  }
  
  function onkeydown(event) {
    if (event.which == 38) {
      // up
      msgs.stop().animate({scrollTop: '-=100px'});
    } else if (event.which == 40) {
      // down
      msgs.stop().animate({scrollTop: '+=100px'});
    }
  }
  
  options.insertMessage = insert;
}
