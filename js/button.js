const Button = function(x, y, w, h, callback){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.callback = callback;

  this.isPositionOverButton = function(position){
    if(position.x > this.x &&
      position.x < this.x + this.w &&
      position.y > this.y &&
      position.y < this.y + this.h){
      return true;
    }else{
      return false;
    }
  }

  this.click = function(clickPosition){
    if(this.isPositionOverButton(clickPosition)){
      this.callback();
    }
  }
}
