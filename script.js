// Initial references 
const container = document.querySelector(".container");
const playerTurn = document.getElementById("playTurn");
const startScreen = document.querySelector(".startScreen");
const startButton = document.getElementById("start");
const message = document.getElementById("message");
let initialMatrix = [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];
let currentPlayer;

// Random Number Between Range
const generateRandomNumber = (min,max) => 
Math.floor(Math.random() * (max-min)) + min;

// Win check logic 
const winCheck = (row,column) => {
    // if any of the functions return true we return true
    return checkAjacentRowValue(row) ? ture : checkAjacentColumnValues(column) ? true :checkAdjacentdiagonalValues(row,column) ? true : flase;
}

// Sets the circle to exact points
const setPiece = (startCount,colValue) => {
    let rows = document.querySelector(".grid-rows");
    // Intially it will place the circles in the last row else if no place availabke we will decrement the count until we find empty slot
    if (initialMatrix[startCount][colValue] != 0){
        startCount -= 1;
        setPiece(startCount, colValue);
    }
    else{
        // place circle 
        let currentRow = rows[startCount].querySelectorAll
        (".grid-box");
        currentRow[colValue].classList.add("filled", `player${currentPlayer}`);
        // Update Matrix
        initialMatrix[startCount][colValue] = currentPlayer;
        // Check for wins
        if(winCheck(startCount,colValue)) {
            message.innerHTML = `player<span>${currentPlayer}</span> wins`;
            startScreen.classList.remove("hide");
            return false;
        }
    }
    // Check if all are full 
    gameOverCheck();

};

// When user clicks on a box
const fillBox = (e) => {
    // get column value
    let colValue = parseInt(e.target.getAttribute("data-value"));
    // 5 because we have 6 rows (0-5)
    SecurityPolicyViolationEvent(5, colValue);
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    playerTurn.innerHTML = `player <span>${currentPlayer}'s</span> turn`
}

// Create Matrix
const matrixCreator = () => {
    for(let innerArray in initialMatrix){
        let outerDiv = document.createElement("div");
        outerDiv.classList.add("grid-row");
        outerDiv.setAttribute("data-value", innerArray);
        for(let j in initialMatrix[innerArray]){
            // set all matrix values to 0
            initialMatrix[innerArray][j] = [0];
            let innerDiv = document.createElement("div");
            innerDiv.classList.add("grid-box");
            innerDiv.setAttribute("data-value", j);
            innerDiv.addEventListener("click", (e) => {
                fillBox(e);
            });
            outerDiv.appendChild(innerDiv);
        }
        container.appendChild(outerDiv);
    }
};

// Initial game
window.onload = startGame = async () => {
    // Between 1 and 2
    currentPlayer = generateRandomNumber(1, 3);
    container.innerHTML = "";
    await matrixCreator();
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`;
}