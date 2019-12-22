function copyArray(arr) {
  let r = [ ];
  for (let i = 0; i < arr.length; i = i + 1) {
    r.push(arr[i]);
  }
  return r;
}


function swap(arr, i, j) {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}


function shuffleWheat(arrOriginal) {
  let arr = copyArray(arrOriginal);
  for (let i = 0; i < arr.length - 1; i = i + 1) {
    let j = randomInt(i, arr.length - 1);
    swap(arr, i, j);
  }
  return arr;
}




function generateInput(n) {
  let R = [];
  for (let i = 0; i < n; ++i) {
    R.push(i);
  }
  let r = [];
  for (let i = 0; i < n; ++i) {
    r.push(shuffleWheat(R));
  }
 return r;
}

let a = {company:0,candidate:"hi"};
let b = {company:0,candidate:null};
let c = {company:0,candidate:0};
let d = {company:1,candidate:1};
let e = {company:0,candidate:1};
let f = {company:1,candidate:0};
let out1= [a,b];
let out2 = [a,c];
let out3 = [b,c];
let outTrue = [c,d];
let out5 = [c,e];
let out6 = [d,e];


function validOutput(hires) { //checks the type of output is correct
  for(let i = 0; i < hires.length; ++i) {
        if(hires[i].company === null || hires[i].candidate === null){
          return false;
        }
        else if (typeof(hires[i].company)!== "number" || typeof(hires[i].candidate)!== "number"){
          return false;
        }
        else if(hires[i].company >= hires.length || hires[i].candidate >= hires.length){
          return false;
        } 
      }
  return true;
}

function allHiredOnce(hires){
  for(let i = 0; i < hires.length; ++i) {
    for(let j = i+1; j< hires.length; ++j) {
      if(hires[i].company === hires[j].company){
        return false;
      }
      else if (hires[i].candidate === hires[j].candidate){
        return false;
      }
    }
  }
  return true;
}

function getCandidate(company,hire){
  for (let i = 0; i < hire.length; ++i) {
    if(hire[i].company === company){
      return hire[i].candidate;
    }
  }
  return;
}



function getCompany(candidate,hire) {
  for (let i = 0; i < hire.length; ++i) {
    if(hire[i].candidate === candidate){
      return hire[i].company;
    }
  }
  return;
}


function stable(companies,candidates,hires){
  for(let a =0; a < hires.length; ++a){
    for(let b = 0; b < hires.length;++b){
      let aComList = candidates[a];
      let bCanList = companies[b];
      let aPaired = getCompany(a,hires);
      let bPaired = getCandidate(b,hires);
      let aWants = parseInt(aComList.indexOf(b));
      let bWants = parseInt(bCanList.indexOf(a));
      let aGets = parseInt(aComList.indexOf(aPaired));
      let bGets = parseInt(bCanList.indexOf(bPaired));
      if (aWants < aGets && bWants < bGets) {
        return false;
      }
    }
  }
  return true;
}



function oracle(f){
  let numTests = 50; // Change this to some reasonably large value
  for (let i = 0; i < numTests; ++i) {
    let n = 100; // Change this to some reasonable size
    let companies = generateInput(n);
    let candidates = generateInput(n);
    let hires = f(companies, candidates);
    
    test('Hires length is correct', function() {
    assert(companies.length === hires.length);
    });

    test('Hires has correct type', function () {
      assert(validOutput(hires) === true);
    });

    test('Every company hires a person' , function() {
    assert(allHiredOnce(hires) === true);
    });

    test('The match is stable' , function() {
      assert(stable(companies,candidates,hires) === true);
    });
}
}

function randomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



oracle(chaff1)