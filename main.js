let playerTxt = document.getElementById("playertxt");
let restartBtn = document.getElementById("restartbtn");
let boxes = Array.from(document.getElementsByClassName("box"));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winningBlocks"
);

const oText = "O";
const xText = "x";
let currentPlayer = xText;
let spaces = Array(9).fill(null);

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  if (!spaces[id]) {
    spaces[id] = currentPlayer;
    console.log(spaces[id]);

    e.target.innerText = currentPlayer;

    if (playerHasWon()) {
      playerTxt = `${currentPlayer} has won!`;
      let winningBlocks = playerHasWon();

      winningBlocks.map(
        (block) => (boxes[block].style.backgroundColor = "red")
      );
      return;
    }

    currentPlayer = currentPlayer == xText ? oText : xText;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] === spaces[b] && spaces[b] === spaces[c]) {
      return [a, b, c];
    }

    // return false;
  }
}
restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);

  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  playerTxt = "Tic Tac Toe";

  currentPlayer = xText;
}

startGame();
