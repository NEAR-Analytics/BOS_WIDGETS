const H1 = styled.h1`
    color: red;
    background-color: black;
`;

const [count, setCount] = useState(0);

function Click() {
  setCount((count += 1));
}

return (
  <>
    <H1>Near India</H1>
    <p>I love Near India</p>
    <p>Current count = {count}</p>
    hello
    <button onClick={Click}>ClickME</button>
  </>
);
