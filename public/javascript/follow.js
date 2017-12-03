$(document).ready(function () {
    $('#follow').click(function () {
        var target = $('#follow');
        var state = target.data('state');
        var tid = target.data('tid');
        if(state===1){
            console.log('unfollow');
            $.ajax({
                type:'get',
                url:'/follow/add?tid='+tid+'&op=1'
            }).done(function(results) {
                if(results.success===1){
                    target.html('关注') ;
                    target.data("state",0);
                }
                else if(results.success===0){
                    target.html('关注失败');

                }
            })
        }else{
            console.log('follow');
            $.ajax({
                type:'get',
                url:'/follow/add?tid='+tid+'&op=0'
            }).done(function(results) {
                if(results.success===1){
                    target.html('已关注') ;
                    target.data("state",1);
                }
                else if(results.success===0){
                    target.html('关注失败');
                }
            })
        }

    });
});