function(e) {
  e.preventDefault();
  
  var text = $('input[name=search]', this).val();
  
  $(this).trigger('search-query', text);
}
