$(document).ready(function () {
    $('.return').click(function(){
        console.log('click');
        let height=$(document).scrollTop();
        //$().scrollTop(0);
        $("html,body").animate({scrollTop:0},500);
    })

    // $(window).scroll(function () {
    //     let dy=$('.nav-cahnge').offset().top-$(document).scrollTop();
    //     if(dy<0){
    //        // $('.per-nav').hide();
    //         //$('.per-nav-val').show();
    //        // $('.per-guide-flex').show();
    //        // $('.per-guide').addClass("per-guide-flex");
    //         // $('.per-nav').removeClass("layui-col-md2");
    //         // $('.per-nav-val').show();
            
    //     }else{
    //        // $('.per-nav-val').hide();
    //        // $('.per-nav').show();
    //         //$('.per-guide-flex').hide();
    //         // $('.per-nav').addClass("layui-col-md2");
    //         //$('.per-guide').removeClass("per-guide-flex");
    //         // $('.per-nav-val').hide();
    //     }

    // });
})

