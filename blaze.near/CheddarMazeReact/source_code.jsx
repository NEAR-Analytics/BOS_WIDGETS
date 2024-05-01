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
const [remainingMinutes, setRemainingMinutes] = useState(
  Math.floor(timeLimitInSeconds / 60)
);
const [remainingSeconds, setRemainingSeconds] = useState(
  timeLimitInSeconds % 60
);
const [gameOverMessage, setGameOverMessage] = useState("");
const [initialTouch, setInitialTouch] = useState(null);
const [playerStartX, setPlayerStartX] = useState(0);
const [playerStartY, setPlayerStartY] = useState(0);
const [timerStarted, setTimerStarted] = useState(false);
const [notification, setNotification] = useState("");
const [luckyColor] = useState(Math.random() < 0.1 ? "#9d67ef" : "Gold");

const gameOver = (message, cell) => {
  const enemyWon = cell.enemyWon;

  setCheeseCooldown(false);
  setEnemyCooldown(false);
  setGameOverMessage(message);
  setGameOverFlag(true);
  if (enemyWon || remainingTime === 0) {
    setScore(0);
  }
  stopTimer();
};

const startTimer = () => {
  if (timerId === null && timerStarted) {
    const id = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(id);
          gameOver("Time's up! Game Over!");
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
    setTimerId(id);
  }
};

// Define a new useEffect hook to manage the timer
useEffect(() => {
  let intervalId;
  if (timerStarted && !gameOverFlag) {
    intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(intervalId);
          gameOver("Time's up! Game Over!");
          return prevTime;
        }
        return prevTime - 1;
      });
    }, 1000);
  } else {
    clearInterval(intervalId);
  }

  return () => clearInterval(intervalId); // Cleanup function to clear interval on unmount or when timer conditions change
}, [timerStarted, gameOverFlag]);

useEffect(() => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  setRemainingMinutes(minutes);
  setRemainingSeconds(seconds);
}, [remainingTime]);

const startTimerOnTap = () => {
  if (!timerStarted) {
    setTimerStarted(true); // Set timerStarted to true to start the timer
  }
};

const stopTimer = () => {
  clearInterval(timerId);
  setTimerStarted(false); // Set timerStarted to false to stop the timer
  setTimerId(null);
};

useEffect(() => {
  // Initial delay before enemy encounters become possible
  setEnemyCooldown(true);
  setTimeout(() => {
    setEnemyCooldown(false);
  }, 5500); // Delay for 10 seconds
}, []);

const restartGame = () => {
  clearInterval(timerId);
  setScore(0);
  setTimeLimitInSeconds(120);
  setRemainingTime(120);
  setPlayerPosition({ x: 1, y: 1 }); // Reset player position to default (1, 1)
  setCheeseCooldown(false);
  setEnemyCooldown(true);
  setMoves(0);
  setGameOverFlag(false);
  setGameOverMessage("");

  // Regenerate maze data
  const mazeRows = 11;
  const mazeCols = 9;
  const newMazeData = generateMazeData(mazeRows, mazeCols);

  // Find a valid starting position for the player
  let playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
  let playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  while (!newMazeData[playerStartY][playerStartX].isPath) {
    playerStartX = Math.floor(Math.random() * (mazeCols - 2)) + 1;
    playerStartY = Math.floor(Math.random() * (mazeRows - 2)) + 1;
  }

  // Set the maze data with the new maze and player's starting position
  setMazeData(newMazeData);
  setPlayerPosition({ x: playerStartX, y: playerStartY });

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
      enemyWon: false,
    }))
  );

  // Choose a random starting position on the outer border
  const startEdge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
  let x, y;

  switch (startEdge) {
    case 0: // Top edge
      x = Math.floor(Math.random() * (cols - 2)) + 1;
      y = 0;
      break;
    case 1: // Right edge
      x = cols - 1;
      y = Math.floor(Math.random() * (rows - 2)) + 1;
      break;
    case 2: // Bottom edge
      x = Math.floor(Math.random() * (cols - 2)) + 1;
      y = rows - 1;
      break;
    case 3: // Left edge
      x = 0;
      y = Math.floor(Math.random() * (rows - 2)) + 1;
      break;
  }

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
        nx >= 0 &&
        nx < cols &&
        ny >= 0 &&
        ny < rows &&
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
      stack.push([nx, ny]);
    } else {
      stack.pop();
    }
  }

  return maze;
};

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

useEffect(() => {
  if (remainingTime === 0) {
    gameOver(
      "Time's up! Game Over!",
      mazeData[playerPosition.y][playerPosition.x]
    );
    stopTimer();
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
      const newMazeData = mazeData.map((row, rowIndex) =>
        row.map((mazeCell, colIndex) => {
          const isPlayerPosition =
            rowIndex === playerPosition.y && colIndex === playerPosition.x;
          if (isPlayerPosition) {
            return {
              ...mazeCell,
              enemyWon: true, // Update enemyWon flag
              isActive: false, // Update isActive flag
            };
          }
          return mazeCell;
        })
      );
      setMazeData(newMazeData);
      setScore(0); // Set score to zero
      gameOver("Enemy won! Game Over!", cell);
      stopTimer();
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
    gameOver("Congrats! You found the Hidden Door.", cell);
    stopTimer();
  }
};

const containerStyle = {
  display: "grid",
  gridTemplateColumns: `repeat(${mazeData[0].length}, ${cellSize}px)`,
  gridTemplateRows: `repeat(${mazeData.length}, ${cellSize}px)`,
  gap: "0px",
  padding: "0px", // Adjusted padding
  position: "relative",
  width: `${mazeData[0].length * cellSize}px`, // Removed extra padding from the width
  outline: "none", // Hide outline when the container is focused
  border: "none", // Remove border
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
      const enemyWon = cell.enemyWon; // New flag to check if the enemy won

      // Generate a unique id for each cell
      const cellId = `cell-${rowIndex}-${colIndex}`;

      const cellStyle = {
        width: "40px",
        height: "40px",
        fontSize: "20px",
        border: isPath ? "thin solid #ececec" : "",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: isPath ? luckyColor : "",
        color: isActive ? "gray" : "",
        backgroundImage: isActive
          ? "url('https://ipfs.near.social/ipfs/bafkreiejk6zjvhxevdatofxpznf4fedluwuavptaryvbixie6bcz4u5goe')"
          : "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative", // Ensure the position is set to relative
      };

      const emojiStyle = {
        position: "absolute",
        top: "50%", // Center the emoji vertically
        left: "50%", // Center the emoji horizontally
        transform: "translate(-50%, -50%)", // Translate the emoji to center it
        zIndex: 1,
      };

      return (
        <div
          className="maze-container"
          style={containerStyle}
          tabIndex="0" // Add tabIndex to make the container focusable
        >
          <div
            key={cellId}
            id={cellId}
            className={`maze-cell ${isPath ? "path" : ""} ${
              isActive ? "active" : ""
            }`}
            style={cellStyle}
          >
            {hasCheese && !isActive ? <div style={emojiStyle}>🧀</div> : ""}
            {hasEnemy && !isActive ? <div style={emojiStyle}>🦹‍♂️</div> : ""}
            {hasExit ? "🚪" : ""}
            {enemyWon ? "💢" : ""} {/* Render the angry emoji if enemy won */}
          </div>
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

const handleContainerClick = () => {
  startTimerOnTap(); // Start the timer when the user clicks on the maze container
};

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

  // Update player position state
  setPlayerPosition({ x: newX, y: newY });

  // Update mazeData state
  setMazeData(newMazeData);

  // Check for events at the new player position
  checkForEvents(newMazeData[newY][newX]);

  // Increment moves count
  setMoves(moves + 1);
};

let isMouseDown = false;
let lastCellX = null;
let lastCellY = null;

const handleMouseDown = (event) => {
  isMouseDown = true;
  handleMouseMove(event);
};

const handleMouseMove = (event) => {
  if (!mazeContainerRef || !isMouseDown) return;

  const cellWidth = isMobile() ? 30 : 40; // Adjusted cell size for mobile devices

  // Extract cell coordinates from the id attribute
  const id = event.target.id;
  const [_, y, x] = id.split("-");
  const newX = parseInt(x);
  const newY = parseInt(y);

  // Update last cell coordinates
  lastCellX = newX;
  lastCellY = newY;
};

const handleMouseUp = () => {
  isMouseDown = false;
  lastCellX = null;
  lastCellY = null;
};

const handleClick = (event) => {
  if (!mazeContainerRef) return;

  // Extract cell coordinates from the id attribute
  const id = event.target.id;
  const [_, y, x] = id.split("-");
  const newX = parseInt(x);
  const newY = parseInt(y);

  console.log(`Clicked on cell (${newX}, ${newY})`);

  // Save the current player position as the starting cell
  const startX = playerPosition.x;
  const startY = playerPosition.y;

  // Calculate the path from the current position to the clicked cell
  const path = calculatePath(startX, startY, newX, newY);

  // Move the player along the calculated path
  moveAlongPath(path);

  // Stop the timer if the exit is found
  if (mazeData[newY][newX].hasExit) {
    stopTimer();
  }
};

// Function to calculate the path from the current position to the target position
const calculatePath = (currentX, currentY, targetX, targetY) => {
  console.log(
    `Calculating path from (${currentX}, ${currentY}) to (${targetX}, ${targetY})`
  );
  const path = [];

  let deltaX = Math.sign(targetX - currentX);
  let deltaY = Math.sign(targetY - currentY);

  let x = currentX;
  let y = currentY;

  console.log("Delta X:", deltaX);
  console.log("Delta Y:", deltaY);

  // Ensure that both x and y are not equal to their respective target values
  while (x !== targetX || y !== targetY) {
    path.push([x, y]);

    // Move along the x-axis towards the target
    if (x !== targetX) x += deltaX;

    // Move along the y-axis towards the target
    if (y !== targetY) y += deltaY;
  }

  // Add the target position to the path
  path.push([targetX, targetY]);

  console.log("Calculated path:", path);

  return path;
};

// Function to move the player along the calculated path
const moveAlongPath = (path) => {
  console.log("Moving along path:", path);
  path.forEach(([x, y]) => {
    console.log(`Moving to cell (${x}, ${y})`);
    movePlayer(x, y);
  });
};

const cellSize = isMobile() ? 30 : 40; // Adjust cell size for mobile devices
let mazeContainerRef = null;

const handleContainerRef = (event) => {
  mazeContainerRef = event.target;
};

return (
  <div
    style={{
      maxWidth: `${mazeData[0].length * cellSize + 10}px`,
      margin: "0 auto",
      padding: "5px",
      border: "1px solid #000",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem",
      }}
    >
      <div>Score: {score}</div>
      <div>
        Time: {remainingMinutes}m {remainingSeconds}s
      </div>
    </div>
    {gameOverMessage && (
      <div>
        <button onClick={restartGame}>Restart Game</button>
        <p style={{ color: "red" }}>{gameOverMessage}</p>
      </div>
    )}
    <div
      className="maze-container"
      onTouchStart={(e) => {
        handleContainerRef(e);
        handleMouseDown(e);
      }}
      onTouchMove={(e) => {
        handleContainerRef(e);
        handleMouseMove(e);
      }}
      onTouchEnd={(e) => {
        handleContainerRef(e);
        handleMouseUp(e);
      }}
      onClick={(e) => {
        handleContainerRef(e);
        handleContainerClick();
        handleClick(e);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${mazeData[0].length}, ${cellSize}px)`, // Adjusted cell size
        gridTemplateRows: `repeat(${mazeData.length}, ${cellSize}px)`, // Adjusted cell size
        gap: "0px",
        padding: "0px",
        position: "relative",
        width: `${mazeData[0].length * cellSize}px`, // Adjusted width
      }}
      tabIndex="0"
      onKeyDown={handleKeyPress}
    >
      {renderMazeCells()}

      <div className="notification-bar">
        <p style={{ color: "red" }}>{notification}</p>{" "}
        {/* Display the notification message here */}
      </div>
    </div>
    <ol>
      <li>Click or Tap to Start</li>
      <li>Navigate with Arrows or Tap</li>
      <li>Collect Cheddar🧀</li>
      <li>Battle Cartel to protect your Bag</li>
      <li>Find the Hidden Door🚪 to Win!</li>
    </ol>
  </div>
);
