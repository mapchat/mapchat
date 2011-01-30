function() {
  $(window).trigger('leaved-point');
  $(this).trigger('render', {
    point: true,
    login: true,
    home: true
  });
}
