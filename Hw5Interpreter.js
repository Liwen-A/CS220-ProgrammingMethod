// interpExpression(e : ast) => number | boolean
function interpExpression(s,e) {
  if(e.kind === 'number' || e.kind === 'boolean') {
    return e.value;
  }
  else if (e.kind === 'variable') {
    if (lib220.getProperty(s,e.name).found === true) {
      return lib220.getProperty(s,e.name).value;
    }
    else {
      console.log("undeclared variable");
    }
  }
  else if (e.kind === 'ok') {
    return interpExpression(s,e.value);
  }
  else if (e.kind === 'operator') {
    if(e.op === '*') {
      return interpExpression(s,e.e1) * interpExpression(s,e.e2);
    }
    else if (e.op === '+') {
      return interpExpression(s,e.e1) + interpExpression(s,e.e2);
    }
    else if (e.op === '/') {
      if(interpExpression(s,e.e2) === 0) {
        console.log("divide by 0");
      }
      else {
        return interpExpression(s,e.e1)/inerpExpression(s,e.e2);
      }
    }   
    else if (e.op === '-') {
      return interpExpression(s,e.e1) - interpExpression(s,e.e2);
    }
    else if (e.op === '&&') {
      return interpExpression(s,e.e1) && interpExpression(s,e.e2);
    }
    else if (e.op === '||') {
      return interpExpression(s,e.e1) || interpExpression(s,e.e2);
    }
    else if (e.op === '>') {
      return interpExpression(s,e.e1) > interpExpression(s,e.e2);
    }
    else if (e.op === '<') {
      return interpExpression(s,e.e1) < interpExpression(s,e.e2);
    }
    else if (e.op === '===') {
      return interpExpression(s,e.e1) === interpExpression(s,e.e2);
    }
    else {
      console.log("wrong input");
    }
  }
  else {
    console.log("wrong input");
  }
}





function interpStatement(state,stmt) {
  if(stmt.kind === 'let') {
    lib220.setProperty(state,stmt.name,interpExpression(state,stmt.expression));
  }
  else if (stmt.kind === 'assignment') {
    assert(lib220.getProperty(state,stmt.name).found === true,"variable not defined");
    lib220.setProperty(state,stmt.name,interpExpression(state,stmt.expression));
  }
  else if (stmt.kind === 'print') {
    console.log(interpExpresion(state,stmt.expression));
  }
  else if (stmt.kind === 'if') {
    let value = interpExpression(state,stmt.test) ;
    if (value) {
      for (let i = 0; i < stmt.truePart.length; ++i) {
        interpStatement(state,stmt.truePart[i]);
      }
    }
    else{
      for (let i = 0; i < stmt.falsePart.length; ++i) {
        interpStatement(state,stmt.falsePart[i]);
      }
    }
  }
  else if(stmt.kind === 'while') {
    while(interpExpression(state,stmt.test)) {
      for(let i =0; i < stmt.body.length; ++i) {
        interpStatement(state,stmt.body[i]);
      }
    }
  }
  else {
    console.log("wrong");
  }
}



function interpProgram(p) {
  let result = {};
  for(let i = 0; i < p.length; ++i) {
    interpStatement(result,p[i]);
  }
  return result;
}