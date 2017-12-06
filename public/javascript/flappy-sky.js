/**
 * Created by Administrator on 2016/8/23 0023.
 */
var Sky = function (img, x, y,proportion,speed, ctx) {
    this.img = img;
    this.y = y;
    this.x = x;
    this.width = img.width*proportion;
    this.height = img.height*proportion;
    this.speed = speed;
    this.ctx = ctx;
};
Sky.prototype.draw = function () {
    this.ctx.drawImage(
        this.img,this.x,-this.y,this.width, this.height
    )
};
Sky.prototype.setCount = function (count) {
    Sky.count = count;
};
Sky.prototype.update = function (dur) {
    this.x = this.x + this.speed * dur;
    if (this.x <= -this.width) {
        this.x = Sky.count * this.width + this.x;
    }
};