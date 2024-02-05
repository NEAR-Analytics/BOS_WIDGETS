const InputGroup = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  flex-direction: column;
  margin-top: 24px;
`;

const InputLabel = styled.label`
  margin-right: 10px;
  color: #888baf;
  display: flex;
  align-self: flex-end;
  margin-top: 8px;
`;

const Input = styled.input`
  flex: 1;
  height: 100%;
  background-color: inherit;
  text-align: left;
  border: none;
  padding: 8px;
  color: white;
  font-size: 32px;
  font-weight: 500;
  text-align: left;

  width: 100%;
  transition: box-shadow 0.3s ease;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.bgColor || "#00EC97"};
  color: ${(props) => props.color || "#373a53"};
  width: ${(props) => props.width || "100%"};
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-top: ${(props) => props.marginTop || 0}px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.8;

    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:last-child {
    margin-right: 0;
  }
`;

const Container = styled.div`
  background-color: #323345;
  border: 2px solid transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
  width: 100%;
  position: relative;

  &:focus-within {
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.4);
  }
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

const MaxButton = styled.button`
  background-color: #373a53;
  color: #fff;
  border: none;
  border-radius: 4px;
  width: 60px;
  height: 48px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #2d3045;
  }
`;

const GhostButton = styled.button`
  margin-top: ${(props) => props.marginTop || 0}px;
  width: ${(props) => props.width || "100%"};
  background-color: transparent;
  color: white;
  border: 1px solid white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s ease, transform 0.2s ease,
    box-shadow 0.2s ease, opacity 0.2s ease;
  font-size: 16px;
  font-weight: 600;

  text-align: center;

  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const {
  onConfirm,
  balance,
  type,
  loading,
  address,
  decimals,
  isCollateral,
  selectedItem,
} = props;

const [inputValue, setInputValue] = useState("");

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};
return (
  <InputGroup>
    <Container>
      <Icon src={selectedItem.image} alt="Currency Icon" />
      <Input
        id="supply-input"
        placeholder="0.00"
        value={inputValue}
        onChange={handleInputChange}
      />
      <MaxButton onClick={() => setInputValue(balance)}>MAX</MaxButton>
    </Container>
    <InputLabel htmlFor="supply-input">
      Balance: {balance} {selectedItem.name}
    </InputLabel>
    {type === "withdraw" ? (
      <GhostButton
        marginTop={45}
        disabled={balance && balance === 0}
        onClick={() => {
          onConfirm(address, inputValue, decimals);
        }}
      >
        {loading ? "Loading" : "Withdraw"}
      </GhostButton>
    ) : (
      <Button
        marginTop={24}
        color={type === "borrow" && "#FFF"}
        bgColor={type === "borrow" && "#AA00FA"}
        disabled={balance && balance === 0}
        onClick={() => onConfirm(address, inputValue, decimals, isCollateral)}
      >
        {type === "borrow" ? "BORROW" : "SUPPLY"}
      </Button>
    )}
  </InputGroup>
);
