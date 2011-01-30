function() {
  $(this).unbind('_init');
  
  $$(this).visible = true;
  
  // Google analytics
  _gaq.push(['_trackPageview', '#/search']);
}
