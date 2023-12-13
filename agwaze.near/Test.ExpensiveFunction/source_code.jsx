const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
`;

const Result = styled.p`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
`;

const ToggleButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  margin-top: 20px;

  &:hover {
    background-color: #2980b9;
  }
`;

const [inputValue, setInputValue] = useState("");
const [toggle, setToggle] = useState(false);

// Let's assume this is a costly computation
const expensiveComputation = (input) => {
  // Some time-consuming logic...
  console.log("running");
  return input.toUpperCase();
};

// const resultWithoutMemo = expensiveComputation(inputValue);

// Memoize the result of the expensive computation
const memoizedResult = useMemo(() => {
  return expensiveComputation(inputValue);
}, [inputValue]);

return (
  <Container>
    <Label>
      Type something:
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Label>
    <Result>Transform to Uppercase: {memoizedResult}</Result>
    <ToggleButton onClick={() => setToggle(!toggle)}>
      Toggle - {toggle.toString()}
    </ToggleButton>
  </Container>
);

// const resultWithoutMemo = expensiveComputation(inputValue);
