// This file is part of mapchat released under Apache License, Version 2.0.
// See the NOTICE for more information.
function(e, r) {
  return {
    name : r.userCtx.name,
    uri_name : encodeURIComponent(r.userCtx.name),
    auth_db : encodeURIComponent(r.info.authentication_db)
  };
}