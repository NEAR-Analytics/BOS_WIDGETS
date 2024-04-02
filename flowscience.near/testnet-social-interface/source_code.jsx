const [text_input, setTextInput] = useState("");
const [state, setState] = useState(State.value);

State.init({
  value: "",
  update: (newValue) => {
    State.value = newValue;
  },
});

const testLogin = () => {
  Near.login();
};

const testCall = () => {
  Near.call("v1.social08.testnet", "set", {
    data: { text_input },
  });
};

const testView = () => {
  Near.view("v1.social08.testnet", "get")
    .then((result) => {
      State.update(result);
      setState(result);
    })
    .catch((error) => {
      console.error("Error getting data:", error);
    });
};

const handleInputChange = (event) => {
  setTextInput(event.target.value);
};

return (
  <div>
    <h2>socialDB Testnet Interface</h2>
    <i>Note: this component isn't calling the testnet contract properly yet.</i>
    <button onClick={testLogin}>Login to Testnet</button>
    <hr />

    <h5>Deploy/View by Path</h5>
    <p>
      <b>Set Data:</b> Enter mainnet path to deploy on testnet.
      <br />
      <b>Get Data:</b> Enter testnet path to view data.
    </p>
    <input type="text" value={text_input} onChange={handleInputChange} />
    <button onClick={testCall}>Set Data</button>
    <button onClick={testView}>Get Data</button>
    <hr />

    <h5>Bulk Deploy</h5>
    <p>
      <b>Your Mainnet Account:</b> {context.accountId}
    </p>
    <button onClick={testCall}>Deploy Your Entire socialDB Account</button>
    <br />
    <br />
    <p>Subsets</p>
    <button onClick={testCall}>Profile</button>
    <button onClick={testCall}>Widgets</button>
    <button onClick={testCall}>Types</button>

    <div>{state.value}</div>
  </div>
);
