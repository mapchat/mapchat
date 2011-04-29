// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event) {
  if (event.which == 27) {
    // Esc key
    
    // Return to map from anywhere
    $(this).trigger('map');
  }
}
