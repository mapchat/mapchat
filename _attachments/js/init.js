window.onload = function() {
  var finished = 0;
    
  $.error = function(title, msg, html) {
    var dialog = $('<div />').attr('title', title)[html ? 'html' : 'text'](msg).dialog({
      modal: true
    });
    dialog.find('a').click(function() {
      dialog.dialog('close');
    });
  };
  
  $.couch.app(function(app) {
    $$(window).app = app;
    loaded();
  }, {
    db : "mapchat",
    design : "mapchat"
  });
  
  
  $.couch.profileSession = function(callback) {
    $.couch.session({
      success : function(r) {
        // Expose userCtx
        $$(window).userCtx = r.userCtx;

        var db = $.couch.db(r.info.authentication_db),
            userDocId = "org.couchdb.user:" + r.userCtx.name;
        
        if (!r.userCtx.name) return callback(r.userCtx, null);
        
        db.openDoc(userDocId, {
          success : function(userDoc) {
            var profile = $$(window).profile = userDoc["couch.app.profile"];
            
            callback(r.userCtx, profile);
          }
        });
      }
    });
  };
  
  // Initialy we want to know if user is logined or not
  $.couch.profileSession(loaded);
  
  function loaded() {    
    if (2 == ++finished) {
      var app = $$(window).app,
          hash = location.hash.replace(/^#/, '');
      
      location.href.replace(/hash=([^&]+)/, function(all, url_hash) {
        hash = decodeURIComponent(url_hash);
        if (window.history) {
          window.history.replaceState({}, 'main page', '/');
        }
      });
      
      $.pathbinder.go('/');
      
      $(window).bind('mapready', function() {
        $.pathbinder.go(hash || ($$().get('nohelp').value ? hash : '/help'));
      });
      
      $('#toolbar').evently('toolbar', app);
      $('#content').evently('content', app);
      
    }
  }
};
