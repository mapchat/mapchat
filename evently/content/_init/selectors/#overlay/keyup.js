function(event) {
  if (event.which == 27) {
    // Esc key
    
    // Return to map from anywhere
    $(this).trigger('map');
  }
}
