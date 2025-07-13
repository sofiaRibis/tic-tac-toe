const NUMBER_OF_CELLS = 9;
let currentPlayer = 'O';
let selectedMode = '';

const gameBoard = document.getElementById("board");
const gameOverMessage = document.getElementById('game-over-message');
const restartButton = document.getElementById('restart');
const startModal = document.getElementById('start-game-dialog');
const endModal = document.getElementById('game-over-dialog');
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
	cell.style.setProperty('--player-color', '#ff006b');
	cell.classList.add('current-player');
}

const computerMove = () => {
	const emptyCells = cells.filter(cell => cell.textContent === '');
	if (emptyCells.length === 0) return;

	const randomNumber = Math.floor(Math.random() * emptyCells.length);
	emptyCells[randomNumber].textContent = 'X';
	emptyCells[randomNumber].style.setProperty('--player-color', '#00e0ff');
	emptyCells[randomNumber].classList.add('current-player');
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
	if (currentPlayer === 'O') {
		cell.style.setProperty('--player-color', '#ff006b');
	} else {
		cell.style.setProperty('--player-color', '#00e0ff');
	}
	cell.classList.add('current-player');
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
			if (valA === 'O') {
				renderMessage(`Yay, player ${valA} won 🥳`);
			} else {
				renderMessage(`Hehe X has won 🚀`);
			}
			disableGameBoard();
			setTimeout(() => {
				endModal.open = true;
			}, 1200);
			return true;
		}
	}

	const isDraw = [...cells].every(cell => cell.textContent !== '');
	if (isDraw) {
		renderMessage("Ops... it's a draw 🤷‍♀️")
		disableGameBoard();
		setTimeout(() => {
			endModal.open = true;
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

	endModal.open = false;
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
	startModal.open = false;
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
