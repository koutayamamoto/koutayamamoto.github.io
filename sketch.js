'use strict';

document.addEventListener('touchmove', function(e) {e.preventDefault();}, {passive: false});


var shapes;
var img;
//noSmooth(); //軽くするためのノースムース
//var fr = 10; //軽くするためのフレームレート

function preload() {
  img = loadImage('data/img3.png');

  shapes = [];
  shapes.push(loadImage('data/056.svg'));
  shapes.push(loadImage('data/076.svg'));
  shapes.push(loadImage('data/082.svg'));
}

function setup() {
  createCanvas(600, 900);
  image(img);
  //frameRate(fr);
}

function draw() {
  background(255);


  var mouseXFactor = map(mouseX, 0, width, 0.05, 1);
  var mouseYFactor = map(mouseY, 0, height, 0.05, 1);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth * gridX;
      var posY = titleHeight * gridY;

      // get current color
      img.loadPixels();
      var c = img.get(min(gridX, img.width - 1), gridY);
      // greyscale conversion
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      var gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));

      var w1 = map(greyscale, 0, 255, 20, 0.1);

      //translate(posX / 2, posY / 2);
      imageMode(CENTER);
      push();
      translate(posX,posY);
      //rotate(frameCount / 20.0); //勝手に回転
      rotate(mouseYFactor * w1 * 2)
      translate(-posX,-posY);
      image(shapes[gradientToIndex], posX+(w1 * mouseYFactor * 10), posY+(w1 * mouseYFactor * 10), w1, w1);

      if(mouseX > 200)image(shapes[gradientToIndex], posX+(w1 * mouseYFactor * 10), posY+(w1 * mouseYFactor * 10), (w1 * mouseXFactor * 2), (w1 * mouseXFactor * 2));


      pop()

    }
  }
}
