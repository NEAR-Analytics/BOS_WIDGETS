const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const CountDisplay = styled.div`
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  margin: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: #2980b9;
  }
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  margin: 5px;
`;

const [count, setCount] = useState(0);
const [timeoutDuration, setTimeoutDuration] = useState(2000);
const [timerId, setTimerId] = useState(null);
const [isPaused, setIsPaused] = useState(false);

const incrementCount = useCallback(() => {
  setCount((prevCount) => prevCount + 1);
}, []);

const clearTimer = () => {
  clearTimeout(timerId);
  setTimerId(null);
};

const resetCount = () => {
  setCount(0);
};

const handleTimeoutChange = (e) => {
  const newTimeout = parseInt(e.target.value, 10);
  setTimeoutDuration(newTimeout);

  if (!isPaused) {
    // If the timer is running, reset it with the new duration
    clearTimer();
    setTimerId(
      setTimeout(() => {
        incrementCount();
      }, newTimeout)
    );
  }
};

const togglePause = () => {
  if (isPaused) {
    // Resume the timer
    setTimerId(
      setTimeout(() => {
        incrementCount();
      }, timeoutDuration)
    );
  } else {
    // Pause the timer
    clearTimer();
  }

  setIsPaused(!isPaused);
};

useEffect(() => {
  console.log("Effect ran! Count:", count);

  if (!isPaused) {
    const newTimerId = setTimeout(() => {
      incrementCount();
    }, timeoutDuration);

    setTimerId(newTimerId);
  }

  return () => {
    clearTimer();
  };
}, [count, incrementCount, isPaused, timeoutDuration]);

return (
  <Container>
    <CountDisplay>{count}</CountDisplay>
    <Input
      type="number"
      placeholder="Enter timeout duration (ms)"
      value={timeoutDuration}
      onChange={handleTimeoutChange}
    />
    <Button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</Button>
    <Button onClick={clearTimer}>Stop Timeout</Button>
    <Button onClick={resetCount}>Reset Count</Button>
  </Container>
);
