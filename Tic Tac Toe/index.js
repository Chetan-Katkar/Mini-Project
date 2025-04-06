// Get all the box elements
const boxes = document.querySelectorAll('.box-content');
const resetButton = document.querySelector('.reset-button');

// Game state variables
let currentPlayer = 'x';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningConditions = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Function to handle cell click
function handleCellClick(clickedCellEvent) {
    // Get the clicked cell
    const clickedCell = clickedCellEvent.target;
    
    // Get the index of the clicked cell
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    
    // Check if the cell is already played or if the game is inactive
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Update the game state and UI
    handleCellPlayed(clickedCell, clickedCellIndex);
    
    // Check for win or draw
    handleResultValidation();
}

// Function to update the game state and UI
function handleCellPlayed(clickedCell, clickedCellIndex) {
    // Update the game state
    gameState[clickedCellIndex] = currentPlayer;
    
    // Update the UI
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('font');
}

// Function to check for win or draw
function handleResultValidation() {
    let roundWon = false;
    
    // Check all winning conditions
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        const condition = gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
        
        if (condition) {
            roundWon = true;
            break;
        }
    }
    
    // If there's a win
    if (roundWon) {
        alert(`Player ${currentPlayer.toUpperCase()} has won!`);
        gameActive = false;
        return;
    }
    
    // Check for draw
    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        alert('Game ended in a draw!');
        gameActive = false;
        return;
    }
    
    // If no win or draw, change player
    handlePlayerChange();
}

// Function to change the current player
function handlePlayerChange() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
}

// Function to reset the game
function handleResetGame() {
    gameActive = true;
    currentPlayer = 'x';
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    // Reset the UI
    boxes.forEach(box => {
        box.textContent = '';
        box.classList.remove('font');
    });
}

// Add event listeners to all boxes
boxes.forEach((box, index) => {
    box.setAttribute('data-cell-index', index);
    box.addEventListener('click', handleCellClick);
});

// Add event listener to reset button
resetButton.addEventListener('click', handleResetGame); 