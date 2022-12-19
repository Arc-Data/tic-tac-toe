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


		return hasWinner;
	};

	const resetBoard = () => {
		board.forEach((i, idx) => board[idx] = '');
		player.resetGameState();
		displayController.render();
		hasWinner = false;

		displayController.turnSubtitle(player.getTurnPlayerName());
	};

	return {
		getBoard,
		resetBoard,
		checkWinner,
		checkGameStatus,
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

	const resetGameState = () => {
		turnPlayer = player1;
		turn = 1;
		player1.moves = [];
		player2.moves = [];

		displayController.turnSubtitle(getTurnPlayerName);
	};

	const showPlayerMoves = () => {
		console.log(player1.moves, player2.moves);
		console.log(`Turn ${turn}`);
	};

	const nextPlayer = () => {
		turnPlayer = turnPlayer === player1 ? player2 : player1;
	};

	const setValue = (cell) => {
		if(cell.textContent !== '' || gameBoard.checkGameStatus()) return;
		gameBoard.getBoard()[Number(cell.dataset.index)] = turnPlayer.mark;
		turnPlayer.moves.push(Number(cell.dataset.index));
		displayController.render();
		console.log(turn, turnPlayer.moves);
		turn++;

		if(turn >= 5) {
			if (gameBoard.checkWinner(turnPlayer.moves)) {
				displayController.winSubtitle(turnPlayer.name);
				return;
			}
		}	

		nextPlayer();
		displayController.turnSubtitle(turnPlayer.name);
		
	};

	const getTurnPlayerName = () => turnPlayer.name;
	


	return {
		getTurnPlayerName,
		resetGameState,
		setValue,
		showPlayerMoves,
	};

})();

const displayController = (() => {
	const subtitle = document.querySelector('#subtitle');
	const cells = document.querySelectorAll('.board > div');
	const resetButton = document.querySelector('.btn');

	resetButton.addEventListener('click', gameBoard.resetBoard);

	const initialize = () => {
		cells.forEach((cell, idx) => {
			cell.dataset.index = idx;
			cell.addEventListener('click', () => player.setValue(cell));
		});

		turnSubtitle(player.getTurnPlayerName());
	};

	const winSubtitle = name => {
		subtitle.textContent = `${name} wins!`;
	};

	const turnSubtitle = name => {
		subtitle.textContent = `${name}'s turn`;
	};

	const render = () => {
		const board = gameBoard.getBoard();
		cells.forEach((cell, idx) => {
			cell.textContent = board[idx];
		});
	};

	initialize();

	return {
		turnSubtitle,
		winSubtitle,
		render,
	};

})();

