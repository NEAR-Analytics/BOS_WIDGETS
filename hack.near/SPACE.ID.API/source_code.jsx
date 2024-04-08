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
if (state.chainId !== undefined && state.chainId !== 42161) {
  return (
    <div>
      <p>Please switch to Arbitrum One network :)</p>
    </div>
  );
}

const [address, setAddress] = useState("");
const [domain, setDomain] = useState("");

const data = fetch(
  `https://api.prd.space.id/v1/getAddress?tld=arb1&domain=${domain}`
);

const name = fetch(
  `https://api.prd.space.id/v1/getName?tld=arb1&address=${address}`
);

const css = `
  button,
  button:disabled,
  button[disabled] {
    background: rgb(30, 239, 164);
    color: black;
    border: none;
    font-weight: bold;
    &:hover {
      border: rgb(30, 239, 164);
      background: rgb(16, 204, 137);
      color: black;
    }
  }
  button:disabled,
  button[disabled]{
    background: rgb(16, 204, 137, 0.5);
  }
  .main {
    padding: 23px;
    margin: auto;
    width: 100%;
    max-width: 1000px;
    text-align: left;
    position: relative;
    background: black;
    border-radius: 19px;
    color: rgb(199, 210, 215);
  }
`;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    box-sizing: border-box;
    font-family: Sans-Serif;
    ${css}`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <div class="main">
      <div className="d-flex flex-row justify-content-between">
        <div className="m-1">
          <h2>
            <b>SPACE ID</b>
          </h2>
          <h5>
            <b>Browse .arb profiles:</b>
          </h5>
          <p>
            <i style={{ fontFamily: "Courier" }}>https://api.prd.space.id/v1</i>
          </p>
        </div>
        <div className="m-2">
          <Web3Connect connectLabel="Connect" disconnectLabel="Disconnect" />
        </div>
      </div>
      <div className="m-1">
        <h5 className="mb-2">Domain</h5>
        <input
          type="text"
          placeholder="example.arb"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
      </div>
      <div className="m-1 mt-3">
        <h5 className="mb-2">Address</h5>
        <input
          type="text"
          placeholder="0x0000000000000000000000000000000000000000"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="m-2 mt-3">
        <p>
          {data.body.address !== "0x0000000000000000000000000000000000000000" &&
            data.body.code === 0 &&
            data.body.address}
        </p>
      </div>
      <div className="m-2 mt-3">
        <p>{name.body.name && JSON.stringify(name)}</p>
      </div>
    </div>
  </Theme>
);
