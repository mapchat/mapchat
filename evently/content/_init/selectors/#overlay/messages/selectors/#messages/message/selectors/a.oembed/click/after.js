function() {
  var that = $(this);
  
  // Take some 'idle' to processor
  setTimeout(function() {
    that.trigger('scrollDown');
  }, 0);

}
