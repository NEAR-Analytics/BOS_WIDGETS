const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return "Please login first";
const signer = Ethers.provider().getSigner();

const PaymentRequest =
  "(address payable requester, uint256 amount, bytes32 zelleEmailHash, address payable executor)";
const abi = [
  "function createPaymentRequest(uint256 amount, bytes32 _zelleEmailHash) external returns (uint256)",
  `function getPaymentRequestsByIds(uint256[] memory requestIds) external view returns (${PaymentRequest}[] memory)`,
  "function reservePayment(uint256 requestId)",
  "function confirmPayment(uint256 requestId, uint256 transactionId)",
  "event PaymentReserved(uint256 requestId, address indexed reserver)",
];

const CONTRACT = "0xa3724030aA74016d1AE1e1B54bD79608F0E5866F";
const tokenAddress = "0x8c9e6c40d3402480ACE624730524fACC5482798c";
const erc20abi = ["function approve(address _spender, uint _value)"];
const erc20 = new ethers.Contract(tokenAddress, erc20abi, signer);
const peer2peer = new ethers.Contract(CONTRACT, abi, signer);
const daiDecimal = 18;

peer2peer.getPaymentRequestsByIds([props.order]).then(([data]) => {
  State.update({
    order: {
      requester: data[0],
      amount: ethers.utils.formatEther(data[1], daiDecimal),
      zelleHash: data[2],
      executor: data[3],
    },
  });
});

const handleVerify = (proof) => {
  peer2peer.confirmPayment(props.order, proof.transactionId).then((tx) => {
    tx.wait().then(() => console.log("SUCCESS!!"));
  });
};

const order = state.order;
if (!order) return "";

const Container = styled.div`
    * {
      font-family:  -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    display: flex;
    margin: 48px auto;
    justify-content: center;
    flex-direction: column;
    width: 400px;
`;

return (
  <Container>
    <h4 style={{ lineBreak: "anywhere" }}>{order.requester}</h4>
    <p style={{ marginBottom: 0 }}>{order.amount} DAI</p>

    <div style={{ marginTop: -32 }}>
      <Widget
        src="azbang.near/widget/plaid"
        props={{ onVerified: handleVerify }}
      />
    </div>
  </Container>
);
