const [number, setNumber] = useState(0);
const increase = () => {
  setNumber(number + 1);
};
const decrease = () => {
  setNumber(number - 1);
};

useEffect(() => {
  console.log("hello number - " + number);
}, [number]);

return (
  <div>
    Hello World
    {number}
    <button onClick={increase}>Increase Number</button>
    <button onClick={decrease}>Decrease Number</button>
  </div>
);
