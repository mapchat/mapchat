// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e) {
  e.preventDefault();
  
  var text = $('input[name=search]', this).val();
  
  $(this).trigger('search-query', text);
}
