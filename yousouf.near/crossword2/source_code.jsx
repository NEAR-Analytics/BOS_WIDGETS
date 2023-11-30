const [puzzles, setPuzzles] = useState([
  {
    grid: [
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    ],
    clues: {
      across: [
        { number: 1, clue: "Horizontal word", length: 9, answer: "CROSSWORD" },
        {
          number: 4,
          clue: "Another horizontal word",
          length: 7,
          answer: "PUZZLES",
        },
      ],
      down: [
        { number: 2, clue: "Vertical word", length: 9, answer: "VERTICAL" },
        {
          number: 3,
          clue: "Another vertical word",
          length: 7,
          answer: "LETTERS",
        },
      ],
    },
  },
  // Add more puzzles as needed
]);

const [selectedCell, setSelectedCell] = useState({ row: 0, col: 0 });
const [highlightedCells, setHighlightedCells] = useState([]);
const [currentPuzzle, setCurrentPuzzle] = useState(null);
const [congratulatoryMessage, setCongratulatoryMessage] = useState("");
const [clueNumbers, setClueNumbers] = useState([]);

useEffect(() => {
  // Fetch puzzles in random order
  const shuffledPuzzles = [...puzzles].sort(() => Math.random() - 0.5);
  setCurrentPuzzle(shuffledPuzzles[0]);
}, [puzzles]);

useEffect(() => {
  // Set clue numbers
  const newClueNumbers = Array.from({ length: currentPuzzle.grid.length }, () =>
    Array(currentPuzzle.grid[0].length).fill(null)
  );

  currentPuzzle.clues.across.forEach((acrossClue) => {
    const { number } = acrossClue;
    const row = selectedCell.row;
    const col = selectedCell.col - (number - 1);
    if (col >= 0 && col < currentPuzzle.grid[row].length) {
      newClueNumbers[row][col] = number;
    }
  });

  currentPuzzle.clues.down.forEach((downClue) => {
    const { number } = downClue;
    const row = selectedCell.row - (number - 1);
    const col = selectedCell.col;
    if (row >= 0 && row < currentPuzzle.grid.length) {
      newClueNumbers[row][col] = number;
    }
  });

  setClueNumbers(newClueNumbers);
}, [currentPuzzle, selectedCell]);

// Function to handle user input
const handleInputChange = (event) => {
  const { value } = event.target;
  // Update the grid at the selected cell with the user input
  const newGrid = [...currentPuzzle.grid];
  newGrid[selectedCell.row][selectedCell.col] = value.toUpperCase();
  setCurrentPuzzle((prev) => ({ ...prev, grid: newGrid }));
};

// Function to handle cell selection
const handleCellClick = (row, col) => {
  // Update the selected cell when a cell is clicked
  setSelectedCell({ row, col });
};

// Function to check answers
const checkAnswers = () => {
  const newHighlightedCells = [];

  // Check across clues
  currentPuzzle.clues.across.forEach((acrossClue) => {
    const answer = acrossClue.answer.toUpperCase();
    for (let i = 0; i < answer.length; i++) {
      const row = selectedCell.row;
      const col = selectedCell.col - i;
      if (
        col >= 0 &&
        col < currentPuzzle.grid[row].length &&
        currentPuzzle.grid[row][col] !== answer[i]
      ) {
        newHighlightedCells.push({ row, col });
      }
    }
  });

  // Check down clues
  currentPuzzle.clues.down.forEach((downClue) => {
    const answer = downClue.answer.toUpperCase();
    for (let i = 0; i < answer.length; i++) {
      const row = selectedCell.row - i;
      const col = selectedCell.col;
      if (
        row >= 0 &&
        row < currentPuzzle.grid.length &&
        currentPuzzle.grid[row][col] !== answer[i]
      ) {
        newHighlightedCells.push({ row, col });
      }
    }
  });

  setHighlightedCells(newHighlightedCells);

  // Check if all answers are correct
  const isAllCorrect = newHighlightedCells.length === 0;
  if (isAllCorrect) {
    setCongratulatoryMessage("Congratulations! All answers are correct!");
  } else {
    setCongratulatoryMessage("");
  }
};

// Render the component
return (
  <div>
    <h1>Crossword Game</h1>
    {currentPuzzle && (
      <div>
        {currentPuzzle.grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                style={{
                  position: "relative",
                  width: "40px",
                  height: "40px",
                  textAlign: "center",
                  border: "1px solid black",
                  backgroundColor:
                    highlightedCells.some(
                      (highlightedCell) =>
                        highlightedCell.row === rowIndex &&
                        highlightedCell.col === colIndex
                    ) || cell === " "
                      ? "yellow"
                      : "black",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    fontSize: "8px",
                    color: "blue",
                  }}
                >
                  {clueNumbers[rowIndex][colIndex]}
                </span>
                <input
                  type="text"
                  value={cell === " " ? "" : cell}
                  onChange={handleInputChange}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    outline: "none",
                    fontSize: "16px",
                    backgroundColor: "transparent",
                    color: "white",
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        <div>
          <button onClick={checkAnswers}>Check Answers</button>
        </div>
        <div>
          <h2>Clues</h2>
          <div>
            <h3>Across</h3>
            <ul>
              {currentPuzzle.clues.across.map((acrossClue) => (
                <li
                  key={acrossClue.number}
                >{`${acrossClue.number}. ${acrossClue.clue}`}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Down</h3>
            <ul>
              {currentPuzzle.clues.down.map((downClue) => (
                <li
                  key={downClue.number}
                >{`${downClue.number}. ${downClue.clue}`}</li>
              ))}
            </ul>
          </div>
        </div>
        {congratulatoryMessage && <p>{congratulatoryMessage}</p>}
      </div>
    )}
  </div>
);
