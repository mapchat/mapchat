// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function() {
  $(window).trigger('leaved-point');

  $(this).trigger('render', {
    point: true,
    search: true,
    login: true
  });
}
