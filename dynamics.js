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

var mxi, myi, mxf, myf, mx, my;
var time;
var shoot = false;
var vel = 800;
var launchAngle1;
var launchAngle2;
var velx;
var vely;
var mflag = 0;
var score1 = 0;
var score2 = 0;
var turns = 0;
var boolflag = false;
var gtime = 0;
var slider;
var countflag;
var gameflag = false;
var obj2 = {
  x: 0,
  y: 0
};
obj2.x = 150;
obj2.y = groundlevel;
points.push(obj2);
var tank1 = new Image();
var moves1 = 50, moves2 = 50;


var player1 = true;
var player2 = false;
var pause = false;
var freeze = false;
var t, time2;
var langle1 = 75,
  langle2 = 75;
var pauseflag;
var count = 0;
var lX1, lY1, lX2, lY2, mis, check, bool;
var slideX1 = 330,
  slideX2 = 330;
var string1, string2;
var life1 = 100,
  life2 = 100;
  var mx1, my1, mx2, my2;

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
var mouseup = true;
var mousedown = false;
var ownbool1, ownbool2, ownboolflag;



var grad = c.createLinearGradient(0, 0, 0, 800);
grad.addColorStop(0, "#7fff00"); //lightgreen
grad.addColorStop(0.9, "#006400");

var backgrad = c.createLinearGradient(0, 0, 0, 1000);
backgrad.addColorStop(0, "#0ff"); //aqua
backgrad.addColorStop(0.8, "#fff");
backgrad.addColorStop(0.8, "#bc8f8f");
backgrad.addColorStop(1, "#a52a2a");

var terrain = new Path2D();

document.ondrag = function(e) {
  e.preventDefault();
}

function drawBack() {
  c.fillStyle = backgrad;
  c.fillRect(0, 0, canvas.width, canvas.height);

}


function drawMountain() {
  c.save();
  terrain = new Path2D();
  terrain.moveTo(150, groundlevel);
  terrain.lineJoin = "round";
  terrain.lineWidth = "1";
  for (i = 1; i <= length; i++)
    terrain.lineTo(points[i].x, points[i].y);

  terrain.lineTo(150, groundlevel);



  c.fillStyle = grad;
  c.stroke(terrain);
  c.fill(terrain);
  c.restore();
}



function drawTank() {

  if (rightPressed && !pause && !pauseflag) {
    if (player1 && tank1X + 100 <= canvas.width && moves1>0) {
      tank1X += 2;
      moves1--;
    }
    if (player2 && tank2X + 100 <= canvas.width && moves2>0) {
      tank2X += 2;
      moves2--;
    }
  } else if (leftPressed && !pause && !pauseflag) {
    if (player1 && tank1X > 0 && moves1>0 )
      {
        tank1X -= 2;
        moves1--;
      }
    if (player2 && tank2X > 0 && moves2>0) {
      moves2--;
      tank2X -= 2;
  }
}
  pathCheck();


 if(gameflag && life1<=0)
 {
   c.drawImage(tank1, 1820, 1220, 200, 100, tank1X, tank1Y - 50, 130, 60);
   c.save();

   c.translate(tank2X + 130, tank2Y - 50);
   c.scale(-1, 1);

   c.drawImage(tank1, 1855, 200, 130, 50, 0, 0, 130, 60);
   c.restore();
 }
else if(gameflag && life2<=0)
  {
    c.drawImage(tank1, 1855, 200, 130, 50, tank1X, tank1Y - 50, 130, 60);
    c.save();
    c.translate(tank2X + 130, tank2Y - 50);
    c.scale(-1, 1);

    c.drawImage(tank1, 1820, 1220, 200, 100, 0, 0, 130, 60);
    c.restore();

  }



else if(!gameflag){  c.drawImage(tank1, 1855, 200, 130, 50, tank1X, tank1Y - 50, 130, 60);
  c.save();

  c.translate(tank2X + 130, tank2Y - 50);
  c.scale(-1, 1);

  c.drawImage(tank1, 1855, 200, 130, 50, 0, 0, 130, 60);
  c.restore();
}

}


function drawLauncher() {


  lX1 = tank1X + 60;
  lY1 = tank1Y - 50;
    launchAngle1 = (langle1 * Math.PI) / 180;
  c.save();
  c.translate(lX1 + 10, lY1 + 5);
  c.rotate(-launchAngle1);

  c.drawImage(tank1, 225, 320, 70, 15, -10, -10, 60, 20); //launcherimage
  c.rotate(+launchAngle1);
  c.restore();


  launchAngle2 = (langle2 * Math.PI) / 180;
  lX2 = tank2X + 60;
  lY2 = tank2Y - 40;
  c.save();
  c.translate(lX2, lY2);
  c.rotate(+launchAngle2);
  c.scale(-1, -1);
  c.drawImage(tank1, 225, 320, 70, 15, -10, -10, 60, 20);  //launcher image
  c.rotate(-launchAngle2);
  c.restore();


  mx1 = lX1 + 50 * Math.cos(launchAngle1);
  my1 = lY1 - 50 * Math.sin(launchAngle1);

  mx2 = lX2 - 50*Math.cos(launchAngle2);
  my2 = lY2 - 50 * Math.sin(launchAngle2);
}


function pathCheck() {

  c.beginPath();

  c.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    c.lineTo(points[i].x, points[i].y);
  }

  c.lineTo(150, groundlevel);

  // var check1 = c.isPointInPath(tank1X + 100, tank1Y);
  // var check2 = c.isPointInPath(tank2X, tank2Y);
  if (tank1X + 100 >= 150 && tank1X + 100 <= 1600) {
    if (c.isPointInPath(tank1X + 100, tank1Y)) {
      while (c.isPointInPath(tank1X + 100, tank1Y))
        tank1Y--;
    } else if (!(c.isPointInPath(tank1X + 100, tank1Y))) {
      while (!(c.isPointInPath(tank1X + 100, tank1Y)))
        tank1Y++;
    }
  }

  if (tank2X + 20 >= 150 && tank2X + 20 <= 1600) {
    if (c.isPointInPath(tank2X + 20, tank2Y)) {
      while (c.isPointInPath(tank2X + 20, tank2Y))
        tank2Y--;
    } else if (!(c.isPointInPath(tank2X + 20, tank2Y))) {
      while (!(c.isPointInPath(tank2X + 20, tank2Y)))
        tank2Y++;
    }

  }


}


function drawMissile() {

  if (pause) {
    if (!freeze) {

      if (!gtime) gtime = new Date().getTime() - time;
      else gtime = t * 1000;
      freeze = true;

    }

    t = gtime;

  }
  if (!pause) {
    if (freeze) {
      freeze = false;
      time2 = gtime;
      time2 = new Date().getTime();


    }
    if (!gtime) {
      time2 = time;
    }

    t = new Date().getTime() - time2 + gtime;
  }



  t /= 1000;

  // if(mxf==-10);
  if(player1){
  mxf = mxi + velx * t;
  myf = myi - vely * t + 100.0 * t * t;
}

  else if(player2){
      mxf = mxi - velx * t;
      myf = myi - vely * t + 100.0 * t * t;
  }
  if (myf < 0) myf = 10;

  missilePathCheck();
  if (!mflag && !pause)
c.arc(mxf, myf, 10, 0, 2 * Math.PI, false);

  c.fillStyle = "black";
  c.fill();


}

function missilePathCheck() {
  mis = new Path2D();
  c.beginPath();

  mis.moveTo(150, groundlevel);
  for (i = 1; i <= length; i++) {
    mis.lineTo(points[i].x, points[i].y);
  }

  mis.lineTo(1850, groundlevel);
  check = c.isPointInPath(mis, mxf + 10, myf + 10);
  if(player1){
    bool = (myf >= tank2Y - 60 && myf <= groundlevel && tank2X <= mxf && tank2X + 130 >= mxf );
    ownbool1 = (myf >= tank1Y - 60 && myf <= groundlevel && tank1X <= mxf && tank1X + 130 >= mxf );
  }
  else if(player2){
    bool = (myf >= tank1Y - 60 && myf <= groundlevel && tank1X <= mxf && tank1X + 130 >= mxf );
  ownbool2 =  (myf >= tank2Y - 60 && myf <= groundlevel && tank2X <= mxf && tank2X + 130 >= mxf );
}


  if (check || myf > groundlevel || bool) { //check:- ispointinpath bool:- whether missile hits tank
    //mflag:- whetehr missile hits somethiing   boolflag:- for score


    mflag = true;

    document.getElementById('shoot').disabled = false;
    pauseflag = false;



  }
  if(ownbool1 && !ownboolflag){
    life1-=25;
    ownboolflag = true;
  }
  console.log(ownboolflag);
  if(ownbool2 && !ownboolflag){
    life2-=25;
    ownboolflag = true;
  }


  if (bool && !boolflag) {
    if(player1) {
      score1 += 10;
      life2-=25;
    }
    else if(player2) {
      score2+=10;
      life1-=25

    }
    boolflag = true;
    // if(ownbool1 && !ownboolflag) {
    //   ownboolflag = true;
    //   life1-=25;
    //
    // }
    // if(ownbool2 &&!ownboolflag)
    // {
    //   ownboolflag = true;
    //   life2-=25;
    // }


  }
  // console.log(ownbool1 && !ownboolflag);
  if((check || myf > groundlevel || bool ) && !countflag)
  {
    countflag = true;
    count++;

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
  if (player1) turnx = 40;


  c.fillText(mystring1, 40, 40);
  c.fillText("Moves left: "+moves1, 40, 200);
  if (player1) c.fillText(turn, turnx, 80);
  c.fillStyle = "blue";
  if (player2) c.fillText(turn, turnx, 80);
  c.fillText(mystring2, 1650, 40);
  c.fillText("Moves left: "+moves2, 1650, 200);
  c.fillStyle = "black";
  if (pause)
    c.fillText("The game is paused.", 800, 150);


  c.restore();
}


function drawSlider() {
  c.save();
  slider = new Path2D();

  c.lineWidth = "6";
  slider.moveTo(360, 900);
  slider.lineTo(760, 900);


  c.stroke(slider);

  c.fillStyle = "#faebd7";

  c.fill(slider);
  c.restore();
  if (player1)
    c.drawImage(tank1, 800, 600, 80, 60, slideX1, 880, 80, 60);
  else c.drawImage(tank1, 800, 600, 80, 60, slideX2, 880, 80, 60);


}

function keyDownHandler(e) {
  e.preventDefault();

  if (e.which == 39) { //right key
    rightPressed = true;
    leftPressed = false;
  } else if (e.which == 37) { //left key
    leftPressed = true;
    rightPressed = false;
  } else if (e.which == 38 && !pause && !pauseflag) { //up
    if (player1 && langle1 <= 105) langle1 += 2;
    if (player2 && langle2 <= 105) langle2 += 2;
  } else if (e.which == 40 && !pause && !pauseflag) { //down
    if (player1 && langle1 >= 0) langle1 -= 2;
    if (player2 && langle2 >= 0) langle2 -= 2;
  }


}


function keyUpHandler() {
  leftPressed = false;
  rightPressed = false;
}

function pauseHandler() {
  if (pause) {

    pause = false;
    document.getElementById('pause').value = "Pause";
    document.getElementById('shoot').disabled = false;


  } else if (!pause) {

    pause = true;
    document.getElementById('pause').value = "Resume";
    document.getElementById('shoot').disabled = true;
  }

}

function resetHandler() {
  langle1 = 75;
  langle2 = 75;
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
  score1 = 0;
  score2 = 0;
  turns = 0;
  boolflag = false;
  gtime = 0;
  player1 = true;
  player2 = false;
  pause = false;
  freeze = false;
  pauseflag = false;
  count = 0;
  slideX1 = 330, slideX2 = 330;
  string1 = 0;
  string2 = 0;
  life1 = 100, life2 = 100;
  countflag = false;
  gameflag = false;
  moves1 = 50;
  moves2 = 50;
  ownboolflag = false;
  document.getElementById('pause').value = "Pause";
  document.getElementById('shoot').disabled = false;



}

function shootHandler() {
  time = new Date().getTime();
  shoot = true;
  // player1 = false;
  // player2 = false;
  pauseflag = true;
  document.getElementById('shoot').disabled = true;
  launchAngle = (langle1 * Math.PI) / 180;
  if(player1){velx = (string1 / 100) * vel * Math.cos(launchAngle1);
  vely = (string1 / 100) * vel * Math.sin(launchAngle1);
  mxi = mx1;
  myi = my1;
}
if(player2)
{
  velx = (string2 / 100) * vel * Math.cos(launchAngle2);
  vely = (string2 / 100) * vel * Math.sin(launchAngle2);
  mxi = mx2;
  myi = my2;

}
 countflag = false;
  mflag = false;
  boolflag = false;
  gtime = 0;
  moves1 = 50;
  moves2 = 50;
  ownboolflag = false;






}
function drawAngle(){
  c.fillText("Angle: "+ langle1 , 40, 860, 200, 20);
  c.fillText("Angle: "+ langle2, 1700, 860, 200, 20);
}

function drawPower() {
  if (player1) string1 = (slideX1 - 330) / 4;
  else if (player2) string2 = (slideX2 - 330) / 4;
  c.fillStyle = "black";
  c.font = "30px Arial";
  if (player1)
    c.fillText("Power: " + string1 + "%", 475, 860, 200, 20);
  else c.fillText("Power: " + string2 + "%", 475, 860, 200, 20);
}
var mk;

function mouseMoveHandler(e) {
  if (!pause && mouseup && !pauseflag) {


    canvas.style.cursor = "auto";
    mousedown = false;
  }
  if (!pause && mousedown && !pauseflag) {
    if (e.pageX >= 360 && e.pageX <= 760) {
      if (e.pageY <= 910 && e.pageY >= 850) {
        canvas.style.cursor = "pointer";
        if (player1) slideX1 = e.pageX - 30;
        else slideX2 = e.pageX - 30;
      }

    }
    mouseup = false;

  }
}

function mouseDownHandler(e) {

  mousedown = true;
  mouseup = false;

  mouseMoveHandler(e);
}

function mouseUpHandler(e) {
  mouseup = true;
  mousedown = false;
  mouseMoveHandler(e);
}


document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
document.getElementById('pause').addEventListener("click", pauseHandler);
document.getElementById('reset').addEventListener("click", resetHandler);
document.getElementById('shoot').addEventListener("click", shootHandler);
canvas.addEventListener('mousedown', mouseDownHandler);
canvas.addEventListener('mouseup', mouseUpHandler);
canvas.addEventListener('mousemove', mouseMoveHandler);




function init() {
  tank1.src = '/spritesheet.png';
  tank1.onload = function() {
    draw();
  }
}

function drawHealth() {
  c.save();

  if (50 < life1 && life1 <= 100) {
    c.fillStyle = "#7fff00";

  } else if (25 < life1 && life1 <= 50) {
    c.fillStyle = "yellow";

  } else if (0 <= life1 && life1 <= 25)
    c.fillStyle = "red";
  c.fillRect(40, 100, life1, 20);
  c.strokeRect(40, 100, 100, 20);
  if(life1<=0){
  c.fillText("Player 2 Wins!! Hit reset to play again!!!!", 700, 300);
  pause = true;
  gameflag = true;
  document.getElementById('shoot').disabled = true;
}
  c.restore();
  c.save();

  if (50 < life2 && life2 <= 100)
    c.fillStyle = "#7fff00";
  else if (25 < life2 && life2 <= 50)
    c.fillStyle = "yellow";
  else if (0 <= life2 && life2 <= 25)
    c.fillStyle = "red";
  c.fillRect(1650, 100, life2, 20);
  c.strokeRect(1650, 100, 100, 20);
  c.restore();
  c.fint = "15px Arial";
  c.fillText("Life: " + life1 + "%", 40, 160);
  c.fillText("Life: " + life2 + "%", 1650, 160);
  if(life2<=0)
  {
    gameflag = true;
    c.fillText("Player 1 Wins!! Hit reset to play again!!!!", 700, 300);
    pause = true;
    document.getElementById('shoot').disabled = true;
  }
}



function draw() {

  if (count % 2 != 0) {
    player2 = true;
    player1 = false;
  } else if (count % 2 == 0) {
    player1 = true;
    player2 = false;
  }
  drawBack();
  drawSlider();
  drawMountain();
  drawScore();
  drawTank();
  drawLauncher();
  drawPower();
  drawHealth();
  drawAngle();


  if (shoot) drawMissile();
  window.requestAnimationFrame(draw);

}

init();
