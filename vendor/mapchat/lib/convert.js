// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function toFixed(lat, lng) {
  return [+lat.toFixed(2), +lng.toFixed(2)];
}

if (typeof exports !== 'undefined') {
  exports.toFixed = toFixed;
}
