const [mazeData, setMazeData] = useState([]);
const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
const [score, setScore] = useState(0);
const [timeLimitInSeconds, setTimeLimitInSeconds] = useState(120);
const [timerId, setTimerId] = useState(null);
const [cheeseCooldown, setCheeseCooldown] = useState(false);
const [enemyCooldown, setEnemyCooldown] = useState(false);
const [moves, setMoves] = useState(0);
const [gameOverFlag, setGameOverFlag] = useState(false);
const [remainingTime, setRemainingTime] = useState(timeLimitInSeconds);
const remainingMinutes = Math.floor(remainingTime / 60);
const remainingSeconds = remainingTime % 60;
const [gameOverMessage, setGameOverMessage] = useState("");
const [initialTouch, setInitialTouch] = useState(null);
const [playerStartX, setPlayerStartX] = useState(0);
const [playerStartY, setPlayerStartY] = useState(0);
const [timerStarted, setTimerStarted] = useState(false);

const gameOver = (message, cell) => {
  const hasCheese = cell.hasCheese;
  const hasEnemy = cell.hasEnemy;
  const hasExit = cell.hasExit;

  console.log(message);
  setCheeseCooldown(false);
  setEnemyCooldown(false);
  setGameOverMessage(message);
  setGameOverFlag(true);
  stopTimer();
  if (hasCheese || hasEnemy) {
    setScore(0);
  }
};

const startTimerOnTap = () => {
  if (!timerStarted) {
    startTimer();
    setTimerStarted(true);
  }
};

const stopTimer = () => {
  clearInterval(timerId);
  setTimerId(null);
};

useEffect(() => {
  // Initial delay before enemy encounters become possible
  setEnemyCooldown(true);
  setTimeout(() => {
    setEnemyCooldown(false);
  }, 10000); // Delay for 10 seconds
}, []);

const restartGame = () => {
  clearInterval(timerId);
  setScore(0);
  setTimeLimitInSeconds(120); // Set the time limit to 120 seconds (twice the original time)
  setRemainingTime(120); // Set the remaining time to match the new time limit
  setPlayerPosition({ x: 1, y: 1 });
  setCheeseCooldown(false);
  setEnemyCooldown(true);
  setMoves(0);
  setGameOverFlag(false);
  setGameOverMessage("");

  // Regenerate maze data
  const mazeRows = 11;
  const mazeCols = 9; // Updated width to 9 columns
  const newMazeData = generateMazeData(mazeRows, mazeCols);
  let playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
  let playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  while (!newMazeData[playerStartY][playerStartX].isPath) {
    playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
    playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  }
  setMazeData(newMazeData);

  startTimer(); // Start the timer again after resetting the game
};

const generateMazeData = (rows, cols) => {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      isPath: false,
      isActive: false,
      hasCheese: false,
      hasEnemy: false,
      hasExit: false,
    }))
  );

  // Creating a simple connected path maze
  let x = 1,
    y = 1;
  maze[y][x].isPath = true;
  const stack = [[x, y]];

  while (stack.length) {
    const [cx, cy] = stack[stack.length - 1];
    const directions = [];

    // Check all possible directions
    [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ].forEach(([dx, dy]) => {
      const nx = cx + 2 * dx,
        ny = cy + 2 * dy;
      if (
        nx > 0 &&
        nx < cols - 1 &&
        ny > 0 &&
        ny < rows - 1 &&
        !maze[ny][nx].isPath
      ) {
        directions.push([nx, ny, cx + dx, cy + dy]);
      }
    });

    if (directions.length) {
      const [nx, ny, px, py] =
        directions[Math.floor(Math.random() * directions.length)];
      maze[ny][nx].isPath = true;
      maze[py][px].isPath = true;

      // Initialize hasCheese and hasEnemy properties
      maze[ny][nx].hasCheese = false;
      maze[ny][nx].hasEnemy = false;

      stack.push([nx, ny]);
    } else {
      stack.pop();
    }
  }

  return maze;
};

const startTimer = () => {
  const id = setInterval(() => {
    setRemainingTime((time) => {
      if (time === 1) {
        clearInterval(id);
        gameOver(
          "Time's up! Game Over!",
          mazeData[playerPosition.y][playerPosition.x]
        );
      }
      return time - 1;
    });
  }, 1000);
  setTimerId(id);
};

// Define a new useEffect hook that starts the timer when timerStarted state changes
useEffect(() => {
  if (timerStarted) {
    startTimer();
  }
}, [timerStarted]);

useEffect(() => {
  const mazeRows = 11;
  const mazeCols = 9; // Updated width to 9 columns
  const newMazeData = generateMazeData(mazeRows, mazeCols);
  let startX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
  let startY = Math.floor(Math.random() * (mazeRows - 2)) + 1;

  while (!newMazeData[startY][startX].isPath) {
    startX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
    startY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  }

  newMazeData[startY][startX].isActive = true;
  setPlayerPosition({ x: startX, y: startY });
  setPlayerStartX(startX);
  setPlayerStartY(startY);
  setMazeData(newMazeData);
}, []);

const movePlayer = (newX, newY) => {
  if (!mazeData[newY][newX].isPath) {
    return; // Player cannot move to non-path cells
  }

  const newMazeData = mazeData.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      ...cell,
      isActive: rowIndex === newY && colIndex === newX,
    }))
  );

  // Reset isActive for the previous player position
  newMazeData[playerPosition.y][playerPosition.x].isActive = false;

  setPlayerPosition({ x: newX, y: newY });
  setMazeData(newMazeData);
  checkForEvents(newMazeData[newY][newX]);
  setMoves(moves + 1);
};

useEffect(() => {
  if (remainingTime === 0) {
    gameOver(
      "Time's up! Game Over!",
      mazeData[playerPosition.y][playerPosition.x]
    );
  }
}, [remainingTime]);

const handleKeyPress = (event) => {
  if (gameOverFlag) return; // If game over, prevent further movement

  const key = event.key;
  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (key) {
    case "ArrowUp":
      newY--;
      break;
    case "ArrowDown":
      newY++;
      break;
    case "ArrowLeft":
      newX--;
      break;
    case "ArrowRight":
      newX++;
      break;
    default:
      return;
  }

  movePlayer(newX, newY);
};

const handleTouchMove = (event) => {
  if (!initialTouch) return;
  event.preventDefault(); // Prevent scrolling on touch devices
  const touch = event.touches[0];
  const deltaX = touch.clientX - initialTouch.x;
  const deltaY = touch.clientY - initialTouch.y;

  const cellWidth = isMobile() ? 30 : 40; // Adjusted cell size for mobile devices
  const offsetX = mazeContainerRef.current.getBoundingClientRect().left;
  const offsetY = mazeContainerRef.current.getBoundingClientRect().top;
  const cellX = Math.floor((touch.clientX - offsetX) / cellWidth);
  const cellY = Math.floor((touch.clientY - offsetY) / cellWidth);

  movePlayer(cellX, cellY);
};

const handleTouchEnd = () => {
  setInitialTouch(null);
};

const checkForEvents = (cell) => {
  if (!cell.isPath) {
    return; // Exit the function if the cell is not a path cell
  }

  if (cell.isPath && !enemyCooldown && !cell.hasCheese && !cell.hasEnemy) {
    console.log("enemy encountered");
    const chance = Math.random();

    const newMazeData = mazeData.map((row, rowIndex) =>
      row.map((mazeCell, colIndex) => {
        if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
          return { ...mazeCell, hasEnemy: true };
        }
        return mazeCell;
      })
    );

    setMazeData(newMazeData);
    setEnemyCooldown(true);
    const cooldownPeriod = Math.floor(Math.random() * 5000) + 10000;
    setTimeout(() => {
      setEnemyCooldown(false);
    }, cooldownPeriod);

    if (chance < 0.2) {
      console.log("enemy won");
      setScore(0); // Set score to zero
      gameOver("Enemy won! Game Over!", cell);
      return; // Exit the function after triggering game over
    } else {
      console.log("enemy defeated...");
    }
  }

  if (cell.isPath && !cheeseCooldown && !cell.hasCheese && !cell.hasEnemy) {
    // Generate cheese only if the cell does not already have an enemy
    if (Math.random() < 0.01) {
      // 1% chance of winning cheese
      console.log("cheese");
      const newMazeData = mazeData.map((row, rowIndex) =>
        row.map((mazeCell, colIndex) => {
          if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
            return { ...mazeCell, hasCheese: true };
          }
          return mazeCell;
        })
      );
      setMazeData(newMazeData);
      setScore(score + 1);
      setCheeseCooldown(true);
      const cooldownPeriod = Math.floor(Math.random() * 5000) + 1000;
      setTimeout(() => {
        setCheeseCooldown(false);
      }, cooldownPeriod);
    }
  }

  const totalCells = mazeData.length * mazeData[0].length;
  const navigatedCells = moves;
  const percentNavigated = (navigatedCells / totalCells) * 100;

  if (percentNavigated >= 75 && Math.random() < 0.5) {
    const newMazeData = mazeData.map((row, rowIndex) =>
      row.map((mazeCell, colIndex) => {
        if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
          return { ...mazeCell, hasExit: true };
        }
        return mazeCell;
      })
    );
    setMazeData(newMazeData);
    gameOver("Congratulations! You reached the end of the maze!", cell);
  }
};

const renderMazeCells = () => {
  return mazeData.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const isActive =
        playerPosition.x === colIndex && playerPosition.y === rowIndex;
      const isPath = cell.isPath;
      const hasCheese = cell.hasCheese;
      const hasEnemy = cell.hasEnemy;
      const hasExit = cell.hasExit;

      return (
        <div
          key={`${rowIndex}-${colIndex}`}
          className={`maze-cell ${isPath ? "path" : ""} ${
            isActive ? "active" : ""
          }`}
          style={{
            width: "40px",
            height: "40px",
            fontSize: "20px",
            border: "thin solid #ccc",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: isPath ? "yellow" : "",
            color: isActive ? "gray" : "",
          }}
        >
          {hasCheese ? "🧀" : ""}
          {hasEnemy ? "🦹‍♂️" : ""}
          {hasExit ? "🚪" : ""}
          {isActive && !hasCheese && !hasEnemy && !hasExit ? "🐭" : ""}
        </div>
      );
    })
  );
};

const isMobile = () => {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};

const handleTouchStart = (event) => {
  const touch = event.touches[0];
  setInitialTouch({ x: touch.clientX, y: touch.clientY });
  startTimerOnTap(); // Start the timer when the user taps on the maze container
};

const cellSize = isMobile() ? 30 : 40; // Adjust cell size for mobile devices

return (
  <div
    style={{ maxWidth: `${mazeData[0].length * cellSize}px`, margin: "0 auto" }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Score: {score}</div>
      <div>
        Time: {remainingMinutes}m {remainingSeconds}s
      </div>
    </div>
    {gameOverMessage && (
      <div>
        <p style={{ color: "red" }}>{gameOverMessage}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    )}
    <div
      className="maze-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mazeData[0].length}, ${cellSize}px)`, // Adjusted cell size
        gridTemplateRows: `repeat(${mazeData.length}, ${cellSize}px)`, // Adjusted cell size
        gap: "0px",
        border: "1px solid black",
        padding: "0px",
        position: "relative",
        width: `${mazeData[0].length * cellSize}px`, // Adjusted width
      }}
      tabIndex="0"
      onKeyDown={handleKeyPress}
      onTouchStart={(e) => {
        handleTouchStart(e);
        handleKeyPress(e); // Handle touch start and key press for mobile movement
      }}
      onTouchMove={(e) => {
        handleTouchMove(e);
        handleKeyPress(e); // Handle touch move and key press for mobile movement
      }}
      onTouchEnd={handleTouchEnd}
    >
      {renderMazeCells()}
    </div>
  </div>
);
