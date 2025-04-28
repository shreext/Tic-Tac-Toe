console.log("Running...");
let boxes = document.querySelectorAll(".box");
let newG = document.querySelector(".new");
let msg = document.getElementById("msg");
let msgP = document.getElementById("msgPlayer");

let currentPlayer = 1;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (currentPlayer === 1) {
            //playerO
            box.innerText = "O";
            currentPlayer = 2;
        } else {
            //playerX
            box.innerText = "X";
            currentPlayer = 1;
        }
        box.disabled = true;
        count++;
        msgP.classList.remove("hide");
        msgP.innerHTML="Player is "+ currentPlayer; 
        let isWinner = checkWinner();

    });
});

newG.addEventListener("click", () => {
    startNew();
})

const gameDraw = () => {
    msg.classList.remove("hide");
    msgP.classList.add("hide");

    msg.innerText = `Game was Draw.`;
    disableBoxes();
};


const startNew = () => {
    currentPlayer = 1;
    count = 0;
    msg.classList.add("hide");
    msgP.classList.add("hide");
    enableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if (winner != true && count === 9) {
        gameDraw();
    } else {
        msg.classList.remove("hide");
        msgP.classList.add("hide");

        msg.innerText = `Congratulations, Winner is ${winner}`;
        disableBoxes();
    }

};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("win");
                showWinner(pos1Val);
                return true;
            }
        }
    }
};