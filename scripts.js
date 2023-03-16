let currentInput = "";
let previousInput = "";
let currentOperator = "";

const display = document.getElementById("display");

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
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

const powerButton = document.getElementById("power-button");

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

const equalsButton = document.getElementById("equals-button");
equalsButton.addEventListener("click", () => {
    if (previousInput && currentOperator && currentInput) {
        const result = evaluateExpression(previousInput, currentInput, currentOperator);
        display.textContent = roundResult(result);
        currentInput = result.toString();
        previousInput = "";
        currentOperator = "";
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
