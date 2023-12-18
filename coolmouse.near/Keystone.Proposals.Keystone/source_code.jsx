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
];
const keystoneAddress = "0xe8E8ED169DcAFD00C3C8Cc26Df4E273b14060d4e"; // Bitkub Chain Mainnet

// states

State.init({
  action: "add-signer",
  lifetime: 172800,
  targetLabel: "Recipient address",
  name: "",
  symbol: "",
});

if (state.action !== null) {
  if (state.action == "add-signer") {
    State.update({ targetLabel: "New signer address" });
  } else if (state.action == "remove-signer") {
    State.update({ targetLabel: "Existing signer address" });
  } else if (state.action == "set-blueprint") {
    State.update({ targetLabel: "New ERC-20 token template address" });
  }
}

// funcs

let createProposal = () => {
  let actionEnum = {
    "add-signer": 1, // 2^0
    "deploy-token": 2, // 2^1
    "remove-signer": 4, // 2^2
    "set-blueprint": 8, // 2^3
  }[state.action];
  // derive proposal data from given fields
  let data = "";
  if (state.action != "deploy-token") {
    data += "0x" + "0".repeat(64);
  } else {
    data += ethers.utils.defaultAbiCoder.encode(
      ["bytes32", "bytes32"],
      [state.name, state.symbol]
    );
  }
  // fill targets
  let targets = [];
  if (["add-signer", "remove-signer", "set-blueprint"].includes(state.action)) {
    targets.push(target);
  }
  for (let i = targets.length; i < 3; i++) {
    targets.push("0x" + "0".repeat(40));
  }
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
    .propose(actionEnum, 0, data, state.lifetime, targets)
    .then((transactionHash) => {
      console.log("transactionHash is " + transactionHash);
    })
    .catch((err) => {
      console.error(err);
    });
};

// styles
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
                fill="currentColor"
                height="24px"
                version="1.1"
                viewBox="0 0 24 24"
                width="24px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="
                    M22.3,16.7
                    l1.4-1.4
                    L20,11.6l-5.8,5.8
                    c-0.5-0.3-1.1-0.4-1.7-0.4
                    C10.6,17,9,18.6,9,20.5
                    s1.6,3.5,3.5,3.5
                    s3.5-1.6,3.5-3.5
                    c0-0.6-0.2-1.2-0.4-1.7
                    l1.9-1.9
                    l2.3,2.3
                    l1.4-1.4
                    l-2.3-2.3
                    l1.1-1.1
                    L22.3,16.7z
                    M12.5,22
                    c-0.8,0-1.5-0.7-1.5-1.5
                    s0.7-1.5,1.5-1.5
                    s1.5,0.7,1.5,1.5
                    S13.3,22,12.5,22z
                  "
                />
                <path
                  d="
                    M2,19
                    c0-3.9,3.1-7,7-7
                    c2,0,3.9,0.9,5.3,2.4
                    l1.5-1.3
                    c-0.9-1-1.9-1.8-3.1-2.3
                    C14.1,9.7,15,7.9,15,6
                    c0-3.3-2.7-6-6-6
                    S3,2.7,3,6
                    c0,1.9,0.9,3.7,2.4,4.8
                    C2.2,12.2,0,15.3,0,19
                    v5
                    h8
                    v-2
                    H2
                    V19z
                    M5,6
                    c0-2.2,1.8-4,4-4
                    s4,1.8,4,4
                    s-1.8,4-4,4
                    S5,8.2,5,6z
                  "
                />
              </svg>
              Create a keystone proposal
            </li>
          </ul>
        </div>
        <div className="grid grid-flow-row-dense md:grid-cols-4 sm:grid-cols-2 py-20">
          <div className="md:col-span-1 sm:col-span-0"></div>
          <div className="col-span-2">
            <div className="card w-96 glass mx-auto">
              <div className="card-body">
                <h2 className="card-title">Create a keystone proposal</h2>
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
                    value={state.action}
                  >
                    <option value="add-signer">Add new signer</option>
                    <option value="remove-signer">Remove signer</option>
                    <option value="deploy-token">
                      Deploy new ERC-20 token
                    </option>
                    <option value="set-blueprint">
                      Set new ERC-20 token template
                    </option>
                  </select>
                </div>
                {["add-signer", "remove-signer", "set-blueprint"].includes(
                  state.action
                ) && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">{state.targetLabel}</span>
                    </label>
                    <input
                      v-model="target"
                      type="text"
                      placeholder="Address"
                      className="input input-bordered input-info w-full max-w-xs"
                    />
                  </div>
                )}
                {state.action == "deploy-token" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      className="input input-bordered input-info w-full max-w-xs"
                      onChange={(event) =>
                        State.update({ name: event.target.value })
                      }
                      placeholder="New token name"
                      type="text"
                      value={state.name}
                    />
                  </div>
                )}
                {state.action == "deploy-token" && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Symbol</span>
                    </label>
                    <input
                      className="input input-bordered input-info w-full max-w-xs"
                      minLength={3}
                      maxLength={5}
                      onChange={(event) =>
                        State.update({ symbol: event.target.value })
                      }
                      placeholder="New token symbol"
                      type="text"
                      value={state.symbol}
                    />
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Decimals</span>
                      </label>
                      <input
                        disabled
                        type="number"
                        value="18"
                        placeholder="Decimals"
                        className="input input-bordered input-info w-full max-w-xs"
                      />
                    </div>
                  </div>
                )}
                {!!state.action && (
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Time until expiry</span>
                    </label>
                    <input
                      className="range range-secondary"
                      max="172800"
                      min="0"
                      onChange={(event) =>
                        State.update({ lifetime: Big(event.target.value) })
                      }
                      step="21600"
                      type="range"
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
                {!!state.action && (
                  <div className="form-control">
                    <button
                      className="btn btn-secondary btn-outline"
                      onClick={createProposal}
                    >
                      Create proposal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </KeystoneContent>
  </>
);
