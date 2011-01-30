function(doc) {
  // !code vendor/mapchat/lib/convert.js
  // !code helpers/md5.js
  if (doc.type == 'message') {
    emit(toFixed(doc.loc[0], doc.loc[1]).concat([doc.created_at]), {
      author: doc.author,
      gravatar_url: doc.gravatar_url,
      created_at: doc.created_at,
      text: doc.text
    });
  }
}
