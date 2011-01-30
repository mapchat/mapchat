function() {
  if (0 == --$$(this).loading) {
    $('#loading').removeClass('visible').stop().fadeOut(150);
  }
}
