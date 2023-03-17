let currentInput = "";
let previousInput = "";
let currentOperator = "";
let lastResult = "";
let lastButtonModulo = false;


/*
<button class="function-buttons" id="exponent-button"><i>n</i><sup>x</sup></button>
<button class="function-buttons" id="factorial-button"><i>n</i>!</button>
<button class="function-buttons" id="modulo-button">%</button>
<button class="miscellaneous-buttons" id="colour-button">COLOUR</button>
<button class="miscellaneous-buttons" id="power-button">POWER</button>
<button class="digit-buttons" id="seven-button">7</button>
<button class="digit-buttons" id="eight-button">8</button>
<button class="digit-buttons" id="nine-button">9</button>
<button class="rescind-buttons" id="delete-button">DEL</button>
<button class="rescind-buttons" id="all-clear-button">AC</button>
<button class="digit-buttons" id="four-button">4</button>
<button class="digit-buttons" id="five-button">5</button>
<button class="digit-buttons" id="six-button">6</button>
<button class="operator-buttons" id="multiplication-button">x</button>
<button class="operator-buttons" id="division-button">÷</button>
<button class="digit-buttons" id="one-button">1</button>
<button class="digit-buttons" id="two-button">2</button>
<button class="digit-buttons" id="three-button">3</button>
<button class="operator-buttons" id="addition-button">+</button>
<button class="operator-buttons" id="subtraction-button">–</button>
<button class="digit-buttons" id="zero-button">0</button>
<button class="modifier-buttons" id="decimal-point-button">.</button>
<button class="modifier-buttons" id="sign-button">+/–</button>
<button class="answer-buttons" id="answer-button">ANS</button>
<button class="answer-buttons" id="equals-button">=</button>
*/

const display = document.getElementById("display");
let displayFactorial = false;
buttons.addEventListener("click", (event) => {
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
        if (lastButtonModulo) {
            const result = parseFloat(previousInput) / 100;
            currentInput = result.toString();
            display.textContent = roundResult(result) + target.textContent;
            previousInput = currentInput;
            currentInput = "";
            lastButtonModulo = false;
        } else if (displayFactorial) {
            const result = evaluateExpression(previousInput, currentOperator);
            currentInput = result.toString();
            display.textContent = roundResult(result);
            displayFactorial = false;
        }

        if (previousInput && currentOperator && currentInput) {
            previousInput = evaluateExpression(previousInput, currentOperator, currentInput);
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
        currentOperator = "!";
        previousInput = currentInput;
        currentInput = "";
        display.textContent += "!";
        displayFactorial = true;
    }
});

const moduloButton = document.getElementById("modulo-button");
moduloButton.addEventListener("click", () => {
    if (currentInput) {
        lastButtonModulo = true;
        currentOperator = "%";
        previousInput = currentInput;
        currentInput = "";
        display.textContent += "%";
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

let answerVisible = false;
const answerButton = document.getElementById("answer-button");
answerButton.addEventListener("click", toggleAnswer);
function toggleAnswer() {
    if (!answerVisible) {
        if (lastResult !== null) {
            display.textContent = lastResult.toString();
            answerVisible = true;
        }
    } else {
        updateDisplay();
        answerVisible = false;
    }
}

const equalsButton = document.getElementById("equals-button");
equalsButton.addEventListener("click", () => {
    if (displayFactorial) {
        const result = evaluateExpression(previousInput, currentOperator);
        currentInput = result.toString();
        display.textContent = roundResult(result);
        displayFactorial = false;
        currentOperator = "";
    } else if (previousInput && currentOperator && currentInput) {
        const result = evaluateExpression(previousInput, currentOperator, currentInput);
        display.textContent = roundResult(result);
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

function evaluateExpression(a, operator, b = null) {
    a = parseFloat(a);
    if (b !== null) b = parseFloat(b);
    if (operator === "+") return a + b;
    if (operator === "–") return a - b;
    if (operator === "x") return a * b;
    if (operator === "÷") return (b === 0) ? a : a / b;
    if (operator === "^") return Math.pow(a, b);
    if (operator === "!") return factorial(a);
    if (operator === "%") return a % b; // change the operation here
}




function factorial(n) {
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
};

function toggleCalculatorColor() {
    const calculator = document.querySelector(".calculator");
    const buttons = document.querySelectorAll(".digit-buttons");
    const colorButton = document.querySelector("#colour-button");
    const display = document.querySelector("#display");

    calculator.classList.toggle("light");
    display.classList.toggle("light");

    if (calculator.classList.contains("light")) {
        buttons.forEach(button => {
            button.classList.remove("dark-theme-button");
            button.classList.add("light-theme-button");
        });
        colorButton.classList.remove("dark-theme-button");
        colorButton.classList.add("light-theme-button");
        colorButton.classList.remove("dark-theme-color-button");
        colorButton.classList.add("light-theme-color-button");

        display.classList.remove("dark-display");
        display.classList.add("light-display");
    } else {
        buttons.forEach(button => {
            button.classList.remove("light-theme-button");
            button.classList.add("dark-theme-button");
        });
        colorButton.classList.remove("light-theme-button");
        colorButton.classList.add("dark-theme-button");
        colorButton.classList.remove("light-theme-color-button");
        colorButton.classList.add("dark-theme-color-button");

        display.classList.remove("light-display");
        display.classList.add("dark-display");
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
    setDefaultDarkMode();
});

function setPowerButtonOn() {
    const powerButton = document.getElementById("power-button");
    powerButton.classList.add("on");
}
function setDefaultDarkMode() {
    const buttons = document.querySelectorAll(".digit-buttons");
    const colorButton = document.querySelector("#colour-button");
  
    buttons.forEach(button => {
      button.classList.add("dark-theme-button");
    });
  
    colorButton.classList.add("dark-theme-button");
    colorButton.classList.add("dark-theme-color-button");
  }
  
  
  
  