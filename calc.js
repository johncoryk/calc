const display = document.querySelector('#display');
const buttons = document.querySelector('#buttons');

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  display.value = calculator.displayValue;
}

updateDisplay();

buttons.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('.btn')) {
    return;
  }

  if (target.classList.contains('sign')) {
    handleOperator(target.innerText);
    return;
  }

  if (target.classList.contains('decimal')) {
    inputDecimal(target.innerText);
    updateDisplay();
    return;
  }

  if (target.classList.contains('clear')) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains('del')) {
    deleteLast();
    updateDisplay();
    return;
  }

  inputDigit(target.innerText);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // if 'displayValue' === 0, replace it with the digit, if not, append the new digit to it.
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  console.log(calculator);
}

function inputDecimal(period) {
  if (calculator.waitingForSecondOperand === true) return;
  if (!calculator.displayValue.includes(period)) {
    calculator.displayValue += period;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  if (firstOperand == null) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = performCalculation[operator](firstOperand, inputValue);

    calculator.displayValue = String(result);
    updateDisplay();
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,

  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,

  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,

  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,

  '=': (firstOperand, secondOperand) => secondOperand
};

function deleteLast() { 
  calculator.displayValue = calculator.displayValue.slice(0, calculator.displayValue.length -1);
}

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
