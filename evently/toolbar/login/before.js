function() {
  $(window).trigger('leaved-point');
  $(this).trigger('render', {
    point: true,
    search: true,
    home: true
  });
}
