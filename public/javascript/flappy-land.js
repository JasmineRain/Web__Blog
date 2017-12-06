/**
 * Created by Administrator on 2016/8/23 0023.
 */
var Land = function(img,i,y,proportion,speed,ctx){
    this.img = img ;
    this.x = i*img.width*proportion;
    this.y = y;
    this.width = img.width*proportion;
    this.height = img.height*proportion;
    this.proportion=proportion;
    this.speed = speed*proportion;
    this.ctx = ctx ;
};
Land.prototype.draw = function(){
    this.ctx.save();
    this.ctx.drawImage (
        this.img , this.x ,this.y,this.width,this.height
    );
    this.ctx.restore();
};
Land.prototype.setCount= function(count){
    Land.count = count;
};
Land.prototype.update = function(dur){
    this.x =  this.x + this.speed * dur;
    if (this.x <- this.width){
        this.x = this.x + Land.count * this.width;
    }
};