function main() {
    console.log(`Lets play tic tac toe!`);
   let board = init_board();
   print_board(board)
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
                process.stdout.write(' | ')
            } else {
                process.stdout.write('\n')
            }
        } if (i !== 2) {
            console.log('--+---+--')
        }
    }
}
main()