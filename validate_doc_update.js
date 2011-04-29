// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function (newDoc, oldDoc, userCtx, secObj) {
  var v = require("lib/validate").init(newDoc, oldDoc, userCtx, secObj);

  // admins or owner can always delete
  if (v.isAdmin()) return true;
  if (newDoc._deleted) v.forbidden('Messages can\'t be deleted!');

  v.unchanged("type");
  v.unchanged("author");
  v.unchanged("created_at");
  
  if (newDoc.created_at) v.isNumber("created_at");

  // docs with authors can only be saved by their author
  // admin can author anything...
  if (!v.isAdmin() && newDoc.author && newDoc.author != userCtx.name) {    
    v.unauthorized("Only " + newDoc.author + " may edit this document.");
  }
  
  if (newDoc.type == 'message') {
    v.require("loc", "text", "created_at");
    if (newDoc.text.length <= 0) v.forbidden("Message text can't be empty");
    if (newDoc.text.length > 140) v.forbidden("Maximum message length is 140");
  }
}
