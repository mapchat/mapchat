function(doc) {
  // just for hash change if that matters
  if (doc.type == 'message' && Array.isArray(doc.loc)) {
    emit({ type: 'Point', coordinates: doc.loc},
         {loc: doc.loc, created_at: doc.created_at});
  }
};
