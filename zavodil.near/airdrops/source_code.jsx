State.init({
  chainlistLoaded: false,
  erc20abiUrl:
    "https://ipfs.near.social/ipfs/bafkreidpdrcww6sjppxnjjgvlyk7l6k7ihbizufihoxtmzqhsxy3jj3fru",
});
const airdrops = [
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
    rpcUrl: "https://arb1.arbitrum.io/rpc",
  },
];

const receiver = Ethers.send("eth_requestAccounts", [])[0];

if (!receiver) {
  return <Web3Connect />;
}

if (!chainlistLoaded) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      const chainlist = Social.get(`zavodil.near/chainlist/chains/**`, "final");
      /*
      let networkName, networkIcon;
      let chainlist = [];

      console.log(chainlistData);

      Object.keys(chainlistData).map((chainId) => {
        if (chainId == chainIdData[chainId]) {
          // current chain
          networkName = chainlistData[chainId].name;
          networkIcon = chainlistData[chainId].icon_svg;
        }
        chainlist[chainId] = chainlistData[chainId];
      });

      console.log("chainlist", chainlist);*/

      if (chainlist) {
        State.update({
          chainlistLoaded: true,
          chainlist,
          chainId: chainIdData.chainId,
        });
      }
    });
}

const airdrop = airdrops[0];
const airdropChain = state.chainlist[airdrop.chainId];

console.log("airdropChain", airdropChain);
airdrop.networkName = airdropChain.name;

const createContract = (contractId, abi, rpcUrl) => {
  return new ethers.Contract(
    contractId,
    abi,
    new ethers.providers.JsonRpcProvider(rpcUrl)
  );
};

const getClaimableTokens = (airdrop) => {
  if (state.contractABI !== undefined) {
    console.log("getClaimableTokens...");

    createContract(airdrop.contractId, state.contractABI, airdrop.rpcUrl)
      [airdrop.claimableTokensMethod](receiver)
      .then((claimableTokensHex) =>
        State.update({
          claimableTokens: parseFloat(Big(claimableTokensHex).toFixed()),
        })
      );
  }
};

const getTokenSymbol = (airdrop) => {
  if (state.erc20ABI !== undefined) {
    console.log("getTokenSymbol...");

    createContract(airdrop.tokenId, state.erc20ABI, airdrop.rpcUrl)
      .symbol()
      .then((tokenSymbol) =>
        State.update({
          tokenSymbol,
        })
      );
  }
};

console.log("state", state);

const claim = (airdrop) => {
  const contract = new ethers.Contract(
    airdrop.contractId,
    state.contractABI,
    Ethers.provider().getSigner()
  );

  contract[airdrop.claimMethod]({
    gasPrice: Ethers.provider().getFeeData(),
    gasLimit: airdrop.gasLimit,
  }).then((transactionHash) => {
    onComplete(transactionHash);
  });
};

const loadAirdropABI = (airdrop) => {
  if (airdrop.abiUrl) {
    console.log("Loading ABI...");
    const abi = fetch(airdrop.abiUrl);
    if (abi.ok) {
      State.update({
        contractABI: abi.body,
      });
    }
  }
};

const loadErc20ABI = (url) => {
  console.log("Loading ERC20 ABI...");
  const abi = fetch(url);
  if (abi.ok) {
    State.update({
      erc20ABI: abi.body,
    });
  }
};

console.log("state", state);

if (state.chainlistLoaded) {
  console.log("Loading airdrop", airdrop);
  if (state.contractABI === undefined) {
    loadAirdropABI(airdrop);
  }

  if (state.erc20ABI === undefined) {
    loadErc20ABI(state.erc20abiUrl);
  }

  if (state.tokenSymbol == undefined) {
    getTokenSymbol(airdrop);
  }

  if (state.claimableTokens === undefined && state.contractABI !== undefined) {
    getClaimableTokens(airdrop);
  } else {
    const claimButton = state.claimableTokens ? (
      state.chainId == airdrop.chainId ? (
        <a class="btn btn-primary" onClick={() => claim(airdrop)}>
          Claim
        </a>
      ) : (
        <a class="btn btn-primary" onClick={() => claim(airdrop)}>
          Switch to {airdrop.networkName}
        </a>
      )
    ) : (
      "Unable to claim"
    );
    return (
      <div>
        <h1>{airdrop.name}</h1>
        <div>
          ClaimableTokens: {state.claimableTokens} {state.tokenSymbol}
        </div>{" "}
        {claimButton}
      </div>
    );
  }
}
