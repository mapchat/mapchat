function() {
  if (0 == $$(this).loading ++) {
    $('#loading').addClass('visible').stop().fadeIn(150);
  }
}
