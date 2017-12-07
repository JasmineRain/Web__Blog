$(function() {
  // $('.search [name=search_content]')
  $('.search .search_submit').click(function() {
    var $content = $('.search [name=search_content]').val();
    if( $content )
      $(location).attr('href', '/search/' + $content);
  })
})


$(function() {
  // $('.search [name=search_content]')
  $('.search .search_submit').click(function() {
    var $content = $('.search [name=search_content_m]').val();
    if( $content )
      $(location).attr('href', '/search/' + $content);
  })
})

