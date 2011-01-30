/**
* Sandboxing for mustache
*/
exports.encode = function(className, size, css) {
  return function() {
    return function(text, render) {
      html = [
        '<!DOCTYPE html><html><body>',
        '<style type="text/css">body{margin:0;padding:0;overflow:hidden}\r\n',
        css,
        '</style>',
        render(text),
        '</body></html>'
      ].join('');

      return '<iframe class="sandbox ' + className + '" ' +
             'src="data:text/html;charset=utf-8;plain,' +
             encodeURIComponent(html) + '" ' +
             (size ? 'style="width: ' + size.width + 'px;' +
                     'height: ' + size.height + 'px;"' : '') + '/>';
    }
  }
};

/**
* Should determine, which browsers will support jsonp-sandboxing
*/
exports.modernBrowser = true;

/**
* Sandboxed jsonp call
*/
exports.jsonp = function(url, callback) {
  if (!exports.modernBrowser) {
    return $.ajax({
      url: url,
      dataType: "jsonp",
      callback: callback
    });
  }
  
  var callbackEvent = 'jsonp-' + Math.floor(Math.random() * 1E9),
      receiver = function(e) {
        try {
          var data = JSON.parse(e.data);
        } catch (e) {
          $.log('Sandboxed JSONP parse error!', e.toString(), e.data);
          return;
        }        
        
        if (!data || data.callbackEvent !== callbackEvent) return;
        
        window.removeEventListener('message', receiver, false);
        iframe.remove();
        callback(data.response);

        return false;
      };

  window.addEventListener('message', receiver, false);

  url = url.replace(/=\?$/, '=callback');

  var html = ['<!DOCTYPE html><html><head><script type="text/javascript">',
  'window.callback = function(data) {',
  '  window.parent.postMessage(JSON.stringify({',
  '    callbackEvent: "' + callbackEvent + '",',
  '    response: data',
  '  }), "' + location.protocol + '//' + location.host + '");',
  '};',
  '</script><script type="text/javascript" src="', url, '"></script>',
  '</head><body></body></html>'].join('\r\n');

  var iframe = $([
    '<iframe class="jsonp-sandbox" src="data:text/html;charset=utf-8;plain,',
    encodeURIComponent(html),
    '" style="display: none" />'
  ].join('')).appendTo('body');
  
  return iframe;
};
