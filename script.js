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
		hasWinner = winConditions.some( winCon => {
			return winCon.every(index => moves.includes(index));
		});
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
		if(cell.textContent !== '' || gameBoard.checkGameStatus() || turn == 10) return;
		gameBoard.getBoard()[Number(cell.dataset.index)] = turnPlayer.mark;
		turnPlayer.moves.push(Number(cell.dataset.index));
		displayController.render();
		turn++;

		if(turn >= 5) {
			if (gameBoard.checkWinner(turnPlayer.moves)) {
				displayController.winSubtitle(turnPlayer.name);
				return;
			}
		}	

		if(turn == 10) {
			displayController.tieSubtitle();
			return;
		}

		nextPlayer();
		displayController.turnSubtitle(turnPlayer.name);
	};

	const getTurnNumber = () => turn;

	const getTurnPlayerName = () => turnPlayer.name;
	
	const setP1Name = name => {
		player1.name = name || 'Player 1';
	};

	const setP2Name = name => {
		player2.name = name || 'Player 2';
	};

	return {
		setP1Name,
		setP2Name,
		getTurnPlayerName,
		resetGameState,
		setValue,
		showPlayerMoves,
		getTurnNumber,
	};
})();

const displayController = (() => {
	const subtitle = document.querySelector('#subtitle');
	const cells = document.querySelectorAll('.board > div');
	const resetButton = document.querySelector('.reset-btn');
	const saveButton = document.querySelector('#save-btn');
	const settingsButton = document.querySelector('#settings-btn');
	const closeButton = document.querySelector('#close-btn');
  	const overlay = document.querySelector('.overlay');

	const form = document.querySelector("form");

	const openForm = () => {
		console.log("Open trigger");
		form.classList.add('active');
		overlay.classList.add('active');
	};

	const closeForm = () => {
		console.log("Close trigger");
		form.classList.remove('active');
		overlay.classList.remove('active');
	};

	const initialize = () => {
		cells.forEach((cell, idx) => {
			cell.dataset.index = idx;
			cell.addEventListener('click', () => player.setValue(cell));
		});

		turnSubtitle(player.getTurnPlayerName());
	};

	const tieSubtitle = () => {
		console.log("huh?");
		subtitle.textContent = `It's a draw!`;
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

	settingsButton.addEventListener('click', openForm);
	
	overlay.addEventListener('click', closeForm);
	resetButton.addEventListener('click', gameBoard.resetBoard);
	
	saveButton.addEventListener('click', () => {
		event.preventDefault();
		const name1 = document.querySelector('#player1Name');
		const name2 = document.querySelector('#player2Name');

		player.setP1Name(name1.value);
		player.setP2Name(name2.value);

		gameBoard.resetBoard();
		closeForm();
	});
	
	closeButton.addEventListener('click', (e) => {
		event.preventDefault();
		closeForm();
	});

	initialize();

	return {
		tieSubtitle,
		turnSubtitle,
		winSubtitle,
		render,
	};
})();