// SIMPLE USESTATE EXAMPLE

const [toggle, setToggle] = useState(false);


return (
  <div className="">
    <h3>{toggle.toString()}</h3>
    <button onClick={() => setToggle(true)}>Make True</button>
    <button onClick={() => setToggle(false)}>Make False</button>
    <button onClick={() => setToggle(!toggle)}>Toggle</button>
  </div>
);
