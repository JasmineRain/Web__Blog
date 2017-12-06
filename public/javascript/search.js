$(function() {
  // $('.search [name=search_content]')
  $('.search .search_submit').click(function() {
    var $content = $('.search [name=search_content]').val();
    $(location).attr('href', '/search/' + $content);
  })
})
