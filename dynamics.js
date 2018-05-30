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
var tank2Y = groundlevel,
  tank2X = 1700;
var rightPressed;
var leftPressed;
var angles = [];
var langle = 75;
var mxi, myi, mxf, myf, mx, my;
var time;
var shoot = false;
var vel = 800;
var launchAngle;
var velx;
var vely;
var mflag = 0;
var score1 = 0;
var score2 = 0;
var turns = 0;
var boolflag = false;
var gtime = 0;
var obj2 = {
  x: 0,
  y: 0
};
obj2.x = 150;
obj2.y = groundlevel;
points.push(obj2);
var tank1 = new Image();
var player1 = true;
var player2 = false;
var pause = false;
var freeze = false;
var t, time2;


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

  if (rightPressed && !pause) {
    if (tank1X + 100 <= canvas.width) tank1X += 2;
    if (tank2X + 100 <= canvas.width) tank2X += 2;
  } else if (leftPressed  && !pause) {
    if (tank1X > 0)
      tank1X -= 2;
    if (tank2X > 0) tank2X -= 2;
  }
  // if ((tank1X + 100 >= 150 && tank1X + 100 <= 1600))  || (tank2X>=150 && tank2X<=1600))
    pathCheck();



  c.drawImage(tank1, 1855, 200, 130, 50, tank1X, tank1Y - 50, 130, 60);
  c.save();

  c.translate(tank2X + 130, tank2Y - 50);
  c.scale(-1, 1);

  c.drawImage(tank1, 1855, 200, 130, 50, 0, 0, 130, 60);
  c.restore();

}


function drawLauncher() {

  var lX = tank1X + 60;
  var lY = tank1Y - 50;
  launchAngle = (langle * Math.PI) / 180;
  c.save();
  c.translate(lX + 10, lY + 5);
  c.rotate(-launchAngle);

  c.drawImage(tank1, 225, 320, 70, 15, -10, -10, 60, 20);
  c.rotate(+launchAngle);
  c.restore();

  var lX2 = tank2X + 60;
  var lY2 = tank2Y - 40;
  c.save();
  c.translate(lX2, lY2);
  c.rotate(+launchAngle);
  c.scale(-1, -1);
  c.drawImage(tank1, 225, 320, 70, 15, -10, -10, 60, 20);
  c.rotate(-launchAngle);
  c.restore();


  mx = lX + 50 * Math.cos(launchAngle);
  my = lY - 50 * Math.sin(launchAngle);
  // c.beginPath();
  // c.moveTo(lX, lY);
  // c.lineTo(mx, my);
  // c.stroke();
  // c.closePath();

}


function pathCheck() {

  c.beginPath();

  c.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }

  c.lineTo(150, groundlevel);

  var check1 = c.isPointInPath(tank1X + 100, tank1Y);
  var check2 = c.isPointInPath(tank2X, tank2Y);
  if (tank1X + 100 >= 150 && tank1X + 100 <= 1600) {
    if (c.isPointInPath(tank1X + 100, tank1Y)) {
      while (c.isPointInPath(tank1X + 100, tank1Y))
        tank1Y--;
    } else if (!(c.isPointInPath(tank1X + 100, tank1Y))) {
      while (!(c.isPointInPath(tank1X + 100, tank1Y)))
        tank1Y++;
    }
  }

  if (tank2X + 10 >= 150 && tank2X + 10 <= 1600) {
    if (c.isPointInPath(tank2X, tank2Y)) {
      while (c.isPointInPath(tank2X, tank2Y))
        tank2Y--;
    } else if (!(c.isPointInPath(tank2X, tank2Y))) {
      while (!(c.isPointInPath(tank2X, tank2Y)))
        tank2Y++;
    }

  }
  // alert("BOOM");

}


function drawMissile() {


  if(pause) {
    if(!freeze)
    {

     if(!gtime)  gtime = new Date().getTime() - time;
     else gtime = t*1000;
    freeze = true;

  }

t = gtime;

}
  if(!pause)
  {
    if(freeze)
    {
      freeze = false;
   time2 = gtime;
   time2 = new Date().getTime();


  }
  if(!gtime){
    time2 = time;
  }

  t = new Date().getTime() - time2 + gtime;
}



  t /= 1000;
  mxf = mxi + velx * t;


  myf = myi - vely * t + 100.0 * t * t;
  if (myf < 0) myf = 10;

  missilePathCheck();
  if (!mflag)
    c.arc(mxf, myf, 10, 0, 2 * Math.PI, false);

  c.fillStyle = "black";
  c.fill();


}

function missilePathCheck() {
  var mis = new Path2D();
  c.beginPath();

  mis.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    mis.lineTo(points[i].x, points[i].y);
  }

  mis.lineTo(1850, groundlevel);
  var check = c.isPointInPath(mis, mxf + 10, myf + 10);
  var bool = (tank2X <= mxf && tank2X + 100 >= mxf && groundlevel - 100 <= tank2Y && groundlevel >= tank2Y);

  if (check || myf > groundlevel || bool) {


    // alert("BOOM");
    mflag = true;




  }
  if (bool && !boolflag) {
    score1 += 10;
    boolflag = true;
  }

  mis.closePath();



}

function drawScore() {
  var mystring1 = "Player 1 Score : " + score1;
  var mystring2 = "Player 2 Score: " + score2;
  var turn = "Your turn";
  c.save();
  c.fillStyle = "red";
  c.font = "20px Arial";
  if (player2)
    turnx = 1650;
  else turnx = 40;


  c.fillText(mystring1, 40, 40);
  if (player1) c.fillText(turn, turnx, 80);
  c.fillStyle = "blue";
  if (player2) c.fillText(turn, turnx, 80);
  c.fillText(mystring2, 1650, 40);
  c.fillStyle = "black";
  if(pause)
  c.fillText("The game is paused.", 800, 150);

  c.restore();
}


function keyDownHandler(e) {
  e.preventDefault();

  if (e.which == 39) { //right key
    rightPressed = true;
    leftPressed = false;
  } else if (e.which == 37) { //left key
    leftPressed = true;
    rightPressed = false;
  } else if (e.which == 38 && !pause) { //up
    if (langle <= 105) langle += 2;
  } else if (e.which == 40 && !pause) { //down
    if (langle >= 0) langle -= 2;
  } else if (e.which == 32) {
    time = new Date().getTime();
    shoot = true;
    launchAngle = (langle * Math.PI) / 180;
    velx = vel * Math.cos(launchAngle);
    vely = vel * Math.sin(launchAngle);
    mxi = mx;
    myi = my;
    mflag = false;
    boolflag = false;
    gtime = 0;
  }


}

function keyUpHandler() {
  leftPressed = false;
  rightPressed = false;
}
function pauseHandler(){
  if(pause) {
    pause = false;
    document.getElementById('pause').value = "Pause";
    c.fillStyle = "orange";
    c.fillRect(10,10, 2000, 1000);

  }
  else if(!pause) {
    pause = true;
    document.getElementById('pause').value = "Resume";
}
c.fillStyle = "orange";
c.fillRect(0,0, 1850, 980);
}
function resetHandler(){

groundlevel = 800;
offsetX = 50;
offsetY = 50;
length = 3;
 tank1X = 30; //top left coordinate of image
 tank1Y = groundlevel; //bottom left y-coordinate of image
 tank2Y = groundlevel,
  tank2X = 1700;
langle = 75;
shoot = false;
 vel = 800;
mflag = 0;
score1 = 0;  score2 = 0;
turns = 0;
 boolflag = false;
 gtime = 0;
player1 = true;
player2 = false;
 pause = false;
freeze = false;



}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.getElementById('pause').addEventListener("click", pauseHandler);
document.getElementById('reset').addEventListener("click", resetHandler);




function init() {
  tank1.src = '/spritesheet.png';
  tank1.onload = function() {
    draw();


  }
}


function draw() {

  window.requestAnimationFrame(draw);
  drawBack();
  drawMountain();
  drawScore();
  drawTank();
  drawLauncher();
  if (shoot) drawMissile();

}

init();
