const [text_input, setTextInput] = useState("");
const [state, setState] = useState(State.value);

State.init({
  testnetId: "",
  targetPath: "",
  update: (newValue) => {
    State.value = newValue;
  },
});

const testnetConfig = {
  networkId: "testnet",
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://testnet.mynearwallet.com/",
  contractName: "v1.social08.testnet", // Update contractName based on your contract
};

const testLogin = () => {
  Near.connect(testnetConfig);
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
    <p />
    <button onClick={testLogin}>Link Testnet Account</button>
    <p />
    <p>
      <b>Mainnet Account:</b> {context.accountId}
      <br />
      <b>Testnet Account:</b> {state.testnetId}
    </p>
    <hr />

    <h4>Deploy/View by Path</h4>
    <p>
      <b>Set Data:</b> Enter mainnet path to deploy on testnet.
      <br />
      <b>Get Data:</b> Enter testnet path to view data.
    </p>
    <input type="text" value={text_input} onChange={handleInputChange} />
    <button onClick={testCall}>Set Data</button>
    <button onClick={testView}>Get Data</button>
    <hr />

    <h4>Bulk Deploy</h4>
    <button onClick={testCall}>Deploy Your Entire socialDB Account</button>
    <br />
    <br />
    <p>
      <b>Deploy Subsets</b>
    </p>
    <button onClick={testCall}>Profile</button>
    <button onClick={testCall}>Widgets</button>
    <button onClick={testCall}>Types</button>

    <div>{state.targetPath}</div>
  </div>
);
