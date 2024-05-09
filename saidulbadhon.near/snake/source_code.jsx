const srcDoc = `<!DOCTYPE html>
<html>
<head>
    <title>Snake Game</title>
    <style>
        @import 'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.1.2/tailwind.min.css';
        #game-board {
            height: 400px;
            width: 400px;
            border: 1px solid #000;
        }
        .dot {
            height: 20px;
            width: 20px;
        }
        .score {
            position: absolute;
            right: 20px;
            top: 20px;
        }
        .arrow-keys-wrapper {
            position: absolute;
            right: 20px;
            bottom: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            align-items: center;
        }
        .arrow-key {
            border: 1px solid #000;
            padding: 10px;
            cursor: pointer;
        }
        #restart-dialog {
            position: absolute;
            top: 0;
            left: 0;
            height: 100vh;
            width: 100vw;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            font-size: 2em;
            display: none;
        }
        .restart-button {
            background-color: #4CAF50;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
        }
        .reset-button {
            top:0;
            position: absolute;
            padding: 10px;
            border:1px solid black;
        }
    </style>
</head>
<body class="flex items-center justify-center h-screen bg-gray-200">
    <div id="game-board" class="relative h-full w-full grid grid-cols-20 gap-1"></div>
    <div class="score text-4xl font-bold">Score: <span id="score">0</span></div>
    <button id="reset-button" class="reset-button">Reset Game</button>
    <div class="arrow-keys-wrapper">
        <div id="arrowUp" class="arrow-key">&#8593;</div>
        <div>
            <div id="arrowLeft" class="arrow-key">&#8592;</div>
            <div id="arrowRight" class="arrow-key">&#8594;</div>
        </div>
        <div id="arrowDown" class="arrow-key">&#8595;</div>
    </div>
    <div id="restart-dialog">
        <p>Game Over. Your score was <span id="final-score">0</span>. Would you like to restart?</p>
        <button id="yes-button" class="restart-button">Yes</button>
        <button id="no-button" class="restart-button">No</button>
    </div>

    <script>
        let dotSize = 20;
        let direction = 'r';
        let snake = [{ top: 0, left: 0 }];
        let food = null;
        let score = 0;
        let gameInterval = null;
        let end = false;

        function startGame() {
            direction = 'r';
            snake = [{ top: 0, left: 0 }];
            food = null;
            toReset = false;
            score = 0;
            document.getElementById('score').innerText = score;
            end = false;
            gameInterval = setInterval(updateGame, 250);
        }

        function updateGame() {
            updateSnake();
            if (!end)
                drawSnake();
        }
        function createDot(top, left, color) {
            let dot = document.createElement('div');
            dot.classList.add('absolute', 'dot');
            dot.style.top = \`${top}px\`;
            dot.style.left = \`${left}px\`;
            dot.style.backgroundColor = color;
            return dot;
        }
        function updateSnake() {
            let oldHead = snake[0];
            let newHead = null;
            switch (direction) {
                case 'r': newHead = { top: oldHead.top, left: oldHead.left + dotSize }; break;
                case 'l': newHead = { top: oldHead.top, left: oldHead.left - dotSize }; break;
                case 'u': newHead = { top: oldHead.top - dotSize, left: oldHead.left }; break;
                case 'd': newHead = { top: oldHead.top + dotSize, left: oldHead.left }; break;
            }
            if (checkCollision(newHead)) return endGame();
            if (JSON.stringify(newHead) === JSON.stringify(food)) {
                eatFood();
            } else {
                snake.pop();
            }
            snake.unshift(newHead);
            if (food === null) {
                food = randomPosition();
                drawFood();
            }
            drawSnake();
        }
        function checkCollision(dot) {
            if (dot.left < 0 || dot.top < 0 || dot.left === 400 || dot.top === 400) return true;
            return snake.some(snakeDot => JSON.stringify(snakeDot) === JSON.stringify(dot));
        }
        function eatFood() {
            food = null;
            score++;
            document.getElementById('score').innerText = score;
        }
        function drawSnake() {
            document.getElementById('game-board').innerHTML = '';
            snake.forEach((dot, index) => document.getElementById('game-board').appendChild(createDot(dot.top, dot.left, index === 0 ? 'black' : 'green')));
            if (food !== null) document.getElementById('game-board').appendChild(createDot(food.top, food.left, 'red'));
        }
        function endGame() {
            clearInterval(gameInterval);
            document.getElementById('restart-dialog').style.display = 'flex';
            document.getElementById('final-score').innerText = score;
        }
        function randomPosition() {
            return {
                top: Math.floor(Math.random() * 20) * dotSize,
                left: Math.floor(Math.random() * 20) * dotSize
            };
        }
        function drawFood() {
            if (food !== null) document.getElementById('game-board').appendChild(createDot(food.top, food.left, 'red'));
        }
        startGame();
        window.addEventListener('keydown', function (event) {
            switch (event.key) {
                case 'ArrowUp':
                    if (direction !== 'd') direction = 'u';
                    break;
                case 'ArrowDown':
                    if (direction !== 'u') direction = 'd';
                    break;
                case 'ArrowLeft':
                    if (direction !== 'r') direction = 'l';
                    break;
                case 'ArrowRight':
                    if (direction !== 'l') direction = 'r';
                    break;
            }
        });
        document.getElementById('arrowUp').addEventListener('click', function () {
            if (direction !== 'd') direction = 'u';
        });
        document.getElementById('arrowDown').addEventListener('click', function () {
            if (direction !== 'u') direction = 'd';
        });
        document.getElementById('arrowLeft').addEventListener('click', function () {
            if (direction !== 'r') direction = 'l';
        });
        document.getElementById('arrowRight').addEventListener('click', function () {
            if (direction !== 'l') direction = 'r';
        });
        document.getElementById('reset-button').addEventListener('click', function () {
            clearInterval(gameInterval);
            startGame();
        });
        document.getElementById('yes-button').addEventListener('click', function () {
            document.getElementById('restart-dialog').style.display = 'none';
            startGame();
        });
        document.getElementById('no-button').addEventListener('click', function () {
            document.getElementById('restart-dialog').style.display = 'none';
        });
    </script>
</body>
</html>`;

return <iframe style={{ width: "100%", height: "100%", minHeight:760 }} allow="fullscreen; autoplay"  srcDoc={srcDoc} />;
