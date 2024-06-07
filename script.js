const gameBoard = function GameBoard() {
  const rows = 3;
  const columns = 3;

  /* create a 2d array which will represent the state
     of the game.
     eg: [[1,2,3], [4,5,6], [7,8,9]] is equivalent to */
  /*
    1 2 3
    4 5 6
    7 8 9
  */
  function createNewBoard() {
    board = [];
    for (let i = 0; i < rows; i++) {
      board.push([]);
      for (let j = 0; j < columns; j++) {
        board[i][j] = "-";
      }
    }
  }
  createNewBoard();

  const getBoard = () => board;

  const canPlaceMarker = (row, column) => {
    return board[row][column] === "-";
  };

  const placeMarker = (row, column, token) => {
    // condition to prevent user from selecting
    // an already-selected slot
    if (canPlaceMarker(row, column)) {
      board[row][column] = token;
    }
  };

  // PURELY FOR TESTING PURPOSES IN CONSOLE
  const printBoard = () => {
    console.log(
      board[0][0] +
        " " +
        board[0][1] +
        " " +
        board[0][2] +
        "\n" +
        board[1][0] +
        " " +
        board[1][1] +
        " " +
        board[1][2] +
        "\n" +
        board[2][0] +
        " " +
        board[2][1] +
        " " +
        board[2][2]
    );
  };

  return {
    board,
    getBoard,
    placeMarker,
    printBoard,
    createNewBoard,
    canPlaceMarker,
  };
};

const gameController = function () {
  const playerTokens = {
    player1: "X",
    player2: "O",
  };

  const playerNames = {
    player1: "Player 1",
    player2: "Player 2",
  };

  // set names bruh
  const setPlayerName = (name, whichPlayer) => {
    playerNames[whichPlayer] = name;
  };

  let currentPlayer = "player1";
  const board = gameBoard();

  const restartGame = () => {
    currentPlayer = "player1";
    board.createNewBoard();
  };

  const playRound = (row, column) => {
    if (checkForVictory !== undefined && board.canPlaceMarker(row, column)) {
      const markerToPlace = playerTokens[currentPlayer];
      board.placeMarker(row, column, markerToPlace);
      board.printBoard();
      console.log(checkForVictory());
      switchPlayerTurn();
    }
  };

  function switchPlayerTurn() {
    currentPlayer = currentPlayer === "player1" ? "player2" : "player1";
  }

  // check for winning conditions
  // returns nothing (undefined) if no one has won yet
  function checkForVictory() {
    // check for tie

    const currentBoard = board.getBoard();
    const allEqual = (arr) => arr.every((element) => element === arr[0]);

    // check if any row has three consecutive symbols
    for (let i of currentBoard) {
      if (allEqual(i)) {
        if (i[0] === "X") return `${playerNames.player1} wins`;
        else if (i[0] === "O") return `${playerNames.player2} wins`;
      }
    }

    // check if any of the columns have 3 consecutive symbols
    for (let i = 0; i < 3; i++) {
      if (
        currentBoard[0][i] === currentBoard[1][i] &&
        currentBoard[1][i] === currentBoard[2][i]
      ) {
        if (currentBoard[0][i] === "X") return `${playerNames.player1} wins`;
        if (currentBoard[0][i] === "O") return `${playerNames.player2} wins`;
      }
    }

    // Check for matching diagonals
    if (
      currentBoard[0][0] === currentBoard[1][1] &&
      currentBoard[1][1] === currentBoard[2][2]
    ) {
      if (currentBoard[0][0] === "X") return `${playerNames.player1} wins`;
      if (currentBoard[0][0] === "O") return `${playerNames.player2} wins`;
    }

    if (
      currentBoard[0][2] === currentBoard[1][1] &&
      currentBoard[1][1] === currentBoard[2][0]
    ) {
      if (currentBoard[0][2] === "X") return `${playerNames.player1} wins`;
      if (currentBoard[0][2] === "O") return `${playerNames.player2} wins`;
    }

    // check for tie
    if (currentBoard.every((row) => row.every((element) => element !== "-"))) {
      return "It's a tie!";
    }
  }

  const getBoard = board.getBoard;
  const getCurrentPlayerName = () => {
    return playerNames[currentPlayer];
  };

  return {
    playRound,
    checkForVictory,
    getBoard,
    restartGame,
    getBoard,
    setPlayerName,
    getCurrentPlayerName,
  };
};

const displayController = (function () {
  const game = gameController();
  const gameSlots = document.querySelectorAll(".game-slot");
  const currentPlayerInfo = document.querySelector(".current-player-info");

  // Add the correct symbol to the correct position in the array
  // based on which square is clicked and whose turn it is
  gameSlots.forEach((gameSlot) => {
    gameSlot.addEventListener("click", () => {
      if (game.checkForVictory() === undefined) {
        const row = gameSlot.getAttribute("data-row");
        const column = gameSlot.getAttribute("data-column");
        game.playRound(row, column);
        displayGameBoard();
        currentPlayerInfo.textContent = `${game.getCurrentPlayerName()}'s turn`;
        endGame();
      }
    });
  });

  function displayGameBoard() {
    clearBoardDisplay();

    for (let i = 0; i < game.getBoard().length; i++) {
      for (let j = 0; j < game.getBoard()[i].length; j++) {
        if (game.getBoard()[i][j] !== "-") {
          gameSlots.forEach((gameSlot) => {
            if (
              +gameSlot.getAttribute("data-row") === i &&
              +gameSlot.getAttribute("data-column") === j
            ) {
              gameSlot.textContent = game.getBoard()[i][j];
            }
          });
        }
      }
    }
  }

  function clearBoardDisplay() {
    currentPlayerInfo.textContent = `${game.getCurrentPlayerName()}'s turn`;

    gameSlots.forEach((gameSlot) => {
      gameSlot.textContent = "";
    });
  }

  function endGame() {
    if (game.checkForVictory() !== undefined) {
      const winner = game.checkForVictory();
      document.querySelector(".game-end-message").showModal();
      document.querySelector(".victory-message").textContent = winner;
    }
  }

  document
    .querySelector(".always-restart-button")
    .addEventListener("click", () => {
      game.restartGame();
      clearBoardDisplay();
    });

  document.querySelector(".restart-button").addEventListener("click", () => {
    document.querySelector(".game-end-message").close();
    game.restartGame();
    clearBoardDisplay();
  });

  document
    .querySelector(".close-dialog-button")
    .addEventListener("click", () => {
      document.querySelector(".game-end-message").close();
    });

  const playerInfo = document.querySelector(".player-info");
  document.addEventListener("DOMContentLoaded", () => {
    playerInfo.showModal();
  });

  playerInfo.addEventListener("keydown", (event) => {
    if (event.key === "Escape") event.preventDefault();
  });

  document
    .querySelector(".submit-button")
    .addEventListener("click", (event) => {
      event.preventDefault();
      playerInfo.close();
      const player1Name = document.querySelector("#player-1-name").value;
      const player2Name = document.querySelector("#player-2-name").value;
      if (player1Name) {
        game.setPlayerName(player1Name, "player1");
      }
      if (player2Name) {
        game.setPlayerName(player2Name, "player2");
      }
      console.log(game.getCurrentPlayerName());
      currentPlayerInfo.textContent = `${game.getCurrentPlayerName()}'s turn`;
    });
})();
