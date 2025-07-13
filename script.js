
const NUMBER_OF_CELLS = 9;
const gameBoard = document.getElementById("board");
const gameOver = document.getElementById('game-over');
const restartGame = document.querySelector('button');

// create grid
for (let i = 0; i < NUMBER_OF_CELLS; i++) {
	const cell = document.createElement('li');
	gameBoard.appendChild(cell);
}


const cells = gameBoard.querySelectorAll('li');
const cellsArray = [...cells];

function userMove(cell) {
	if (cell.textContent !== '') return;
	cell.textContent = 'O';
}

function computerMove() {
	const emptyCells = cellsArray.filter(cell => cell.textContent === '');
	if (emptyCells.length === 0) return;

	const randomNumber = Math.floor(Math.random() * emptyCells.length);
	emptyCells[randomNumber].textContent = 'X';
}

function isGameOver() {
	const emptyCells = cellsArray.filter(cell => cell.textContent === '');
	if (cellsArray[0].textContent === 'O' && cellsArray[1].textContent === 'O' && cellsArray[2].textContent === 'O' ||
		cellsArray[0].textContent === 'X' && cellsArray[1].textContent === 'X' && cellsArray[2].textContent === 'X' ||
		cellsArray[3].textContent === 'O' && cellsArray[4].textContent === 'O' && cellsArray[5].textContent === 'O' ||
		cellsArray[3].textContent === 'X' && cellsArray[4].textContent === 'X' && cellsArray[5].textContent === 'X' ||
		cellsArray[6].textContent === 'O' && cellsArray[7].textContent === 'O' && cellsArray[8].textContent === 'O' ||
		cellsArray[6].textContent === 'X' && cellsArray[7].textContent === 'X' && cellsArray[8].textContent === 'X' ||
		cellsArray[0].textContent === 'O' && cellsArray[4].textContent === 'O' && cellsArray[8].textContent === 'O' ||
		cellsArray[0].textContent === 'X' && cellsArray[4].textContent === 'X' && cellsArray[8].textContent === 'X' ||
		cellsArray[2].textContent === 'O' && cellsArray[4].textContent === 'O' && cellsArray[6].textContent === 'O' ||
		cellsArray[2].textContent === 'X' && cellsArray[4].textContent === 'X' && cellsArray[6].textContent === 'X' ||
		cellsArray[0].textContent === 'O' && cellsArray[3].textContent === 'O' && cellsArray[6].textContent === 'O' ||
		cellsArray[0].textContent === 'X' && cellsArray[3].textContent === 'X' && cellsArray[6].textContent === 'X' ||
		cellsArray[1].textContent === 'O' && cellsArray[4].textContent === 'O' && cellsArray[7].textContent === 'O' ||
		cellsArray[1].textContent === 'X' && cellsArray[4].textContent === 'X' && cellsArray[7].textContent === 'X' ||
		cellsArray[2].textContent === 'O' && cellsArray[5].textContent === 'O' && cellsArray[8].textContent === 'O' ||
		cellsArray[2].textContent === 'X' && cellsArray[5].textContent === 'X' && cellsArray[8].textContent === 'X'
	) {

		gameOver.textContent = 'GAME OVERRRRR some one win';
	} else if (!emptyCells) {
		debugger
		gameOver.textContent = 'GAME OVERRRRR ITS A DROW';
	}
}

// start game
cellsArray.forEach((cell) => {
	cell.addEventListener('click', function () {
		// avoid fast double click on same cell
		if (cell.textContent !== '') return;
		userMove(cell);
		computerMove()

		isGameOver(cell)
	})

});

restartGame.addEventListener('click', function () {
	cellsArray.forEach((cell) => {
		cell.textContent = ''
	});
	if (gameOver.textContent !== '') {
		gameOver.textContent = ''
	}
})