//Image Processing using Higher Order functions


let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

function imageMap(img,func) {
  let result = img.copy();
  for (let i = 0; i< img.width; ++i){
    for (let j =0; j<img.height;++j){
      result.setPixel(i,j,func(img,i,j));
    }
  }
  return result;
}

function imageMask(img,func,maskValue) {
  function A(img,x,y){
    if (func(img,x,y)){
      return maskValue;
    }
    else {
      return img.getPixel(x,y);
    }
  }
  return imageMap(img,A);
}

function blurPixel(img,x,y){
  let sum = [0,0,0];
  if (x >= 5 && x < img.width - 5) {
    for (let a = 0; a < 11; ++a) {
      sum[0] = sum[0] + img.getPixel(x - 5,y)[0];
      sum[1] = sum[1] + img.getPixel(x - 5,y)[1];
      sum[2] = sum[2] + img.getPixel(x - 5,y)[2];
      ++x;
    }
    return [sum[0]/11,sum[1]/11,sum[2]/11];
  }
  else if (x < 5) {
    for (let a = 0; a < 6 + x; ++a) {
      sum[0] = sum[0] + img.getPixel(a,y)[0];
      sum[1] = sum[1] + img.getPixel(a,y)[1];
      sum[2] = sum[2] + img.getPixel(a,y)[2];
    }
    return [sum[0]/(6+x),sum[1]/(6+x),sum[2]/(6+x)];
  }
  else {
    for (let a = x - 5; a < img.width; ++a) {
      sum[0] = sum[0] + img.getPixel(a,y)[0];
      sum[1] = sum[1] + img.getPixel(a,y)[1];
      sum[2] = sum[2] + img.getPixel(a,y)[2];
    }
    return [sum[0]/(img.width-x+5),sum[1]/(img.width-x+5),sum[2]/(img.width-x+5)];
  }
}

function blurImage(img){
  return imageMap(img,blurPixel);
}

function isDark(img,x,y){
  if (img.getPixel(x,y)[0] <0.5 &&img.getPixel(x,y)[1] <0.5 &&img.getPixel(x,y)[2] <0.5){
    return true;
  }
  else{
    return false;
  }
}

function darken(img){
  function A(img,x,y){
    if(isDark(img,x,y)) {
      return [0,0,0];
    }
    else{
      return img.getPixel(x,y);
    }
  }
  return imageMap(img,A);
}

function isLight(img,x,y){
  if (img.getPixel(x,y)[0] >=0.5 &&img.getPixel(x,y)[1] >=0.5 &&img.getPixel(x,y)[2] >=0.5){
    return true;
  }
  else{
    return false;
  }
}

function lighten(img){
  function A(img,x,y){
    if(isLight(img,x,y)) {
      return [1,1,1];
    }
    else{
      return img.getPixel(x,y);
    }
  }
  return imageMap(img,A);
}

function lightenAndDarken(img) {
  return darken(lighten(img));
}