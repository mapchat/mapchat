function(doc) {
  if (doc.type === 'message' && doc.text) {
    doc.text.replace(/(?:^|\s)@([^\s]+)(?:\s|$)/g, function(all, username) {
      emit([username, doc.created_at], {
        author: doc.author,
        gravatar_url: doc.gravatar_url,
        created_at: doc.created_at,
        text: doc.text
      });
    });
  }
}
