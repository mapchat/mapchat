function(doc, req) {
  doc = JSON.parse(req.body);
  
  doc._id = req.uuid;
  doc.created_at = +new Date;
    
  return [doc, {
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(doc)
  }];
}
