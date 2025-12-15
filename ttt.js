function main() {
    console.log(`Lets play tic tac toe!`);
    // let board = init_board();
    let board  = [
        ['O', 'X', 'X'],
        ['O', 'X', 'X'],
        ['X', 'X', 'X']
    ];
    let state = 0;
    print_board(board);
    console.log(game_state(board));
}

function init_board() {
    let board = [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
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

/**
 * 
 * @param {number[][]} board - 2D array state of game
 * @returns true, false if someone won
 */
function game_state(board) {
    let state = 0;
    // horizontal
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '_') {
                return true;
            } else {
                if (check_win(board[i][j], state)) {
                    return false;
                }
            }
        }
    }
}

/**
 * 
 * @param {string} point - X and O for points
 * @param {number} state - 3 or -3 means a player has won
 * @returns true if someone wins, false if not
 */
function check_win(point, state) {
    switch(point) {
        case 'X':
            state++;
            break;
        case 'O':
            state--;
            break;
    }
    if (state === 3 || state === -3) {
        return true;
    } else {
        state = 0;
        return false;
    }
}

main()