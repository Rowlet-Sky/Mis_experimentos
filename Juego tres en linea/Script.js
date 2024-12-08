let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let scores = { X: 0, O: 0 };

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    document.getElementsByClassName('cell')[index].textContent = currentPlayer;

    const winningCombo = getWinningCombo();
    if (winningCombo) {
        highlightWinningCells(winningCombo);
        endGame(`¡Jugador ${currentPlayer} ha ganado!`);
        scores[currentPlayer]++;
        updateScores();
        return;
    }

    if (checkDraw()) {
        endGame('¡Empate!');
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (document.getElementById('gameMode').value === 'vs-cpu' && currentPlayer === 'O') {
        setTimeout(makeCPUMove, 500);
    }
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        document.getElementsByClassName('cell')[index].classList.add('winning-cell');
    });
}

function makeCPUMove() {
    const difficulty = document.getElementById('difficulty').value;
    let move;

    switch(difficulty) {
        case 'hard':
            move = Math.random() < 0.8 ? getBestMove(3) : getRandomMove();
            break;
        case 'normal':
            move = Math.random() < 0.6 ? getBestMove(2) : getRandomMove();
            break;
        case 'easy':
            move = Math.random() < 0.3 ? getBestMove(1) : getRandomMove();
            break;
    }

    makeMove(move);
}

function getBestMove(depth) {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            let score = minimax(board, depth, false, -Infinity, Infinity);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing, alpha, beta) {
    if (checkWin()) return isMaximizing ? -1 : 1;
    if (checkDraw() || depth === 0) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                bestScore = Math.max(bestScore, minimax(board, depth - 1, false, alpha, beta));
                board[i] = '';
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                bestScore = Math.min(bestScore, minimax(board, depth - 1, true, alpha, beta));
                board[i] = '';
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break;
            }
        }
        return bestScore;
    }
}

function getRandomMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getWinningCombo() {
    return winningCombos.find(combo => {
        return combo.every(index => board[index] === currentPlayer);
    });
}

function checkWin() {
    return getWinningCombo() !== undefined;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function endGame(message) {
    gameActive = false;
    const winnerMessage = document.getElementById('winnerMessage');
    winnerMessage.textContent = message;
    winnerMessage.style.display = 'block';
    winnerMessage.style.animation = 'none';
    winnerMessage.offsetHeight;
    winnerMessage.style.animation = null;
}

function updateScores() {
    document.getElementById('scoreX').textContent = scores.X;
    document.getElementById('scoreO').textContent = scores.O;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    document.getElementById('winnerMessage').style.display = 'none';
    
    if (document.getElementById('gameMode').value === 'vs-cpu' && currentPlayer === 'O') {
        setTimeout(makeCPUMove, 500);
    }
}