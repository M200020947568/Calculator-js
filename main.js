const currentNumber = document.querySelector('.currentNumber');
const previousNumber = document.querySelector('.previousNumber p');
const mathSign = document.querySelector('.mathSign');
const numbersButton = document.querySelectorAll('.number');
const operatorsButton = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const calculatorHistory = document.querySelector('.history');
const historyButton = document.querySelector('.history-btn');

// Lisening buttons
operatorsButton.forEach((button) => button.addEventListener('click', operate));

equalsButton.addEventListener('click', showResult);

clearButton.addEventListener('click', clearScreen);

numbersButton.forEach((button) => button.addEventListener('click', displayNumbers));

historyButton.addEventListener('click', clearHistory);


// Functions

function displayNumbers() {
  if(this.textContent === '.' && currentNumber.textContent.includes('.')) return;
  if(this.textContent === '.' && currentNumber.innerHTML === '') currentNumber.textContent = '0';

  currentNumber.textContent += this.textContent;
}

function operate() {
  if(currentNumber.innerHTML === '' && this.textContent === '-') {
    currentNumber.textContent = '-';
    return;
  }

  else if (currentNumber.innerHTML === '') return;

  if(mathSign.innerHTML !== '') {
    showResult();
  }
  previousNumber.innerHTML = currentNumber.innerHTML;
  mathSign.innerHTML = this.textContent;
  currentNumber.innerHTML = '';

  if(mathSign.innerHTML === '2^') {
    let a = Number(previousNumber.innerHTML);
    let result = Math.pow(a, 2);
    currentNumber.innerHTML = result;
    previousNumber.innerHTML = '';
    mathSign.innerHTML = '';
    addToHistory(`${previousNumber.innerHTML} ${mathSign.innerHTML} = ${result}`);
  }
}


function showResult() {
  if(previousNumber.innerHTML === '' || currentNumber.innerHTML === '') return;

  let a = Number(currentNumber.innerHTML);
  let b = Number(previousNumber.innerHTML);
  let operator = mathSign.innerHTML;

  switch(operator) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = b - a;
      break;
    case 'x':
      result = a * b;
      break;
    case ':':
      result = b / a;
      break;
  }

  addToHistory();
  historyButton.classList.add('active');
  currentNumber.innerHTML = result;
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

function addToHistory() {
  const newHistoryItem = document.createElement('li');
  newHistoryItem.innerHTML = `${currentNumber.innerHTML} ${mathSign.innerHTML} ${previousNumber.innerHTML} = ${result}`;
  newHistoryItem.classList.add('history-item');
  calculatorHistory.appendChild(newHistoryItem);
}

function clearScreen() {
  result = '';
  currentNumber.innerHTML = '';
  previousNumber.innerHTML = '';
  mathSign.innerHTML = '';
}

function clearHistory() {
  calculatorHistory.textContent = '';
  if(calculatorHistory.innerHTML === '') {
    historyButton.classList.remove('active');
  }
}