var origImage = null;
var grayImage = null;
var redImage = null;
var polkaImage = null;
var rainbowImage = null;
var blurImage = null;
var canvas1;

/* loading the user selected image, and initializing the image variables that the filters will be applied to, while leaving the original image untouched */
function loadImage() {
  var fileInput = document.getElementById("fileInput");
  origImage = new SimpleImage(fileInput);
  grayImage = new SimpleImage(fileInput);
  redImage = new SimpleImage(fileInput);
  polkaImage = new SimpleImage(fileInput);
  rainbowImage = new SimpleImage(fileInput);
  blurImage = new SimpleImage(fileInput);
  canvas1 = document.getElementById("canvas1");
  origImage.drawTo(canvas1);
}
// clearing the canvas, if the user wants
// to remove the drawn image
function clearCanvas() {
  var canCont = canvas1.getContext("2d");
  canCont.clearRect(0,0,origImage.getWidth(), origImage.getHeight());
}
// helper function checking if the image
//is loaded, before applying the filter
function imageLoaded(image) {
  if (image != null && image.complete()){
    return true;
  } else {
    alert("The image is not loaded");
    return false;
  }
}
// functions for the grayscale filter,
// including helper functions
function makeGray() {
  if (imageLoaded(grayImage)){
    grayScale();
    grayImage.drawTo(canvas1);
  }
}
function grayScale() {
  for (var pixel of grayImage.values()){
    var pxAvg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    pixel.setRed(pxAvg);
    pixel.setGreen(pxAvg);
    pixel.setBlue(pxAvg);
  }
  return grayImage;
}

// functions, including helper functios
// for the red image filter
function makeRed() {
  if(imageLoaded(redImage)) {
    redFilter();
    redImage.drawTo(canvas1);   
  }
}
function redFilter() {
  for (var pixel of redImage.values()) {
    var pxAvg = ((pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3);
    if (pxAvg < 128) {
      pixel.setRed(pxAvg * 2);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else {
      pixel.setRed(255);
      pixel.setGreen((pxAvg * 2) - 255);
      pixel.setBlue((pxAvg * 2) - 255);
    }
  }
  return redImage;
}

//

// self-developed filter to apply a
// polka dot filter to the image

// rainbow filter, including the helper functions
function makeRainbow() {
  if(imageLoaded(rainbowImage)) {
    rainbowFilter();
    rainbowImage.drawTo(canvas1);
  }
}
function rainbowFilter() {
  for (var pixel of rainbowImage.values()){
    var pxAvg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
    var x = pixel.getX();
    var y = pixel.getY();
    var height = rainbowImage.getHeight();
    var stripeHeight = height/7;
    // red stripe, no, not the beer
    if (y > 0 && (y<((stripeHeight)*1))){
      if(pxAvg < 128){
        pixel.setRed(pxAvg*2);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(pxAvg*2 - 255);
        pixel.setBlue(pxAvg*2 - 255);
      }
    }
    // orange stripe
    if (y>stripeHeight*1 && y<stripeHeight*2){
      if(pxAvg <128){
        pixel.setRed(pxAvg*2);
        pixel.setGreen(pxAvg*0.8);
        pixel.setBlue(0);
      }else{
        pixel.setRed(255);
        pixel.setGreen(pxAvg*1.2 - 51);
        pixel.setBlue(pxAvg*2 - 255);
      }
    }
    // yellow stripe
    if (y>stripeHeight*2 && y<stripeHeight*3){
      if(pxAvg < 128){
        pixel.setRed(pxAvg*2);
        pixel.setGreen(pxAvg*2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(pxAvg*2 - 255);
      }
    }
    // green stripe
    if (y>stripeHeight*3 && y<stripeHeight*4){
      if (pxAvg<128){
        pixel.setRed(0);
        pixel.setGreen(pxAvg*2);
        pixel.setBlue(0);
      } else {
        pixel.setRed(pxAvg*2 - 255);
        pixel.setGreen(255);
        pixel.setBlue(pxAvg*2 - 255);
      }
    }
    // blue stripe
    if(y>stripeHeight*4 && y<stripeHeight*5){
      if(pxAvg<128){
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(pxAvg*2);
      } else {
        pixel.setRed(pxAvg*2 - 255);
        pixel.setGreen(pxAvg*2 - 255);
        pixel.setBlue(255);
      }
    }
    // indigo stripe
    if (y>stripeHeight*5 && y<stripeHeight*6){
      if (pxAvg<128){
        pixel.setRed(pxAvg*0.8);
        pixel.setGreen(0);
        pixel.setBlue(pxAvg*2);
      } else {
        pixel.setRed(pxAvg*1.2 - 51);
        pixel.setGreen(pxAvg*2 - 255);
        pixel.setBlue(255);
      }
    }
    // violet stripe
    if (y>stripeHeight*6 && y<stripeHeight*7){
      if(pxAvg<128){
        pixel.setRed(pxAvg*1.6);
        pixel.setGreen(0);
        pixel.setBlue(pxAvg*1.6);
      } else {
        pixel.setRed(pxAvg*0.4 + 153);
        pixel.setGreen(pxAvg*2 - 255);
        pixel.setBlue(pxAvg*0.4 + 153);
      }
    }
  }
  return rainbowImage;
}

// blur filter
function makeBlur() {
  if(imageLoaded(blurImage)){
    blurFilter();
    blurImage.drawTo(canvas1);
  }
}
function validPx(loc, size) {
    if (loc < 0) {
        return 0;
    }
    if (loc >= size - 1) {
        return size - 1;
    }
    return loc;
}

function randPx(img, x, y, dist) {
    var moveX = Math.floor((Math.random() * dist) + 1);
    var moveY = Math.floor((Math.random() * dist) + 1);
    var randX = validPx(x - moveX, img.getWidth());
    var randY = validPx(y - moveY, img.getHeight());
    return img.getPixel(randX, randY);
    
}

function blurFilter() {
    blurImage = new SimpleImage(origImage.getWidth(), origImage.getHeight());
    if (imageLoaded(blurImage)) {
        blurImage.drawTo(canvas1);
        for (var pixel of blurImage.values()) {
            rand = Math.random();
            if (rand < .5) {
                var origPx = origImage.getPixel(pixel.getX(), pixel.getY());
                blurImage.setPixel(pixel.getX(), pixel.getY(), origPx);
            } else {
                var x = pixel.getX();
                var y = pixel.getY();
                var newPx = randPx(origImage, x, y, 20);
                blurImage.setPixel(pixel.getX(), pixel.getY(), newPx);
               }
        }
    }
    return blurImage;
}


// resets the image on the canvas to the original image
function resetImage() {
  clearCanvas();
  if(imageLoaded(origImage)){
    origImage.drawTo(canvas1);
    grayImage = SimpleImage(origImage);
  } else {
    alert("The original image is not loaded.")
  }
}