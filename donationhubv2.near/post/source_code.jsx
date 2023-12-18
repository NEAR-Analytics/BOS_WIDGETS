const { className, title, icon, href, onClick } = props;

const { href: linkHref } = VM.require("devhub.near/widget/core.lib.url");

linkHref || (linkHref = () => {});
const PostContainer = styled.div`
    position: relative;
  display: flex;
  border: 1px solid #FFFFFF;
  background-color: #151515;
  padding: 16px;
  border-radius: 15px

  
`;

const Button = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
   display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 7px 15px;
  min-width: 6.5em;
  gap: 0.5em;
  border: 1px solid #00ec97;
  border-radius: 70px;
  background: #00ec97;
  color: #11181c;
  font-style: normal;
  font-weight: 750;
  font-size: 18px;
  text-align: center;
  white-space: nowrap;
  transition: all 0.4s ease-in-out;


  &:hover,
  &:focus,
  &:active {
    text-decoration: none;
    background: #11181c;
    border: 1px solid #11181c;
    color: #fff;

`;

const PostInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const PostText = styled.p`
  margin: 5px;
`;

const info = props.information;

State.init({
  showVoters: false,
  name: info.name,
  description: String(info.description),
  authorId: info.authorId,
  timestamp: info.timestamp,
});

let des = state.description.split("~");

function readableDate(timestamp) {
  var a = new Date(timestamp);
  return a.toDateString() + " " + a.toLocaleTimeString();
}

const timestamp = readableDate(
  state.timestamp ? state.timestamp / 1000000 : Date.now()
);

const sender = Ethers.send("eth_requestAccounts", [])[0];

const erc20Abi = fetch(
  "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
);
if (!erc20Abi.ok) {
  return "erc20Abi not ok";
}

if (state.error) {
  return (
    <div>
      Dear user, we regret to inform you that we have received an error callback
      from the API. Our team is currently investigating the issue and working on
      resolving it as soon as possible. We apologize for any inconvenience this
      may have caused and thank you for your patience while we work to address
      the problem.
    </div>
  );
}

if (!sender) return <Web3Connect connectLabel="Please Connect Your Wallet" />;

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId === 1) {
  State.update({
    chainPicked: "ETH",
    receiver: eth_address,
  });
} else if (state.chainId === 96) {
  State.update({
    chainPicked: "KUB",
    receiver: bitkub_address,
  });
} else if (state.chainId === 3501) {
  State.update({
    chainPicked: "JFIN",
    receiver: jfin_address,
  });
} else {
  return (
    <div>
      <h3>
        Wrong Network - We currently support the Ethereum, Bitkub Chain, and
        JFIN Chain exclusively. Kindly confirm that you are connected to the
        intended network before proceeding.
      </h3>
    </div>
  );
}

const chainChoice = (
  <div class="d-flex flex-column mb-2">
    <div className="col-lg-6  mb-2"></div>
    Token: <b>{state.chainPicked}</b>
    <span class="text-muted fw-normal">
      (You can change the token by changing the network)
    </span>
  </div>
);

const donateAmount = (
  <div class="d-flex flex-column mb-2">
    <div className="col-lg-6 mb-2">
      Donated amount <span class="text-muted fw-normal">(Numbers Only)</span>
      <input
        type="number"
        step="0.000001"
        value={state.donate_amount !== null ? state.donate_amount : ""}
        min={0}
        onChange={(event) => {
          const newValue = event.target.value;
          // Ensure the input is a valid number
          if (/^\d*\.?\d{0,18}$/.test(newValue)) {
            State.update({
              donate_amount: newValue,
            });
          }
        }}
      />
    </div>
  </div>
);

async function sendTokens() {
  //   const erc20 = new ethers.Contract(
  //     "0x4d224452801ACEd8B2F0aebE155379bb5D594381",
  //     erc20Abi.body,
  //     Ethers.provider().getSigner()
  //   );
  let amount = ethers.utils.parseUnits(state.donate_amount, 18);
  //   console.log("hello " + amount);
  //   erc20.transfer(state.receiver, amount);
  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: state.receiver,
      value: amount,
    })
    .then((tx) => {
      console.log("tx ", tx);
      if (state.chainId === 1) {
        State.update({ txHash: "https://etherscan.io/tx/" + tx.hash });
      } else if (state.chainId === 96) {
        State.update({ txHash: "https://www.bkcscan.com/tx/" + tx.hash });
      } else {
        State.update({ txHash: "https://www.exp.jfinchain.com/tx/" + tx.hash });
      }
    })
    .catch((error) => {
      console.log(error);
      //State.update({ error: true });
      State.update({
        errorText: "Can't make the transaction. Kindly check your balance.",
      });
    });
}

return (
  <PostContainer>
    <PostInfo>
      <h2>
        <b>{state.name}</b>
      </h2>
      <PostText>
        <b>Description:</b> {des[2]}
      </PostText>
      <PostText>{des[0]}</PostText>
      <PostText>{des[1]}</PostText>
      <PostText>
        <b>Posted By:</b> {state.authorId} · {timestamp}
      </PostText>
    </PostInfo>
    <div className="row">
      {chainChoice}
      {donateAmount}
    </div>
    <div>
      <b>{state.errorText}</b>
    </div>
    <button
      style={{
        width: "7rem",
        backgroundColor: "#0C7283",
        color: "#f3f3f3",
      }}
      className="btn btn-light mb-2 p-3"
      onClick={sendTokens}
    >
      Donate
    </button>
  </PostContainer>
);
