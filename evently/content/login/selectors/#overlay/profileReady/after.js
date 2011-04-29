// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e, p) {
  // Google analytics
  _gaq.push(['_trackEvent', 'profile', 'saved']);

  $$(this).profile = p;
};
