document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.button-option');
    const message = document.getElementById('message');
    const popup = document.querySelector('.popup');
    const restartButton = document.getElementById('restart');
    const newGameButton = document.getElementById('new-game');
    
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
    
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    
    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        
        if (roundWon) {
            message.textContent = `Player ${currentPlayer} Wins!`;
            popup.classList.remove('hide');
            gameActive = false;
            return;
        }
        
        let roundDraw = !gameState.includes('');
        if (roundDraw) {
            message.textContent = 'Draw!';
            popup.classList.remove('hide');
            gameActive = false;
            return;
        }
        
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    
    function handleCellClick(clickedCellEvent) {
        const clickedCell = clickedCellEvent.target;
        const clickedCellIndex = Array.from(buttons).indexOf(clickedCell);
        
        if (gameState[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        gameState[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        handleResultValidation();
    }
    
    function handleRestartGame() {
        gameActive = true;
        currentPlayer = 'X';
        gameState = ['', '', '', '', '', '', '', '', ''];
        popup.classList.add('hide');
        buttons.forEach(button => {
            button.textContent = '';
        });
    }
    
    buttons.forEach(button => button.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', handleRestartGame);
    newGameButton.addEventListener('click', handleRestartGame);
});
