// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e) {
  var name = $('input[name=name]', this).val(),
    pass = $('input[name=password]', this).val();
  $(this).trigger('doSignup', [name, pass]);
  return false;
}
