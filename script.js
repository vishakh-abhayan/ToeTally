const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const board = document.getElementById("board");
const newGameButton = document.getElementById("new-game");
const toast = document.getElementById("toast");
const toastContent = document.getElementById("toast-content");
let currentPlayer = "X";
let gameOver = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].style.backgroundColor = "green";
      cells[b].style.backgroundColor = "green";
      cells[c].style.backgroundColor = "green";
      gameOver = true;
      return cells[a].textContent;
    }
  }

  if ([...cells].every((cell) => cell.textContent)) {
    gameOver = true;
    return "draw";
  }

  return null;
}

function makeMove(cell) {
  if (!cell.textContent && !gameOver) {
    cell.textContent = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.textContent = `${currentPlayer}'s turn`;

    const winner = checkWinner();
    if (winner === "X") {
      status.textContent = "X wins!";
    } else if (winner === "O") {
      status.textContent = "O wins!";
    } else if (winner === "draw") {
      status.textContent = "It's a draw!";
    }
  }
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "white";
  });
  currentPlayer = "X";
  gameOver = false;
  status.textContent = "X's turn";
}

newGameButton.addEventListener("click", resetGame);

// Register the service worker for PWA functionality (You need to create a service worker file)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// ...

// Function to show a toast message

function displayToast(message) {
  toastContent.textContent = message;
  toast.style.display = "block";

  // Close the toast when clicking anywhere
  document.addEventListener("click", closeToast);

  // Clear the toast after a delay (adjust the delay duration as needed)
  setTimeout(() => {
    closeToast();
  }, 3000); // Display for 3 seconds
}

function closeToast() {
  toast.style.display = "none";
  toastContent.textContent = "";
  document.removeEventListener("click", closeToast);
}

// ... (more code) ...
