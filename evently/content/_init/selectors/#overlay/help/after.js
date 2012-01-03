// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
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
