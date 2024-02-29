class CalcController {
  constructor() {
    // Initialize variables
    this.lastOperator = '';
    this.lastNumber = '';
    this._operation = [];
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._currentData = new Date();
    this._locale = "pt-BR"; // Set the locale
    // Initialize the application
    this.initialize();
  }

  // Getters and setters for display, currentData, displayTime, and displayDate
  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentData() {
    return new Date();
  }

  set currentData(value) {
    this._currentData = value;
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(value) {
    this._timeEl.innerHTML = value;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(value) {
    this._dateEl.innerHTML = value;
  }

  // Clear all operation
  clearAll() {
    this._operation = [];
    this.lastOperator = '';
    this.lastNumber = '';
    this.displayCalc = '0';

    this.setLastNumberToDisplay();
  }

  // Clear the last entry
  clearEntry() {
    this._operation.pop();
    this.setLastNumberToDisplay();
  }

  // Set an error message on the display
  setError() {
    this.displayCalc = "Error";
  }

  // Get the last operation
  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }

  // Set the last operation
  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }

  // Check if a value is an operator
  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }

  // Push an operation to the stack
  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }

  // Get the result of the operation
  getResult() {
    return eval(this._operation.join(" "));
  }

  // Perform the calculation
  calc() {
    let last = '';
    this.lastOperator = this.getLastItem();
    if (this._operation.length < 3) {
      let firstItem = this._operation[0];
      this._operation = [firstItem, this.lastOperator, this.lastNumber];
    }
    if (this._operation.length > 3) {
      last = this._operation.pop();
      this.lastNumber = this.getResult();
    } else if (this._operation.length == 3) {
      this.lastNumber = this.getLastItem(false);
    }
    let result = this.getResult();
    if (last === '%') {
      result /= 100;
      this._operation = [result];
    } else {
      this._operation = [result];
      if (last) this._operation.push(last);
    }
    this.setLastNumberToDisplay();
  }

  // Get the last item in the operation
  getLastItem(isOperator = true) {
    let lastItem;
    for (let i = this._operation.length - 1; i >= 0; i--) {
      if (this.isOperator(this._operation[i]) === isOperator) {
        lastItem = this._operation[i];
        break;
      }
    }
    if (!lastItem) {
      lastItem = (isOperator) ? this.lastOperator : this.lastNumber;
    }
    return lastItem;
  }

  // Set the last number to display
  setLastNumberToDisplay() {
    let lastNumber = this.getLastItem(false);
    if (!lastNumber) lastNumber = 0;
    this.displayCalc = lastNumber;
  }

  // Add an operator to the operation stack
  addOperator(value) {
    if (isNaN(this.getLastOperation())) {
      if (isNaN(value)) {
        this.setLastOperation(value);
      } else {
        this.pushOperation(value);
        this.setLastNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getLastOperation().toString() + value.toString();
        this.setLastOperation(parseInt(newValue));
        this.setLastNumberToDisplay();
      }
    }
  }

  // Button execution functions
  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "porcento":
        this.addOperator("%");
        break;
      case "soma":
        this.addOperator("+");
        break;
      case "subtracao":
        this.addOperator("-");
        break;
      case "divisao":
        this.addOperator("/");
        break;
      case "multiplicacao":
        this.addOperator("*");
        break;
      case "igual":
        this.calc();
        break;
      case "ponto":
        this.addOperator(".");
        break;
      // Conditions for numbers
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperator(parseInt(value));
        break;
      default:
        this.setError();
        break;
    }
  }

  // Initialize HTML elements and event listeners
  initialize() {
    this.setLastNumberToDisplay();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", (e) => {
        let textBtn = btn.className.baseVal.replace("btn-", "");
        this.execBtn(textBtn);
      });
    });
  }

  // Update date and time display
  setDisplayDateTime() {
    this.displayDate = this.currentData.toLocaleDateString(this._locale, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    this.displayTime = this.currentData.toLocaleTimeString(this._locale);
  }

  // Add multiple events to an element
  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach((event) => {
      element.addEventListener(event, fn, false);
    });
    element.style.cursor = "pointer";
  }
}
