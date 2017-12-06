/**
 * Created by 14798 on 2017/8/19.
 */

// 文件列表
var imglist = [
    {"name": "birds", "src": "res/birds.png"},
    {"name": "land", "src": "res/land.png"},
    {"name": "pipe1", "src": "res/pipe1.png"},
    {"name": "pipe2", "src": "res/pipe2.png"},
    {"name": "sky", "src": "res/sky.png"}
];
load(imglist, function (imgEls) {
    window.onload = function () {
        var canvas = document.getElementById("cvs");
        var context = canvas.getContext("2d");
        var WINDOW_WIDTH = document.body.clientWidth;
        var WINDOW_HEIGHT = document.body.clientHeight;
       // var PROPORTION = WINDOW_WIDTH / imgEls["sky"].width;
        canvas.width = WINDOW_WIDTH;
        canvas.height = WINDOW_HEIGHT;
        console.log(canvas.width, canvas.width);
        var m=10;

        function run(){
            // 清除屏幕区域
            context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

            var x = 0;
            var y = 0;
            var t = 20;
            var _i=0;
            do {
                drawY(context, Math.ceil(x+m) + 0.5, WINDOW_HEIGHT);
                _i++;
                x = x + t;
                context.fontWeight = "bold";
                context.textAlign = "left";
                context.fillStyle = "#000";
                context.font = 10 + "px microsoft yahei";
                context.fillText(String(_i), x+2+m, 10 );
            } while (x < WINDOW_WIDTH);
            _i=0;
            do {
                drawX(context, Math.ceil(y+m) + 0.5, WINDOW_WIDTH);
                _i++;
                y = y + t;
                context.fontWeight = "bold";
                context.textAlign = "left";
                context.fillStyle = "#000";
                context.font = 10 + "px microsoft yahei";
                context.fillText(String(_i),2, y-2+m);
            } while (y < WINDOW_HEIGHT);

            //var pipel=new Pipe(imgEls["pipe2"], imgEls["pipe1"], 40, 500, 1.5, 0, context);
            //pipel.draw();
            m++;
            if(m!==10){
                requestAnimationFrame(run);
            }else {
                // 清除屏幕区域
                //context.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
            }



        }
        requestAnimationFrame(run);

    };
});

function drawY(cxt,x,length){
    cxt.beginPath();
    cxt.lineWidth=1;
    cxt.moveTo(x,0);
    cxt.lineTo(x,length);
    cxt.stroke();
}
function drawX(cxt,y,length){
    cxt.beginPath();
    cxt.lineWidth=1;
    cxt.moveTo(0,y);
    cxt.lineTo(length,y);
    cxt.stroke();
}