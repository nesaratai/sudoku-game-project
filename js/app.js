
// 1. define requied variables
let board = [
    ['9', '1', '3', '', '', '', '5', '', '6',],
    ['6', '', '7', '', '1', '', '', '2', '4',], 
    ['', '5', '', '6', '8', '', '', '7', '',],
    ['', '7', '9', '', '3', '', '6', '', '',],
    ['1', '', '2', '', '9', '', '', '4', '3',],
    ['', '3', '', '', '', '4', '', '9', '',],
    ['', '4', '', '8', '', '1', '', '6', '',],
    ['7', '', '6', '', '', '9', '8', '', '5',],
    ['', '', '1', '', '', '6', '4', '', '7']
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


let slots = document.querySelectorAll('.sqr');
let resetButton = document.getElementById('reset');


// 2. generate the board using the array from above
function genBoard() {
    let index = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            slots[index].textContent = board[i][j];

            // if the cell is empty make it editable
            if (board[i][j] === '') {
                slots[index].contentEditable = 'true';

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


// 4. check solution for the board if the borad is solved correctly with no duplicate number then show msg you win.


// 5. put timer for player how much time passed when the player started the game

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
    }
};

//7. display the winning msg and stop the game.
