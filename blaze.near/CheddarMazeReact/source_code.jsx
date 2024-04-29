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

const gameOver = (message) => {
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

const stopTimer = () => {
  clearInterval(timerId);
  setTimerId(null);
};

useEffect(() => {
  // Initial delay before enemy encounters become possible
  setEnemyCooldown(true);
  setTimeout(() => {
    setEnemyCooldown(false);
  }, 10000); // Delay for 5 seconds
}, []);

const restartGame = () => {
  clearInterval(timerId);
  setScore(0);
  setTimeLimitInSeconds(240); // Set the time limit to 240 seconds (twice the original time)
  setRemainingTime(240); // Set the remaining time to match the new time limit
  setPlayerPosition({ x: 1, y: 1 });
  setCheeseCooldown(false);
  setEnemyCooldown(true);
  setMoves(0);
  setGameOverFlag(false);
  setGameOverMessage("");

  // Regenerate maze data
  const mazeRows = 11;
  const mazeCols = 11;
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

const generateAndSetMaze = () => {
  const mazeRows = 11;
  const mazeCols = 11;
  const newMazeData = generateMazeData(mazeRows, mazeCols);
  let playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
  let playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;

  while (!newMazeData[playerStartY][playerStartX].isPath) {
    playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
    playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  }

  newMazeData[playerStartY][playerStartX].isActive = true;
  setPlayerPosition({ x: playerStartX, y: playerStartY });
  setMazeData(newMazeData);
};

// Inside generateMazeData function
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

  //console.log("Maze Data:", maze); // Log the maze data to check hasCheese and hasEnemy properties
  return maze;
};

const startTimer = () => {
  const id = setInterval(() => {
    setRemainingTime((time) => {
      if (time === 1) {
        clearInterval(id);
        gameOver("Time's up! Game Over!");
      }
      return time - 1;
    });
  }, 1000);
  setTimerId(id);
};

useEffect(() => {
  const mazeRows = 11;
  const mazeCols = 11;
  const newMazeData = generateMazeData(mazeRows, mazeCols);
  let playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
  let playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;

  while (!newMazeData[playerStartY][playerStartX].isPath) {
    playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
    playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  }

  newMazeData[playerStartY][playerStartX].isActive = true;
  setPlayerPosition({ x: playerStartX, y: playerStartY });
  setMazeData(newMazeData);
}, []);

const movePlayer = (newX, newY) => {
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
};

useEffect(() => {
  if (remainingTime === 0) {
    gameOver("Time's up! Game Over!");
  }
}, [remainingTime]);

const handleKeyDown = (event) => {
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

  if (
    newX >= 0 &&
    newX < mazeData[0].length &&
    newY >= 0 &&
    newY < mazeData.length &&
    mazeData[newY][newX].isPath
  ) {
    const newMazeData = mazeData.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (rowIndex === newY && colIndex === newX) {
          return { ...cell, isActive: true };
        } else if (cell.isActive) {
          return { ...cell, isActive: false };
        }
        return cell;
      })
    );

    setMazeData(newMazeData);
    setPlayerPosition({ x: newX, y: newY });
    setMoves(moves + 1);
    checkForEvents(newMazeData[newY][newX]);
  }
};

// Inside checkForEvents function
const checkForEvents = (cell) => {
  if (!cell.isPath) {
    return; // Exit the function if the cell is not a path cell
  }

  if (cell.isPath && !enemyCooldown && !cell.hasCheese && !cell.hasEnemy) {
    console.log("enemy encountered");
    const chance = Math.random();

    const newMazeData = mazeData.map((row, rowIndex) =>
      row.map((mazeCell, colIndex) => {
        // Log the position of the cell being checked
        if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
          // Check the value of found
          console.log("Found:", found);

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

    if (chance < 0.1) {
      console.log("enemy won");
      gameOver("Enemy won! Game Over!");
      return; // Exit the function after triggering game over
    } else {
      console.log("enemy defeated...");
    }
  }

  if (cell.isPath && !cheeseCooldown && !cell.hasCheese && !cell.hasEnemy) {
    if (Math.random() < 0.01) {
      // `% chance of winning cheese
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
    gameOver("Congratulations! You reached the end of the maze!");
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

return (
  <div>
    {gameOverMessage && (
      <div>
        <p style={{ color: "red" }}>{gameOverMessage}</p>
        <button onClick={restartGame}>Restart Game</button>
      </div>
    )}
    <div
      className="maze-container"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mazeData[0].length}, 40px)`,
        gridTemplateRows: `repeat(${mazeData.length}, 40px)`,
        gap: "0px",
        border: "1px solid black",
        width: "450px",
        height: "450px",
        padding: "0px",
        position: "relative",
      }}
      tabIndex="0"
      onKeyDown={handleKeyDown}
    >
      {renderMazeCells()}
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        Score: {score}
      </div>
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        Time: {remainingMinutes}m {remainingSeconds}s
      </div>
    </div>
  </div>
);
