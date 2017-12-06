$(function() {
  /*判断浏览器支持*/
  if (!window.localStorage) { //
    alert('您的浏览器不支持 localStorage 技术!');
  } else {
    //判断新建与修改
    localStorage.setItem('autosave','1');

    if ($('[name=_id]').length > 0) { //修改文章
      var _id = $('[name=_id]').val();
      console.log('这是旧文章'+_id);
      //查找是否存在当前_id的草稿
      if (!localStorage.getItem(_id)) {} else {
        var content = localStorage.getItem(_id);
        $('[name=content]').val(content);
      }
      saveOldArticle(_id);
    } else { //新建文章
      //查找是否存在new的草稿
      console.log('这是新文章');
      if (!localStorage.getItem('newArticle')) {} else {
        var content = localStorage.getItem('newArticle');
        $('[name=content]').val(content);
      }
      saveNewArticle();
    }
  }
})

function saveNewArticle() {
  if(localStorage.getItem('autosave')=='0'){
    return;
  }
  var newContent = $('[name=content]').val();
  localStorage.setItem('newArticle', newContent);
  setTimeout(saveNewArticle, 5000);
}

function saveOldArticle(_id) {
  if(localStorage.getItem('autosave')=='0'){
    return;
  }
  var newContent = $('[name=content]').val();
  localStorage.setItem(_id, newContent);
  console.log(localStorage.getItem(_id));
  setTimeout(_soa(_id), 5000);
}
function _soa(_id){
  return function(){
    saveOldArticle(_id);
  }
}
