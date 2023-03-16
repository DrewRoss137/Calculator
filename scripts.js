let currentInput = "";
let currentOperator = "";
let lastResult = "";
let previousInput = "";

const display = document.getElementById("display");

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
    // Check if power button is on
    const powerButton = document.getElementById("power-button");
    if (powerButton.classList.contains("off")) {
        display.textContent = "";
        currentInput = "";
        previousInput = "";
        currentOperator = "";
        return;
    }

    const target = event.target;
    const isDigitButton = target.classList.contains("digit-buttons");
    const isOperatorButton = target.classList.contains("operator-buttons");

    if (isDigitButton || target === decimalPointButton) {
        if (target === decimalPointButton && currentInput.includes(".")) {
            return;
        }
        currentInput += target.textContent;
        display.textContent += target.textContent;
    } else if (isOperatorButton) {
        if (previousInput && currentOperator && currentInput) {
            previousInput = evaluateExpression(previousInput, currentInput, currentOperator);
            display.textContent = roundResult(previousInput);
            currentInput = "";
        } else if (currentInput) {
            previousInput = currentInput;
            currentInput = "";
        }
        if (isOperator(display.textContent.slice(-1))) {
            backspace();
        }
        display.textContent += target.textContent;
        currentOperator = target.textContent;
    }
});

const exponentButton = document.getElementById("exponent-button");
exponentButton.addEventListener("click", () => {
    if (currentInput) {
        currentOperator = "^";
        previousInput = currentInput;
        currentInput = "";
        display.textContent += "^";
    }
});

const factorialButton = document.getElementById("factorial-button");
factorialButton.addEventListener("click", () => {
    if (currentInput) {
        const result = factorial(parseInt(currentInput));
        currentInput = result.toString();
        display.textContent = roundResult(result);
    }
});

const percentButton = document.getElementById("percent-button");
percentButton.addEventListener("click", () => {
    if (currentInput) {
        const result = parseFloat(currentInput) / 100;
        currentInput = result.toString();
        display.textContent = roundResult(result);
    }
});

const colourButton = document.getElementById("colour-button");
colourButton.addEventListener("click", () => {
    toggleCalculatorColor();
});

const powerButton = document.getElementById("power-button");
powerButton.addEventListener("click", () => {
    togglePowerButtonStyle();
});

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", backspace);

const allClearButton = document.getElementById("all-clear-button");
allClearButton.addEventListener("click", clearDisplay);

const decimalPointButton = document.getElementById("decimal-point-button");
decimalPointButton.addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        display.textContent += ".";
    }
});

const signButton = document.getElementById("sign-button");
signButton.addEventListener("click", toggleSign);

const answerButton = document.getElementById("answer-button");
answerButton.addEventListener("click", () => {
    if (lastResult !== null) {
        currentInput += lastResult.toString();
        display.textContent += lastResult.toString();
    }
});

const equalsButton = document.getElementById("equals-button");
equalsButton.addEventListener("click", () => {
    if (previousInput && currentOperator && currentInput) {
        const result = evaluateExpression(previousInput, currentInput, currentOperator);
        display.innerHTML = roundResult(result);
        currentInput = result.toString();
        previousInput = "";
        currentOperator = "";
        lastResult = result;
    }
});

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
};

function clearDisplay() {
    display.textContent = "";
    currentInput = "";
    previousInput = "";
    currentOperator = "";
};

function isOperator(char) {
    const operators = ["+", "–", "x", "÷"];
    return operators.includes(char);
};

function evaluateExpression(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "+") return a + b;
    if (operator === "–") return a - b;
    if (operator === "x") return a * b;
    if (operator === "÷") return (b === 0) ? a : a / b;
};

function roundResult(value) {
    return Math.round(value * 1000000) / 1000000;
};

function toggleSign() {
    if (currentInput === "") {
        currentInput = "-";
        display.textContent += "-";
    } else if (currentInput === "-") {
        currentInput = "";
        backspace();
    } else {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
};

function updateDisplay() {
    if (previousInput && currentOperator) {
        display.textContent = previousInput + currentOperator + currentInput;
    } else if (previousInput) {
        display.textContent = previousInput;
    } else {
        display.textContent = currentInput;
    }
};

function evaluateExpression(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (operator === "+") return a + b;
    if (operator === "–") return a - b;
    if (operator === "x") return a * b;
    if (operator === "÷") return (b === 0) ? a : a / b;
    if (operator === "^") return Math.pow(a, b);
};

function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
};

function toggleCalculatorColor() {
  const calculator = document.querySelector(".calculator");
  const buttons = document.querySelectorAll("#buttons button");
  const colorButton = document.querySelector("#colour-button");

  calculator.classList.toggle("light");
  if (calculator.classList.contains("light")) {
    buttons.forEach(button => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });
    colorButton.style.backgroundColor = "#fff";
    colorButton.style.color = "#000";
  } else {
    buttons.forEach(button => {
      button.style.backgroundColor = "";
      button.style.color = "";
    });
    colorButton.style.backgroundColor = "";
    colorButton.style.color = "";
  }
}

function togglePowerButtonStyle() {
    const powerButton = document.getElementById("power-button");
    if (powerButton.classList.contains("on")) {
        powerButton.classList.remove("on");
        powerButton.classList.add("off");
    } else {
        powerButton.classList.remove("off");
        powerButton.classList.add("on");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setPowerButtonOn();
});

function setPowerButtonOn() {
    const powerButton = document.getElementById("power-button");
    powerButton.classList.add("on");
}