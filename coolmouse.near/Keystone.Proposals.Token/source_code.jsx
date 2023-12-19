// constants

const abi = [
  // propose(action: uint256, amount: uint256, data: bytes, lifetime: uint256, targets: address[3])
  {
    inputs: [
      {
        name: "action",
        type: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "data",
        type: "bytes",
      },
      {
        name: "lifetime",
        type: "uint256",
      },
      {
        name: "targets",
        type: "address[3]",
      },
    ],
    name: "propose",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  // token(pos: uint256)
  {
    inputs: [
      {
        name: "pos",
        type: "uint256",
      },
    ],
    name: "token",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  // token_count()
  {
    inputs: [],
    name: "token_count",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const erc20Detailed = [
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const keystoneAddress = "0xe8E8ED169DcAFD00C3C8Cc26Df4E273b14060d4e"; // Bitkub Chain Mainnet

// states

State.init({
  action: "token-mint",
  amount: 0,
  lifetime: 172800,
  targetLabel: "Recipient address",
  tokens: [],
  tmpAmount: "",
});

// lifecycle hooks

/**
 * watchEffect(amount)
 */
if (state.amount !== null) {
  // disallow non numeric input
  /^$|^[0-9]*\.?[0-9]*$/.test(`${state.amount}`)
    ? State.update({ tmpAmount: `${amount}` })
    : State.update({ amount: parseInt(tmpAmount) });
}

/**
 * watchEffect(action)
 */
if (state.action !== null) {
  if (state.action == "token-list") {
    State.update({ targetLabel: "Unlisted ERC-20 token address" });
  } else if (state.action == "token-mint") {
    State.update({ targetLabel: "To address" });
  } else if (state.action == "token-transfer-ownership") {
    State.update({ targetLabel: "Ownership recipient address" });
  } else {
    // token-transfer
    State.update({ targetLabel: "Recipient address" });
  }
}

/**
 * onMounted
 */
if (Ethers.provider()) {
  const iface = new ethers.utils.Interface(abi);
  const encodedData = iface.encodeFunctionData("token_count", []);
  Ethers.provider()
    .call({
      to: keystoneAddress,
      data: encodedData,
    })
    .then((rawTokenCount) => {
      const countHex = iface.decodeFunctionResult("token_count", rawTokenCount);
      let tokens = [];
      const iERC20 = new ethers.utils.Interface(erc20Detailed);
      const encodedNameCall = iERC20.encodeFunctionData("name", []);
      const encodedSymbolCall = iERC20.encodeFunctionData("symbol", []);
      const encodedDecimalsCall = iERC20.encodeFunctionData("decimals", []);
      for (let i = 0; i < parseInt(countHex.toString()); i++) {
        const encodedData = iface.encodeFunctionData("token", [i]);
        Ethers.provider()
          .call({
            to: keystoneAddress,
            data: encodedData,
          })
          .then(async (rawToken) => {
            const tokenHex = iface.decodeFunctionResult("token", rawToken);
            const to = tokenHex.toString();
            const token = {
              address: to,
              decimals: await Ethers.provider().call({
                data: encodedDecimalsCall,
                to,
              }),
              name: await Ethers.provider().call({ data: encodedNameCall, to }),
              symbol: await Ethers.provider().call({
                data: encodedSymbolCall,
                to,
              }),
            };
            tokens.push(token);
          })
          .catch(console.error);
      }
      State.update({ page: tokens });
    })
    .catch(console.error);
}

// funcs
let createProposal = () => {
  let actionEnum = {
    "token-delist": 16, // 2^4
    "token-list": 32, // 2^5
    "token-mint": 512, // 2^9
    "token-renounce-ownership": 1024, // 2^10
    "token-transfer": 2048, // 2^11
    "token-transfer-ownership": 8192, // 2^14
  }[state.action];
  // fill targets
  let targets = [];
  if (
    [
      "token-delist",
      "token-mint",
      "token-renounce-ownership",
      "token-transfer",
      "token-transfer-ownership",
    ].includes(state.action)
  ) {
    targets.push(state.selectedToken);
  }
  if (
    ["token-mint", "token-transfer", "token-transfer-ownership"].includes(
      state.action
    )
  ) {
    targets.push(state.target);
  }
  for (let i = targets.length; i < 3; i++) {
    targets.push("0x" + "0".repeat(40));
  }
  // execute
  let keystone;
  try {
    keystone = new ethers.Contract(
      keystoneAddress,
      abi,
      Ethers.provider().getSigner()
    );
  } catch (err) {
    console.error("Unable to instantiate contract connection.");
    return;
  }
  keystone
    .propose(
      actionEnum,
      proposedAmount,
      "0x" + "0".repeat(64),
      state.lifetime,
      targets
    )
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    })
    .catch((err) => {
      console.error(err);
    });
};

const KeystoneContent = styled.div`
  h1, h2, h3, h4, h5 {
    margin: 0;
  }
  ol, ul, menu {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .absolute {
    position: absolute;
  }
  .breadcrumbs {
    max-width: 100%;
    overflow-x: auto;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .breadcrumbs > ul, .breadcrumbs > ol {
    display: flex;
    align-items: center;
    white-space: nowrap;
    min-height: min-content;
  }
  .breadcrumbs > ul > li, .breadcrumbs > ol > li {
    display: flex;
    align-items: center;
  }
  .breadcrumbs > ul > li + ::before, .breadcrumbs > ol > li + ::before {
    content: "";
    margin-left: 0.5rem;
    margin-right: 0.75rem;
    display: block;
    height: 0.375rem;
    width: 0.375rem;
    transform: matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0);
    opacity: 0.4;
    border-top: 1px solid;
    border-right: 1px solid;
    background-color: transparent;
  }
  .breadcrumbs > ul > li > a, .breadcrumbs > ol > li > a {
    display: flex;
    cursor: pointer;
    align-items: center;
  }
  .btn {
    display: inline-flex;
    height: 3rem;
    min-height: 3rem;
    flex-shrink: 0;
    cursor: pointer;
    user-select: none;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    border-color: transparent;
    border-color: currentColor;
    padding-left: 1rem;
    padding-right: 1rem;
    text-align: center;
    font-size: 0.875rem;
    line-height: 1em;
    gap: 0.5rem;
    font-weight: 600;
    text-decoration-line: none;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
    border-width: 1px;
    animation: button-pop 0.25s ease-out;
    transition-property: color, background-color, border-color, opacity, box-shadow, transform;
    color: currentColor;
    box-shadow: 0 0 #0000, 0 0 #0000), 0;
    outline-color: currentColor;
    background-color: currentColor;
  }
  .btn-outline {
    border-color: currentColor;
    background-color: transparent;
    box-shadow: 0 0 #0000, 0 0 #0000), 0;
  }
  .btn-secondary {
    color: oklch(0.748 0.26 342.55);
    border-color: oklch(0.748 0.26 342.55);
  }
  .glass, .glass.btn-active {
    border: none;
    backdrop-filter: blur(40px);
    background-color: transparent;
    background-image: linear-gradient(135deg, rgb(255 255 255 / 30%) 0%, rgb(0 0 0 / 0%) 100%), linear-gradient( 100deg, rgb(255 255 255 / 10%) 25%, rgb(0 0 0 / 0%) 25% );
    box-shadow: 0 0 0 1px rgb(255 255 255 / 10%) inset, 0 0 0 2px rgb(0 0 0 / 5%);
    text-shadow: 0 1px rgb(0 0 0 / 5%);
  }
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 1rem;
  }
  .card-body {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    padding: 2rem;
    gap: 0.5rem;
  }
  .card-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 600;
  }
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .ease-in-out {
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .flex {
    display: flex;
  }
  .float-right {
    float: right;
  }
  .form-control {
    display: flex;
    flex-direction: column;
  }
  .grid {
    display: grid;
  }
  .grid-flow-row-dense {
    grid-auto-flow: row dense;
  }
  .h-full {
    height: 100%;
  }
  .input {
    flex-shrink: 1;
    appearance: none;
    height: 3rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    border-radius: 0.5rem;
    border-width: 1px;
    border-color: transparent;
    background-color: oklch(0.7206 0.191 231.6) / 0.2;
  }
  .input-info {
    border-color: oklch(0.7206 0.191 231.6);
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .label {
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: space-between;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  .label-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: currentColor;
  }
  .left-12 {
    left: 3rem;
  }
  .left-51 {
    left: 11.75rem;
  }
  .left-100 {
    left: 20rem;
  }
  .max-w-7xl {
    max-width: 80rem;
  }
  .ml-4 {
    margin-left: 1rem;
  }
  .mr-2 {
    margin-right: 0.5rem;
  }
  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }
  .mx-20 {
    margin-left: 5rem;
    margin-right: 5rem;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .py-20 {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
  .pt-4 {
    padding-top: 1rem;
  }
  .text-lg {
    font-size: 1.125rem;
    line-height: 1.75rem;
  }
  .text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
  }
  .transition {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  .w-5 {
    width: 1.25rem;
  }
  .w-96 {
    width: 24rem;
  }
  .w-full {
    width: 100%;
  }
`;

return (
  <>
    <Widget src="coolmouse.near/widget/Keystone.Navbar" />
    <KeystoneContent>
      <div className="overflow-x-auto mx-20 pt-4">
        <div className="text-lg breadcrumbs">
          <ul>
            <li>
              <Link href={"/coolmouse.near/widget/Keystone.Index"}> Home </Link>
            </li>
            <li>
              <Link href={"/coolmouse.near/widget/Keystone.Proposals.Index"}>
                {" "}
                Proposals{" "}
              </Link>
            </li>
            <li>
              <svg
                className="h-full w-5 mr-2"
                clipRule="evenodd"
                fill="currentColor"
                fillRule="evenodd"
                height="16px"
                version="1.1"
                viewBox="0 0 16 16"
                width="16px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
                    M5.791 3.318
                    L3.316 5.793
                    a1 1 0 000 1.414
                    l2.475 2.475
                    a1 1 0 001.415 0
                    L9.68 7.207
                    a1 1 0 000-1.414
                    L7.206 3.318
                    a1 1 0 00-1.415 0z
                    m.707 4.95
                    L4.731 6.5
                    l1.767-1.768
                    L8.266 6.5 6.498 8.268z
                  "
                />
                <path
                  d="
                    M0 6.5
                    a6.5 6.5 0 0112.346-2.845 6.5 6.5 0 11-8.691 8.691
                    A6.5 6.5 0 010 6.5z
                    m6.5-5
                    a5 5 0 100 10 5 5 0 000-10z
                    m6.5 5
                    c0-.201-.01-.4-.027-.597
                    a5 5 0 11-7.07 7.07
                    A6.5 6.5 0 0013 6.5z
                  "
                />
              </svg>
              Create a token proposal
            </li>
          </ul>
        </div>
        <div className="grid grid-flow-row-dense py-20">
          <div className="col-span-1"></div>
          <div className="col-span-2">
            <div className="card w-96 glass mx-auto">
              <div className="card-body">
                <h2 className="card-title">Create a token proposal</h2>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Select action</span>
                  </label>
                  <select
                    aria-label="Select proposal action"
                    className="input input-bordered input-info max-w-xsrounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    onChange={(event) =>
                      State.update({ action: event.target.value })
                    }
                  >
                    <option value="token-mint">Mint token to</option>
                    <option value="token-transfer">
                      Withdraw token from controller
                    </option>
                    <option value="token-transfer-ownership">
                      Transfer token ownership
                    </option>
                    <option value="token-renounce-ownership">
                      Renounce token ownership
                    </option>
                    <option value="token-delist">Delist token</option>
                    <option value="token-list">Enlist new token</option>
                  </select>
                </div>
                {!!state.action &&
                  [
                    "token-delist",
                    "token-mint",
                    "token-renounce-ownership",
                    "token-transfer",
                    "token-transfer-ownership",
                  ].includes(state.action) && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Select token</span>
                      </label>
                      <select
                        aria-label="Select token"
                        className="input input-bordered input-info"
                        onChange={(event) =>
                          State.update({ selectedToken: event.target.value })
                        }
                        value={state.selectedToken}
                      >
                        {state.tokens.map((token) => (
                          <option key={token.symbol} value={token.address}>
                            {token.name} ({token.symbol})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                {!!state.action &&
                  [
                    "token-list",
                    "token-mint",
                    "token-transfer",
                    "token-transfer-ownership",
                  ].includes(state.action) && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">{state.targetLabel}</span>
                      </label>
                      <input
                        className="input input-bordered input-info w-full"
                        onChange={(event) =>
                          State.update({ target: event.target.value })
                        }
                        placeholder="Address"
                        type="text"
                        value={state.target}
                      />
                    </div>
                  )}
                {!!state.action &&
                  ["token-mint", "token-transfer"].includes(state.action) && (
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Amount</span>
                      </label>
                      <input
                        type="text"
                        min="0"
                        step="10000"
                        onChange={(event) => {
                          State.update({ amount: event.target.value });
                        }}
                        placeholder="Amount"
                        className="input input-bordered input-info w-full"
                        value={state.amount}
                      />
                    </div>
                  )}
                {!!state.action && (
                  <div className="form-control" v-if="!!action">
                    <label className="label">
                      <span className="label-text">Time until expiry</span>
                    </label>
                    <input
                      className="range range-secondary"
                      type="range"
                      min="0"
                      max="172800"
                      onChange={(event) =>
                        State.update({ lifetime: parseInt(event.target.value) })
                      }
                      step="21600"
                      value={state.lifetime}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                      <span>
                        0<label className="absolute ml-4 left-12">day</label>
                      </span>
                      <span>|</span>
                      <span>
                        1<label className="absolute ml-4 left-51">day</label>
                      </span>
                      <span>|</span>
                      <span>
                        2
                        <label className="absolute ml-4 left-100"> days </label>
                      </span>
                    </div>
                  </div>
                )}
                <div className="text-align-center justify-center">
                  <button
                    className="btn btn-secondary btn-outline float-right"
                    onClick={createProposal}
                  >
                    Create proposal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </KeystoneContent>
  </>
);
