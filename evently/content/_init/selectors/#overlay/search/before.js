// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  $(this).unbind('_init');
  
  $$(this).visible = true;
  
  // Google analytics
  _gaq.push(['_trackPageview', '#/search']);
}
