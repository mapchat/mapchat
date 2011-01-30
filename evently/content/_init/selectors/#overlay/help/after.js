function() {
  var that = $(this).show(),
      help = $('#help', that);

  // Calculate desired height
  function adaptHeight() {        
    help.hide().css('height', $(window).height() - 100).show();
  }
  
  $(window).resize(adaptHeight);
  adaptHeight();


  // Display only first-time
  $$().set('nohelp', {
    value: !$(this).is(':checked')
  });

}
