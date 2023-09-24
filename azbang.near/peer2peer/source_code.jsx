State.init({
  amount: 10,
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";

const Button = styled.button`
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #255ff4;
  padding: 16px;
  width: 250px;
  border-radius: 32px;
  border: none;
  text-align: center;
  font-weight: bold;
  transition: 0.2s background-color;
  height: 64px;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(107 148 255);
  }
`;

const Container = styled.div`
    display: flex;
    height: 600px;
    margin: 48px auto;
    justify-content: center;
    flex-direction: column;
    width: 400px;
    gap: 16px;

    button {
      width: 100%;
    }

    input {
      height: 56px;
    }

`;

const AmountButton = styled(Button)`
  background-color: ${(p) => (p.selected ? "green" : "#255ff4")}
`;

const CONTRACT = "0x8c9e6c40d3402480ACE624730524fACC5482798c";
const tokenAddress = "0x8c9e6c40d3402480ACE624730524fACC5482798c";
const erc20abi = ["function approve(address _spender, uint _value)"];
const abi = [
  "function createPaymentRequest(uint256 amt, bytes32 emailHash)",
  "function getPaymentRequestsByIds(uint256[] memory requestIds) external view returns (PaymentRequest[] memory)",
];

const signer = Ethers.provider().getSigner();
const erc20 = new ethers.Contract(tokenAddress, erc20abi, signer);
const peer2peer = new ethers.Contract(CONTRACT, abi, signer);
const daiDecimal = 18;

const handleCreate = () => {
  State.update({ loading: true });
  const emailHash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(state.amount));
  const amount = ethers.utils.parseUnits(state.amount.toString(), daiDecimal);

  erc20.approve(CONTRACT, 10).then((tx) => {
    tx.wait().then(() => {
      peer2peer.createPaymentRequest(amount, emailHash).then((tx) => {
        tx.wait().then(() => {
          State.update({ loading: false });
        });
      });
    });
  });
};

return (
  <Container>
    <input
      value={state.email}
      placeholder="Enter your Zelly email"
      onChange={(e) => State.update({ email: e.target.value })}
    />

    <div style={{ display: "flex", gap: 12 }}>
      <AmountButton selected onClick={() => State.update({ amount: 10 })}>
        $10
      </AmountButton>
      <AmountButton onClick={() => State.update({ amount: 50 })}>
        $50
      </AmountButton>
      <AmountButton onClick={() => State.update({ amount: 100 })}>
        $100
      </AmountButton>
    </div>

    <Button onClick={() => handleCreate()}>
      {state.loading ? (
        <Widget
          src="azbang.near/widget/dots-spinner"
          props={{
            style: {
              height: 32,
              display: "flex",
              alignItems: "center",
              margin: "auto",
            },
          }}
        />
      ) : (
        "Sell DAI"
      )}
    </Button>
  </Container>
);
