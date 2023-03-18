const body = document.body;

const calculator = document.getElementById("calculator");

const display = document.getElementById("display");

const buttons = document.getElementById("buttons");

const miscellaneousButtons = document.querySelectorAll(".miscellaneous-buttons");

const digitButtons = document.querySelectorAll(".digit-buttons");
digitButtons.forEach(button => {
    button.addEventListener("click", () => {
      display.textContent += button.textContent;
    });
});
 
const operatorButtons = document.querySelectorAll(".operator-buttons");

const exponentButton = document.getElementById("exponent-button");

const factorialButton = document.getElementById("factorial-button");

const moduloButton = document.getElementById("modulo-button");

const colourButton = document.getElementById("colour-button");
colourButton.addEventListener("click", toggleColourButton);

const powerButton = document.getElementById("power-button");
powerButton.addEventListener("click", togglePowerButton);

const deleteButton = document.getElementById("delete-button");
deleteButton.addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1);
});

const allClearButton = document.getElementById("all-clear-button");
allClearButton.addEventListener("click", () => {
    display.textContent = "";
});

const multiplicationButton = document.getElementById("multiplication-button");

const divisionButton = document.getElementById("division-button");

const additionButton = document.getElementById("addition-button");

const subtractionButton = document.getElementById("subtraction-button");

const decimalPointButton = document.getElementById("decimal-point-button");

const signButton = document.getElementById("sign-button");

const answerButton = document.getElementById("answer-button");

const equalsButton = document.getElementById("equals-button");

let darkMode;
let powerButtonOn;

toggleColourButton();
togglePowerButton();

function toggleColourButton() {
    darkMode = !darkMode;
    [calculator, display, colourButton, ...digitButtons].forEach(element => {
      toggleColourClass(element, darkMode);
    });
};
  
function toggleColourClass(element, darkMode) {
    element.classList.toggle("dark-mode", darkMode);
    element.classList.toggle("light-mode", !darkMode);
    if (colourButton) {
        colourButton.textContent = darkMode ? "DARK" : "LIGHT";
    }
};

function togglePowerButton() {
    powerButtonOn = !powerButtonOn;
    powerButton.classList.toggle("power-button-on", powerButtonOn);
    powerButton.classList.toggle("power-button-off", !powerButtonOn);
    powerButton.textContent = powerButtonOn ? "ON" : "OFF";
    display.textContent = powerButtonOn ? display.textContent : "";
    const notPowerButtons = document.querySelectorAll("button:not(#power-button)");
    notPowerButtons.forEach(button => {
        button.disabled = !powerButtonOn;
    });
};

function exponent(a, b) {
    return Math.pow(a, b);
};

function factorial(n) {
    if (n === 0) {
      return 1;
    }
    return n * factorial(n - 1);
};
  
function modulo(a, b) {
    return a % b;
};

function multiplication(a, b) {
    return a * b;
};

function division(a, b) {
    return a / b;
};

function addition(a, b) {
    return a + b;
};

function subtraction(a, b) {
    return a - b;
};
