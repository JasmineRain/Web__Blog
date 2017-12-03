$(document).ready(function () {
    $('#follow').click(function (e) {
        var target = $('#follow');
        var tid = target.data('tid');
        $.ajax({
            type:'get',
            url:'/follow/add?tid='+tid
        }).done(function(results) {
            console.log(target);
            if(results.success===1){
                target.html('已关注') ;
            }
            else if(results.success===0){
                target.html('关注失败');
            }
        })
    });
});