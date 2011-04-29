// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event) {
  event.preventDefault();

  $$(window).muted = $(this).toggleClass('muted').hasClass('muted');
}
