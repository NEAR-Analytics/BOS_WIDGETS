// Use ERC-1155 instead of 721 // scottie.near/widget/ERC1155_Minter

// Update design with components from multiminter

const accountId = "opencann.near";

const auroraCOntract = "to be deployed...";
const opContract = "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07";
const goerliContract = "0x822F17A9A5EeCFd66dBAFf7946a8071C265D1d07";
const nearContract = "";

const mintSingle = [
  "function mint(address to, uint256 id, uint256 amount, string memory uri, bytes memory data) public {}",
];

// FETCH HYPERCERTS ABI

const tokenDecimals = 18;

const hypercertsAbi = fetch(
  "https://github.com/Open-Cann/hyperplex/blob/main/graph/abis/HypercertMinter.json"
);

// if (!hypercertsAbi.ok) { return "Loading"; }

//const hypercertsiface = new ethers.utils.Interface(hypercertsAbi.body);

//let accountId = context.accountId;
const contractAddresses = {
  1313161554: [auroraCOntract, "Aurora"],
  10: [opContract, "Optimism"],
  5: [goerliContract, "Goerli"],
  0: [nearContract, "Near"],
};
const chains = [
  {
    id: "1313161554",
    name: "Aurora",
  },
  {
    id: "10",
    name: "Optimism",
  },
  {
    id: "5",
    name: "Goerli Testnet",
  },
  {
    id: "0",
    name: "Near",
  },
];

const handleMint = () => {
  console.log("it's here", state.title && state.description && state.image.cid);
  if (!(state.title && state.description && state.image.cid)) {
    return;
  }
  if (state.selectedChain == "0") {
    const gas = 200000000000000;
    const deposit = 10000000000000000000000;
    const metadata = {
      name: state.title,
      description: state.description,
      properties: [],
      image: `ipfs://${state.image.cid}`,
    };
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: metadata,
    }).then((res) => {
      const cid = res.body.cid;
      const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
      console.log("in the promise", res, Id);
      Near.call([
        {
          contractName: "genadrop-contract.nftgen.near",
          methodName: "nft_mint",
          args: {
            token_id: `${Date.now()}`,
            metadata: {
              title: state.title,
              description: state.description,
              media: `https://ipfs.io/ipfs/${state.image.cid}`,
              reference: `ipfs://${cid}`,
            },
            receiver_id: accountId,
          },
          gas: gas,
          deposit: deposit,
        },
      ]);
    });
    return;
  }
  console.log("passed checks");
  let networkId = Ethers.provider()._network.chainId;

  const CA = contractAddresses[state.selectedChain[0] || "137"];

  const contract = new ethers.Contract(
    CA,
    mintSingle,
    Ethers.provider().getSigner()
  );
  const metadata = {
    name: state.title,
    description: state.description,
    properties: [],
    image: `ipfs://${state.image.cid}`,
  };
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: metadata,
  }).then((res) => {
    const cid = res.body.cid;
    const Id = Math.floor(Math.random() * (9999999 - 100000 + 1) + 100000);
    console.log("in the promise", res, Id);
    contract
      .mint(state.sender, Id, 1, `ipfs://${cid}`, "0x")
      .then((transactionHash) => transactionHash.wait())
      .then((ricit) => {
        console.log("receipt::", ricit);
      });
  });
};
if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  console.log("accounts:", accounts, Ethers.provider(), ethers);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    Ethers.provider()
      .getNetwork()
      .then((data) => {
        State.update({
          selectedChain: data.chainId,
        });
      });
  }

  if (accountId) {
    State.update({ sender: accountId });
    State.update({
      selectedChain: "0",
    });
  }
}
State.init({
  title: "",
  description: "",
});
const onChangeTitle = (title) => {
  State.update({
    title,
  });
};

const handleChainChange = (event) => {
  console.log(
    "get what we doing:",
    event.target.value,
    event.target.value == "0",
    !accountId
  );
  if (event.target.value == "0") {
    if (!accountId) {
      console.log("not what we thought,:", accountId);
      return;
    }
    State.update({
      selectedChain: event.target.value,
    });
  }
  Ethers.send("wallet_switchEthereumChain", [
    {
      chainId: "0x" + Number(event.target.value).toString(16),
    },
  ]).then((data) => console.log("done!!!", data));
  console.log("what happens after");
  State.update({
    selectedChain: event.target.value,
  });
  console.log("afters", state.selectedChain);
};

const onChangeDesc = (description) => {
  console.log("Log ciritcal critics:", state.selectedChain, state.title);
  State.update({
    description,
  });
};
// if (state.sender === undefined) {
//   console.log("of course it's undefined", ethers);
//   const accounts = Ethers.send("eth_requestAccounts", []);
//   console.log("account", accounts);
//   if (accounts.length) {
//     State.update({ sender: accounts[0] });
//     console.log("set sender", accounts[0]);
//   }
// }

return (
  <div>
    <h2>Mint a Hypercert</h2>
    <div>
      Hypercerts are a type of impact certificate that recognizes real-world
      impact by minting a formal attestation on-chain.
    </div>
    <hr></hr>
    <div>
      <h5>Title:</h5>
      <input type="text" onChange={(e) => onChangeTitle(e.target.value)} />
    </div>
    <div>
      <h5>Description:</h5>
      <input type="text" onChange={(e) => onChangeDesc(e.target.value)} />
    </div>
    <h5>Image:</h5>
    <div className="flex-grow-1">
      <IpfsImageUpload
        image={state.image}
        className="btn btn-outline-secondary border-0 rounded-3"
      />
    </div>
    <div>
      {state.image.cid && (
        <div className="mt-3">
          <h5>Preview:</h5>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="Preview"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
    <div>
      {state.sender && Ethers.provider() ? (
        <div className="form-group">
          <label htmlFor="chainSelect">Select Chain</label>
          <select
            className="form-control"
            value={state.selectedChain}
            onChange={handleChainChange}
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleMint}
          >
            Mint to {contractAddresses[state.selectedChain][1]}
          </button>
        </div>
      ) : state.sender ? (
        <div className="form-group">
          <label htmlFor="chainSelect">Select Chain</label>
          <select
            className="form-control"
            value={state.selectedChain}
            onChange={handleChainChange}
          >
            {chains.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleMint}
          >
            Mint to {contractAddresses[state.selectedChain][1]}
          </button>
          <div>
            <Web3Connect
              className="btn mt-3"
              connectLabel="Connect with Ethereum Wallet"
            />
          </div>
        </div>
      ) : (
        <Web3Connect className="btn mt-3" connectLabel="Connect with Wallet" />
      )}
    </div>
    <h4 className="text-center mt-5">
      Made with 💧
      <a href="https://genadrop.io" target="_blank" rel="noopener noreferrer">
        GenaDrop
      </a>
      <Widget
        src="miraclx.near/widget/Attribution"
        props={{ authors: [ownerId], dep: true }}
      />
    </h4>
  </div>
);
