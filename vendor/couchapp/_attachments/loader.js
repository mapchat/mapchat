
function couchapp_load(scripts) {
  for (var i=0; i < scripts.length; i++) {
    var src = scripts[i];
      document.write('<script type="text/javascript" async src="' + src + '"><\/script>');
  };
};

couchapp_load([
  "vendor/couchapp/jquery.couch.js",
  "vendor/couchapp/jquery.couch.app.js",
  "vendor/couchapp/jquery.couch.app.util.js",
  "vendor/couchapp/jquery.mustache.js",
  "vendor/couchapp/jquery.pathbinder.js",
  "vendor/couchapp/jquery.evently.js",
  "vendor/couchapp/jquery.evently.couch.js"
]);
