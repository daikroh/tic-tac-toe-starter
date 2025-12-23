function main() {
    const prompt = require('prompt-sync')();
    console.log(`Lets play tic tac toe!`);
    let board = init_board();
    let state = 0;
    print_board(board);

    let current = 'X'
    console.log('Game start!')
    while (game_in_progress(board)) {
        if (current === 'X') {
            console.log('Enter your move player ' + current + '!');
            let x = parseInt(prompt('Enter row (0-2): '));
            if (input_error(x)) {
                continue;
            }
            let y = parseInt(prompt('Enter column (0-2): '));
            if (input_error(y)) {
                continue;
            }
            if (board_error(x, y, board)) {
                continue;
            }
            board = input(x, y, board, current);
            print_board(board);
            current = player_swap(current);
        } else {
            const move = best_move(board, 'O');
            board[move.row][move.column] = 'O';
            console.log(`O plays: ${move.row}, ${move.column}`);
            print_board(board);
            current = player_swap(current);
        }
    }
    
    const winner = check_winner(board);
    if (winner === 1) {
        console.log('CONGRATS PLAYER X!!!');
    } else if (winner === -1) {
        console.log('CONGRATS PLAYER O!!!');
    } else {
        console.log('Tied Game!');
    }
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
    if (check_winner(board) !== 0) {
        return false;
    }
    if (check_full(board)) {
        return false;
    }
    return true;
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

/**
 * checks for a winner
 * @param {string[][]} board - current board state
 * @returns 1 if X wins, -1 if O wins, 0 if no winner
 */
function check_winner(board) {
    for (let row = 0; row < 3; row++) {
        if (board[row][0] !== '_' && 
            board[row][0] === board[row][1] && 
            board[row][1] === board[row][2]) {
            return board[row][0] === 'X' ? 1 : -1;
        }
    }
    
    for (let col = 0; col < 3; col++) {
        if (board[0][col] !== '_' && 
            board[0][col] === board[1][col] && 
            board[1][col] === board[2][col]) {
            return board[0][col] === 'X' ? 1 : -1;
        }
    }
    
    if (board[0][0] !== '_' && 
        board[0][0] === board[1][1] && 
        board[1][1] === board[2][2]) {
        return board[0][0] === 'X' ? 1 : -1;
    }
    
    if (board[0][2] !== '_' && 
        board[0][2] === board[1][1] && 
        board[1][1] === board[2][0]) {
        return board[0][2] === 'X' ? 1 : -1;
    }
    
    return 0;
}

/**
 * Checks if board is full
 * 
 * @param {string[][]} board
 * @returns {boolean} true if full, false otherwise
 */
function check_full(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '_') {
                return false;
            }
        }
    } return true;
}

/**
 * minimax algorithm
 * 
 * @param {string[][]} board - current board state
 * @param {string} player - current player ('X' or 'O')
 * @param {number} depth - recursion depth
 * @returns {number} score
 */
function minimax(board, player, depth) {
    // terminal state
    const winner = check_winner(board);
    if (winner === -1) {
        return depth - 10;
    } else if (winner === 1) {
        return 10 - depth;
    } else if (check_full(board)) {
        return 0;
    }
    
    let score;
    
    if (player === 'X') {  // max
        score = -10;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '_') {
                    board[row][col] = player;  // Try move
                    score = Math.max(score, minimax(board, 'O', depth + 1));  // Recurse
                    board[row][col] = '_'; 
                }
            }
        }
    } else {  // min
        score = 10;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '_') {
                    board[row][col] = player; 
                    score = Math.min(score, minimax(board, 'X', depth + 1));
                    board[row][col] = '_'; 
                }
            }
        }
    }
    
    return score;
}

/**
 * find best move via minimax
 * 
 * @param {string[][]} board - current board state
 * @param {string} player - player to find best move for ('X' or 'O')
 * @returns {{row: number, column: number}} best move coordinates
 */
function best_move(board, player) {
    let best = { row: -1, column: -1 };
    let best_score = (player === 'O') ? 10 : -10;
    const opponent = (player === 'O') ? 'X' : 'O';
    
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === '_') {
                board[row][col] = player;
                const current_score = minimax(board, opponent, 0);
                board[row][col] = '_'; 
                
                // O minimizes, X maximizes
                if (player === 'O' && current_score < best_score) {
                    best_score = current_score;
                    best.row = row;
                    best.column = col;
                } else if (player === 'X' && current_score > best_score) {
                    best_score = current_score;
                    best.row = row;
                    best.column = col;
                }
            }
        }
    }
    return best;
}

main()