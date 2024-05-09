const srcDoc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CheddarMaze🧀</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 20px;
        }
        .maze {
            border: 1px solid black;
            width: 400px;
            height: 400px;
            display: grid;
            grid-template-columns: repeat(10, 1fr);
        }
        .maze-cell {
            border: thin solid #ccc;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .path {
            background-color: #ffd262;
        }
        .active {
            background-image: url('https://ipfs.near.social/ipfs/bafkreiejk6zjvhxevdatofxpznf4fedluwuavptaryvbixie6bcz4u5goe'); /* Highlight the player's current position */
        }
        #score {
            position: fixed;
            top: 10px;
            left: 10px;
        }
    </style>
</head>
<body>
    <h1>Cheddar Maze </h1>
    <div id="score">Score: 0</div>
    <div id="timer">Time Left: 2:00</div>
    <div class="maze" id="maze"></div>

<script>
    const mazeEl = document.getElementById('maze');
    const scoreEl = document.getElementById('score');
    const timerEl = document.getElementById('timer');
    let score = 0;
    let playerPosition = { x: 1, y: 1 }; // Starting position of the player
    let cheeseCooldown = false; // Cooldown for collecting cheese
    let moves = 0; // Number of moves made by the player
    let enemyPresent = false; // Flag to track if an enemy is present
    let gameOverFlag = false; // Flag to indicate if the game is over
    let timerInterval;
    const timeLimitInSeconds = 120; // 2 minutes
    let timerId; // Timer ID for the countdown

    function generateMazeData(rows, cols) {
        const maze = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < cols; j++) {
                row.push(1); // Initially, mark all cells as walls
            }
            maze.push(row);
        }
        // Start from a random position and carve out the maze
        let startX = Math.floor(Math.random() * (rows - 2)) + 1;
        let startY = Math.floor(Math.random() * (cols - 2)) + 1;
        carveMaze(maze, startX, startY);
        return maze;
    }

    function carveMaze(maze, x, y) {
        maze[y][x] = 0; // Carve the current cell
        const directions = shuffleDirections();
        for (const direction of directions) {
            const newX = x + direction[0];
            const newY = y + direction[1];
            if (newX >= 0 && newX < maze[0].length && newY >= 0 && newY < maze.length && maze[newY][newX] === 1) {
                maze[y + direction[1] / 2][x + direction[0] / 2] = 0; // Carve the wall between the current cell and the neighbor
                maze[newY][newX] = 0; // Carve the neighbor cell
                carveMaze(maze, newX, newY); // Recursively carve the neighbor cell
            }
        }
    }

    function shuffleDirections() {
        const directions = [
            [-2, 0], // Up
            [0, 2],  // Right
            [2, 0],  // Down
            [0, -2]  // Left
        ];
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i], directions[j]] = [directions[j], directions[i]]; // Swap directions randomly
        }
        return directions;
    }

    const mazeRows = 10;
    const mazeCols = 10;
    const mazeData = generateMazeData(mazeRows, mazeCols);

    function createMaze() {
        mazeEl.innerHTML = ''; // Clear previous maze state
        for (let i = 0; i < mazeData.length; i++) {
            const row = mazeData[i];
            for (let j = 0; j < row.length; j++) {
                const cellEl = document.createElement('div');
                cellEl.classList.add('maze-cell');
                if (row[j] === 0) {
                    cellEl.classList.add('path');
                    cellEl.innerHTML = '⚬';
                }
                mazeEl.appendChild(cellEl);
            }
        }
        // Randomly set the player position until it's not the last block
        do {
            playerPosition.x = Math.floor(Math.random() * (mazeData[0].length - 2)) + 1;
            playerPosition.y = Math.floor(Math.random() * (mazeData.length - 2)) + 1;
        } while (mazeData[playerPosition.y][playerPosition.x] === 1 || 
                 (playerPosition.y === mazeData.length - 2 && playerPosition.x === mazeData[0].length - 2));
        updatePlayerPosition();
        startTimer();
    }

    function updatePlayerPosition() {
        const cells = document.querySelectorAll('.maze-cell');
        cells.forEach(cell => cell.classList.remove('active'));
        const index = playerPosition.y * mazeData[0].length + playerPosition.x;
        cells[index].classList.add('active');
        encounterEnemy();
    }

    function checkForCheese(cell) {
        if (cell.classList.contains('path') && !cheeseCooldown && !enemyPresent) {
            score++;
            scoreEl.textContent = 'Score: ' + score;
            cell.innerHTML = '🧀'; // Display cheese emoji
            cheeseCooldown = true;
            const cooldownPeriod = Math.floor(Math.random() * 5000) + 1000; // Random cooldown period between 1 to 5 seconds (in milliseconds)
            setTimeout(() => {
                cheeseCooldown = false;
            }, cooldownPeriod);
        }
    }

    function triggerCheeseCooldown() {
        cheeseCooldown = true;
        setTimeout(() => {
            cheeseCooldown = false;
        }, 3000); // Cooldown period of 3 seconds
    }

    function encounterEnemy() {
        if (moves >= 10 && !enemyPresent) {
            const chance = Math.random(); // Random chance of encountering an enemy
            if (chance < 0.3) { // 30% chance of encounter
                cells[index].classList.remove('active');
                const enemyType = Math.random() < 0.5 ? '🐱' : '👵'; // Randomly choose between cat and old lady
                const cells = document.querySelectorAll('.maze-cell');
                const index = playerPosition.y * mazeData[0].length + playerPosition.x;
                cells[index].innerHTML = enemyType; // Display enemy emoji icon
                if (Math.random() < 0.5) { // 50% chance of enemy winning
                    gameOver('Enemy won! Game Over!');
                } else {
                    cells[index].classList.add('active');
                }
            } else {
                enemyPresent = true; // Enemy is present
                const cells = document.querySelectorAll('.maze-cell');
                const index = playerPosition.y * mazeData[0].length + playerPosition.x;
                cells[index].innerHTML = '🦹‍♂️'; // Emoji icon for enemy
            }
        }
    }

    function checkForEnd() {
        const totalCells = mazeData.length * mazeData[0].length;
        const navigatedCells = moves;
        const percentNavigated = (navigatedCells / totalCells) * 100;
        if (percentNavigated >= 75 && Math.random() < 0.5) {
            const cells = document.querySelectorAll('.maze-cell');
            const index = playerPosition.y * mazeData[0].length + playerPosition.x;
            cells[index].innerHTML = '🚪'; // Emoji icon end
            cells[index].classList.remove('active');
            timerEl.textContent = 'Time Left: 0:00';
            gameOver('Congratulations! You reached the end of the maze!');
        }
    }

    function startTimer() {
        timerId = setInterval(() => {
            timeLimit--;
            if (timeLimit <= 0) {
                clearInterval(timerId);
                gameOver('Time is up! Game Over!');
            }
        }, 1000); // Update timer every second
    }

    function startTimer() {
        let timeLeft = timeLimitInSeconds; // Time limit in seconds
        timerId = setInterval(() => {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerEl.textContent = \`Time Left: $\{minutes}:\${seconds < 10 ? '0' : ''}$\{seconds}\`;
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerEl.textContent = 'Time Left: 0:00';
                gameOver("Time's up! Game Over!");
            }
        }, 1000); // Update timer every second
    }

    function stopTimer() {
        clearInterval(timerId);
    }

    function restartGame() {
        clearInterval(timerId); // Stop the timer interval
        score = 0;
        playerPosition = { x: 1, y: 1 };
        cheeseCooldown = false;
        moves = 0;
        enemyPresent = false;
        gameOverFlag = false;
        scoreEl.textContent = 'Score: 0';
        timerEl.textContent = 'Time Left: 2:00';
        createMaze();
        document.removeEventListener('keydown', handleKeyDown); // Remove the event listener

        const existingRestartButton = document.getElementById('restart-button');
        if (existingRestartButton) {
            existingRestartButton.remove(); // Remove existing restart button if it exists
        }

        const existingGameOverMessage = document.getElementById('game-over-message');
        if (existingGameOverMessage) {
            existingGameOverMessage.remove(); // Remove existing game over message if it exists
        }

        document.addEventListener('keydown', handleKeyDown); // Reattach the event listener
    }

    function gameOver(message) {
        const gameOverEl = document.createElement('div');
        gameOverEl.textContent = message;
        gameOverEl.id = 'game-over-message'; // Set a unique ID for the game over message
        gameOverEl.style.color = 'red';
        document.body.appendChild(gameOverEl);
        document.removeEventListener('keydown', handleKeyDown);
        gameOverFlag = true; // Set the game over flag
        stopTimer(); // Stop the timer
   
        if (timerEl.textContent === 'Time Left: 0:00') {
            score = 0; // Reset score if time is up
            scoreEl.textContent = 'Score: 0';
        }

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart Game';
        restartButton.id = 'restart-button'; // Set a unique ID for the restart button
        restartButton.addEventListener('click', restartGame);
        document.body.appendChild(restartButton);
    }

    function handleKeyDown(event) {
        if (gameOverFlag) return; // Prevent moving after the game has ended
        const key = event.key;
        let newX = playerPosition.x;
        let newY = playerPosition.y;

        switch (key) {
            case 'ArrowUp':    newY--; break;
            case 'ArrowDown':  newY++; break;
            case 'ArrowLeft':  newX--; break;
            case 'ArrowRight': newX++; break;
            default: return;
        }

        if (newY >= 0 && newY < mazeData.length && newX >= 0 && newX < mazeData[0].length && mazeData[newY][newX] === 0) {
            moves++; // Increment moves count
            playerPosition.x = newX;
            playerPosition.y = newY;
            updatePlayerPosition();
            const cellIndex = newY * mazeData[0].length + newX;
            checkForCheese(document.querySelectorAll('.maze-cell')[cellIndex]);
            checkForEnd(); // Check for reaching the end after each move
        }
    }

    document.addEventListener('keydown', handleKeyDown);

    createMaze();
</script>

<ol>
<li>click to start, navigate with keyboard</li>
<li>get dat cheddar🧀</li>
<li>look out for cats😼 n old ladies with brooms👵</li>
<li>find the hidden door🚪 and win before time is up⏰</li>
</ol>

<p><i>this is a js only prototype, dev will be starting soonTM.</i></p>

</body>
</html>`;

return <iframe style={{ width: "100%", height: "675px" }} srcDoc={srcDoc} />;
