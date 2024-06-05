const gameBoard = (function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  // create a 2d array which will represent the state
  // of the game.
  // eg: [[1,2,3], [4,5,6], [7,8,9]] is equivalent to
  /*
    1 2 3
    4 5 6
    7 8 9
  */
  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < columns; j++) {
      board[i][j] = "";
    }
  }

  const getBoard = () => board;

  const placeMarker = (row, column, token) => {
    board[row][column] = token;
  }

  return {board, getBoard, placeMarker};
})();

const players = [
  {
    name: "player1",
    token: "X"
  }, 
  {
    name: "player2",
    token: "O"
  }
]
