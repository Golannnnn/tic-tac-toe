const game = (() => {
    const board = document.querySelector("#board");
    const resetGameBtn = document.querySelector('#reset-game');
    const resetScoreBtn = document.querySelector('#reset-score');
    const message = document.querySelector('#message');
    const cells = document.getElementsByClassName('cell');
    const score1 = document.querySelector('#score-1');
    const score2 = document.querySelector('#score-2');
    const array = Array.from(cells);
    const pl1 = document.querySelector('#player-1');
    const pl2 = document.querySelector('#player-2');
    let symbol = "O";
    let scoreCounter1 = 0;
    let scoreCounter2 = 0;

    const grabArray = () => {
        return array.map(cell => cell.innerText);
    };

    const turn = () => {
        return symbol === "O" ? symbol = "X" : symbol = "O";
    };

    const players = (name, symbol) => {
        return { name, symbol };
    };

    const player1 = players("Player 1", "X");
    const player2 = players("Player 2", "O");

    pl1.addEventListener("click", () => {
        let playerName = prompt(`Name of player one:`, `${pl1.innerText}`);
        if (playerName.length > 12) {
            pl1.innerText = playerName.substring(0, 12 - 1);
        } else if (playerName.length === 0) {
            pl1.innerText = "Player 1";
        } else if (!playerName.trim().length) {
            pl1.innerText = "Player 1";
        } else {
            pl1.innerText = playerName;
        }
        player1.name = pl1.innerHTML;
    });

    pl2.addEventListener("click", () => {
        let playerName = prompt(`Name of player two:`, `${pl2.innerText}`);
        if (playerName.length > 12) {
            pl2.innerText = playerName.substring(0, 12 - 1);
        } else if (playerName.length === 0) {
            pl2.innerText = "Player 1";
        } else if (!playerName.trim().length) {
            pl2.innerText = "Player 1";
        } else {
            pl2.innerText = playerName;
        }
        player2.name = pl2.innerHTML;
    });

    const whoWon = (symbol) => {
        return symbol === "O" ? player2.name : player1.name;
    }

    const endGame = () => {
        let combinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let win = combinations.some(arr => arr.every(n => grabArray()[n] === symbol));
        let tie = grabArray().every(el => el != "");

        if (win === true) {
            board.removeEventListener("click", handleClick);
            message.innerText = `${whoWon(symbol)} won the round!`;
            if (symbol === player1.symbol) {
                scoreCounter1++
                score1.innerText = scoreCounter1;
            } else {
                scoreCounter2++
                score2.innerText = scoreCounter2;
            }
        } else if (win === false && tie === true) {
            board.removeEventListener("click", handleClick);
            message.innerText = `It's a tie.`;
        };
    };

    const handleClick = (e) => {
        if (e.target.classList.contains('cell') && e.target.innerText === "") {
            e.target.innerText = turn();
            endGame();
        };
    };

    const resetGame = () => {
        array.forEach(el => el.innerText = "");
        symbol = "O";
        message.innerHTML = "<br>";
        board.addEventListener("click", handleClick);
    };

    const resetScore = () => {
        resetGame();
        scoreCounter1 = 0;
        scoreCounter2 = 0;
        score1.innerText = scoreCounter1;
        score2.innerText = scoreCounter2;
    }

    board.addEventListener("click", handleClick);
    resetGameBtn.addEventListener("click", resetGame);
    resetScoreBtn.addEventListener("click", resetScore);
})();

