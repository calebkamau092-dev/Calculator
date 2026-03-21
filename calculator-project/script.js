// store  calculations 
let calculations = [];

// function to save each calculation
function saveCalc(a, b, op, result) {
  let record = new Object();
  record.first = a;
  record.second = b;
  record.operatorSign = op;
  record.result = result;

  calculations.push(record);
}

// addition
function addition(a, b) {
  let result;
  result = a + b;
  saveCalc(a, b, "+", result);
  return result;
}

// subtraction
function subtraction(a, b) {
  let result;
  result = a - b;
  saveCalc(a, b, "-", result);
  return result;
}

// multiplication
function multiply(a, b) {
  let result;
  result = a * b;
  saveCalc(a, b, "*", result);
  return result;
}

// division
function divide(a, b) {
  let result;
  if (b === 0) {
    console.log("You can't divide by zero!");
    result = null;
  } else {
    result = a / b;
  }
  saveCalc(a, b, "/", result);
  return result;
}

// function to print history using forEach  
function showHistory() {
  if (calculations.length === 0) {
    console.log("No calculations yet!");
    return;
  }

  console.log("Calculation History:");
  calculations.forEach((item, index) => {
    console.log(
      `${index + 1}: ${item.first} ${item.operatorSign} ${item.second} = ${item.result}`,
    );
  });
}

// Test
console.log("Addition 5 + 8 =", addition(5, 8));
console.log("Subtraction 20 - 7 =", subtraction(20, 7));
console.log("Multiplication 4 * 3 =", multiply(4, 3));
console.log("Division 16 / 4 =", divide(16, 4));

showHistory();
