document.addEventListener("DOMContentLoaded", () => {
  const numbers = document.querySelectorAll("[data-number]");
  const operations = document.querySelectorAll("[data-operation]");
  const equalsBtn = document.querySelector("[data-equals]");
  const allClearBtn = document.querySelector("[data-all-clear]");
  const delBtn = document.querySelector("[data-delete]");

  const previousOperandTextEl = document.querySelector(".previous-operand");
  const currOperandTextEl = document.querySelector(".current-operand");
  //

  const calculator = new Calculator(previousOperandTextEl, currOperandTextEl);

  equalsBtn.addEventListener("click", () => {
    calculator.evaluateEquals();
  });

  allClearBtn.addEventListener("click", () => {
    calculator.clear();
  });

  // listeners for numbers
  numbers.forEach((numberBtn) => {
    numberBtn.addEventListener("click", () => {
      calculator.appendNumber(numberBtn.innerText);
    });
  });

  // listeners for operations
  operations.forEach((opBtn) => {
    opBtn.addEventListener("click", () => {
      calculator.chooseOperation(opBtn.innerText);
    });
  });
});

class Calculator {
  constructor(prevOpTextEl, currOpTextEl) {
    this.prevOpTextEl = prevOpTextEl; // prev text el
    this.currOpTextEl = currOpTextEl; // main text el
    this.currentOperand = ""; // main text
    this.previousOperand = ""; // prev text
    this.operation = ""; // current operation is progress
    this.wasEqualsPressed = false;
    this.updateDisplay();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = "";
    this.updateDisplay();
  }

  delete() {}

  appendNumber(num) {
    console.log(num);
    if (num === "." && this.currentOperand.includes(".")) {
      return;
    }
    if (this.wasEqualsPressed) {
      // we need to clear after entering number post equals presed
      this.currentOperand = "";
    }
    this.currentOperand = this.currentOperand.toString() + num.toString();
    this.updateDisplay();
    this.wasEqualsPressed = false;
  }

  evaluateEquals() {
    this.wasEqualsPressed = true;
    this.compute();
    this.previousOperand = "";
    this.updateDisplay();
  }

  chooseOperation(op) {
    console.log("op choosen = " + op);
    if (this.previousOperand !== "") {
      this.compute(); // compute can clear operation
    }
    this.operation = op;
    this.previousOperand = this.currentOperand; // move current to top along with op
    this.currentOperand = ""; // clear current whenever operation is chosen
    this.updateDisplay();
  }

  // compute can clear operation
  compute() {
    if (this.operation === "") {
      return;
    }
    switch (this.operation) {
      case "+": {
        console.log("add");
        this.currentOperand =
          parseFloat(this.previousOperand) + parseFloat(this.currentOperand);
        break;
      }
      case "*": {
        console.log("mult");
        this.currentOperand =
          parseFloat(this.previousOperand) * parseFloat(this.currentOperand);
        break;
      }
      case "/": {
        console.log("divide");
        this.currentOperand = this.previousOperand / this.currentOperand;
        break;
      }
      case "-": {
        console.log("substract");
        this.currentOperand = this.previousOperand - this.currentOperand;
        break;
      }
    }
    this.operation = ""; // clear operation after compute
  }

  updateDisplay() {
    this.currOpTextEl.innerText = this.currentOperand;
    this.prevOpTextEl.innerText = this.previousOperand + this.operation;
  }
}
