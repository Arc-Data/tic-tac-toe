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

	const getBoard = () => board;

	const checkGameStatus = () => hasWinner;

	const checkWinner = (moves) => {
		hasWinner = winConditions.some(condition => {
			return moves.every(index => condition.includes(index));
		});

		if(hasWinner) {
			console.log("Huh?");
		}
	};

	// const resetBoard = () => {
	// 	board.forEach((item, idx) => board[idx] = '');
	// 	displayController.render();

	// 	hasWinner = false;
	// };

	return {
		getBoard,
		resetBoard,
		checkWinner,
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

	const render = () => {
		const board = gameBoard.getBoard();
		cells.forEach((cell, idx) => {
			cell.textContent = board[idx];
		});
	};

	return {
		render,
	};

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
	let turn = 1;
	let turnPlayer = player1;

	const resetMoves = () => {
		player1.moves = [];
		player2.moves = [];
	};

	const nextPlayer = () => {
		turnPlayer = turnPlayer === player1 ? player2 : player1;
	};

	const setValue = (cell) => {
		if(cell.textContent !== '' || gameBoard.checkGameStatus()) return;
		
		gameBoard.getBoard()[Number(cell.dataset.index)] = turnPlayer.mark;
		turnPlayer.moves.push(Number(cell.dataset.index));
		displayController.render();
		
		if(turn >= 5) {
			gameBoard.checkWinner(turnPlayer.moves);
		}

		nextPlayer();
		turn++;
		
	};

	


	return {
		setValue,
	};

})();