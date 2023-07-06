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

const walletRequestConection = () => console.log("test button");

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
        <button type="button" onclick={walletRequestConection}>
          {" "}
          connect wallet{" "}
        </button>
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
          <option value="Kenya"> Pay Bill</option>
          <option value="Uganda">Buy Goods or services</option>
          <option value="Rwanda"> Pay To Phonenumber </option>
        </select>

        {sender ? <Button> Start Sending </Button> : null}
      </div>
    </div>
    <div></div>
    <br />
    <div className="hidden">
      {/*  Paybill */}
      <label for="paybill">Paybill</label>
      <input id="paybill" name="paybill" type="text" required />
      {/* acc  number  */}
      <label for="accountumber">Account Number</label>
      <input id="accountnumber" name="accountnumber " type="text" required />
      {/* Amount  */}
      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" required />
      <button> Pay </button>
    </div>
    {/* List of most utils: Water , elec , Gas Cooking, internet */}
    <div className="hidden">
      {/*  Till number */}
      <label for="tillnumber"> Till Number</label>
      <input id="tillnumber" name="tillnumber" type="text" />

      {/* Amount  */}
      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" />

      <button> Pay </button>
    </div>

    <div className="hidden">
      {/*  Phonenumber */}
      <label for="Phonenumber">Phonenumber</label>
      <input id="Phonenumber" name="Phonenumber" type="phone" required />
      {/* acc  number  */}
      <label for="Amount">Amount</label>
      <input id="amount" name="amount" type="number" />
      <button> Pay </button>{" "}
    </div>
    <Widget />
  </Wrapper>
);
