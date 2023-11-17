const [count, setCount] = useState(0);
const [timerId, setTimerId] = useState(null);

const incrementCount = useCallback(() => {
  setCount((prevCount) => prevCount + 1);
}, []);

const clearTimer = () => {
  // Clear the timeout to stop the increment operation.
  clearTimeout(timerId);
  setTimerId(null); // Reset the timerId in the state
};

const resetCount = () => {
  // Reset the count to its initial value.
  setCount(0);
};

useEffect(() => {
  console.log("Effect ran! Count:", count);

  // Set up the setTimeout and store its ID.
  const newTimerId = setTimeout(() => {
    incrementCount();
  }, 2000);

  // Update the timerId in the state.
  setTimerId(newTimerId);

  // Return a cleanup function to clear the timer.
  return () => {
    clearTimer();
  };
}, [count, incrementCount]);

return (
  <div>
    <div>{count}</div>
    <button onClick={clearTimer}>Clear Timeout</button>
    <button onClick={resetCount}>Reset Count</button>
  </div>
);
