// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var that = $(this);
  
  // Take some 'idle' to processor
  setTimeout(function() {
    that.trigger('scrollDown');
  }, 0);

}
