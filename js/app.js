
// 1. define requied variables
let board = [
    ['9', '', '3', '', '2', '', '5', '', '',],
    ['6', '', '7', '', '1', '', '', '2', '4',],
    ['2', '5', '4', '6', '8', '3', '1', '7', '9',],
    ['4', '7', '9', '1', '3', '2', '6', '5', '8',],
    ['1', '6', '2', '5', '9', '8', '7', '4', '3',],
    ['5', '3', '8', '7', '6', '4', '2', '9', '1',],
    ['3', '4', '5', '8', '7', '1', '9', '6', '2',],
    ['7', '2', '6', '3', '4', '9', '8', '1', '5',],
    ['9', '8', '1', '2', '5', '6', '4', '', '7']
];

let solution = [
    ['9', '1', '3', '4', '2', '7', '5', '8', '6',],
    ['6', '8', '7', '9', '1', '5', '3', '2', '4',],
    ['2', '5', '4', '6', '8', '3', '1', '7', '9',],
    ['4', '7', '9', '1', '3', '2', '6', '5', '8',],
    ['1', '6', '2', '5', '9', '8', '7', '4', '3',],
    ['5', '3', '8', '7', '6', '4', '2', '9', '1',],
    ['3', '4', '5', '8', '7', '1', '9', '6', '2',],
    ['7', '2', '6', '3', '4', '9', '8', '1', '5',],
    ['9', '8', '1', '2', '5', '6', '4', '3', '7']
];

let isGameOver = false; 
let slots = document.querySelectorAll('.sqr');
let resetButton = document.getElementById('reset');
let solvedButton = document.getElementById('solvedButton');
let messageBox = document.getElementById('message'); 


// 2. generate the board using the array from above
function genBoard() {
    let index = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            slots[index].textContent = board[i][j];
            slots[index].style.color = 'lightblack'
            // if the cell is empty make it editable
            if (board[i][j] === '') {
                slots[index].contentEditable = 'true';
                slots[index].style.color = '#74bed9'
                // make a function to restrict slots take numbers between 1 to 9 and if the input is other than 1 to 9 clear
                slots[index].addEventListener('input', (event) => {
                    let value = event.target.textContent.trim();
                    if (!/^[1-9]$/.test(value)) {
                        event.target.textContent = '';
                        return;
                    }

                    // if the number in the slot is a duplicate number change the color
                    if (duplicateSlot(value, i, j)) {
                        event.target.classList.add('duplicate');
                    } else {
                        event.target.classList.remove('duplicate');
                    }
                });
            }

            index++;
        }
    }
};
genBoard();



// 3. check if a slot number you entered is a duplicate number
function duplicateSlot(currentvalue, i, j) {
    // check rows of the board for duplicate numbers
    for (let col = 0; col < 9; col++) {
        if (col !== j && slots[i * 9 + col].textContent === currentvalue) {
            return true;
        }
    }

    // check columns of the board for duplicate number
    for (let row = 0; row < 9; row++) {
        if (row !== i && slots[row * 9 + j].textContent === currentvalue) {
            return true;
        }
    }

    // check 3x3 box for all the board for duplicate numbers
    let startRow = Math.floor(i / 3) * 3;
    let startCol = Math.floor(j / 3) * 3;
    
    for (let r = startRow; r < startRow + 3; r++) {
        for (let c = startCol; c < startCol + 3; c++) {
            if ((r !== i || c !== j) && slots[r * 9 + c].textContent === currentvalue) {
                return true;
            }
        }
    }
};


// 4. check solution for the board if the borad is solved correctly as the solution board then show msg you win else show message try again!

function checkSolution() {
    let isCorrect = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellPosition = i * 9 + j;
            let userValue = slots[cellPosition].innerText;
            let correctValue = solution[i][j];
            if (userValue === '') {
                messageBox.textContent = "Try Again!";
                stopGame();
                return;
            } if (userValue !== correctValue) {
                isCorrect = false;
            }
        };
    } if (isCorrect) {
        messageBox.textContent = "You Win!";
    } else {
        messageBox.textContent = "Try Again!";
    }

    // Stop the game after checking the solution
    stopGame();
};

function stopGame() {
    slots.forEach(slot => slot.contentEditable = 'false');
};

// 5. put timer for player how much time passed when the player started the game
let countDown;
let totaltime = 180

function startNewGame(){
    clearInterval(countDown);
    countDown = setInterval(() => {
        if(totaltime > 0){
            totaltime--;
            let minutes = Math.floor(totaltime/60)
            let seconds = String(totaltime % 60).padStart(2, 0);
            document.getElementById('timeDisplay').textContent = `${minutes}:${seconds}`;
        } else {
            clearInterval(countDown);
            messageBox.textContent = 'Times up! You Lost! Try Again!'
            stopGame();
        }
    }, 1000);
};

resetButton.addEventListener('click', () => {
    resetBoard();
    totaltime = 180
    let minutes = Math.floor(totaltime/60)
    let seconds = String(totaltime % 60).padStart(2, 0);
    document.getElementById('timeDisplay').textContent = `${minutes}:${seconds}`;
    startNewGame();
});


// 6. activate the reset button
resetButton.addEventListener('click', resetBoard);
// reset the board
function resetBoard() {
    let slotindex = 0
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            slots[slotindex].textContent = board[i][j];
            if (board[i][j] === '') {
                slots[slotindex].contentEditable = 'true';
                slots[slotindex].textContent = '';
            } 

            slotindex++;
        }
    } messageBox.textContent = '';
};

//7. activate check solution button
solvedButton.addEventListener('click', checkSolution);
