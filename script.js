const NUMBER_OF_CELLS = 9;

const gameBoard = document.getElementById("board");
const gameOverMessage = document.getElementById('game-over');
const restartGame = document.querySelector('button');

// Create game board
for (let i = 0; i < NUMBER_OF_CELLS; i++) {
	const cell = document.createElement('li');
	gameBoard.appendChild(cell);
}

const cells = [...gameBoard.querySelectorAll('li')];

function userMove(cell) {
	if (cell.textContent !== '') return;
	cell.textContent = 'O';
}

function computerMove() {
	const emptyCells = cells.filter(cell => cell.textContent === '');
	if (emptyCells.length === 0) return;

	const randomNumber = Math.floor(Math.random() * emptyCells.length);
	emptyCells[randomNumber].textContent = 'X';
}

function checkGameOver() {
	const winCombinations = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8],
		[0, 3, 6], [1, 4, 7], [2, 5, 8],
		[0, 4, 8], [2, 4, 6]
	];

	for (const [a, b, c] of winCombinations) {
		const valA = cells[a].textContent;
		const valB = cells[b].textContent;
		const valC = cells[c].textContent;

		if (valA && valA === valB && valB === valC) {
			gameOverMessage.textContent = `GAME OVER — '${valA}' wins!`;
			disableGameBoard();
			return;
		}
	}

	const isDraw = [...cells].every(cell => cell.textContent !== '');
	if (isDraw) {
		gameOverMessage.textContent = "GAME OVER — It's a draw!";
		disableGameBoard();
	}
}

function disableGameBoard() {
	cells.forEach(cell => {
		cell.style.pointerEvents = 'none';
	})
}

cells.forEach((cell) => {
	cell.addEventListener('click', function () {
		// avoid fast double click on same cell
		if (cell.textContent !== '') return;
		userMove(cell);
		computerMove();
		checkGameOver();
	})

});

restartGame.addEventListener('click', function () {
	cells.forEach((cell) => {
		cell.textContent = '';
		cell.style.pointerEvents = 'auto';
	});
	gameOverMessage.textContent = '';
})