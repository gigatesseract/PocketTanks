var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var i;
var groundlevel = 800;
var offsetX = 50;
var offsetY = 50;
var length = 3;
var points = [];
var tank1X = 30; //top left coordinate of image
var tank1Y = groundlevel; //bottom left y-coordinate of image
var tank2Y = groundlevel, tank2X = 1700;
var rightPressed;
var leftPressed;
var angles = [];
var langle = 75;
var mxi, myi, mxf,myf,mx,my;
var time;
var shoot = false;
var vel = 800;
var launchAngle;
var velx;
var vely;
var mflag  = 0;
var score1 = 0;
var score2 = 0;
var turns = 0;
var boolflag = false;
var obj2 = {
  x: 0,
  y: 0
};
obj2.x = 150;
obj2.y = groundlevel;
points.push(obj2);
var tank1 = new Image();



for (i = 1; i < length; i++) {
  var obj = {
    x: 0,
    y: 0
  };
  obj.x = 200 + (groundlevel - 200) * i;
  obj.y = groundlevel - Math.round(Math.random() * 350);
  points.push(obj);
}

var obj1 = {
  x: 0,
  y: 0
};
obj1.x = 1600;
obj1.y = groundlevel;
points.push(obj1);



var grad = c.createLinearGradient(0, 0, 0, 800);
grad.addColorStop(0, "#7fff00"); //lightgreen
grad.addColorStop(0.9, "#006400");

var backgrad = c.createLinearGradient(0, 0, 0, 1000);
backgrad.addColorStop(0, "#0ff"); //aqua
backgrad.addColorStop(0.8, "#fff");
backgrad.addColorStop(0.8, "#bc8f8f");
backgrad.addColorStop(1, "#a52a2a");

var terrain = new Path2D();


function drawBack() {
  c.fillStyle = backgrad;
  c.fillRect(0, 0, canvas.width, canvas.height);

}


function drawMountain() {

  c.moveTo(150, groundlevel);
  c.lineJoin = "round";
   for (i = 1; i <= length; i++)
    terrain.lineTo(points[i].x, points[i].y);

    terrain.lineTo(150, groundlevel);

  c.fillStyle = grad;
  c.fill(terrain);

}



function drawTank() {

  if (rightPressed) {
    if (tank1X + 100 <= canvas.width) tank1X += 2;
  } else if (leftPressed) {
    if (tank1X > 0)
      tank1X -= 2;
  }
  if (tank1X + 100 >= 150 && tank1X + 100 <= 1600)
    pathCheck();
  c.drawImage(tank1, tank1X, tank1Y - 100, 100, 100);
  c.drawImage(tank1, tank2X, tank1Y - 100, 100, 100);

}


function drawLauncher() {

  var lX = tank1X + 50;
  var lY = tank1Y - 125;
 launchAngle = (langle * Math.PI) / 180;
  mx = lX + 50 * Math.cos(launchAngle);
  my = lY - 50 * Math.sin(launchAngle);
  c.beginPath();
  c.moveTo(lX, lY);
  c.lineTo(mx, my);
  c.stroke();
  c.closePath();

}


function pathCheck() {

  c.beginPath();

  c.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }

  c.lineTo(150, groundlevel);

  var check = c.isPointInPath(tank1X + 100, tank1Y);
  if (c.isPointInPath(tank1X + 100, tank1Y)) {
    while (c.isPointInPath(tank1X + 100, tank1Y))
      tank1Y--;

  } else if (!(c.isPointInPath(tank1X + 100, tank1Y))) {
    while (!(c.isPointInPath(tank1X + 100, tank1Y)))
      tank1Y++;
  }

  else console.log(c.isPointInPath(mxf+10, myf+10))
  // alert("BOOM");

}


function drawMissile(){
  var time2 = new Date();
  var t = time2-time;

  t/=1000;
  mxf  = mxi +  velx*t;


  myf = myi - vely*t + 100.0*t*t;
  if(myf<0) myf = 10;

  missilePathCheck();
  if(!mflag)
  c.arc(mxf, myf, 10, 0, 2*Math.PI, false);

  c.fillStyle = "black";
  c.fill();


}
function missilePathCheck(){
  var mis = new Path2D();
  c.beginPath();

  mis.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    mis.lineTo(points[i].x, points[i].y);
  }

  mis.lineTo(1850, groundlevel);
  var check = c.isPointInPath(mis, mxf + 10, myf + 10);
  var bool = (tank2X<=mxf && tank2X+100 >=mxf && groundlevel-100 <= tank2Y && groundlevel>=tank2Y );

  if(check || myf>groundlevel || bool)
  {


    // alert("BOOM");
    mflag = true;



  }
  if(bool && !boolflag) {
    score1+=10;
    boolflag = true;
  }

  mis.closePath();



}
function drawScore(){
  var mystring1 = "Player 1 Score : "+ score1;
  var mystring2 = "Player 2 Score: "+score2;
  c.save();
  c.fillStyle = "red";
  c.font = "20px Arial";
  c.fillText(mystring1, 40,40 );
  c.fillStyle = "blue";
  c.fillText(mystring2, 1650, 40);

  c.restore();
}


function keyDownHandler(e) {
  e.preventDefault();

  if (e.which == 39) {  //right key
    rightPressed = true;
    leftPressed = false;
  } else if (e.which == 37) {  //left key
    leftPressed = true;
    rightPressed = false;
  } else if (e.which == 38) {   //up
    if (langle <= 105) langle += 2;
  } else if (e.which == 40) {   //down
    if (langle >= 0) langle -= 2;
  }
  else if(e.which==32){
    time = new Date();
    shoot = true;
    launchAngle = (langle * Math.PI) / 180;
    velx = vel*Math.cos(launchAngle);
    vely = vel*Math.sin(launchAngle);
    mxi = mx;
    myi = my;
    mflag = false;
    boolflag = false;
  }


}

function keyUpHandler() {
  leftPressed = false;
  rightPressed = false;
}
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);




function init() {
  tank1.src = '/tanks.jpg';
  tank1.onload = function() {
    window.requestAnimationFrame(draw);


  }
}


function draw() {


  drawBack();
  drawMountain();
  drawScore();
  drawTank();
  drawLauncher();
  if(shoot) drawMissile();
  window.requestAnimationFrame(draw);
}

init();
