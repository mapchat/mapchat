function(event) {
  event.preventDefault();

  $$(window).muted = $(this).toggleClass('muted').hasClass('muted');
}
