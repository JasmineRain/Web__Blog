//numbering for pre>code blocks
$(function(){
    $('pre code').each(function(){
        var lines = $(this).text().split('\n').length - 1;
        var $numbering = $('<ul/>').addClass('pre-numbering');
        $(this)
            .addClass('has-numbering')
            .parent()
            .append($numbering);
        for(i=1;i<=lines;i++){
            $numbering.append($('<li/>').text(i));
        }
    });
});

$(document).ready(function () {
    $('#del').click(function () {
        var target = $('#del');
        var aid = target.data('aid');
        $.ajax({
            type:'get',
            url:'/article/delete?aid='+aid
        }).done(function(results) {
            //将前端的文章项目删除
            console.log(results);
        })
    })
});