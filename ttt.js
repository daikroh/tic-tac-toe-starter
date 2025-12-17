function main() {
    console.log(`Lets play tic tac toe!`);
    // let board = init_board();
    let board  = [
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
        ['X', 'X', 'O']
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
    let state = 0
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === 'X') state++;
            else if (board[i][j] === 'O') state--;
            else break;
        }
        if (check_win(state)) {
            return true;
        } state = 0;

        for (j = 0; j < 3; j++) {
            if (board[j][i] === 'X') state++;
            else if (board[j][i] === 'O') state--;
            else break;
        }
        if (check_win(state)) {
            return true;
        } state = 0;
    }
    for (j = 0; j < 3; j++) {
        if (board[j][j] === 'X') state++;
        else if (board[j][j] === 'O') state--;
        else break;
    }
    if (check_win(state)) {
            return "front";
        } state = 0;

    for (j = 2; j > -1; j--) {
        if (board[Math.abs(j - 2)][j] === 'X') state++;
        else if (board[Math.abs(j - 2)][j] === 'O') state--;
        else break;
    }

    if (check_win(state)) {
            return true;
        } return false;
}

function check_win(state) {
    if (state === 3 || state === -3) {
            return true;
        } return false;
}
main()