// Initialize the board state and current player
let currentPlayer = 'X';
const boardState = Array.from({ length: 3 }, () => Array(3).fill(null));
const cells = [];

// Create the game board
function createBoard() {
    const board = document.getElementById('tic-tac-toe');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        const rowCells = createRow(i);
        rowCells.forEach(cell => row.appendChild(cell));
        cells.push(rowCells);
        board.appendChild(row);
    }
}

// Create a row with cells
function createRow(rowIndex) {
    const rowCells = [];
    for (let j = 0; j < 3; j++) {
        const cell = document.createElement('div');
        cell.setAttribute('id', `${rowIndex}-${j}`);
        cell.classList.add('cell');
        cell.addEventListener('click', handleClick);
        rowCells.push(cell);
    }
    return rowCells;
}

// Handle a cell click event
function handleClick(event) {
    const cell = event.target;
    const [row, col] = cell.id.split('-').map(Number);

    if (!boardState[row][col]) {
        boardState[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            setTimeout(() => alert(`${winner} wins!`), 100);
            resetBoard();
        } else if (boardState.flat().every(cell => cell)) {
            setTimeout(() => alert('It\'s a draw!'), 100);
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

// Check for a winner
function checkWinner() {
    // Check rows, columns, and diagonals
    for (let i = 0; i < 3; i++) {
        if (boardState[i][0] && boardState[i][0] === boardState[i][1] && boardState[i][0] === boardState[i][2]) {
            return boardState[i][0];
        }
        if (boardState[0][i] && boardState[0][i] === boardState[1][i] && boardState[0][i] === boardState[2][i]) {
            return boardState[0][i];
        }
    }
    if (boardState[0][0] && boardState[0][0] === boardState[1][1] && boardState[0][0] === boardState[2][2]) {
        return boardState[0][0];
    }
    if (boardState[0][2] && boardState[0][2] === boardState[1][1] && boardState[0][2] === boardState[2][0]) {
        return boardState[0][2];
    }
    return null;
}

// Reset the board for a new game
function resetBoard() {
    boardState.forEach((row, i) => row.forEach((_, j) => {
        boardState[i][j] = null;
        cells[i][j].textContent = '';
    }));
    currentPlayer = 'X';
}

// Create the initial board
createBoard();