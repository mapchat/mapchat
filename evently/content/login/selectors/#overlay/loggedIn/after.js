// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e, r) {
  $$(this).userCtx = r.userCtx;
  $$(this).info = r.info;

  var userCtx = r.userCtx,
      widget = $(this),
      db = $.couch.db(r.info.authentication_db),
      userDocId = "org.couchdb.user:" + userCtx.name;

  db.openDoc(userDocId, {
    success : function(userDoc) {
      var profile = $$(window).profile = userDoc["couch.app.profile"];
      if (profile) {
        // we copy the name to the profile so it can be used later
        // without publishing the entire userdoc (roles, pass, etc)
        profile.name = userDoc.name;
        $$(widget).profile = profile;
        widget.trigger("profileReady", [profile]);
      } else {
        widget.trigger("noProfile");
      }
    }
  });

};
