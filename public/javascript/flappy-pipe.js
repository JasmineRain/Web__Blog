/**
 * Created by Administrator on 2016/8/23 0023.
 */
var Pipe = function (upImg, downImg, x, drawHeight,whight, proportion, speed, ctx,sfx_point,audioT) {
    this.x = x * proportion;
    this.whight=whight* proportion;
    this.upImg = upImg;
    this.downImg = downImg;
    this.width = upImg.width * proportion;
    this.height = upImg.height * proportion;
    this.speed = speed * proportion;
    this.drawHeight = drawHeight;
    this.proportion = proportion;
    this.ctx = ctx;
    this.r = (Math.random() * drawHeight * 0.5) + drawHeight * 0.1;
    this.ok=false;
    this.sfx_point=sfx_point;
    this.audioT=audioT;
};
Pipe.prototype.draw = function () {
    this.ctx.drawImage(
        this.upImg, this.x, this.r - this.height, this.width, this.height
    );
    this.ctx.drawImage(
        this.downImg, this.x, this.r + this.whight, this.width, this.height
    );
};
Pipe.prototype.setCount = function (count, gap) {
    Pipe.count = count;
    Pipe.gap = gap * this.proportion;
};
Pipe.prototype.update = function (dur) {
    this.x = this.x + this.speed * dur;
    if (this.x <= -this.upImg.width * this.proportion) {
        this.ok=false;
        this.x = this.x + Pipe.count * Pipe.gap;
        this.r = (Math.random() * this.drawHeight * 0.5) + this.drawHeight * 0.1;
    }
};
Pipe.prototype.hitTest = function (x, y, diameter) {
    if( !this.ok&&x>this.x+this.width){
        this.ok=true;
        Pipe.score=Pipe.score+1;
        if(this.audioT){
            this.sfx_point.play();
        }
    }

    var rx=x-(this.x+this.width/2);
    var ry=y-this.r/2;
    var dx=Math.min(rx,this.width/2);
    var dx1=Math.max(dx,-this.width/2);
    var dy=Math.min(ry,this.r/2);
    var dy1=Math.max(dy,-this.r/2);
    var r=diameter*this.proportion/2;
    if((dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= r * r){
        return true;
    }


    rx=x-(this.x+this.width/2);
    ry=y-(this.drawHeight+this.r+this.whight)/2;
    dx=Math.min(rx,this.width/2);
    dx1=Math.max(dx,-this.width/2);
    dy=Math.min(ry,(this.drawHeight-this.r-this.whight)/2);
    dy1=Math.max(dy,(-this.drawHeight+this.r+this.whight)/2);
    r=diameter*this.proportion/2;
    if((dx1 - rx) * (dx1 - rx) + (dy1 - ry) * (dy1 - ry) <= r * r){
        return true;
    }
    /*var radius = diameter / 2;
    var x1 = this.x;

    var y1 = this.r;
    var y2 = this.r + this.whight;
    if ((y < y1 || y > y2) && x + radius > x1 && x - radius < x1 || (y < y1 || y > y2) && x + radius > x1 && x - radius < x2) {
        return true;
    }
    else if (x>x1&&x<x2&&(y+radius>y2||y-radius<y1)) {
        return true;
    }else
    return false;*/
};

Pipe.prototype.distance = function (x1, y1, x2, y2) {
    var d1 = (x1 - x2);
    var d2 = (y1 - y2);
    return Math.sqrt(d1 * d1 + d2 * d2);
};

Pipe.prototype.setScore =function (num) {
    Pipe.score = num;
};
Pipe.prototype.getScore =function () {
    return Pipe.score
};