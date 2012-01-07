// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function toFixed(lat, lng) {
  lat = +lat.toFixed(3);
  lng = +lng.toFixed(3);

  if (/\.\d\d0$/.test(lat)) lat = lat.slice(0, -1);
  if (/\.\d\d0$/.test(lng)) lng = lng.slice(0, -1);

  return [+lat.toFixed(3), +lng.toFixed(3)];
}

if (typeof exports !== 'undefined') {
  exports.toFixed = toFixed;
}
