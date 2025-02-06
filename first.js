let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newGameButton = document.querySelector("#new-game");
let winnerDisplay = document.getElementById("winner");

let player1Name = "";
let player2Name = "";
let currentPlayer = "X"; // Player 1 starts (X)
let turnO = true;

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
];

function getPlayerNames() {
    player1Name = document.getElementById("player1").value || "Player 1 (X)";
    player2Name = document.getElementById("player2").value || "Player 2 (O)";
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        // Get player names if not already done
        if (!player1Name || !player2Name) {
            getPlayerNames();
        }

        // Prevent action if the box is already filled
        if (box.innerText !== "") {
            return;
        }

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        // Disable box from further interaction
        box.style.pointerEvents = "none"; 

        // Check for a winner
        CheckWinner();
    });
});

const CheckWinner = () => {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        // Check if all three positions have the same value (either "O" or "X")
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            let winner = boxes[a].innerText === "O" ? player2Name : player1Name;
            winnerDisplay.textContent = `${winner} wins!`;
            boxes.forEach(box => box.style.pointerEvents = "none");
            return;
        }
    }

    // Check for a draw (no empty boxes left)
    if ([...boxes].every(box => box.innerText !== "")) {
        winnerDisplay.textContent = "It's a draw!";
        boxes.forEach(box => box.style.pointerEvents = "none");
    }
};

reset.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "auto"; // Re-enable clicking
    });
    winnerDisplay.textContent = "";
    turnO = true; // Reset turn
    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
});

newGameButton.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "auto"; // Re-enable clicking
    });
    winnerDisplay.textContent = "";
    turnO = true; // Reset turn
});
