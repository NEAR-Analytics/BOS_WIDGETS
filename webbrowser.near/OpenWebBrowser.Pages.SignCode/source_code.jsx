const { signMessage } = props;

const Main = styled.div`
    width:100%;
    height:100vh;
`;

const [selectedOption, setSelectedOption] = useState("");

const widgets = Social.getr(`sdks.near/widget`);
const getSelectedOptionEncoded = () => {
  const code = widgets[selectedOption][""];
  const encoded = ethers.utils.sha256(Buffer.from(code));

  return encoded?.substring(2, encoded.length);
};

return (
  <Main>
    <select
      onChange={(e) => {
        setSelectedOption(e.target.value);
      }}
    >
      <option>Choose a component</option>
      {Object.keys(widgets)?.map((option) => (
        <option>{option}</option>
      ))}
    </select>
    <button
      onClick={() => {
        signMessage(getSelectedOptionEncoded()).then(({signature, nonce}) => {
          Social.set({
            routes: {
              index: {
                component: selectedOption,
                signature: {
                  value: signature,
                  nonce
                },
              },
            },
          });
        });
      }}
    >
      Sign
    </button>
  </Main>
);
