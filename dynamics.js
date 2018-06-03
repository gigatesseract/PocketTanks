var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var weapons = document.getElementById('select1');
var op = weapons.getElementsByTagName('option');
var i;
var tank1Angleflag = false;
var tank2Angleflag = false;
var groundlevel = 800;
var offsetX = 50;
var offsetY = 50;
var length = 3;
var points = [];
var tank1X = 140; //top left coordinate of image
var tank1Y = groundlevel; //bottom left y-coordinate of image
var tank2Y = groundlevel,
  tank2X = 1700;
var rightPressed;
var leftPressed;
var angles = [];
var i;
var check2, check3;
var mxi, myi, mxf, myf, mx, my;
var time;
var shoot = false;
var vel = 800;
var launchAngle1;
var launchAngle2;
var velx;
var vely;
var mflag = false;
var score1 = 0;
var score2 = 0;
var turns = 0;
var boolflag = false;
var gtime = 0;
var slider;
var countflag;
var gameflag = false;
var weaponflag = false;
var obj2 = {
  x: 0,
  y: 0
};
obj2.x = 150;
obj2.y = groundlevel;
var score = points.push(obj2);
var tank1 = new Image();
var sprite = new Image();
var moves1 = 100, moves2 =100;

var redmi1 = 1, redmi2 = 1;
var penta1 = 3, penta2 = 3;
var player1 = true;
var player2 = false;
var pause = false;
var freeze = false;
var t, time2;
var langle1 = 60,
  langle2 = 60;
var pauseflag;
var count = 0;
var lX1, lY1, lX2, lY2, mis, check, bool;
var slideX1 = 330,
  slideX2 = 330;
var string1, string2;
var life1 = 100,
  life2 = 100;
  var mx1, my1, mx2, my2,mxf1, mxf2, mxy1, mxy2;

var tank1Angle;

for (i = 1; i < length; ++i) {
  var obj2 = {
    x: 0, y: 0
  };

  obj2.x = 200 + (groundlevel - 200) * i;
  obj2.y = groundlevel - Math.round(Math.random() * 350);
  points.push(obj2);

}

// for(i=0;i<length;i++) console.log(points[i]);

var obj1 = {
  x: 0,
  y: 0
};
obj1.x = 1600;
obj1.y = groundlevel;
 points.push(obj1);
for(i=0;i<length;i++)
{
  angles.push(Math.atan((points[i+1].y-points[i].y)/(points[i+1].x - points[i].x)));
}

var mouseup = true;
var mousedown = false;
var ownbool1, ownbool2, ownboolflag;
var bool2, bool3, ownbool12, ownbool13, ownbool22, ownbool23;



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
  //pathCheck();


  tank1Angleflag = false;
  tank2Angleflag = false;
  c.save();
  for(i=0;i<points.length-1;i++)
  {

  if(tank1X>= points[i].x && tank1X<=points[i+1].x)
  {


    tank1Angle = angles[i];
    tank1Angleflag = true;
  }
  if(tank2X>= points[i].x && tank2X<=points[i+1].x)
  {

        tank2Angle = angles[i];
        tank2Angleflag = true;
  }
  if(!tank1Angleflag) tank1Angle = 0;
  if(!tank2Angleflag) tank2Angle = 0;


}
pathCheck();
// console.log(tank1Angle*180/Math.PI);
  //if(tank1Angle!=0) c.translate(tank1X, tank1Y);
  // c.save();
  //    c.translate(tank1X, tank1Y-50);
  //
  //   c.rotate(tank1Angle);
  // c.drawImage(tank1, 1850, 200, 130, 50, 0, 0, 130, 50);
  // c.restore();
  //c.drawImage(tank1, 1855, 200, 130, 50, tank1X, tank1Y - 50, 130, 60);
  if(gameflag && life1<=0)
  {

    c.save();
       c.translate(tank1X, tank1Y-60);

      c.rotate(tank1Angle);
      c.scale(-1,1);
    c.drawImage(sprite, 1820, 1220, 200, 100, 0, 0, 130, 60);
    c.restore();

    //c.drawImage(tank1, 1820, 1220, 200, 100, tank1X, tank1Y-50, 130, 60);    explpsion tank

    c.save();
    c.translate(tank2X, tank2Y + 5);
    c.rotate(tank2Angle);
    c.scale(1, -1);

    c.drawImage(tank1, 1590, 1380, 120, 50, 0, 0, 130, 60);
    c.restore();
  }
  else if(gameflag && life2<=0)
    {

      c.save();
         c.translate(tank1X, tank1Y+20);

        c.rotate(tank1Angle);
        c.scale(-1,-1);
      c.drawImage(tank1, 1590, 1370, 120, 50, 0, 0, 130, 60);
      c.restore();

      c.save();
      c.translate(tank2X, tank2Y -60);
      c.scale(1, 1);

      c.drawImage(sprite, 1820, 1220, 130, 50, 0, 0, 130, 60);
      c.restore();

    }
    else if(!gameflag)
    {

      c.save();
         c.translate(tank1X, tank1Y+20);

        c.rotate(tank1Angle);
        c.scale(-1,-1);
      c.drawImage(tank1, 1590, 1370, 120, 50, 0, 0, 130, 60);
      c.restore();

      c.save();
      c.translate(tank2X, tank2Y + 5);
      c.rotate(tank2Angle);
      c.scale(1, -1);

      c.drawImage(tank1, 1590, 1380, 120, 50, 0, 0, 130, 60);
      c.restore();
    }

}




function drawLauncher() {



    launchAngle1 = (langle1 * Math.PI) / 180;
  c.save();

  c.translate(tank1X, tank1Y);
   c.rotate(tank1Angle);
  c.save();
  c.translate(-50,-15);//-50*Math.sin(tank1Angle));

  c.rotate(-launchAngle1);
  c.scale(1,-1);

  c.drawImage(sprite, 1430, 275, 50, 10,0,0, 80, 20); //launcherimage


  c.restore();
  c.restore();



  launchAngle2 = (langle2 * Math.PI) / 180;

  c.save();
  c.translate(tank2X, tank2Y);
     c.rotate(tank2Angle);
  c.save();
    c.translate(+40, -20);
  c.rotate(+launchAngle2);
  c.scale(-1, -1);

    c.drawImage(sprite, 1430, 275, 50, 10,0,0, 80, 20); //launcher image
  c.rotate(-launchAngle2);
  c.restore();
  c.restore();


  mx1 = tank1X - 50 * Math.cos(tank1Angle) - 15*Math.sin(tank1Angle) + 50*Math.cos(launchAngle1);
  my1 = tank1Y + 50 * Math.sin(tank1Angle) - 15*Math.cos(tank1Angle) - 80*Math.sin(launchAngle1);

  mx2 = tank2X + 30* Math.cos(tank2Angle) + 20*Math.sin(tank2Angle); - 80*Math.cos(launchAngle2);
  my2 = tank2Y + 40 * Math.sin(tank2Angle) - 20*Math.cos(tank2Angle) - 80*Math.sin(launchAngle2);


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
  if (tank1X>= 150 && tank1X<= 1600) {
    if (c.isPointInPath(tank1X, tank1Y)) {
      while (c.isPointInPath(tank1X, tank1Y))
        tank1Y--;
    } else if (!(c.isPointInPath(tank1X, tank1Y))) {
      while (!(c.isPointInPath(tank1X, tank1Y)))
        tank1Y++;
    }
  }

  if (tank2X  >= 150 && tank2X <= 1600) {
    if (c.isPointInPath(tank2X, tank2Y)) {
      while (c.isPointInPath(tank2X, tank2Y))
        tank2Y--;
    } else if (!(c.isPointInPath(tank2X, tank2Y))) {
      while (!(c.isPointInPath(tank2X, tank2Y)))
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
    if(weapons.value == 2)
    {

      mxf1 = mxi + velx*1.20*t;
      myf1 = myi -  vely*1.20*t + 100.0*t*t;
      mxf2 = mxi + velx*0.8*t;
      myf2 = myi - vely*0.8*t + 100.0*t*t;
    }
  mxf = mxi + velx * t;
  myf = myi - vely * t + 100.0 * t * t;
}

  else if(player2){
    if(weapons.value==2)
    {
      mxf1 = mxi - velx*1.20*t;
      myf1 = myi -  vely*1.20*t + 100.0*t*t;
      mxf2 = mxi - velx*0.8*t;
      myf2 = myi - vely*0.8*t + 100.0*t*t;
    }
      mxf = mxi - velx * t;
      myf = myi - vely * t + 100.0 * t * t;
  }
  if (myf < 0) myf = 10;
  if(weapons.value==2){if(myf2<0) myf2 = 10;
  if(myf1<0) myf1 = 10;
}

  missilePathCheck();
  if ( !mflag && !gameflag)
  {
    c.arc(mxf, myf, 10, 0, 2 * Math.PI, false);
    c.fill();
  }
  if(weapons.value==2)
  {
    if(!mflag2 && !gameflag)
      {c.arc(mxf1, myf1, 10, 0, 2 * Math.PI, false);
      c.fill();
      c.closePath();
    }
    if(!mflag3 && !gameflag)
      {c.arc(mxf2, myf2, 10, 0, 2 * Math.PI, false);
      c.fill();
      c.closePath();
    }

  }

 if(weapons.value == 3) c.fillStyle = "red";
 else c.fillStyle = "black";



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
  if(weapons.value==2){
    check2 = c.isPointInPath(mis, mxf1 + 10, myf1 + 10);
  check3 = c.isPointInPath(mis, mxf2 + 10, myf2 + 10);
}

  if(player1){
    bool = (myf >= tank2Y - 60 && myf <= groundlevel && tank2X <= mxf && tank2X + 130 >= mxf );
    ownbool1 = (myf >= tank1Y - 60 && myf <= groundlevel && tank1X >= mxf && tank1X - 130 <= mxf );
    if(weapons.value==2)
    {
      bool2 = (myf1 >= tank2Y - 60 && myf1 <= groundlevel && tank2X <= mxf1 && tank2X + 130 >= mxf1);
      ownbool12 = (myf1 >= tank1Y - 60 && myf1 <= groundlevel && tank1X >= mxf1 && tank1X - 130 <= mxf1 );
      bool3 = (myf2 >= tank2Y - 60 && myf2 <= groundlevel && tank2X <= mxf2 && tank2X + 130 >= mxf2 );
      ownbool13 = (myf2 >= tank1Y - 60 && myf2 <= groundlevel && tank1X >= mxf2 && tank1X - 130 <= mxf2 );
    }
  }
  else if(player2){
    bool = (myf >= tank1Y - 60 && myf <= groundlevel && tank1X <= mxf && tank1X + 130 >= mxf );
  ownbool2 =  (myf >= tank2Y - 60 && myf <= groundlevel && tank2X <= mxf && tank2X + 130 >= mxf );
  if(weapons.value==2)
  {
    bool2 = (myf1 >= tank1Y - 60 && myf1 <= groundlevel && tank1X <= mxf1 && tank1X + 130 >= mxf1 );
    ownbool22 = (myf1 >= tank2Y - 60 && myf1 <= groundlevel && tank2X >= mxf1 && tank2X - 130 <= mxf1 );
    bool3 = (myf2 >= tank1Y - 60 && myf2 <= groundlevel && tank1X <= mxf2 && tank1X + 130 >= mxf2 );
    ownbool23 = (myf2 >= tank2Y - 60 && myf2 <= groundlevel && tank2X >= mxf2 && tank2X - 130 <= mxf2 );
  }
}

if(weapons.value==2){
  if(bool2 || check2 || myf1 > groundlevel){

    mflag2 = true;
  }



if(bool3 || check3 || myf2 > groundlevel) {
  mflag3 = true;

}
}

  if (check || myf > groundlevel || bool ){//|| bool2 || bool3 || check2 || check3) { //check:- ispointinpath bool:- whether missile hits tank
    //mflag:- whetehr missile hits somethiing   boolflag:- for score

    mflag = true;
    document.getElementById('shoot').disabled = false;

    // op[0].selected = true;
    pauseflag = false;

  }




  if(weapons.value==3)
  {
    if(ownbool2 && !ownboolflag)  {
      ownboolflag = true;
      life2 = 0;
    }
    if(ownbool1 &&!ownboolflag){
      ownboolflag = true;
      life1 = 0;

    }
    if(bool && !boolflag){
      if(player1){
      life2 = 0;
      score1+=100;
      boolflag = true;
    }
    else if(player2){
      life1 = 0;
      score2+=100;
      boolflag = true;
    }
  }
}
if(weapons.value==2)
{
  if(ownbool22 && !ownboolflag)  {
    ownboolflag = true;
    life2-=15;;
  }
  if(ownbool12 &&!ownboolflag){
    ownboolflag = true;
    life1 -= 15;
  }
    if(ownbool23 && !ownboolflag)  {
      ownboolflag = true;
      life2-=15;;
    }
    if(ownbool13 &&!ownboolflag){
      ownboolflag = true;
      life1 -= 15;
}
if(bool2 && !boolflag2){
  if(player1){
  life2 -=15;
  score1+=50;
  boolflag2 = true;
}
else if(player2){
  life1 -=15;
  score2+=50;
  boolflag2 = true;
}

}

if(bool3 && !boolflag3){
  if(player1){
  life2 -=15;
  score1+=50;
  boolflag3 = true;
}
else if(player2){
  life1 -=15;
  score2+=50;
  boolflag3 = true;
}


}
}

  if(ownbool1 && !ownboolflag){
    life1-=25;
    ownboolflag = true;
  }

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




  }


  if((check || myf > groundlevel || bool ) && !countflag)
  {
    countflag = true;
    count++;

  }
if(mflag)
{

  if(weapons.value==2){

    if(mflag2 && mflag3)


      playerTurn();
    console.log(mflag);

  }

  else if(weapons.value!=2)
    playerTurn();
  }

  mis.closePath();

  // if(mflag && !weaponflag){
  //   weaponflag = true;
  //   op[0].selected = true;
  // }

}

var option;
var foundflag;



function checkWeapons(){
  foundflag = false;

  if(player1)
  {


    if(redmi1<=0) weapons.remove(2);
    else {
       option = document.createElement('option');

       option.textContent = "Redmi Note 4";
       option.value = 3;
       for(i=0;i<op.length;i++)
       {
         if(op[i].textContent == "Redmi Note 4")
         foundflag = true;
       }
       if(!foundflag)
      {
        weapons.add(option,2);
        foundflag = false;
      }
    }
    if(penta1<=0) weapons.remove(1);
    else{
      option = document.createElement('option');

      option.textContent = "Tri Shots";
         option.value = 2;
      for(i=0;i<op.length;i++)
      {
        if(op[i].textContent == "Tri Shots")
        foundflag = true;
      }
      if(!foundflag)
     {
       weapons.add(option,1);
       foundflag = false;
     }
    }

  }
  if(player2)
  {

    if(redmi2<=0) weapons.remove(2);

      else{
        option = document.createElement('option');

        option.textContent = "Redmi Note 4";
           option.value = 3;
        for(i=0;i<op.length;i++)
        {
          if(op[i].textContent == "Redmi Note 4")
          foundflag = true;
        }
        if(!foundflag)
       {
         weapons.add(option,2);
         foundflag = false;
       }
      }


    if(penta2<=0) weapons.remove(1);
    else{
         option = document.createElement('option');

         option.textContent = "Tri Shots";
            option.value = 2;
         for(i=0;i<op.length;i++)
         {
           if(op[i].textContent == "Tri Shots")
           foundflag = true;
         }
         if(!foundflag)
        {
          weapons.add(option,1);
          foundflag = false;
        }
       }

  }

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
    c.drawImage(tank1, 1480, 985, 80, 60, slideX1, 880, 80, 60);
  else c.drawImage(tank1, 1480, 985, 80, 60, slideX2, 880, 80, 60);


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
    if (player1 && langle1 < 90) langle1 += 2;
    if (player2 && langle2 < 90) langle2 += 2;
  } else if (e.which == 40 && !pause && !pauseflag) { //down
    if (player1 && langle1 > 20) langle1 -= 2;
    if (player2 && langle2 > 20) langle2 -= 2;
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
    weapons.disabled = false;



  } else if (!pause) {

    pause = true;
    document.getElementById('pause').value = "Resume";
    document.getElementById('shoot').disabled = true;
    weapons.disabled = true;

  }


}

function resetHandler() {
  langle1 = 60;
  langle2 = 60;
  groundlevel = 800;
  offsetX = 50;
  offsetY = 50;
  length = 3;
  tank1X = 140; //top left coordinate of image
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
  moves1 = 100;
  moves2 = 100;
  ownboolflag = false;
  redmi1 = 1,redmi2 = 1, penta1 = 3, penta2 = 3;
  weaponflag = false;



points.splice(0,4);
var obj2 = {x:0, y:0};
obj2.x = 150;
obj2.y = groundlevel;
var score = points.push(obj2);
  for (i = 1; i < length; ++i) {
    var obj2 = {
      x: 0, y: 0
    };

    obj2.x = 200 + (groundlevel - 200) * i;
    obj2.y = groundlevel - Math.round(Math.random() * 350);
    points.push(obj2);

  }
  obj1.x = 1600;
  obj1.y = groundlevel;
   points.push(obj1);



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
  if(player1){
  velx = (string1 / 100) * vel * Math.cos(launchAngle1);
  vely = (string1 / 100) * vel * Math.sin(launchAngle1);
  mxi = mx1;
  myi = my1;
  if(weapons.value==2) penta1--;
  else if(weapons.value==3) redmi1--;
}
if(player2)
{
  velx = (string2 / 100) * vel * Math.cos(launchAngle2);
  vely = (string2 / 100) * vel * Math.sin(launchAngle2);
  mxi = mx2;
  myi = my2;
  if(weapons.value==2) penta2--;
  else if(weapons.value==3) redmi2--;

}
 countflag = false;
  mflag = false;
  boolflag = false;
  boolflag2 = false;
  boolflag3 = false;
  gtime = 0;
  moves1 = 100;
  moves2 = 100;
  ownboolflag = false;
  weaponflag = false;
  mflag2 = false;
  mflag3  = false;






}
function drawAngle(){
  c.fillText("Angle: "+ langle1 , 40, 860, 200, 20);
  c.fillText("Angle: "+ langle2, 1700, 860, 200, 20);
  c.save();
  c.font = "20px Arial";
   c.fillText("Penta Shots: "+ penta1, 40, 900, 200, 20);
   c.fillText("Redmi: "+ redmi1, 40, 940, 200, 20);
   c.fillText("Penta Shots: "+ penta2, 1700, 900, 200, 20);
   c.fillText("Redmi: "+ redmi2, 1700, 940, 200, 20);
   c.restore();
   c.save();
   c.font = "40px Arial";
   c.fillText("Weapons", 1400, 860, 200, 20);
   c.restore();
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
weapons.addEventListener('click', checkWeapons);




function init() {
  tank1.src = '/spritesheet.png';
  sprite.src = '/spritesheet2.png';
  tank1.onload = function() {
    sprite.onload = function(){

    draw();
  }
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

function playerTurn(){
  if (count % 2 != 0) {
    player2 = true;
    player1 = false;
  } else if (count % 2 == 0) {
    player1 = true;
    player2 = false;
  }
}

function draw() {
    console.log(player1);
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
