/**
 * Created by Administrator on 2016/8/23 0023.
 */
function  load (source, callback ){
    var imgEls={};
    var imgCount=source.length;
    for (var i = 0; i < imgCount; i++) {
        var name =  source[i].name;
        var newImg = new Image ();
        newImg.src = source[i].src;
        imgEls[name] = newImg;
        imgEls[name].addEventListener("load",function(){
                imgCount--;
                if(imgCount===0){
                    console.log('1');
                    console.log(imgEls);
                callback(imgEls);
            }
        })
    }
}

