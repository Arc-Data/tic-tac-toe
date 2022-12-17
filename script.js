const Player = (name, mark) => {
	return {
		name,
		mark,
	};
};


const gameBoard = (() => {
	const board = Array.from(9).fill('');
	const p1moves = [];
	const p2moves = [];

	let hasWinner = false;

	const checkWin = () => hasWinner;

	const getBoard = () => board;

	const setCell = (idx, player) => {
		board[idx] = game.getTurnPlayer().mark;
		displayController.render();
		game.nextPlayer();
	};


	const resetBoard = () => {
		board.forEach(i => '');
	};


	return {
		setCell,
		resetBoard,
		getBoard,
		checkWin,
	};

})();



const game = (() => {
	const player1 = Player('Player 1', 'X');
	const player2 = Player('Player 2', 'O');
	let turnPlayer = player1;
	let turn = 0;

	const checkWin = () => {

	};

	const getTurnPlayer = () => turnPlayer;

	const nextPlayer = () => {
		turnPlayer = turnPlayer === player1 ? player2 : player1;
		turn++;
	};

	return {
		getTurnPlayer,
		nextPlayer,
	};
})();

const displayController = (() => {
	const divs = document.querySelectorAll('.board > div');

	const initialize = () => {
		divs.forEach((div, idx) => {
			div.dataset.index = idx;
			div.addEventListener('click', () => gameBoard.setCell(div.dataset.index));
		}); 	
	};
	

	const render = () => {
		const board = gameBoard.getBoard();
		divs.forEach((div, idx) => div.textContent = board[idx]);
	};

	initialize();

	return {
		render
	};
})();





/*
 * 	What do i need to consider?
 *	
 *  Player Turn - switch between player 1 and player 2
 *	Symbol 		- switch between x and o 
 *	if player 1 then symbol = x ? should that just be swept along every gamestate check?
 * 	div onclick change symbol and player ? 
 *  
 *  check all board divs and gather those with x's and o's
 *
 *
 *
 *
 *    
 *
 *
 *
 *
 *
 *
 *
 * 
 * a button that uses a function to reset the board 
 */