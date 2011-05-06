function(head, req) {
  var row;
  start({
    headers: {
      'Content-Type': 'application/json'
    }
  });
  send('[');

  var last = [-1e3, -1e3],
      first = true;

  while (row = getRow()) {
    var current = row.value.loc;
    if (current[0] == last[0] && current[1] == last[1]) continue;

    last = current;

    if (first) {
      send(JSON.stringify(row.value));
      first = false;
    } else {
      send(',');
      send(JSON.stringify(row.value));
    }
  }
  send(']');
}
