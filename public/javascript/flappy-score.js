/**
 * Created by 14798 on 2017/8/18.
 */
var Score = function(img,x,y,proportion,cxt){
    this.img=img;
    this.x=x;
    this.y=y;
    this.width = img.width*proportion;
    this.height = img.height*proportion;
    this.proportion=proportion;
    this.cxt=cxt;
};

Score.prototype.draw=function () {
    this.ctx.save();
    this.ctx.translate(this.x ,this.y);
    this.ctx.drawImage(
        this.img,52*this.index,0,52,45,
        -52/2*this.proportion,-45/2*this.proportion,52*this.proportion,45*this.proportion  //这里很重要的一点是，整个小鸟坐标系开始移动
    );
    this.ctx.restore();
};