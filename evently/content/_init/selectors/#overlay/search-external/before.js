// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event, params) {
  $(this).trigger('search-query', params.query);

  // Google analytics
  _gaq.push(['_trackPageview', '#/search/' + params.query]);
}
