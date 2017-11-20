$(document).ready(function () {
  //返回顶部
  $('.return').click(function () {
    console.log('click');
    let height = $(document).scrollTop();
    //$().scrollTop(0);
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  })

  //编辑
  $('.mes-edit-butt').click(function () {
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

  layui.use('form', function () {
    var form = layui.form;

    form.on('submit(perFormPush)', function (data) {
      console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
      console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
      console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
      //return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  });
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

layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#per-background' //绑定元素
      ,
    url: '/upload/' //上传接口
      ,
    auto: false,
    bindAction: "mes-edit-push",
    choose: function (obj) {
      console.log('文件选择');
      obj.preview(function (index, file, result) {
        $('.per-background')[0].src = result;
        $('.per-background-hide').show();
      });
    },
    done: function (res) {
      //上传完毕回调
    },
    error: function () {
      //请求异常回调
    }
  });
});

layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#per-avatar' //绑定元素
      ,
    url: '/upload/' //上传接口
      ,
    auto: false,
    bindAction: "mes-edit-push",
    choose: function (obj) {
      obj.preview(function (index, file, result) {
        $('.per-avatar')[0].src = result;
        $('.per-avatar-hide').show();
      });
    },
    done: function (res) {
      //上传完毕回调
    },
    error: function () {
      //请求异常回调
    }
  });
});