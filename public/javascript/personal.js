$(document).ready(function () {
  //返回顶部
  $('.return-top').click(function () {
    console.log('click');
    let height = $(document).scrollTop();
    //$().scrollTop(0);
    $("html,body").animate({
      scrollTop: 0
    }, 500);
  })
  //删除文章
  $('.article-delete').click(function () {
    let id = $(this).data('id');
    console.log('.article-delete',$(this).data('id'))
    layui.use('layer', function () {
      var layer = layui.layer;
      //弹窗提示
      layer.open({
        content: '删除文章操作不可恢复！是否继续删除?',
        btn: ['确定', '取消'],
        yes: function (index, layero) {
          $.ajax({
            type: 'get',
            url: '/article/delete?aid=' + id
          }).done(function (results) {
            if (results.success === 1) {
             
              //前端删除所有相关文章
              $('.per-post1').each(function () {
                console.log('delete',$(this).data('id'))
                if ($(this).data('id') === id) {
                  console.log('删除文章操作不可恢复！是否继续删除ok')
                  $(this).parent().fadeOut();
                }
              })
              layer.msg('删除成功！');
            } else if (results.success === 0) {
              layer.msg('删除失败！');
            }
          })
          layer.close(index); //如果设定了yes回调，需进行手工关闭
        },
        btn2: function (index, layero) {},
        cancel: function () {}
      });
    });
  })

  //取消关注
  $('.per-atten-cancel').click(function () {
    let name = $(this).data('name');
    let id = $(this).data('id');


    layui.use('layer', function () {
      var layer = layui.layer;
      //弹窗提示
      layer.open({
        content: '确认取消关注' + name + '?',
        btn: ['确定', '取消'],
        yes: function (index, layero) {
          $.ajax({
            type: 'get',
            url: '/follow/add?tid=' + id + '&op=1'
          }).done(function (results) {
            if (results.success === 1) {
              //前端删除所有相关文章
              $('.per-attention').each(function () {
                if ($(this).data('id') === id) {
                  $(this).parent().fadeOut();
                }
              })
              layer.msg('取关成功！');
            } else if (results.success === 0) {
              layer.msg('取关失败！');
            }
          })
          layer.close(index); //如果设定了yes回调，需进行手工关闭
        },
        btn2: function (index, layero) {},
        cancel: function () {}
      });
    });
  });

  //点赞
  $('.per-atten-praise').click(function () {
    let id = $(this).data('id');
    let thisd = $(this);
    $.ajax({
      type: 'get',
      url: '/personal/giveApplause/' + id
    }).done(function (results) {
      if (results.success === 1) {
        //前端增加点赞数
        let num = thisd.find('.applausec').html();
        num = parseInt(num) + 1
        thisd.find('.applausec').html(num)

        layer.msg('点赞成功！');
      } else if (results.success === 0) {
        layer.msg('点赞失败！');
      }
    });
  });

  //编辑
  $('.mes-edit-butt').click(function () {
    console.log('.mes-edit-butt click');
    $('.mes-edit').fadeIn();
    $('.mes-watch').hide();
  })

  layui.use('form', function () {
    var form = layui.form;

    form.on('submit(perFormPush)', function (data) {
      //console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
      //console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回
      console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
      //return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
  });

  //导航栏重定位
  let scrollFlag = true;

  $(window).scroll(function () {
    if ($('.nav-cahnge').offset()) {
      let dy = $('.nav-cahnge').offset().top - $(document).scrollTop();
      if (dy < 0 && scrollFlag) {
        console.log("改变导航栏");
        scrollFlag = false;
        $('.per-guide').addClass("per-guide-flex layui-col-md8");
        $('.per-guide-in').addClass("layui-col-md2");
      } else if (dy > 0 && !scrollFlag) {
        console.log("恢复导航栏");
        scrollFlag = true;
        $('.per-guide').removeClass("per-guide-flex layui-col-md8");
        $('.per-guide-in').removeClass("layui-col-md2");
      }
    }

  });


})

//背景上传
layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#per-background', //绑定元素
    url: '/upload/background/', //上传接口
    field: 'background',
    before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
      layer.load(); //上传loading
    },
    done: function (res) {
      //上传完毕回调
      layer.closeAll('loading'); //关闭loading
      //假设code=0代表上传成功
      if (res.code == 0) {
        //图片预览
        layui.use('layer', function () {
          var layer = layui.layer;
          layer.msg('背景更改成功');
        });

        console.log($('.per-head-background')[0]);
        //应用变化
        $('.per-head-background')[0].src = ("\\" + res.path);
      }
    },
    error: function () {
      //上传完毕回调
      layer.closeAll('loading'); //关闭loading
      //请求异常回调
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg('背景更改失败');
      });
    }
  });
});

//头像上传
layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#per-avatar', //绑定元素
    url: '/upload/avatar/', //上传接口
    field: 'avatar',
    before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
      layer.load(); //上传loading
    },
    done: function (res) {
      //上传完毕回调
      layer.closeAll('loading'); //关闭loading
      //假设code=0代表上传成功
      if (res.code == 0) {
        layui.use('layer', function () {
          var layer = layui.layer;
          layer.msg('头像更改成功');
        });

        //应用变化
        $('.per-head-avatar')[0].src = ("\\" + res.path);
        //$('.nav-avatar')[0].src = ("\\" + res.path);
      }
    },
    error: function () {
      //上传完毕回调
      layer.closeAll('loading'); //关闭loading
      //请求异常回调
      layui.use('layer', function () {
        var layer = layui.layer;
        layer.msg('头像更改失败');
      });
    }
  });
});