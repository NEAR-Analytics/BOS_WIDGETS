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
    width: "300px",
    margin: "0 auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  },

  displayStyle: {
    fontSize: "1.5em",
    textAlign: "right",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "3px",
    marginBottom: "10px",
  },

  buttonStyle: {
    flex: "1",
    fontSize: "1.2em",
    padding: "10px",
    margin: "2px",
    backgroundColor: "Black",
    border: "1px solid #ccc",
    borderRadius: "3px",
    cursor: "pointer",
  },
  heading: {
    textAlign: "center",
    fontSize: "2em",
  },
  footer: {
    textAlign: "right",
  },
};

return (
  <div style={styles.calculatorStyle}>
    <h1 style={styles.heading}>CALCULATOR</h1>
    <div style={styles.displayStyle}>{input}</div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <button style={styles.buttonStyle} onClick={handleClear}>
          C
        </button>
        <button
          style={styles.buttonStyle}
          onClick={() => handleButtonClick("/")}
        >
          /
        </button>
      </div>
      <div style={{ display: "flex" }}>
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
      <div style={{ display: "flex" }}>
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
      <div style={{ display: "flex" }}>
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
      <div style={{ display: "flex" }}>
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
        <button style={styles.buttonStyle} onClick={handleCalculate}>
          =
        </button>
      </div>
      <p style={styles.footer}>KoreaDAO BOS Building</p>
    </div>
  </div>
);
