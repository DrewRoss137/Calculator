const body = document.body;

const calculator = document.getElementById("calculator");

const display = document.getElementById("display");

const buttons = document.getElementById("buttons");

const miscellaneousButtons = document.querySelectorAll(".miscellaneous-buttons");

const digitButtons = document.querySelectorAll(".digit-buttons");

const exponentButton = document.getElementById("exponent-button");

const factorialButton = document.getElementById("factorial-button");

const moduloButton = document.getElementById("modulo-button");

const colourButton = document.getElementById("colour-button");
colourButton.addEventListener("click", toggleColourMode);

const powerButton = document.getElementById("power-button");

const deleteButton = document.getElementById("delete-button");

const allClearButton = document.getElementById("all-clear-button");

const multiplicationButton = document.getElementById("multiplication-button");

const divisionButton = document.getElementById("division-button");

const additionButton = document.getElementById("addition-button");

const subtractionButton = document.getElementById("subtraction-button");

const decimalPointButton = document.getElementById("decimal-point-button");

const signButton = document.getElementById("sign-button");

const answerButton = document.getElementById("answer-button");

const equalsButton = document.getElementById("equals-button");

let darkMode = false;

toggleColourMode()

function toggleColourMode() {
    darkMode = !darkMode;
    [calculator, display, ...miscellaneousButtons, ...digitButtons].forEach(element => {
      toggleClass(element, darkMode);
    });
};
  
function toggleClass(element, darkMode) {
    element.classList.toggle("dark-mode", darkMode);
    element.classList.toggle("light-mode", !darkMode);
};
  