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

//文章图片上传
//背景上传
layui.use('upload', function () {
  var upload = layui.upload;

  //执行实例
  var uploadInst = upload.render({
    elem: '#per-articleImg', //绑定元素
    url: '/upload/articleImg/', //上传接口
    field: 'articleImg',
    before: function (obj) { //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
      layer.load(); //上传loading
    },
    done: function (res) {
      //上传完毕回调
      layer.closeAll('loading'); //关闭loading
      //假设code=0代表上传成功
      if (res.code == 0) {
        //图片预览

        console.log(location)
      //弹窗提示
      layer.open({
        content: '链接为\n'+location.origin+'\\'+res.path,
        btn: ['确定', '取消'],
        yes: function (index, layero) {
          layer.close(index); //如果设定了yes回调，需进行手工关闭
        },
        btn2: function (index, layero) {},
        cancel: function () {}
      });









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