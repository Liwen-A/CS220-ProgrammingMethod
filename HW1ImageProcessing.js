let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

function assign(f, graph) {
  let result = graph.copy();
  for (let i = 0; i < graph.width; ++i) {
    for (let j = 0; j < graph.height; ++j) {
      result.setPixel(i, j, f(graph.getPixel(i,j)));
    }
  }
  return result;
}
  
function remBG(x) {
  let result = x;
  result[1] = 0;
  result[2] = 0;
  return result;
}  

function gray(x) {
  let a = (x[0] + x[1] + x[2]) / 3
  let result = [a, a, a]
  return result;
}

function removeBlueAndGreen(graph) {
  return assign(remBG,graph);
}

function makeGrayscale(graph) {
  return assign(gray,graph);
}

function highLight(a,b) {
  let result = [0, 0, 0];
  result[0] = Math.abs(a[0] - b[0]);
  result[1] = Math.abs(a[1] - b[1]);
  result[2] = Math.abs(a[2] - b[2]);
  return result;
}

function highlightEdges(graph) {
  let result = graph.copy();
  for (let i = 0; i < graph.width - 1; ++i) {
    for (let j = 0; j < graph.height; ++j){
      result.setPixel(i, j, highLight(graph.getPixel(i, j), graph.getPixel(i+1, j)));
    }
  }
  for (let j = 0; j < graph.height; ++j) {
    result.setPixel(graph.width - 1, j, [0,0,0]);
  }
  return result;
}

function average(graph, i, j){
  let sum = [0,0,0];
  if (i >= 5 && i < graph.width - 5) {
    for (let a = 0; a < 11; ++a) {
      sum[0] = sum[0] + graph.getPixel(i - 5,j)[0];
      sum[1] = sum[1] + graph.getPixel(i - 5,j)[1];
      sum[2] = sum[2] + graph.getPixel(i - 5,j)[2];
      ++i;
    }
    return [sum[0]/11,sum[1]/11,sum[2]/11];
  }
  else if (i < 5) {
    for (let a = 0; a < 6 + i; ++a) {
      sum[0] = sum[0] + graph.getPixel(a,j)[0];
      sum[1] = sum[1] + graph.getPixel(a,j)[1];
      sum[2] = sum[2] + graph.getPixel(a,j)[2];
    }
    return [sum[0]/(6+i),sum[1]/(6+i),sum[2]/(6+i)];
  }
  else {
    for (let a = i - 5; a < graph.width; ++a) {
      sum[0] = sum[0] + graph.getPixel(a,j)[0];
      sum[1] = sum[1] + graph.getPixel(a,j)[1];
      sum[2] = sum[2] + graph.getPixel(a,j)[2];
    }
    return [sum[0]/(graph.width-i+5),sum[1]/(graph.width-i+5),sum[2]/(graph.width-i+5)];
  }
}


function blur(graph) {
  let cop = graph.copy();
  for (let i = 0; i < graph.width; ++i){
    for (let j = 0; j < graph.height; ++j){
      cop.setPixel(i,j,average(graph,i,j));
    }
  }
  return cop;
}

test ("This is a test case for remove and Green", function() {
  let testImage = removeBlueAndGreen(robot);
  let onlyRed = true;
  for (let i = 0; i < robot.width; ++i) {
    for (let j = 0; j < robot.height; ++j) {
      if(testImage.getPixel(i,j)[1] !== 0 || testImage.getPixel(i,j)[2] !== 0){
        onlyRed = false;
      }
    }
  }
  assert(onlyRed===true);
} );

test ("This is a test case for greyScale", function() {
  let testImage = makeGreyscale(robot);
  
} );