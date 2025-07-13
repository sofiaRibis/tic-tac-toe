const CELL_COUNT = 9;
let currentPlayer = 'O';
let gameMode = '';

const gameBoard = document.getElementById("board");
const gameOverMessage = document.getElementById('game-over-message');
const restartButton = document.getElementById('restart');
const startDialog = document.getElementById('start-game-dialog');
const endDialog = document.getElementById('game-over-dialog');
const onePlayerOption = document.getElementById('one-player');
const twoPlayersOption = document.getElementById('two-players');

// Init Game Board
for (let i = 0; i < CELL_COUNT; i++) {
	const cell = document.createElement('li');
	gameBoard.appendChild(cell);
}

const cells = [...gameBoard.querySelectorAll('li')];

const PLAYER_COLORS = {
	O: "#ff006b",
	X: "#00e0ff",
}

const markCell = (cell, symbol) => {
	if (cell.textContent !== '') return;

	cell.textContent = symbol;
	cell.style.setProperty('--player-color', PLAYER_COLORS[symbol]);
	cell.classList.add('current-player');
}

const playerMove = (cell, symbol) => {
	if (cell.textContent !== '') return;
	markCell(cell, symbol);
}

const computerMove = () => {
	const emptyCells = cells.filter(cell => cell.textContent === '');
	if (emptyCells.length === 0) return;

	const randomNumber = Math.floor(Math.random() * emptyCells.length);
	markCell(emptyCells[randomNumber], 'X');
}

const onePlayerHandler = (cell) => {
	playerMove(cell, 'O');

	if (checkGameOver()) return;

	disableGameBoard();
	setTimeout(() => {
		computerMove();
		checkGameOver();
		enableGameBoard();
	}, 300);
}

const twoPlayersHandler = (cell) => {
	markCell(cell, currentPlayer);
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
			renderMessage(valA === 'O' ? `Yay, player ${valA} won 🥳` : `Hehe X has won 🚀`)
			disableGameBoard();
			setTimeout(() => {
				endDialog.open = true;
			}, 1200);
			return true;
		}
	}

	const isDraw = [...cells].every(cell => cell.textContent !== '');
	if (isDraw) {
		renderMessage("Ops... it's a draw 🤷‍♀️")
		disableGameBoard();
		setTimeout(() => {
			endDialog.open = true;
		}, 1200);
		return true;
	}

	return false;
}

const restartGame = () => {
	cells.forEach((cell) => {
		cell.textContent = '';
		cell.classList.remove('current-player');
	});
	enableGameBoard();
	renderMessage('');
	endDialog.open = false;
	startDialog.open = true;
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

const selectGameMode = (mode) => {
	gameMode = mode;
	startDialog.open = false;
}

cells.forEach((cell) => {
	cell.addEventListener('click', function () {
		// avoid fast double click on same cell
		if (cell.textContent !== '') return;

		if (gameMode === 'one-player') {
			onePlayerHandler(cell)
		} else if (gameMode === 'two-player') {
			twoPlayersHandler(cell);
		}
		checkGameOver();
	})

});


onePlayerOption.addEventListener('click', () => selectGameMode('one-player'));
twoPlayersOption.addEventListener('click', () => selectGameMode('two-player'));

restartButton.addEventListener('click', restartGame);
