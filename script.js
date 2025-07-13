const NUMBER_OF_CELLS = 9;
let currentPlayer = 'O';
let selectedMode = '';

const gameBoard = document.getElementById("board");
const gameOverMessage = document.getElementById('game-over');
const restartButton = document.getElementById('restart');
const startModal = document.getElementById('start-game');
const onePlayerOption = document.getElementById('one-player');
const twoPlayersOption = document.getElementById('two-players');

// Init Game Board
for (let i = 0; i < NUMBER_OF_CELLS; i++) {
	const cell = document.createElement('li');
	gameBoard.appendChild(cell);
}

const cells = [...gameBoard.querySelectorAll('li')];

const playerMove = (cell, symbol) => {
	if (cell.textContent !== '') return;
	cell.textContent = symbol;
}

const computerMove = () => {
	const emptyCells = cells.filter(cell => cell.textContent === '');
	if (emptyCells.length === 0) return;

	const randomNumber = Math.floor(Math.random() * emptyCells.length);
	emptyCells[randomNumber].textContent = 'X';
}

const onePlayerHandler = (cell) => {
	playerMove(cell, 'O');

	if (checkGameOver()) return;

	disableGameBoard();
	setTimeout(() => {
		computerMove();
		checkGameOver();
		enableGameBoard();
	}, 100);
}

const twoPlayersHandler = (cell) => {
	if (cell.textContent !== '') return;
	cell.textContent = currentPlayer;
	currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
}

const checkGameOver = () => {
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
			renderMessage(`GAME OVER — '${valA}' wins!`)
			disableGameBoard();
			return true;
		}
	}

	const isDraw = [...cells].every(cell => cell.textContent !== '');
	if (isDraw) {
		renderMessage("GAME OVER — It's a draw!")
		disableGameBoard();
		return true;
	}

	return false;
}

const restartGame = () => {
	cells.forEach((cell) => cell.textContent = '');
	enableGameBoard();
	renderMessage('');
	startModal.open = true;
}

const renderMessage = (message) => {
	gameOverMessage.textContent = message;
};

const disableGameBoard = () => {
	cells.forEach(cell => {
		cell.style.pointerEvents = 'none';
	})
}
const enableGameBoard = () => {
	cells.forEach(cell => {
		cell.style.pointerEvents = 'auto';
	})
}

const closeModal = (option) => {
	selectedMode = option;
	startModal.open = false
}


cells.forEach((cell) => {
	cell.addEventListener('click', function () {
		// avoid fast double click on same cell
		if (cell.textContent !== '') return;

		if (selectedMode === 'one-player') {
			onePlayerHandler(cell)
		} else if (selectedMode === 'two-player') {
			twoPlayersHandler(cell);
		}
		checkGameOver();
	})

});


onePlayerOption.addEventListener('click', closeModal.bind(null, 'one-player'));
twoPlayersOption.addEventListener('click', closeModal.bind(null, 'two-player'));

restartButton.addEventListener('click', restartGame);
