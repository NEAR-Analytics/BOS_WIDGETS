const [data, setData] = useState("");

function fallback(inp) {
  console.log(`<props>.fn() is null!`);
}

const cb = props.fn || fallback;

const WrapperStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    flex-direction: row;
`;

return (
  <>
    <WrapperStyle>
      <input
        placeholder="Enter your address for gas-free transactions"
        onChange={({ target: { value } }) => setData(value)}
      />
      <button onClick={() => cb(data)}>Submit</button>
    </WrapperStyle>
  </>
);
