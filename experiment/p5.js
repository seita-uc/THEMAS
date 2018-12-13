//血の粒の数
var cellNumber = 350;

//通常スピードと速いスピード
var speed = 1;
var speedFast = 10;

//通常フレームとどこから速くなるか
var frameMax = 45;
var frameFast = 40;

//粒の大きさにバリエーションをつける
var minRad = 10;
var maxRad = 90;

var _cellArr = [];

function setup(){
  createCanvas(800,800);
  background(255);
  smooth();
  generateCells();
}

function draw(){
  background(255);
  for(var i=0; i<_cellArr.length; i++){
    var cell = _cellArr[i];
    cell.update();
  }
}

function generateCells(){
  //粒を生成
  for(var i=0; i<cellNumber; i++){
    var cell = new BloodCell();
    cell.genarate();
    _cellArr.push(cell);
  }
}

//血の粒をクラス化
function BloodCell() {
  var x,y,vx,vy,rad;
  this.counter = 0;
  x = random(width);
  y = random(height);
  rad = random(minRad,maxRad);
  vx = random(-speed,speed);
  vy = random(-speed,speed);

  this.genarate = function(){
    noStroke();
    fill(203,51,51,120);
    ellipse(x,y,rad*2,rad*2);
  }

  this.update = function()
  {
    //遅い移動
    if(this.counter < frameFast){
      vx = random(-speed,speed);
      vy = random(-speed,speed);
    //速い移動
    }else{
      vx = random(-speedFast,speedFast);
      vy = random(-speedFast,speedFast);
    }
    this.counter++;
    if(this.counter == frameMax)this.counter = 0;

    x += vx;
    y += vy;

    //フレーム描画
    this.genarate();
  }

}
