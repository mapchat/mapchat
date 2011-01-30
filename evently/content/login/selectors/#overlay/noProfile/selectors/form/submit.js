function(event) {
  event.preventDefault();
  
  var md5 = $$(this).app.require("vendor/couchapp/lib/md5");
  
  // TODO this can be cleaned up with docForm?
  // it still needs the workflow to edit an existing profile
  var name = $("input[name=userCtxName]",this).val(),
      email = $("input[name=email]",this).val(),
      newProfile = {    
        url : $("input[name=url]",this).val()
      },
      rand = Math.random().toString(),
      widget = $(this);

  // setup gravatar_url
  if (md5) {
    newProfile.gravatar_url = md5.hex(email || rand);    
  }
  
  widget.trigger('startload');
  
  // store the user profile on the user account document
  $.couch.userDb(function(db) {
    var userDocId = "org.couchdb.user:"+name;
    db.openDoc(userDocId, {
      success : function(userDoc) {
        userDoc["couch.app.profile"] = newProfile;
        db.saveDoc(userDoc, {
          success : function() {
            newProfile.name = userDoc.name;
            $$(window).profile = $$(widget).profile = newProfile;
            widget.trigger('endload').trigger("profileReady", [newProfile]);
          },
          error: function(status, error, reason) {
            $.error('Saving profile', 'Saving new version failed! Reason:' + reason);
            widget.trigger('endload');
          }
        });
      },
      error: function(status, error, reason) {
        $.error('Saving profile', 'Loading previous version failed! Reason:' + reason);
        widget.trigger('endload');
      }
    });
  });
  
  return false;
}
