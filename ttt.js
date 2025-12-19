function main() {
    const prompt = require('prompt-sync')();
    console.log(`Lets play tic tac toe!`);
    let board = init_board();
    // let board  = [
    //     ['X', 'O', 'O'],
    //     ['O', 'X', 'X'],
    //     ['X', 'X', 'O']
    // ];
    let state = 0;
    print_board(board);

    let current = 'X'
    console.log('Game start!')
    while (game_in_progress(board)) {
        console.log('Enter your move player ' + current + '!');
        let x = parseInt(prompt('Enter x coordinate (0-2): '));
        if (input_error(x)) {
            continue;
        }
        let y = parseInt(prompt('Enter y coordinate (0-2): '));
        if (input_error(y)) {
            continue;
        }
        if (board_error(x, y, board)) {
            continue;
        }
        board = input(x, y, board, current);
        print_board(board);
        current = player_swap(current);
    } console.log('CONGRATS PLAYER ' + current + '!!!')
}

function init_board() {
    return [
        ['_', '_', '_'],
        ['_', '_', '_'],
        ['_', '_', '_']
    ];
}

/**
 * 
 * @param {string} current - 'X' or 'O'
 * 
 * @returns opposite of current player
 */
function player_swap(current) {
    if (current === 'X') {
        current = 'O';
    } else {
        current = 'X';
    } return current;
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
    if (input < 0 || input > 2 || isNaN(input)) {
        console.log("Please put a proper value!");
        return true;
    } return false;
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
        return true;
    } return false;
}

/**
 * 
 * @param {number[][]} board - 2D array state of game
 * @returns false, true if someone won
 */
function game_in_progress(board) {
    let state = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'X') state++;
            else if (board[i][j] === 'O') state--;
            else break;
        }
        if (check_win(state)) {
            return false;
        } state = 0;

        for (j = 0; j < 3; j++) {
            if (board[j][i] === 'X') state++;
            else if (board[j][i] === 'O') state--;
            else break;
        }
        if (check_win(state)) {
            return false;
        } state = 0;
    }
    for (j = 0; j < 3; j++) {
        if (board[j][j] === 'X') state++;
        else if (board[j][j] === 'O') state--;
        else break;
    }
    if (check_win(state)) {
            return false;
        } state = 0;

    for (j = 2; j > -1; j--) {
        if (board[Math.abs(j - 2)][j] === 'X') state++;
        else if (board[Math.abs(j - 2)][j] === 'O') state--;
        else break;
    }

    if (check_win(state)) {
            return false;
        } return true;
}

function check_win(state) {
    if (state === 3 || state === -3) {
            return true;
        } return false;
}

/**
 * 
 * @param {number} x - x coord
 * @param {number} y - y coord
 * @param {number[][]} board - current board
 * @param {string} user - which player is input
 * 
 * @returns {number[][]} updated board
 */
function input(x, y, board, user) {
    board[x][y] = user;
    return board;
}
main()