const gameBoard = (() => {
	const board = Array.from(9).fill('');
	let hasWinner = false;

	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	const getStatus = () => hasWinner;

	const checkGameStatus = (player) => {
		console.log(player.moves);
	};

	const resetBoard = () => {
		board.forEach((item, idx) => board[idx] = '');
	};

	return {
		resetBoard,
		checkGameStatus,
	};

})();

const displayController = (() => {
	const cells = document.querySelectorAll('.board > div');
	const resetButton = document.querySelector('.btn');

	resetButton.addEventListener('click', gameBoard.resetBoard);

	const initialize = () => {
		cells.forEach((cell, idx) => {
			cell.dataset.index = idx;
			cell.addEventListener('click', () => player.setValue(cell));
		});
	};

	initialize();


})();

const player = (() => {
	const Person = (name, mark, moves) => {
		return {
			name,
			mark,
			moves,
		};
	};
	const player1 = Person('Player 1', 'X', []);
	const player2 = Person('Player 2', 'O', []);

	let turnPlayer = player1;

	const nextPlayer = () => {
		turnPlayer = turnPlayer === player1 ? player2 : player1;
	};

	const setValue = (cell) => {
		cell.textContent = turnPlayer.mark;
		turnPlayer.moves.push(Number(cell.dataset.index));
		gameBoard.checkGameStatus(turnPlayer);
		nextPlayer();
	};


	return {
		setValue,
	};

})();