const calculator = document.getElementById("calculator");
const display = document.getElementById("display");
const buttons = document.getElementById("buttons");
const functionButtons = document.querySelectorAll(
  ".function-buttons:not(#factorial-button)"
);
const exponentButton = document.getElementById("exponent-button");
const factorialButton = document.getElementById("factorial-button");
const moduloButton = document.getElementById("modulo-button");
const colourButton = document.getElementById("colour-button");
const powerButton = document.getElementById("power-button");
const digitButtons = document.querySelectorAll(".digit-buttons");
const operatorButtons = document.querySelectorAll(".operator-buttons");
const deleteButton = document.getElementById("delete-button");
const allClearButton = document.getElementById("all-clear-button");
const decimalPointButton = document.getElementById("decimal-point-button");
const signButton = document.getElementById("sign-button");
const answerButton = document.getElementById("answer-button");
const equalsButton = document.getElementById("equals-button");

functionButtons.forEach((button) => {
  const symbol = getFunctionSymbol(button.id);
  button.addEventListener("click", () => {
    if (symbol === "!" && display.textContent.slice(-1) === "!") {
      return;
    }
    if (
      isOperator(display.textContent.slice(-1)) &&
      display.textContent.slice(-1) !== "!"
    ) {
      display.textContent = display.textContent.slice(0, -1);
    }
    if (display.textContent.trim().length === 0) {
      return;
    }
    display.textContent += symbol;
  });
});

factorialButton.addEventListener("click", () => {
  const lastChar = display.textContent.slice(-1);
  if (lastChar === "!" || isOperator(lastChar)) {
    return;
  }
  if (display.textContent.trim().length === 0) {
    return;
  }
  display.textContent += "!";
});

colourButton.addEventListener("click", toggleColourButton);

powerButton.addEventListener("click", togglePowerButton);

digitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (display.textContent.slice(-1) === "!") {
      return;
    }
    display.textContent += button.textContent;
    lastNumber += button.textContent;
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    lastNumber = "";
    if (
      isOperator(display.textContent.slice(-1)) &&
      display.textContent.slice(-1) !== "!"
    ) {
      display.textContent = display.textContent.slice(0, -1);
    }
    if (display.textContent.trim().length === 0) {
      return;
    }
    display.textContent += button.textContent;
  });
});

deleteButton.addEventListener("click", () => {
  display.textContent = display.textContent.slice(0, -1);
});

allClearButton.addEventListener("click", () => {
  display.textContent = "";
});

decimalPointButton.addEventListener("click", () => {
  let displayText = display.textContent.trim();
  if (displayText.slice(-1) === "." || isOperator(displayText.slice(-1))) {
    return;
  }
  const elements = separateElements(displayText);
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    if (!isOperator(element) && !element.includes(".")) {
      elements[i] += ".";
      display.textContent = elements.join("");
      break;
    }
  }
});

signButton.addEventListener("click", () => {
  let displayText = display.textContent.trim();
  if (isOperator(displayText.slice(-1))) {
    return;
  }
  const elements = separateElements(displayText);
  for (let i = elements.length - 1; i >= 0; i--) {
    const element = elements[i];
    if (!isOperator(element)) {
      elements[i] = parseFloat(element) * -1;
      display.textContent = elements.join("");
      break;
    }
  }
});

answerButton.addEventListener("click", () => {
  if (displayAnswer) {
    display.textContent = "";
    displayAnswer = false;
  } else if (previousAnswer !== undefined) {
    display.textContent = previousAnswer;
    displayAnswer = true;
  }
});

equalsButton.addEventListener("click", () => {
  const result = calculateExpression(display.textContent);
  display.textContent = result;
  previousAnswer = result;
  const lastChar = display.textContent.slice(-1);
  if (lastChar === "!") {
    display.textContent = display.textContent.slice(0, -1);
  }
});

let darkMode;
let powerButtonOn;
let previousAnswer;
let displayAnswer;
let lastNumber;

toggleColourButton();
togglePowerButton();

function toggleColourButton() {
  darkMode = !darkMode;
  [calculator, display, colourButton, ...digitButtons].forEach((element) => {
    toggleColourClass(element, darkMode);
  });
}

function toggleColourClass(element, darkMode) {
  element.classList.toggle("dark-mode", darkMode);
  element.classList.toggle("light-mode", !darkMode);
  if (colourButton) {
    colourButton.textContent = darkMode ? "DARK" : "LIGHT";
  }
}

function togglePowerButton() {
  powerButtonOn = !powerButtonOn;
  powerButton.classList.toggle("power-button-on", powerButtonOn);
  powerButton.classList.toggle("power-button-off", !powerButtonOn);
  powerButton.textContent = powerButtonOn ? "ON" : "OFF";
  display.textContent = powerButtonOn ? display.textContent : "";
  const notPowerButtons = document.querySelectorAll(
    "button:not(#power-button)"
  );
  notPowerButtons.forEach((button) => {
    button.disabled = !powerButtonOn;
  });
}

function isOperator(char) {
  const operators = ["^", "!", "%", "x", "÷", "+", "–"];
  return operators.includes(char);
}

function getFunctionSymbol(buttonId) {
  const symbols = {
    "exponent-button": "^",
    "factorial-button": "!",
    "modulo-button": "%",
  };
  return symbols[buttonId];
}

function exponent(a, b) {
  return Math.pow(a, b);
}

function factorial(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
}

function modulo(a, b) {
  return a % b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  return a / b;
}

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function calculateExpression(expression) {
  const elements = separateElements(expression);
  const postfixElements = convertInfixToPostfix(elements);
  return evaluatePostfixExpression(postfixElements);
}

function separateElements(expression) {
  const elements = [];
  let currentElement = "";
  for (const char of expression) {
    if (isOperator(char)) {
      if (currentElement) {
        elements.push(currentElement);
        currentElement = "";
      }
      elements.push(char);
    } else {
      currentElement += char;
    }
  }
  if (currentElement) {
    elements.push(currentElement);
  }
  return elements;
}

function convertInfixToPostfix(elements) {
  const operators = [];
  const output = [];
  const precedence = {
    "^": 4,
    "!": 4,
    "%": 3,
    x: 2,
    "÷": 2,
    "+": 1,
    "–": 1,
  };
  for (const element of elements) {
    if (isOperator(element)) {
      while (
        operators.length > 0 &&
        precedence[operators[operators.length - 1]] >= precedence[element]
      ) {
        output.push(operators.pop());
      }
      operators.push(element);
    } else {
      output.push(element);
    }
  }
  while (operators.length > 0) {
    output.push(operators.pop());
  }
  return output;
}

function evaluatePostfixExpression(elements) {
  const stack = [];
  for (const element of elements) {
    if (isOperator(element)) {
      const b = parseFloat(stack.pop());
      let a;
      if (element !== "!") {
        a = parseFloat(stack.pop());
        if (isNaN(a)) {
          return display.textContent;
        }
      }
      switch (element) {
        case "^":
          stack.push(exponent(a, b));
          break;
        case "!":
          stack.push(factorial(b));
          break;
        case "%":
          stack.push(modulo(a, b));
          break;
        case "x":
          stack.push(multiplication(a, b));
          break;
        case "÷":
          stack.push(division(a, b));
          break;
        case "+":
          stack.push(addition(a, b));
          break;
        case "–":
          stack.push(subtraction(a, b));
          break;
      }
    } else {
      stack.push(element);
    }
  }
  return stack[0];
}
