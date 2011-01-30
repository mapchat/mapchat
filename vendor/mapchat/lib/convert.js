function toFixed(lat, lng) {
  return [+lat.toFixed(2), +lng.toFixed(2)];
}

if (typeof exports !== 'undefined') {
  exports.toFixed = toFixed;
}