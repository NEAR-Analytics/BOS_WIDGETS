State.init({
  amount: "0.01",
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
  transition: 0.2s all;
  height: 64px;
  &:hover {
    color: #fff;
    text-decoration: none;
    background-color: rgb(107 148 255);
  }
`;

const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Nerko+One&display=swap');
    * {
      font-family: 'Inter', sans-serif;
    }

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
  box-shadow: 0 0 0 0 #fff;
  height: 48px;
  &.active {
    box-shadow: 0 0 0 4px #fff;
  }
`;

const Info = styled.div`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-top: -8px;
  margin-bottom: 24px;

`;

const CONTRACT = "0x99726c79719664f68f12274A4Ef432579891C0df";
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
      console.log("createPaymentRequest");
      peer2peer.createPaymentRequest(10, emailHash).then((tx) => {
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

    <Info>
      Make sure that you indicate the email that is linked to your Zeally
      account, at this address validators verify the payment from the buyer
    </Info>

    <div style={{ display: "flex", gap: 12 }}>
      {["0.01", "50", "100"].map((amount) => (
        <AmountButton
          className={amount == state.amount && "active"}
          onClick={() => State.update({ amount })}
        >
          {amount} DAI
        </AmountButton>
      ))}
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
