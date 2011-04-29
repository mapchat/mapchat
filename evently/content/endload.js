// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  if (0 == --$$(this).loading) {
    $('#loading').removeClass('visible').stop().fadeOut(150);
  }
}
