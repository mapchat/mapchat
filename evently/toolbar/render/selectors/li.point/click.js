// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e) {   e.preventDefault();    var center = $$(window).map.getCenter(),      Convert = $$(window).app.require('vendor/mapchat/lib/convert'),      fixed = Convert.toFixed(center.lat(), center.lng());    $.pathbinder.go(['/point'].concat(fixed).join('/'));}