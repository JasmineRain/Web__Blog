
var imglist = [
    {"name": "birds", "src": "/img/birds.png"},
    {"name": "land", "src": "/img/land.png"},
    {"name": "pipe1", "src": "/img/pipe1.png"},
    {"name": "pipe2", "src": "/img/pipe2.png"},
    {"name": "sky", "src": "/img/sky.png"}
];
load(imglist, function (imgEls) {
    var cvs = document.getElementById("cvs");
    var ctx = cvs.getContext("2d");

    var audioT=false;
    var flag = IsPC();
    var sfx_wing = document.getElementById("sfx_wing");
    var sfx_die = document.getElementById("sfx_die");
    var sfx_hit = document.getElementById("sfx_hit");
    var sfx_point = document.getElementById("sfx_point");
    var sfx_swooshing = document.getElementById("sfx_swooshing");

    var getPixelRatio = function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    };
    var ratio = getPixelRatio(ctx);

    // 一些数据初始化
    // 小鸟的初始速度、重力加速度
    var birdSpeed = 0;
    var birdA = 0.0004;
    var birdR = 26;
    var clickSpeed = -0.2;

    // 天空、地面、管道设置
    var landSpeed = -0.1;
    var pipe1Speed = -0.1;
    var pipelWidth = 200;
    var wheight = 120;

    // 天空绘制坐标
    var skyX = 0;
    var skyY = 0;
    // 地面绘制坐标
    var landY = 0;

    // 小鸟绘制坐标以及飞行区域
    var birdY = 0;
    var drawHeight = 0;

    // 管道以及地面的数量
    var landNum = 0;
    var pipeNum = 0;

    // 游戏状态
    var click = true;// 可点击
    var firstLoad = true;// 初次游戏标志位
    var gameOver = true;// 游戏结束标志位
    var clickOver = false;// 点击结束

    // 缩放比例
    var PROPORTION;

    // 前一次时间
    var preTime = 0;


    if(!flag){
        audioT=false;
        birdA = 0.0004;
        clickSpeed = -0.2;
        wheight = 150;
    }


    // 首次屏幕加载
    window.onload = function () {
        //获得屏宽高
        var P_WINDOW_WIDTH = document.body.clientWidth;
        var P_WINDOW_HEIGHT = document.body.clientHeight;
        //设置全屏显示
        cvs.style.width = P_WINDOW_WIDTH + "px";
        cvs.style.height = P_WINDOW_HEIGHT + "px";

        var WINDOW_WIDTH = P_WINDOW_WIDTH * ratio;
        var WINDOW_HEIGHT = P_WINDOW_HEIGHT * ratio;

        cvs.width = WINDOW_WIDTH;
        cvs.height = WINDOW_HEIGHT;

        //屏幕长宽对比判断
        if (WINDOW_WIDTH > WINDOW_HEIGHT) {
            PROPORTION = WINDOW_WIDTH / imgEls["sky"].width;
            skyY = (PROPORTION * imgEls["sky"].height - WINDOW_HEIGHT) * 2 / 3;
            if (WINDOW_HEIGHT / 5 < imgEls["land"].height * PROPORTION) {
                landY = WINDOW_HEIGHT * 4 / 5;
            } else {
                landY = WINDOW_HEIGHT - imgEls["land"].height * PROPORTION;
            }
            birdY = landY / 2;
        } else {
            PROPORTION = WINDOW_HEIGHT / imgEls["sky"].height;
            landY = WINDOW_HEIGHT - imgEls["land"].height * PROPORTION;
            birdY = WINDOW_HEIGHT / 2;
        }

        landNum = Math.ceil(WINDOW_WIDTH / (imgEls["land"].width * PROPORTION) + 2);
        pipeNum = Math.ceil(WINDOW_WIDTH / (pipelWidth * PROPORTION) + 2);
        drawHeight = landY;

        // 游戏开始！
        preTime = Date.now();
        start(imgEls);

        //游戏开始函数
        function start(imgEls) {
            //非第一次玩时
            if (!firstLoad) {
                birdSpeed = clickSpeed;
            }
            //新建天空背景图
            var sky1 = new Sky(imgEls["sky"], skyX, skyY, PROPORTION, 0, ctx);
            //新建地面
            var lands = [];
            for (var i = 0; i < landNum; i++) {
                lands[i] = new Land(imgEls["land"], i, landY, PROPORTION, landSpeed, ctx);
            }
            // 地面设置
            lands[0].setCount(landNum);
            //新建管道
            var pipes = [];
            for (var j = 0; j < pipeNum; j++) {
                pipes[j] = new Pipe(imgEls["pipe2"], imgEls["pipe1"], (3 + j) * pipelWidth, drawHeight, wheight, PROPORTION, pipe1Speed, ctx,sfx_point,audioT);
            }
            // 管道设置
            pipes[0].setCount(pipeNum, pipelWidth);
            // 通过管道来计分
            pipes[0].setScore(0);
            // 小鸟初始化
            var bird = new Bird(imgEls["birds"], WINDOW_WIDTH / 4, birdY, PROPORTION, birdSpeed, birdA, ctx);

            // 开始绘制！
            //动画循环循环
            function run() {
                var now = Date.now();
                var dt = now - preTime; // 毫秒差
                preTime = now;

                // 清除屏幕区域
                ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
                //--------图片绘制区域-------
                sky1.draw();
                pipes.forEach(function (pipe) {
                    if (!clickOver) {
                        pipe.update(dt);
                    }
                    pipe.draw();
                });
                lands.forEach(function (land) {
                    if (!clickOver) {
                        land.update(dt);
                    }
                    land.draw();
                });
                if (!firstLoad) {
                    bird.update(dt);
                }
                bird.draw();


                if (!gameOver) {
                    // 分数显示
                    ctx.fillText(pipes[0].getScore(), WINDOW_WIDTH / 2, WINDOW_HEIGHT / 6);
                    // 碰到天和地
                    if (bird.y <= drawHeight / 20) {
                        click = false;
                    }
                    else if (!click && !clickOver) {
                        click = true;
                    }
                    if (bird.y >= landY - 35 * PROPORTION / 2) {
                        bird.y = landY - 35 * PROPORTION / 2;
                        if(!clickOver&&audioT){
                            sfx_hit.play();
                        }
                        gameOver = true;
                        requestAnimationFrame(run);
                    }
                    // 管道碰撞检测
                    if(!clickOver){
                        for (var m = 0; m < pipes.length; m++) {
                            if (pipes[m].hitTest(bird.x, bird.y, birdR)) {
                                clickOver = true;
                                click = false;
                                if(audioT){
                                    sfx_hit.play();
                                    setTimeout(function(){sfx_die.play()},400);
                                }
                                break;
                            }
                        }
                    }

                    requestAnimationFrame(run);
                }
                else if (!firstLoad) {
                    end(ctx, pipes);
                } else {
                    firstStart(ctx);
                }
            }

            requestAnimationFrame(run);


            //设置点击事件。给小鸟一个瞬时的向上速度
            cvs.addEventListener("click", function (event) {
                event.stopPropagation();
                haveClick();
            });
            document.onkeydown = function (event) {
                event.preventDefault();
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if (e && e.keyCode === 32) { // 按空格
                    haveClick();
                }
            };

            // 点击触发时执行函数
            function haveClick() {
                if (click) {
                    if(audioT){
                        sfx_wing.cloneNode(true).play();
                    }
                    bird.speed = clickSpeed * PROPORTION;
                }
                if (firstLoad) {
                    preTime = Date.now();
                    bird.speed = clickSpeed * PROPORTION;
                    gameOver = false;
                    firstLoad = false;
                    if(audioT){
                        sfx_wing.cloneNode(true).play();
                    }
                    requestAnimationFrame(run);
                }
                if (gameOver) {
                    click = true;
                    clickOver = false;
                    gameOver = !gameOver;
                    preTime = Date.now();
                    if(audioT){
                        sfx_wing.cloneNode(true).play();
                    }
                    start(imgEls);
                }
            }
        }

        //第一次开始游戏
        function firstStart(ctx) {
            //设置字体填充颜色
            ctx.fontWeight = "bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.font = 60 * PROPORTION + "px microsoft yahei";
            ctx.fillText("404", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 5);
            ctx.font = 20 * PROPORTION + "px microsoft yahei";
            ctx.fillText("页面找不到啦！", WINDOW_WIDTH / 2, WINDOW_HEIGHT*1.5 / 5);
            ctx.font = 30 * PROPORTION + "px microsoft yahei";
            ctx.fillText("玩会游戏？", WINDOW_WIDTH / 2, WINDOW_HEIGHT*2 / 5);
        }

        //游戏结束函数
        function end(ctx, pipes) {
            //设置字体填充颜色
            ctx.fontWeight = "bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.font = 40 * PROPORTION + "px microsoft yahei";
            ctx.fillText("游戏结束", WINDOW_WIDTH / 2, WINDOW_HEIGHT / 3);
            ctx.font = 30 * PROPORTION + "px microsoft yahei";
            ctx.fillText("得分: " + pipes[0].getScore(), WINDOW_WIDTH / 2, WINDOW_HEIGHT * 3 / 7);
            ctx.fillText("点击重新开始", WINDOW_WIDTH / 2, WINDOW_HEIGHT * 4 / 7);
        }


    };
});

function draw_Y(cxt, x, length) {
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.moveTo(x, 0);
    cxt.lineTo(x, length);
    cxt.stroke();
}
function draw_X(cxt, y, length) {
    cxt.beginPath();
    cxt.lineWidth = 1;
    cxt.moveTo(0, y);
    cxt.lineTo(length, y);
    cxt.stroke();
}

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


