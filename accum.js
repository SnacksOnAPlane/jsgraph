var c = document.getElementById('c');
var ctx = c.getContext('2d')

// draw starting circle
var centerX = c.width / 2;
var centerY = c.height / 2;
var radius = 5;
var timer = null;

ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.fillStyle = 'green';
ctx.fill();

function isWhite(p) {
  return (((p[0] == 0) && (p[1] == 0) && (p[2] == 0) && (p[3] == 0)) ||
         ((p[0] == 255) && (p[1] == 255) && (p[2] == 255) && (p[3] == 255)));
}

function shootRandomly() {
  var wallToStartOn = Math.floor(Math.random() * 4);
  var posOnWall = Math.floor(Math.random() * c.width)
  var direction = Math.random() * 180;
  var x = 0;
  var y = 0;
  switch(wallToStartOn) {
    case 0:
      y = posOnWall;
      direction -= 90;
      break;
    case 1:
      x = posOnWall;
      break;
    case 2:
      x = c.width;
      y = posOnWall;
      direction += 90;
      break;
    case 3:
      x = posOnWall;
      y = c.height;
      direction += 180;
      break;
  }
  console.log("start on wall:", wallToStartOn, "position:", posOnWall, "direction:", direction);
  while((x >= 0) && (x <= c.width) && (y >= 0) && (y <= c.height)) {
    var origX = x;
    var origY = y;
    x += Math.cos(direction * Math.PI / 180);
    y += Math.sin(direction * Math.PI / 180);
    if ((Math.floor(origX) == Math.floor(x)) && (Math.floor(origY) == Math.floor(y))) {
      continue;
    }
    var p = ctx.getImageData(Math.floor(x),Math.floor(y),1,1).data;
    if (isWhite(p)) {
      // erase last position
      ctx.fillStyle = 'white';
      ctx.fillRect(Math.floor(origX), Math.floor(origY), 1, 1);
    } else {
      console.log(p);
      console.log("not erasing");
      break;
    }
    ctx.fillStyle = 'green';
    ctx.fillRect(Math.floor(x),Math.floor(y),1,1);
  }
}

function start() {
  timer = setInterval(shootRandomly, 0.01);
}

function stop() {
  clearInterval(timer);
}


// cos 0 = 1
// sin 0 = 0
// 0 deg = go straight forward
// 90 deg = go straight down
// 180 deg = go straight backwards
// 270 deg = go straight up
