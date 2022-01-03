const totalGridWidth = 500;
const totalGridHeight = 500;

// Initial dimensions
let squaresPerSide = 16;
let totalSquares = squaresPerSide * squaresPerSide;
let squareWidth = totalGridWidth / squaresPerSide;


let faded = false;
let regularOn = false;
let randomOn = false;

function toggleFaded() {
    faded = !faded;
    const fadedBtn = document.querySelector(".fade");
    if (faded) {
        fadedBtn.style.backgroundColor = "yellow";
    } else {
        fadedBtn.style.removeProperty("background-color");
    }
}

function setFaded() {
    faded = !faded;
    if (faded) {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.addEventListener("mouseenter", fade);
        });
        const fadedBtn = document.querySelector(".fade");
        fadedBtn.style.backgroundColor = "yellow";
    } else {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("mouseenter", fade);
        });
        const fadedBtn = document.querySelector(".fade");
        fadedBtn.style.removeProperty("background-color");
    }
}

function setRegularColour() {
    regularOn = !regularOn;

    if (regularOn) {
        randomOn = false;
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("mouseenter", changeToRandom);
            square.addEventListener("mouseenter", changeToRed);
        });
        const regularBtn = document.querySelector(".regular");
        regularBtn.style.backgroundColor = "yellow";
        const randomBtn = document.querySelector(".random");
        randomBtn.style.removeProperty("background-color");
    } else {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("mouseenter", changeToRed);
        });
        const regularBtn = document.querySelector(".regular");
        regularBtn.style.removeProperty("background-color");
    }
    
}

function setRandomColour() {
    randomOn = !randomOn;

    if (randomOn) {
        regularOn = false;
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("mouseenter", changeToRed);
            square.addEventListener("mouseenter", changeToRandom);
        });
        const randomBtn = document.querySelector(".random");
        randomBtn.style.backgroundColor = "yellow";
        const regularBtn = document.querySelector(".regular");
        regularBtn.style.removeProperty("background-color");
    } else {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.removeEventListener("mouseenter", changeToRandom);
        });
        const randomBtn = document.querySelector(".random");
        randomBtn.style.removeProperty("background-color");
    }
} 

function fade(e) {
    const fadeFactor = 255 * 0.10;
    const remove = ', ';
    let prev = e.target.style.backgroundColor.slice(4);
    prev = Array.from(prev.replace(")", "").split(remove).map(Number));
            
    let val1 = prev[0];
    let val2 = prev[1];
    let val3 = prev[2];

    val1 = val1 == 0 ? 0 : val1 - fadeFactor;
    val2 = val2 == 0 ? 0 : val2 - fadeFactor;
    val3 = val3 == 0 ? 0 : val3 - fadeFactor;
    e.target.style.backgroundColor = `rgb(${val1},${val2},${val3})`;
}

function changeToRed(e) {
    if (!faded) {
        e.target.style.backgroundColor = "rgb(255,0,0)";
    } else {
        let rgbColour = e.target.style.backgroundColor;
        if (rgbColour == "rgb(0, 0, 0)") {
            e.target.style.backgroundColor = "rgb(255,0,0)";
        }
    }
}

function changeToRandom(e) {
    bruh = 255 * 0.10;
    const valX = Math.random() * (255 - 0) + 0;
    const valY = Math.random() * (255 - 0) + 0;
    const valZ  = Math.random() * (255 - 0) + 0;
    if (!faded) {
        e.target.style.backgroundColor = `rgb(${valX},${valY},${valZ})`;
    } else {
        let rgbColour = e.target.style.backgroundColor;
        if (rgbColour == "rgb(0, 0, 0)") {
            e.target.style.backgroundColor = `rgb(${valX},${valY},${valZ})`;
        }
    }
    
}

function setGrid(squareWidth, totalSquares) {
    const grid = document.querySelector(".grid");
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.backgroundColor = "rgb(0,0,0)";
        square.style.width = `${squareWidth-2}px`;
        square.style.height = `${squareWidth-2}px`;
        grid.appendChild(square);    
    }

    setRegularColour();
}

function removeAllChildNotes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
}

function resetGrid() {
  squaresPerSide = parseInt(prompt("Enter number of squares per side: ", "16"));
  totalSquares = squaresPerSide * squaresPerSide;
  squareWidth = totalGridWidth / squaresPerSide;

  squareWidth = Math.floor(squareWidth * 10) / 10;

  const grid = document.querySelector(".grid");
  removeAllChildNotes(grid);
  regularOn = false;
  randomOn = false;
  if (faded) toggleFaded();
  setGrid(squareWidth, totalSquares);
}

setGrid(squareWidth, totalSquares);

const resetBtn = document.querySelector(".reset");
resetBtn.addEventListener("click", resetGrid);

const regularBtn = document.querySelector(".regular");
regularBtn.addEventListener("click", setRegularColour);

const randomBtn = document.querySelector(".random");
randomBtn.addEventListener("click", setRandomColour);

const fadeBtn = document.querySelector(".fade");
fadeBtn.addEventListener("click", setFaded);

document.addEventListener("keyup", function(e) {
    if (e.code === "KeyQ") {
        resetGrid();
    } else if (e.code === "KeyW") {
        setRegularColour();
    } else if (e.code === "KeyE") {
        setRandomColour();
    } else if (e.code === "KeyR") {
        setFaded();
    }
});