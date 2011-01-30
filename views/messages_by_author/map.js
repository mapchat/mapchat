function(doc) {
  // !code vendor/mapchat/lib/convert.js  
  if (doc.type == 'message') {
    emit([doc.author, doc.created_at], {
      loc: toFixed(doc.loc[0], doc.loc[1])
    });
  }
}
