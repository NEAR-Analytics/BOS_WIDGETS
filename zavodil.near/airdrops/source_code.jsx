const airdropsDatabase = [
  {
    name: "Arbitrum airdrop",
    chainId: 42161,
    contractId: "0x67a24CE4321aB3aF51c2D0a4801c3E111D88C9d9",
    tokenId: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    abiUrl:
      "https://ipfs.near.social/ipfs/bafkreiet7gmp6qm2n7r75fo6sbv2soa52llwojy65nqyvfplpkcjumvk6m",
    gasLimit: "2000000",
    claimMethod: "claim",
    claimableTokensMethod: "claimableTokens",
  },
  {
    name: "Paraswap airdrop",
    chainId: 1,
    tokenId: "0xcafe001067cdef266afb7eb5a286dcfd277f3de5",
    gasLimit: "2000000",
    claimUrl: "https://app.paraswap.io/#/",
    claimableTokensJsonUrl:
      "https://raw.githubusercontent.com/paraswap/paraswap-rewards-snapshot/master/data/airdrop-users.json",
    claimableTokensJsonsFieldAddress: "address",
    claimableTokensJsonsFieldAmount: "earnings",
  },
];

const getAirdropId = (airdrop) => {
  // TODO
  return airdrop.name;
};

const airdrops = {};
airdropsDatabase.map((airdrop) => {
  airdrops[getAirdropId(airdrop)] = airdrop;
});

State.init({
  loginTab: "web3",
  airdrops,
  chainlistLoaded: false,
  erc20abiUrl:
    "https://ipfs.near.social/ipfs/bafkreidpdrcww6sjppxnjjgvlyk7l6k7ihbizufihoxtmzqhsxy3jj3fru",
});

const senderIdWeb3 = Ethers.send("eth_requestAccounts", [])[0];
if (
  senderIdWeb3 &&
  state.loginTab == "web3" &&
  senderIdWeb3 != state.senderId
) {
  State.update({ senderId: senderIdWeb3 });
}

const NavBar = (
  <>
    {!state.senderId && <div>Specify your address to continue:</div>}
    <div class="mb-5">
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a
            class={`nav-link ${state.loginTab == "web3" ? "active" : ""}`}
            href="#"
            onClick={() => State.update({ loginTab: "web3" })}
          >
            Login with Web3
          </a>
        </li>
        <li class="nav-item">
          <a
            class={`nav-link ${state.loginTab == "address" ? "active" : ""}`}
            onClick={() => State.update({ loginTab: "address" })}
            href="#"
          >
            Enter address
          </a>
        </li>
      </ul>

      {state.loginTab == "web3" && (
        <div class="pt-3">
          <Web3Connect />
        </div>
      )}

      {state.loginTab == "address" && (
        <div>
          <div>Enter you address:</div>
          <input
            type="text"
            class="form-control mb-2"
            value={state.loginAddress}
            onChange={(e) => {
              State.update({ loginAddress: e.target.value });
            }}
          />
          <button onClick={() => State.update({ senderId: loginAddress })}>
            Submit
          </button>
        </div>
      )}
      {state.senderId && <div>You address: {state.senderId}</div>}
    </div>
  </>
);

console.log("Ethers.provider()", Ethers.provider());
if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      State.update({
        chainId: chainIdData.chainId,
      });
    });
}

if (!state.chainlistLoaded) {
  const chainlist = Social.get(`zavodil.near/chainlist/chains/**`, "final");

  if (chainlist) {
    State.update({
      chainlistLoaded: true,
      chainlist,
    });
  }
}

const createContract = (contractId, abi, rpcUrl) => {
  return new ethers.Contract(
    contractId,
    abi,
    new ethers.providers.JsonRpcProvider(rpcUrl)
  );
};

const getClaimableTokens = (airdrop, senderId) => {
  if (airdrop.contractABI !== undefined || !airdrop.abiUrl) {
    console.log("getClaimableTokens...", airdrop.name);

    if (airdrop.claimableTokensMethod) {
      createContract(airdrop.contractId, airdrop.contractABI, airdrop.rpcUrl)
        [airdrop.claimableTokensMethod](senderId)
        .then((claimableTokensHex) => {
          console.log("claimableTokensHex", airdrop.name, claimableTokensHex);
          airdrop.claimableTokens = parseFloat(
            Big(claimableTokensHex).toFixed()
          );
          updateAirdrop(airdrop);
        });
    } else if (
      airdrop.claimableTokensJsonUrl &&
      airdrop.claimableTokensJsonsFieldAddress &&
      airdrop.claimableTokensJsonsFieldAmount &&
      airdrop.tokenDecimals
    ) {
      const data = fetch(airdrop.claimableTokensJsonUrl);

      if (data.ok) {
        const result = JSON.parse(data.body).filter(
          (item) => item[airdrop.claimableTokensJsonsFieldAddress] == senderId
        );

        airdrop.claimableTokens = result.length
          ? Big(result[0][airdrop.claimableTokensJsonsFieldAmount])
              .div(Big(10).pow(airdrop.tokenDecimals))
              .toFixed()
          : 0;
        updateAirdrop(airdrop);
      }
    }
  }
};

const getTokenSymbol = (airdrop) => {
  if (state.erc20ABI !== undefined) {
    console.log("getTokenSymbol...");

    createContract(airdrop.tokenId, state.erc20ABI, airdrop.rpcUrl)
      .symbol()
      .then((tokenSymbol) => {
        airdrop.tokenSymbol = tokenSymbol;
        updateAirdrop(airdrop);
      });
  }
};

const getTokenDecimals = (airdrop) => {
  if (state.erc20ABI !== undefined) {
    console.log("getTokenDecimals...");

    createContract(airdrop.tokenId, state.erc20ABI, airdrop.rpcUrl)
      .decimals()
      .then((tokenDecimals) => {
        airdrop.tokenDecimals = tokenDecimals;
        updateAirdrop(airdrop);
      });
  }
};

console.log("state", state, state.airdrops);

const claim = (airdrop) => {
  const contract = new ethers.Contract(
    airdrop.contractId,
    state.contractABI,
    Ethers.provider().getSigner()
  );

  if (airdrop.claimMethod) {
    contract[airdrop.claimMethod]({
      gasPrice: Ethers.provider().getFeeData(),
      gasLimit: airdrop.gasLimit,
    }).then((transactionHash) => {
      onComplete(transactionHash);
    });
  }
};

const loadAirdropABI = (airdrop) => {
  if (airdrop.abiUrl) {
    console.log("Loading ABI...");
    const abi = fetch(airdrop.abiUrl);
    if (abi.ok) {
      airdrop.contractABI = abi.body;
      updateAirdrop(airdrop);
    }
  }
};

const loadErc20ABI = (erc20abiUrl) => {
  console.log("Loading ERC20 ABI...");
  const abi = fetch(erc20abiUrl);
  if (abi.ok) {
    State.update({
      erc20ABI: abi.body,
    });
  }
};

if (state.erc20ABI === undefined) {
  loadErc20ABI(state.erc20abiUrl);
}

const updateAirdrop = (airdrop) => {
  const airdropId = getAirdropId(airdrop);
  const airdrops = state.airdrops;
  airdrops[airdropId] = { ...airdrop, ...airdrops[airdropId] };
  State.update({ airdrops });
};

// LOAD AIRDROP DATA
Object.keys(state.airdrops ?? {}).map((airdropId) => {
  const airdrop = state.airdrops[airdropId];

  const airdropChain = state.chainlist[airdrop.chainId];
  console.log("airdropChain", airdropChain);
  airdrop.networkName = airdropChain.name;
  airdrop.rpcUrl = airdropChain.rpc_url;

  if (state.chainlistLoaded && state.senderId) {
    console.log("Loading airdrop", airdrop);
    if (airdrop.contractABI === undefined && airdrop.abiUrl) {
      loadAirdropABI(airdrop);
    }

    if (airdrop.tokenSymbol == undefined && airdrop.tokenId) {
      getTokenSymbol(airdrop);
    }

    if (airdrop.tokenDecimals == undefined && airdrop.tokenId) {
      getTokenDecimals(airdrop);
    }

    if (
      airdrop.claimableTokens === undefined &&
      (airdrop.contractABI !== undefined || !airdrop.abiUrl)
    ) {
      getClaimableTokens(airdrop, state.senderId);
    }
  }
});

const airdropDetails = [];
Object.keys(state.airdrops ?? {}).map((airdropId) => {
  const airdrop = state.airdrops[airdropId];
  if (airdrop.claimableTokens !== undefined) {
    const claimButton = airdrop.claimableTokens ? (
      airdrop.claimMethod ? (
        state.chainId == airdrop.chainId ? (
          <a class="btn btn-primary" onClick={() => claim(airdrop)}>
            Claim Now
          </a>
        ) : (
          <a class="btn btn-primary" onClick={() => claim(airdrop)}>
            Switch to {airdrop.networkName}
          </a>
        )
      ) : (
        <a class="btn btn-primary" href={airdrop.claimUrl} target="_blank">
          Claim
        </a>
      )
    ) : (
      <button class="btn" disabled="disabled">
        Nothing to claim
      </button>
    );

    airdropDetails.push(
      <div class="mb-5">
        <h1>{airdrop.name}</h1>
        <div>
          ClaimableTokens: {airdrop.claimableTokens} {airdrop.tokenSymbol}
        </div>{" "}
        {claimButton}
      </div>
    );
  }
});

return (
  <>
    {NavBar}
    {airdropDetails}
  </>
);
