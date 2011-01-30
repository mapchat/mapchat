function(e, message) {
  var style = $$(this).app.require('vendor/mapchat/lib/style'),
      md5 = $$(this).app.require("vendor/couchapp/lib/md5"),
      today = +new Date,
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
                'Sep', 'Oct', 'Nov', 'Dec'];
  
  message.gravatar_url = message.gravatar_url || md5.hex(message.author);
  
  var date = new Date(message.created_at);
  
  // If message was posted not today - display post date
  if (today - message.created_at > ((today % 864e5) || 864e5)) {
    message.date = date.getDate() + ' ' + (months[date.getMonth()] || 'ufo');
  } else {
    // else post time
    
    function twodigits(s) {
      return s < 10 ? '0' + s : s;
    };
    
    message.date = twodigits(date.getHours()) + ':' + twodigits(date.getMinutes());
  }
  
  return {
    render: function() {
      return function(text, render) {
        return style.encode(render(text), render);
      };
    },
    message: message
  };
}
