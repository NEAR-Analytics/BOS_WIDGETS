const [input, setInput] = useState("");

const handleButtonClick = (value) => {
  setInput((prevInput) => prevInput + value);
};

const handleClear = () => {
  setInput("");
};

const handleCalculate = () => {
  try {
    const result = calculate(input);
    setInput(result);
  } catch (error) {
    setInput("Error");
  }
};

const calculate = (expression) => {
  const operators = ["+", "-", "*", "/"];
  const tokens = expression.split(/(\+|-|\*|\/)/).map((token) => token.trim());
  let stack = [];
  let currentOperator = null;

  for (const token of tokens) {
    if (operators.includes(token)) {
      currentOperator = token;
    } else {
      const num = parseFloat(token);
      if (!isNaN(num)) {
        if (currentOperator === null) {
          stack.push(num);
        } else {
          if (currentOperator === "+") {
            stack.push(num);
          } else if (currentOperator === "-") {
            stack.push(-num);
          } else if (currentOperator === "*") {
            const prevNum = stack.pop();
            stack.push(prevNum * num);
          } else if (currentOperator === "/") {
            const prevNum = stack.pop();
            stack.push(prevNum / num);
          }
        }
      }
    }
  }
  return stack.reduce((acc, num) => acc + num, 0).toString();
};

const styles = {
  calculatorStyle: {
    width: "400px", // Reduced size of the calculator
    margin: "0 auto",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(180deg, #4caf50, #fff)", // Green to white gradient
    fontFamily: "Arial, sans-serif",
    textAlign: "center", // Center align the calculator content
  },
  displayStyle: {
    fontSize: "2em", // Reduced font size of the display
    textAlign: "right",
    padding: "20px", // Reduced padding
    border: "1px solid #ccc",
    borderRadius: "10px",
    marginBottom: "20px",
    backgroundColor: "rgba(0, 128, 0, 0.3)", // Green with 70% transparency
    color: "#333",
    fontWeight: "bold", // Bold text
    width: "100%", // Set width to 100%
    boxSizing: "border-box", // Include padding and border in width calculation
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center", // Center align buttons horizontally
    marginBottom: "10px",
  },
  buttonStyle: {
    flex: "1",
    fontSize: "1.5em",
    padding: "15px 0",
    margin: "5px",
    backgroundColor: "#ff0000",
    color: "#333",
    border: "5px solid #ccc",
    borderRadius: "40%", // Set border radius to 50% for perfect circle
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold",
    width: "80px",
  },

  buttonStyleRed: {
    backgroundColor: "#800080",
    color: "#fff",
  },
  buttonStyleOrange: {
    backgroundColor: "#ff9800",
    color: "#fff",
  },
  buttonStyleGreen: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  buttonStyleBlue: {
    backgroundColor: "#008000",
    color: "#fff",
  },
  heading: {
    fontSize: "1.8em", // Adjusted font size of the heading
    color: "#333",
    marginBottom: "20px",
  },
  footer: {
    textAlign: "left", // Left align footer text
    color: "#777",
    fontSize: "0.9em",
    fontStyle: "italic",
    marginTop: "20px", // Added margin top
  },
};

return (
  <div style={styles.calculatorStyle}>
    <div style={{ marginTop: "0px", textAlign: "right" }}>
      <img
        src="https://shard.dog/v3/images/nearindia.jpg"
        alt="Near India"
        style={{ maxWidth: "40px", maxHeight: "40px" }}
      />
    </div>
    <h1 style={styles.heading}>
      <strong>CALCULATOR</strong>
    </h1>
    <div style={styles.displayStyle}>{input}</div>
    <div>
      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.buttonStyle, ...styles.buttonStyleRed }}
          onClick={handleClear}
        >
          C
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
      </div>
      <div style={styles.buttonRow}>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("7")}
        >
          7
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("8")}
        >
          8
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("9")}
        >
          9
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("+")}
        >
          +
        </button>
      </div>
      <div style={styles.buttonRow}>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("4")}
        >
          4
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("5")}
        >
          5
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("6")}
        >
          6
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("-")}
        >
          -
        </button>
      </div>
      <div style={styles.buttonRow}>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("1")}
        >
          1
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("2")}
        >
          2
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("3")}
        >
          3
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("*")}
        >
          *
        </button>
      </div>
      <div style={styles.buttonRow}>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("0")}
        >
          0
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick(".")}
        >
          .
        </button>
        <button
          style={{ ...styles.buttonStyle, ...styles.buttonStyleBlue }}
          onClick={handleCalculate}
        >
          =
        </button>
      </div>
      <p style={{ textAlign: "right" }}>
        <strong>parven8.near</strong>{" "}
      </p>
    </div>
  </div>
);
