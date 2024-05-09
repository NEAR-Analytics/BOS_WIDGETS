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
    width: "700px", // Increased size of the calculator
    margin: "0 auto",
    padding: "20px",
    border: "2px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 165, 0, 0.6)", // Orange with 10% transparency
    fontFamily: "Arial, sans-serif",
  },
  displayStyle: {
    fontSize: "2.5em",
    textAlign: "right",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "15px",
    marginBottom: "20px",
    backgroundColor: "rgba(0, 128, 0, 0.2)", // Green with 10% transparency
    color: "#333",
    fontWeight: "bold", // Bold text
    width: "100%", // Set width to 100%
    boxSizing: "border-box", // Include padding and border in width calculation
  },
  buttonRow: {
    display: "flex",
    marginBottom: "10px",
  },
  buttonStyle: {
    flex: "1",
    fontSize: "1.8em",
    padding: "15px 0",
    margin: "0 5px",
    backgroundColor: "#e0e0e0",
    color: "#333",
    border: "2px solid #ccc",
    borderRadius: "15px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    fontWeight: "bold", // Bold text
  },
  buttonStyleRed: {
    backgroundColor: "#f44336",
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
    backgroundColor: "#2196f3",
    color: "#fff",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.2em",
    color: "#333",
    marginBottom: "20px",
  },
  footer: {
    textAlign: "right",
    color: "#777",
    fontSize: "0.9em",
    fontStyle: "italic",
  },
};

return (
  <div style={styles.calculatorStyle}>
    <h1 style={styles.heading}>
      <strong>TEST CALCULATOR</strong>
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
          onClick={() => handleButtonClick("*")}
        >
          *
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
          onClick={() => handleButtonClick("+")}
        >
          +
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
      <p style={{ textAlign: "left" }}>Made for fun and learning purpose </p>
    </div>
    <div style={{ marginTop: "0px", textAlign: "left" }}>
      <img
        src="https://shard.dog/v3/images/nearindia.jpg"
        alt="Near India"
        style={{ maxWidth: "40px", maxHeight: "40px" }}
      />
    </div>
  </div>
);
