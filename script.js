const gameBoard = (() => {
	const board = Array.from(9).fill('');

})();

const displayController = (() => {
	const cells = document.querySelectorAll('.board > div');

	const initialize = () => {
		cells.forEach(cell => {
			cell.addEventListener('click', ());
		});
	};

	initialize();


})();

const player = (() => {
	const Person = (name, mark) => {
		return {
			name,
			mark,
		};
	};

	const player1 = Person('Player 1', 'X');
	const player2 = Person('Player 2', 'O');

})();