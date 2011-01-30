function(messages) {
  var that = $(this),
      options = {};
  
  function insert(e, message) {
    
    if (options.insertMessage(message) === false) {
      changes.stop();
      return;
    }
    
  }

  that.trigger('messages', options);
  
  messages.forEach(function(message) {
    insert(null, message);    
  });

  var changes = $$(window).app.db.changes(0, {
    filter: 'mapchat/mentions',
    name: $$(window).userCtx && $$(window).userCtx.name,
    include_docs: true
  });
  
  changes.onChange(function(response) {
    $.forIn(response.results, function(i, result) {
      var doc = result.doc,
          event_doc = {
            author: doc.author,
            gravatar_url: doc.gravatar_url,
            created_at: doc.created_at,
            text: doc.text
          };
          
      insert(null, event_doc);
    });
  });
  
  $(window).trigger('resize');
  
  // Google analytics
  _gaq.push(['_trackPageview', '#/mentions']);
}
