function main() {
    console.log(`Lets play tic tac toe!`);
    let board = init_board();
    print_board(board);
}

function init_board() {
    let board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_'],
    ];
    return board;
}

/**
 * 
 * @param {number[][]} board - 2D Array
 */
function print_board(board) {
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            process.stdout.write(board[i][j]);
            if (j !== 2) {
                process.stdout.write(' | ');
            } else {
                process.stdout.write('\n');
            }
        } if (i !== 2) {
            console.log('--+---+--');
        }
    }
}

/**
 * 
 * @param {number} input - checking if input is valid 0-2
 * @returns true if input is valid, else false
 */
function input_error(input) {
    if (input < 0 || input > 2) {
        console.log("Please put a proper value!");
        return false;
    } return true;
}

/**
 * 
 * @param {number} x - first input, x coord
 * @param {number} y - second input, y coord
 * @param {*} board - current board
 * @returns true if x,y is on an empty space on board, else false
 */
function board_error(x, y, board) {
    if (board[x][y] !== '_') {
        console.log('Please select an empty space!');
        return false;
    } return true;
}
main()