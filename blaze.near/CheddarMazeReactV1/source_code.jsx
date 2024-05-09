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
const [remainingMinutes, setRemainingMinutes] = useState(0);
const [remainingSeconds, setRemainingSeconds] = useState(0);
const [gameOverMessage, setGameOverMessage] = useState("");
const [playerStartY, setPlayerStartY] = useState(0);
const [timerStarted, setTimerStarted] = useState(false);
const [direction, setDirection] = useState("right");
const [selectedColorSet, setSelectedColorSet] = useState(null);
const [backgroundImage, setBackgroundImage] = useState("");
const [rarity, setRarity] = useState("");
const [won, setWon] = useState(false);
const [touchStart, setTouchStart] = useState({ x: null, y: null });
const [touchEnd, setTouchEnd] = useState({ x: null, y: null });
const [lastCellX, setLastCellX] = useState(null);
const [lastCellY, setLastCellY] = useState(null);

// Initialize path color from the selected color set
const pathColor = selectedColorSet ? selectedColorSet.pathColor : "";
const backgroundImageStyle = {
  backgroundImage: backgroundImage,
  backgroundSize: "cover",
};

const Maze = ({
  mazeData,
  playerPosition,
  score,
  timerStarted,
  remainingMinutes,
  remainingSeconds,
  gameOverFlag,
  gameOverMessage,
  startTimerOnTap,
  handleKeyPress,
  handleTouchMove,
  handleMouseClick,
  restartGame,
}) => {
  const pathColor = selectedColorSet ? selectedColorSet.pathColor : "";
  const backgroundImageStyle = {
    backgroundImage: backgroundImage,
    backgroundSize: "cover",
  };

  const styles = {
    gameContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: "1px solid gold",
    },
    mazeContainer: {
      marginBottom: "20px",
      border: "2px solid black",
      borderRadius: "5px",
      overflow: "hidden",
      width: "fit-content",
      border: "1px solid green", // Typo: 'border' instead of 'bordeer'
    },
    mazeRow: {
      display: "flex",
      border: "1px solid red",
    },
    mazeCell: {
      display: "flex",
      flex: "0 0 auto", // Fix the size of the cell
      width: "40px",
      height: "40px",
      border: "1px solid green",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px" /* Adjust the font size of the emojis */,
      backgroundColor: "white", // Default background color for cells
    },
    playerCell: {
      position: "relative", // Ensure the player is positioned relative to its parent
      width: "40px",
      height: "40px",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      backgroundImage:
        "url('https://lh3.googleusercontent.com/d/114_RLl18MAzX035svMyvNJpE3ArfLNCF=w500')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "70%",
      backgroundColor: "transparent",
    },
    playerMoveUp: {
      transform: "rotate(-90deg)",
    },
    playerMoveDown: {
      transform: "rotate(90deg)",
    },
    playerMoveLeft: {
      transform: "scaleX(-1)",
    },
    playerMoveRight: {
      transform: "rotate(0deg)",
    },
    playerActive: {
      zIndex: 1, // Ensure the active player appears above other elements
    },
    debugInfo: {
      display: "none", // Hide debug info by default
    },
    gameInfo: {
      display: "flex",
      justifyContent: "space-between",
      width: "200px",
    },
    gameOver: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "red",
    },
  };

  // Render the maze cells
  // Function to render the maze cells
  // Function to render the maze cells with blur effect
  const renderMaze = () => {
    // Check if the player position has changed
    const playerMoved =
      lastCellX !== playerPosition.x || lastCellY !== playerPosition.y;

    // // Update last player position
    setLastCellX(playerPosition.x);
    setLastCellY(playerPosition.y);

    return mazeData.map((row, rowIndex) => (
      <div key={rowIndex} style={styles.mazeRow}>
        {row.map((cell, colIndex) => {
          const blurRadius = playerMoved
            ? calculateBlurRadius(colIndex, rowIndex)
            : 0;
          const applyBlur = blurRadius > 0; // Determine if blur should be applied
          return (
            <div
              key={colIndex}
              id={`cell-${rowIndex}-${colIndex}`}
              style={{
                ...styles.mazeCell,
                backgroundColor: cell.isPath
                  ? "#9d67ef"
                  : cell.hasEnemy
                  ? "red"
                  : cell.hasCheese
                  ? "orange"
                  : "black",
                filter: applyBlur ? `blur(${blurRadius}px)` : "none", // Apply blur conditionally
              }}
              onClick={handleMouseClick}
            >
              {cell.hasCheese && "🧀"}
              {cell.hasEnemy && "👾"}
              {playerPosition.x === colIndex &&
                playerPosition.y === rowIndex && (
                  <div
                    className={`player-icon ${direction}`} // Apply dynamic CSS class based on the direction
                    style={{
                      ...styles.mazeCell,
                      ...styles.playerCell,
                      ...styles[
                        `playerMove${
                          direction.charAt(0).toUpperCase() + direction.slice(1)
                        }`
                      ], // Applying the direction style dynamically
                      backgroundImage: `url('https://lh3.googleusercontent.com/d/114_RLl18MAzX035svMyvNJpE3ArfLNCF=w500')`,
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "70%",
                      position: "relative",
                    }}
                  ></div>
                )}
            </div>
          );
        })}
      </div>
    ));
  };

  // Inside the Maze component return statement
  return (
    <div style={styles.gameContainer}>
      <h1>Cheese Maze Game</h1>
      <div
        style={styles.mazeContainer}
        tabIndex="0"
        onKeyDown={handleKeyPress}
        onTouchMove={handleTouchMove}
        onClick={handleMouseClick}
      >
        {renderMaze()}
      </div>
      <div style={styles.gameInfo}>
        <div>Score: {score}</div>
        <div>
          Time:{" "}
          {remainingMinutes < 10 ? "0" + remainingMinutes : remainingMinutes}:
          {remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds}
        </div>
      </div>
      <div style={styles.gameOver}>{gameOverMessage}</div>
      {gameOverFlag && (
        <button onClick={restartGame} style={{ fontSize: "18px" }}>
          Restart Game
        </button>
      )}
    </div>
  );
};

const styles = {
  gameContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid gold",
  },
  mazeContainer: {
    marginBottom: "20px",
    border: "2px solid black",
    borderRadius: "5px",
    overflow: "hidden",
    width: "fit-content",
    border: "1px solid green", // Typo: 'border' instead of 'bordeer'
  },
  mazeRow: {
    display: "flex",
    border: "1px solid red",
  },
  mazeCell: {
    flex: "0 0 auto", // Fix the size of the cell
    width: "40px",
    height: "40px",
    border: "1px solid green",
    backgroundColor: "white", // Default background color for cells
  },
  playerCell: {
    backgroundColor: "yellow",
  },
  debugInfo: {
    display: "none", // Hide debug info by default
  },
  gameInfo: {
    display: "flex",
    justifyContent: "space-between",
    width: "200px",
  },
  gameOver: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "red",
  },
};

// Function to select a random color set, background image, and rarity
const selectRandomColorSet = () => {
  const colorSets = [
    {
      backgroundColor: "#F0F0F0",
      pathColor: "#9d67ef",
      nonPathColor: "white",
      textColor: "#000000",
      rarity: "common",
      backgroundImage:
        "url('https://cheddar.farm/newFarmBackground.c6905a5e.png')",
    },
    {
      backgroundColor: "#E0E0E0",
      pathColor: "gold",
      nonPathColor: "white",
      textColor: "#333333",
      rarity: "rare",
      backgroundImage:
        "url('https://ipfs.near.social/ipfs/bafkreihpddbzbioe7kctes25rr52klcs5we4pocwiwbmwldqf4acdarpcm')",
    },
    // Add more color sets as needed
  ];

  return colorSets[Math.floor(Math.random() * colorSets.length)];
};

// Set the selected color set, background image, and rarity once at the start of the game
useEffect(() => {
  const randomColorSet = selectRandomColorSet();
  setSelectedColorSet(randomColorSet);
  setBackgroundImage(randomColorSet.backgroundImage);
  setRarity(randomColorSet.rarity);
}, []);

// Define a new useEffect hook to manage the timer
useEffect(() => {
  let intervalId;
  if (timerStarted && !gameOverFlag) {
    intervalId = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime === 1) {
          clearInterval(intervalId);
          gameOver("⏰ Time's up! Game Over!");
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

useEffect(() => {
  // Clear timer when component unmounts
  return () => {
    clearInterval(timerId);
  };
}, [timerId]);

// Function to restart the game
const restartGame = () => {
  clearInterval(timerId);
  setScore(0);
  setTimeLimitInSeconds(120);
  setRemainingTime(120);
  setCheeseCooldown(false);
  setEnemyCooldown(true);
  setMoves(0);
  setGameOverFlag(false);
  setWon(false);
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

// Function to generate maze data
const generateMazeData = (rows, cols) => {
  // Initialize lastCellX and lastCellY with initial player position
  setLastCellX(Math.floor(cols / 2)); // Initial X coordinate
  setLastCellY(Math.floor(rows / 2)); // Initial Y coordinate

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
      [2, 0], // Increase step to 2 for wider paths
      [-2, 0], // Increase step to 2 for wider paths
      [0, 2], // Increase step to 2 for wider paths
      [0, -2], // Increase step to 2 for wider paths
    ].forEach(([dx, dy]) => {
      const nx = cx + dx,
        ny = cy + dy;
      if (
        nx >= 0 &&
        nx < cols &&
        ny >= 0 &&
        ny < rows &&
        !maze[ny][nx].isPath
      ) {
        directions.push([nx, ny, cx + dx / 2, cy + dy / 2]); // Adjust coordinates for wider paths
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

// Inside the component where you're using the Maze component
useEffect(() => {
  // Generate maze data and set it to the state
  const mazeRows = 11;
  const mazeCols = 9;
  const newMazeData = generateMazeData(mazeRows, mazeCols);
  setMazeData(newMazeData);
}, []); // Empty dependency array to run this effect only once on component mount

const movePlayer = (newX, newY) => {
  if (!mazeData[newY][newX].isPath) {
    return; // Player cannot move to non-path cells
  }

  // Start the timer if it hasn't started yet
  if (!timerStarted) {
    startTimer();
    setTimerStarted(true);
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

  // Increment moves count
  setMoves(moves + 1);

  // Periodically add artifacts to the board based on cooldowns and randomness
  addArtifacts(newX, newY, newMazeData);

  // Set lastCellX and lastCellY to the new player position
  setLastCellX(newX);
  setLastCellY(newY);
};

const addArtifacts = (newX, newY, newMazeData) => {
  if (
    !gameOverFlag &&
    !newMazeData[newY][newX].hasEnemy &&
    !newMazeData[newY][newX].hasCheese
  ) {
    if (!enemyCooldown && Math.random() < 0.5) {
      // 50% chance of encountering an enemy
      // Code for adding enemy artifact...

      // Add logic for the enemy defeating the player
      if (Math.random() < 0.1) {
        // 10% chance of the enemy winning
        console.log("enemy won");
        const updatedMazeData = newMazeData.map((row, rowIndex) =>
          row.map((mazeCell, colIndex) => {
            const isPlayerPosition = rowIndex === newY && colIndex === newX;
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
        setMazeData(updatedMazeData);
        setScore(0); // Set score to zero
        gameOver("Enemy won! Game Over!");
        stopTimer();
      } else {
        const updatedMazeData = newMazeData.map((row, rowIndex) =>
          row.map((mazeCell, colIndex) => {
            const isPlayerPosition = rowIndex === newY && colIndex === newX;
            if (isPlayerPosition) {
              return {
                ...mazeCell,
                hasEnemy: true, // Update enemyWon flag
              };
            }
            return mazeCell;
          })
        );
        setMazeData(updatedMazeData);
        setEnemyCooldown(true);
        setTimeout(() => {
          setEnemyCooldown(false);
        }, Math.floor(Math.random() * 5000) + 1000);
      }
    } else if (!cheeseCooldown && Math.random() < 0.055) {
      // 5.5% chance of winning cheese
      const updatedMazeData = newMazeData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === newY && colIndex === newX) {
            return {
              ...cell,
              hasCheese: true,
            };
          }
          return cell;
        })
      );
      setMazeData(updatedMazeData);
      setScore(score + 1);
      setCheeseCooldown(true);
      setTimeout(() => {
        setCheeseCooldown(false);
      }, Math.floor(Math.random() * 5000) + 1000);
    } else if (Math.random() < 0.002) {
      // 0.2% chance of hitting the "cartel" event
      const updatedMazeData = newMazeData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === newY && colIndex === newX) {
            return {
              ...cell,
              hasCartel: true,
            };
          }
          return cell;
        })
      );
      setMazeData(updatedMazeData);
      setScore(0);
      gameOver("You ran into the cartel! Game Over!");
      stopTimer();
    } else if (Math.random() < 0.002) {
      // 0.2% chance of finding the exit
      const updatedMazeData = newMazeData.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (rowIndex === newY && colIndex === newX) {
            return {
              ...cell,
              hasExit: true,
            };
          }
          return cell;
        })
      );
      setMazeData(updatedMazeData);
      gameOver("Congrats! You found the Hidden Door.");
      stopTimer();
    }
  } else if (newMazeData[newY][newX].hasExit) {
    gameOver("Congrats! You found the Hidden Door.");
    stopTimer();
  }
};

// Function to handle key press events
const handleKeyPress = (event) => {
  if (gameOverFlag) return; // If game over, prevent further movement

  const key = event.key;
  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (key) {
    case "ArrowUp":
      newY--;
      setDirection("up");
      break;
    case "ArrowDown":
      newY++;
      setDirection("down");
      break;
    case "ArrowLeft":
      newX--;
      setDirection("left");
      break;
    case "ArrowRight":
      newX++;
      setDirection("right");
      break;
    default:
      return;
  }

  movePlayer(newX, newY);
  setLastCellX(newX);
  setLastCellY(newY);
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

let isMouseDown = false;

const handleMouseClick = (event) => {
  if (gameOverFlag) return; // If game over, prevent further movement

  // Extract cell coordinates from the id attribute
  const id = event.target.id;
  const [_, y, x] = id.split("-");
  const newX = parseInt(x);
  const newY = parseInt(y);

  // Calculate the direction based on the clicked cell's position relative to the player's current position
  let newDirection = direction; // Initialize newDirection with the current direction
  if (newY < playerPosition.y) {
    newDirection = "up";
  } else if (newY > playerPosition.y) {
    newDirection = "down";
  } else if (newX < playerPosition.x) {
    newDirection = "left";
  } else if (newX > playerPosition.x) {
    newDirection = "right";
  }

  // Update the direction state
  setDirection(newDirection);

  // Call movePlayer to move the player to the clicked cell
  movePlayer(newX, newY);
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

// Function to extract cell coordinates from the id attribute
const getCellCoordinates = (id) => {
  const [_, y, x] = id.split("-");
  return { newX: parseInt(x), newY: parseInt(y) };
};

const handleTouchMove = (event) => {
  event.preventDefault(); // Prevent default touch move behavior

  if (!mazeContainerRef || !isMouseDown) return;

  const cellWidth = isMobile() ? 30 : 40; // Adjusted cell size for mobile devices

  // Extract cell coordinates from the id attribute
  const id = event.target.id;
  const [_, y, x] = id.split("-");
  const newX = parseInt(x);
  const newY = parseInt(y);

  // Update last cell coordinates
  setLastCellX(newX);
  setLastCellY(newY);

  // Call movePlayerDirection to move the player based on touch direction
  const deltaX = newX - touchStart.x;
  const deltaY = newY - touchStart.y;
  let direction = "";

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    direction = deltaX > 0 ? "right" : "left";
  } else {
    direction = deltaY > 0 ? "down" : "up";
  }

  // Move the player in the determined direction
  for (let i = 0; i < Math.abs(cellsMovedX); i++) {
    movePlayerDirection(direction);
  }

  for (let i = 0; i < Math.abs(cellsMovedY); i++) {
    movePlayerDirection(direction);
  }

  // Update touch start position for next move
  setTouchStart({ x: touch.clientX, y: touch.clientY });
};

const calculateBlurRadius = (cellX, cellY) => {
  // Check if lastCellX and lastCellY are null or undefined
  if (lastCellX === null || lastCellY === null) {
    // Initialize lastCellX and lastCellY with initial player position
    setLastCellX(playerPosition.x);
    setLastCellY(playerPosition.y);
  }

  // Calculate distance between current cell and last cell
  const distance = Math.sqrt(
    Math.pow(cellX - lastCellX, 2) + Math.pow(cellY - lastCellY, 2)
  );

  // Define max blur radius and adjust based on distance
  const maxBlurRadius = 10; // Adjust as needed
  return Math.min(maxBlurRadius, distance);
};

const ControlPad = ({ movePlayerDirection }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <button onClick={() => movePlayerDirection("up")}>Up</button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button onClick={() => movePlayerDirection("left")}>Left</button>
        <button onClick={() => movePlayerDirection("down")}>Down</button>
        <button onClick={() => movePlayerDirection("right")}>Right</button>
      </div>
    </div>
  );
};

// Function to handle directional button inputs
const movePlayerDirection = (direction) => {
  if (gameOverFlag) return;

  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (direction) {
    case "up":
      newY--;
      break;
    case "down":
      newY++;
      break;
    case "left":
      newX--;
      break;
    case "right":
      newX++;
      break;
    default:
      return;
  }

  // Call moveAlongPath if you want to animate step by step movement
  const path = calculatePath(playerPosition.x, playerPosition.y, newX, newY);
  // Call handleMove to move the player to the new cell
  handleMove(newX, newY);
  setDirection(direction); // Optionally update the direction if needed
};

// Example handler for touch or click events where path calculation is desired
const handleMove = (event) => {
  const { newX, newY } = getCellCoordinates(event.target.id);
  const path = calculatePath(playerPosition.x, playerPosition.y, newX, newY);
  moveAlongPath(path);
};

// Function to start the timer
const startTimer = () => {
  const id = setInterval(() => {
    setTimeLimitInSeconds((prevTime) => {
      if (prevTime === 0) {
        clearInterval(id);
        setGameOverFlag(true);
        setGameOverMessage("Time's up! Game over!");
        return prevTime;
      }
      return prevTime - 1;
    });
  }, 1000);

  setTimerId(id);
  setTimerStarted(true);
};

const startTimerOnTap = () => {
  if (!timerStarted) {
    startTimer();
  }
};

const stopTimer = () => {
  clearInterval(timerId);
  setTimerStarted(false);
};

// Function to handle game over
const gameOver = (message) => {
  setGameOverFlag(true);
  setGameOverMessage(message);
  stopTimer();
};

return (
  <div>
    <Maze
      mazeData={mazeData}
      playerPosition={playerPosition}
      score={score}
      timerStarted={false}
      remainingMinutes={Math.floor(remainingTime / 60)}
      remainingSeconds={remainingTime % 60}
      gameOverFlag={gameOverFlag}
      gameOverMessage={gameOverMessage}
      startTimerOnTap={startTimer}
      handleKeyPress={handleKeyPress}
      handleTouchMove={handleTouchMove}
      handleMouseClick={handleMouseClick}
      restartGame={restartGame}
    />
  </div>
);
