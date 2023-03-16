let currentInput = "";
let previousInput = "";
let currentOperator = "";

const display = document.getElementById("display");

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
    const target = event.target;
    const isDigitButton = target.classList.contains("digit-buttons");
    const isOperatorButton = target.classList.contains("operator-buttons");
    const isDecimalButton = target === decimalPointButton;
    if (isDigitButton) {
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

const factorialButton = document.getElementById("factorial-button");

const percentButton = document.getElementById("percent-button");

const colourButton = document.getElementById("colour-button");

const powerButton = document.getElementById("power-button");

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
    backspace();
});

const allClearButton = document.getElementById("all-clear-button");
allClearButton.addEventListener("click", () => {
    clearDisplay();
});  

const decimalPointButton = document.getElementById("decimal-point-button");
decimalPointButton.addEventListener("click", () => {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        display.textContent += ".";
    }
});

const signButton = document.getElementById("sign-button");

const answerButton = document.getElementById("answer-button");

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

function appendDisplay(value) {
    display.textContent += value;
};

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
    switch (operator) {
        case "+":
            return a + b;
        case "–":
            return a - b;
        case "x":
            return a * b;
        case "÷":
            if (b === 0) {
                return a;
            }
            return a / b;
    }
};

function roundResult(value) {
    return Math.round(value * 1000000) / 1000000;
};