const srcDoc=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Web App</title>
    <style>
    @import "https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.0.2/tailwind.min.css";
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: #f3f3f3;
    }
    #game-board {
        position: relative;
        height: 600px;
        width: 600px;
        border: 20px solid #46344e;
        background: #201f22;
    }
    .dot {
        position: absolute;
        height: 20px;
        width: 20px;
        background: #fb5607;
    }
    .snake-part {
        position: absolute;
        height: 20px;
        width: 20px;
        background: #fff;
    }
    #score {
        position: absolute;
        color: #fb5607;
        top: 5px;
        right: 5px;
        font-size: 3em;
    }
    </style>
    <script>
        let score = 0;
        const dotSize = { width: 20, height: 20 };
        var dotPos = { x: 100, y: 100 };
        const snakeBody = [{ top: 10, left: 10 }];
        let direction = { dx: 0, dy: 0 };

        function refreshDot() {
            dotPos = { x: Math.floor(Math.random() * 29) * 20, y: Math.floor(Math.random() * 29) * 20 };
        }

        window.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                    direction = { dx: 0, dy: -1 };
                    break;
                case 'ArrowDown':
                    direction = { dx: 0, dy: 1 };
                    break;
                case 'ArrowRight':
                    direction = { dx: 1, dy: 0 };
                    break;
                case 'ArrowLeft':
                    direction = { dx: -1, dy: 0 };
                    break;
            }
        });

        setInterval(() => {
            requestAnimationFrame(update);
        }, 200);

        function update() {
            clearBoard();
            moveSnake();
            drawSnake();
            createDot();
        }

        function clearBoard() {
            while (gameBoard.firstChild) {
                gameBoard.firstChild.remove();
            }
        }

        function moveSnake() {
            const snakeHead = Object.assign({}, snakeBody[0]); // copies the snake head
            snakeHead.top += direction.dy;
            snakeHead.left += direction.dx;

            if (snakeBody.some(obj => obj.left === dotPos.x && obj.top === dotPos.y)) {
                refreshDot();
                score++;
                document.getElementById('score').innerText = score;
            }
            snakeBody.unshift(snakeHead);
        }

        function createDot() {
            const dot = document.createElement('div');
            dot.style.top = `${dotPos.y}px`;
            dot.style.left = `${dotPos.x}px`;
            dot.classList.add('dot');
            gameBoard.appendChild(dot);
        }

        function drawSnake() {
            snakeBody.forEach(segment => {
                const snakePart = document.createElement('div');
                snakePart.style.top = `${segment.top * 20}px`;
                snakePart.style.left = `${segment.left * 20}px`;
                snakePart.classList.add('snake-part');
                gameBoard.appendChild(snakePart);
            });
        }

        refreshDot();
    </script>
</head>
<body>
    <div id="game-board"></div>
    <div id="score">0</div>
</body>
</html>`
              
return <iframe style={{width:'100%', height:'100%'}} srcDoc={srcDoc} />;