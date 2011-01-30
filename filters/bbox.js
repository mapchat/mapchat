// Return only those points that are in bbox
function(doc, req) {  
  if (doc.type === 'message' && doc.loc && req.query.bbox) {
    var bbox = req.query.bbox.split(',', 4);
    if (doc.loc[0] >= +bbox[0] && doc.loc[0] <= +bbox[2] &&
        doc.loc[1] >= +bbox[1] && doc.loc[1] <= +bbox[3]) {
      return true;
    }
  }
  return false;
}
