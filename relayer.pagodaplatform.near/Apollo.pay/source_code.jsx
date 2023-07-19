State.init({
  stage: 0,
  country: "ke",
  billInfo: {},
  tillInfo: {},
  phoneInfo: {},
  senderInfo: {},
  sentToEscrow: false,
  error: false,
  success: false,
});

const ecr20abi = fetch(
  "https://raw.githubusercontent.com/corndao/aave-v3-bos-app/main/abi/ERC20Permit.json"
).body;
//const usdcAddresses = fetch("");
const usdTestAddress = "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1";
const apolloPayEscrow = "0x160d136869e86189a58864Cc40777cDD355501f5";
//const usdtAddresses = fetch("");

const Wrapper = styled.div`
  .hidden {
    display: none;
  }
 
`;

function updateStage(position) {
  State.update({ ...state, stage: position });
}

function updateCountry(country) {
  State.update({ ...state, country });
}

async function wallletRequestSendTransaction(amount) {
  const signer = Ethers.provider().getSigner();
  const sendContract = new ethers.Contract(
    usdTestAddress,
    JSON.parse(ecr20abi),
    signer
  );

  const prep = sendContract.transfer(apolloPayEscrow, 30);

  prep
    .then((value) => {
      console.log("Oh yessss!");
      console.log({
        value,
      });

      State.update({ ...state, sucess: true, stage: "5" });
      return;
    })
    .catch((error) => {
      console.log("Oh noooo!");
      console.log({
        error,
      });
      State.update({ ...state, sucess: false, stage: "6" });
    });
}

const initiatePayout = () => {};

const sender = Ethers.send("eth_requestAccounts", [])[0];

return (
  <Wrapper>
    {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}

    <div>
      <h1> Apollo Pay </h1>
      Pay for your goods and services in East Africa
      <br />
      {sender ? (
        <p>Account: {sender}</p>
      ) : (
        <Web3Connect className="web3-connect" connectLabel="Connect Wallet" />
      )}
      <div>
        <select
          name="countries"
          id=""
          onChange={(e) => updateCountry(e.target.value)}
        >
          <option value="0">--Please choose country --</option>
          <option value="Kenya">Kenya</option>
          <option value="Uganda">Uganda</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Tanzania">Tanzania</option>
        </select>

        <select
          name="paymenttype"
          id="paymenttype"
          onChange={(e) => updateStage(e.target.value)}
        >
          <option value={0}>--Please payment Type--</option>
          <option value={1}> Pay Bill</option>
          <option value={2}>Buy Goods or services</option>
          <option value={3}> Pay To Phonenumber </option>
        </select>
      </div>
    </div>
    <br />

    {state.stage == "1" && (
      <div>
        <label for="paybill">Paybill</label>
        <input id="paybill" name="paybill" type="text" required />

        <label for="accountumber">Account Number</label>
        <input id="accountnumber" name="accountnumber " type="text" required />

        <label for="Amount">Amount</label>
        <input id="amount" name="amount" type="number" required />
        <button onClick={() => updateStage("4")}> Pay </button>
      </div>
    )}

    {/* List of most utils: Water , elec , Gas Cooking, internet */}
    {state.stage == "2" && (
      <div>
        <label for="tillnumber"> Till Number</label>
        <input id="tillnumber" name="tillnumber" type="text" />

        <label for="Amount">Amount</label>
        <input id="amount" name="amount" type="number" />

        <button onClick={() => updateStage("4")}> Pay </button>
      </div>
    )}

    {state.stage == "3" && (
      <div>
        <label for="Phonenumber">Phonenumber</label>
        <input id="Phonenumber" name="Phonenumber" type="phone" required />
        <label for="Amount">Amount</label>
        <input id="amount" name="amount" type="number" />
        <button onClick={() => updateStage("4")}> Pay </button>{" "}
      </div>
    )}

    {state.stage == "4" && (
      <div>
        <button onClick={() => wallletRequestSendTransaction(20)}>
          {" "}
          Send Coin{" "}
        </button>{" "}
      </div>
    )}

    {state.stage == "5" && (
      <div>
        <h4> Sucess !! </h4>
        <input />
      </div>
    )}

    {state.stage == "6" && (
      <div>
        <h4> oops something went wrong!! </h4>
        <button>Retry</button>

        <button>Reset</button>
      </div>
    )}
  </Wrapper>
);
