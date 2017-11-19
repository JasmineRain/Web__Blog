$(document).ready(function () {
   //返回顶部
    $('.return').click(function(){
        console.log('click');
        let height=$(document).scrollTop();
        //$().scrollTop(0);
        $("html,body").animate({scrollTop:0},500);
    })

    //编辑
    $('.mes-edit-butt').click(function(){
      console.log('.mes-edit-butt click');
      $('.mes-edit').fadeIn();
      $('.mes-watch').hide();
    })
    //编辑返回
    // $('.mes-edit-return').click(function(){
    //   console.log('.mes-edit-butt click');
    //   $('.mes-edit').hide();
    //   $('.mes-watch').fadeIn();
    // })

    
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

layui.use('upload', function(){
    var upload = layui.upload;
     
    //执行实例
    var uploadInst = upload.render({
      elem: '#per-background' //绑定元素
      ,url: '/upload/' //上传接口
      ,auto:false
      ,bindAction:"mes-edit-push"
      ,choose:function(res){
        console.log("选择文件");
        console.log(res.pushFile());
      }
      ,done: function(res){
        //上传完毕回调
      }
      ,error: function(){
        //请求异常回调
      }
    });
  });

  layui.use('upload', function(){
    var upload = layui.upload;
     
    //执行实例
    var uploadInst = upload.render({
      elem: '#per-icon' //绑定元素
      ,url: '/upload/' //上传接口
      ,auto:false
      ,bindAction:"mes-edit-push"
      ,done: function(res){
        //上传完毕回调
      }
      ,error: function(){
        //请求异常回调
      }
    });
  });

