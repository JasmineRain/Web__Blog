/**
 * Created by 14798 on 2017/8/16.
 */
var Bird = function (img,x,y,proportion,speed,a,ctx){
    this.img = img;
    this.x = x;
    this.y = y;
    this.proportion=proportion;
    this.speed = speed*proportion;
    this.a =a*proportion ;
    this.ctx = ctx;
    this.index = 0;    //用于制作小鸟扇翅膀的动作
};

Bird.prototype.draw = function (){
    this.ctx.save();
    this.ctx.translate(this.x ,this.y);  //坐标移动到小鸟的中心点上
    //小鸟随着速度实时改变角度
    if(this.speed===0){

    }
    else if(this.speed<0.7*this.proportion){
        this.ctx.rotate((Math.PI /2) * this.speed*0.7 / (0.5*this.proportion));
    }else {
        this.ctx.rotate((Math.PI /2));
    }
    this.ctx.drawImage(
        this.img,52*this.index,0,52,45,
        -52/2*this.proportion,-45/2*this.proportion,52*this.proportion,45*this.proportion  //这里很重要的一点是，整个小鸟坐标系开始移动
    );
    this.ctx.restore();
};

var durgather=0;
Bird.prototype.update = function(dur){
    //小鸟翅膀扇动每100ms切换一张图片
    durgather+=dur;
    if(durgather>100){
        this.index++;
        if(this.index===2){
            this.index=0;
        }
        durgather -= 100;
    }
    //小鸟下落动作
    this.speed = this.speed + this.a *dur;
    this.y = this.y + this.speed * dur;
};