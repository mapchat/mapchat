// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  var overlay = $$(this).overlay.unbind('_init').hide().empty();
  $$(overlay).visible = true;

  // Google analytics
  _gaq.push(['_trackPageview', '#/login']);
}
