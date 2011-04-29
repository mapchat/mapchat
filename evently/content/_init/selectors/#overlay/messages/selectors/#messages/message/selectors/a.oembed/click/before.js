// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
    $(this).hide();
  }
}
