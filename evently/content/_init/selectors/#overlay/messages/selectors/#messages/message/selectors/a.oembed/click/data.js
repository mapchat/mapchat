function(widget) { 
  return {
    widget: widget,
    sandbox: widget.type == 'photo' ? 
        {
          html: $.mustache('<img src="{{url}}" width="{{width}}" height="{{height}}" />',
                           widget)
        }
        :
        $$(window).app.require('vendor/mapchat/lib/sandbox').encode(
          (widget.provider_name || 'none').replace(/[^a-z]+/g, 'o'),
          {
            width: widget.width,
            height: widget.height
          }, '')
  };
}
