function(event) {
  if (event && event.preventDefault) {
    event.preventDefault();
    $(this).hide();
  }
}
