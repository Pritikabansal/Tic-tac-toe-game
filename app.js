let boxes = document.querySelectorAll('.box');
let resButton = document.querySelector('.reset-b');
let wrName = document.querySelector('p');
let mainBox = document.querySelector('.mainbox');
let newButton = document.querySelector('.new-b');
let welcome = document.querySelector('.welcome');
let playerTurn = document.querySelector('h3');
let startGameButton = document.getElementById('start-game');
let player1Input = document.getElementById('player1');
let player2Input = document.getElementById('player2');
let turnIndicator = document.getElementById('turn-indicator');

// players input name
let player1 = "";
let player2 = "";

let turn = true; // true for player1, false for player2

// wining patterns
const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// reset game when click on new and reset buttons
const resetGame = () => {
    turn = true;
    enableButtons();
    updateTurnIndicator();
};

const updateTurnIndicator = () => {
    turnIndicator.innerText = `Turn - ${turn ? player1 : player2}`;
};

// start game button event 
startGameButton.addEventListener('click', () => {
    player1 = player1Input.value || "Player 1";
    player2 = player2Input.value || "Player 2";
    document.querySelector('.player-inputs').style.display = 'none';
    updateTurnIndicator();
});

// players X O marking
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerText = "X";
            box.style.color = "rgb(230, 67, 255)";
        } else {
            box.innerText = "O";
            box.style.color = "rgb(255, 158, 67)";
        }
        box.disabled = true;
        turn = !turn;
        updateTurnIndicator();
        checkWinner();
    });
});

// Displaying the winner //welcome page
const showWinner = (player) => {
    welcome.style.display = "block";
    wrName.innerText = `Congratulations !! Winner is ${player}.`;
    newButton.style.display = "block";
};

// button hide 
const disableButtons = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};


const enableButtons = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
    mainBox.style.display = "block";
    welcome.style.display = "none";
};

// checking who is winner 
const checkWinner = () => {
    for (let pattern of winPattern) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if (p1 !== "" && p2 !== "" && p3 !== "") {
            if (p1 === p2 && p2 === p3) {
                disableButtons();
                showWinner(p1 === "X" ? player1 : player2);
                mainBox.style.display = "none";
                return;
            }
        }
    }
};

// playing game when entered name of 2players
newButton.addEventListener("click", () => {
    resetGame();
    document.querySelector('.player-inputs').style.display = 'block';
    player1Input.value = "";
    player2Input.value = "";
});

// reset button calling 
resButton.addEventListener("click", resetGame);
