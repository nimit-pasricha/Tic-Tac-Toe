const gameBoard = function GameBoard() {
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
      board[i][j] = "-";
    }
  }

  const getBoard = () => board;

  const placeMarker = (row, column, token) => {
    board[row][column] = token;
  }

  const printBoard = () => {
    console.log(board[0][0] + " " + board[0][1] + " " + board[0][2] + "\n"
      + board[1][0] + " " + board[1][1] + " " + board[1][2] + "\n"
      + board[2][0] + " " + board[2][1] + " " + board[2][2]
    );
  }

  return {board, getBoard, placeMarker, printBoard};
};

const gameController = (function() {
  const playerTokens = {
    player1: "X",
    player2: "O"
  }

  let currentPlayer = "player1";

  const board = gameBoard();

  const playRound = () => {
    const rowNumber = +prompt("Enter row: ");
    const columnNumber = +prompt("Enter column: ");
    const markerToPlace = playerTokens[currentPlayer];
    board.placeMarker(rowNumber, columnNumber, markerToPlace);
    board.printBoard();
    console.log(checkForVictory());
    switchPlayerTurn();
  }

  function switchPlayerTurn() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  }

  const allEqual = (arr) => arr.every(v => v === arr[0]);
  const currentBoard = board.getBoard();

    // checking for winning conditions
  function checkForVictory() {

    // checking if any row has three consecutive symbols
    for (let i of currentBoard) {
      if (allEqual(i)) {
        if (i[0] === "X") return "Player 1 Wins";
        else if (i[0] === "O") return "Player 2 Wins";
      }
    }

    // checking if any of the columns have 3 consecutive symbols
    for (let i = 0; i < 3; i++) {
      if (currentBoard[0][i] === currentBoard[1][i]
        && currentBoard[1][i] === currentBoard[2][i]) {
          if (currentBoard[0][i] === "X") return "Player 1 Wins";
          if (currentBoard[0][i] === "O") return "Player 2 Wins";
      }
    }
  }
  

  return {playRound}

}())
