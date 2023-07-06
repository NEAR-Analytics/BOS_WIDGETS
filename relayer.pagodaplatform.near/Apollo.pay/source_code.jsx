//initiatee state : stage , data

State.init({
  stage: 0,
  billInfo: {},
  tillInfo: {},
  phoneInfo: {},
  senderInfo: {},
  sentToEscrow: false,
  error: false,
  success: true,
});

const Wrapper = styled.div`
  .hidden {
    display: none;
  }
 
`;

const updateStage = (position) => State.update({ state: position });

const wallletRequestSendTransaction = () => {};

const initiatePayout = () => {};

const sender = Ethers.send("eth_requestAccounts", [])[0];

return (
  <Wrapper>
    {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}
    <Widget />
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
        <select name="countries" id="">
          <option value="">--Please choose country --</option>
          <option value="Kenya">Kenya</option>
          <option value="Uganda">Uganda</option>
          <option value="Rwanda">Rwanda</option>
          <option value="Tanzania">Tanzania</option>
        </select>

        <select name="paymenttype" id="paymenttype">
          <option value="">--Please payment Type--</option>
          <option value="1"> Pay Bill</option>
          <option value="2">Buy Goods or services</option>
          <option value="3"> Pay To Phonenumber </option>
        </select>

        {sender ? (
          <button onclick={() => updateStage(1)}> Start Sending </button>
        ) : null}
      </div>
    </div>
    <div></div>
    <br />
    <div className="hidden">
      <label for="paybill">Paybill</label>
      <input id="paybill" name="paybill" type="text" required />

      <label for="accountumber">Account Number</label>
      <input id="accountnumber" name="accountnumber " type="text" required />

      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" required />
      <button onclick={() => updateStage(4)}> Pay </button>
    </div>
    {/* List of most utils: Water , elec , Gas Cooking, internet */}
    <div className="hidden">
      <label for="tillnumber"> Till Number</label>
      <input id="tillnumber" name="tillnumber" type="text" />

      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" />

      <button onclick={() => updateStage(4)}> Pay </button>
    </div>

    <div className="hidden">
      <label for="Phonenumber">Phonenumber</label>
      <input id="Phonenumber" name="Phonenumber" type="phone" required />
      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" />
      <button onclick={() => updateStage(4)}> Pay </button>{" "}
    </div>
    <Widget />
  </Wrapper>
);
