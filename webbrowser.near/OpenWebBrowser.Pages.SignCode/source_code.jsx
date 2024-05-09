const { signMessage } = props;

const Main = styled.div`
    width:100%;
    height:100vh;
`;

const [selectedOption, setSelectedOption] = useState("");

const widgets = Social.getr(`${context.accountId}/widget`);
const getSelectedOptionEncoded = () => {
  const code = widgets[selectedOption][""];
  console.log(code);
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
        signMessage(getSelectedOptionEncoded()).then(
          ({ signature, nonce, publicKey }) => {
            Social.set({
              routes: {
                index: {
                  component: selectedOption,
                  signature: {
                    publicKey,
                    value: signature,
                    nonce,
                  },
                },
              },
            });
          }
        );
      }}
    >
      Sign
    </button>
  </Main>
);
