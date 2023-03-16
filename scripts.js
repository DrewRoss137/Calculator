const display = document.getElementById("display");

const buttons = document.getElementById("buttons");
buttons.addEventListener("click", (event) => {
    const target = event.target;
    const isDigitButton = target.classList.contains("digit-buttons");
    const isOperatorButton = target.classList.contains("operator-buttons");
    if (isDigitButton || isOperatorButton) {
        if (isOperatorButton) {
            const lastChar = display.textContent.slice(-1);
            if (isOperator(lastChar)) {
                backspace();
            }
        }
        appendDisplay(target.textContent);
    }
});

const exponentButton = document.getElementById("exponent-button");

const factorialButton = document.getElementById("factorial-button");

const percentButton = document.getElementById("percent-button");

const colourButton = document.getElementById("colour-button");

const powerButton = document.getElementById("power-button");

const sevenButton = document.getElementById("seven-button");

const eightButton = document.getElementById("eight-button");

const nineButton = document.getElementById("nine-button");

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
    backspace();
});

const allClearButton = document.getElementById("all-clear-button");
allClearButton.addEventListener("click", () => {
    clearDisplay();
});  

const fourButton = document.getElementById("four-button");

const fiveButton = document.getElementById("five-button");

const sixButton = document.getElementById("six-button");

const multiplicationButton = document.getElementById("multiplication-button");

const divisionButton = document.getElementById("division-button");

const oneButton = document.getElementById("one-button");

const twoButton = document.getElementById("two-button");

const threeButton = document.getElementById("three-button");

const additionButton = document.getElementById("addition-button");

const subtractionButton = document.getElementById("subtraction-button");

const zeroButton = document.getElementById("zero-button");

const decimalPointButton = document.getElementById("decimal-point-button");

const signButton = document.getElementById("sign-button");

const answerButton = document.getElementById("answer-button");

const equalsButton = document.getElementById("equals-button");

function appendDisplay(value) {
    display.textContent += value;
}

function backspace() {
    display.textContent = display.textContent.slice(0, -1);
}

function clearDisplay() {
    display.textContent = "";
}

function isOperator(char) {
    const operators = ['+', '–', 'x', '÷'];
    return operators.includes(char);
}