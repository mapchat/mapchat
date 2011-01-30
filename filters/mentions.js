// Return only mentions of req.query.name user
function(doc, req) {  
  if (doc.type === 'message' && doc.text && req.query.name) {
    return (doc.text.match(/\B@[^\s]+\b/g) || [])
              .indexOf('@' + req.query.name) >= 0;
  }
  return false;
}
