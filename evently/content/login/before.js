function() {
  var overlay = $$(this).overlay.unbind('_init').hide().empty();
  $$(overlay).visible = true;
  
  // Google analytics
  _gaq.push(['_trackPageview', '#/login']);
}
