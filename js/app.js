
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

// 2. generate the board using the array from above
function genBoard() {
    let index = 0;

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            slots[index].textContent = board[row][col];

            // if the cell is empty make it editable
            if (board[row][col] === '') {
                slots[index].contentEditable = 'true';

                // make a function to restrict slots take numbers between 1 to 9 and if the input is other than 1 to 9 clear
                slots[index].addEventListener('input', function() {
                    let value = slots[index].textContent.trim();
                    if (!/^[1-9]$/.test(value)) {
                        slots[index].textContent = '';
                    }
                });
            }

            index++;
        }
    }
}

genBoard();

// check if the row and column has repeated numbers clears the slot.





// 3. building the gameboard solution

// 5. validate player inputs that should be between 1 to 9

// 6. display error msgs for invalid and repeating numbers

// 7. check game state 

// 8. put timer for player how much time passed when the player started the game

// 9. activate the reset button

// 10. check if the game is solved correctly.

// 11. display the winning msg and stop the game.
