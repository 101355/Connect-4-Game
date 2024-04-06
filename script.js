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

// Check rows 
const checkAdjacentRowValues = (row) => {
    return verifyArray(initialMatrix[row]);
};

// Check columns
const checkAdjacentColumnValues = (column) => {
    let colWinCount = 0,
    colwinBool = false;
    initialMatrix.forEach( (element,index) => {
        if(element[column] == currentPlayer){
            colWinCount += 1;
            if(colWinCount == 4){
                colWinBool = true
            }
        }
        else{
            colWinCount = 0;
        }
    });
    // no match 
    return colwinBool;
};

// Get Right diagonal values
const getRightDiagonal = (row,column,rowLength,columnLength) => {
    let rowCount = row;
    let columnCount = column;
    let rightDiagonal = [];
    while(rowCount > 0){
        if(columnCount >= columnLength-1){
            break;
        }
        rowCount -= 1;
        columnCount += 1;
        rightDiagonal.unshift(initialMatrix[rowCount][columnCount]);
    }
    rowCount = row;
    columnCount = column;
    while(rowCount < rowLength){
        if(columnCount < 0){
            break;
        }
        rightDiagonal.push(initialMatrix[rowCount][columnCount]);
        rowCount += 1;
        columnCount -= 1;
    }
    return rightDiagonal;
}

// Check diagonal
const checkAdjacentDiagonalValues = (row,column) => {
    let diagWinBool = false;
    let tempChecks = {
        leftTop: [],
        rigthTop: [],
    };
    let columnLength = initialMatrix[row].length;
    let rowLength = initialMatrix.length;

    //Store left and right diagonal array
    tempChecks.leftTop = [
        ...getLeftDiagonal(row,column,rowLength,columnLength),
    ];

    tempChecks.rigthTop = [
        ...getRightDiagonal(row,column,rowLength,columnLength),
    ];
    // check both arrays for similarrities 
    diagWinBool = verifyArray(tempChecks.rigthTop);
    if(diagWinBool){
        diagWinBool = verifyArray(tempChecks.leftTop);
    }
    return diagWinBool;
};

// Win check logic 
const winCheck = (row,column) => {
    // if any of the functions return true we return true
    return checkAdjacentRowValues(row) ? ture : checkAdjacentColumnValues(column) ? true :checkAdjacentDiagonalValues(row,column) ? true : false;
}

// Sets the circle to exact points
const setPiece = (startCount,colValue) => {
    let rows = document.querySelector(".grid-row");
    // Intially it will place the circles in the last row else if no place availabke we will decrement the count until we find empty slot
    if (initialMatrix[startCount][colValue] != 0){
        startCount -= 1;
        setPiece(startCount, colValue);
    }
    else{
        // place circle 
        let currentRow = rows[startCount].querySelectorAll
        (".grid-box");
        currentRow[colValue].classList.add("filled", `Player${currentPlayer}`);
        // Update Matrix
        initialMatrix[startCount][colValue] = currentPlayer;
        // Check for wins
        if(winCheck(startCount,colValue)) {
            message.innerHTML = `Player<span>${currentPlayer}</span> wins`;
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
    setPiece(5, colValue);
    currentPlayer = currentPlayer == 1 ? 2 : 1;
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn`
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