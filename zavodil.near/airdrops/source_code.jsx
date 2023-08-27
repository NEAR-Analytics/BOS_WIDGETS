State.init({
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
  },
];

const receiver = Ethers.send("eth_requestAccounts", [])[0];

if (!receiver) {
  return <Web3Connect />;
}

if (!state.network) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      const chainId = chainIdData.chainId;
      const chainlistData = Social.get(
        `zavodil.near/chainlist/chains/${chainId}/**`,
        "final"
      );

      if (chainlistData.name) {
        State.update({
          network: chainlistData.name,
          icon: chainlistData.icon_svg,
        });
      }
    });
}

const airdrop = airdrops[0];

const claimableTokens = (airdrop) => {
  if (state.contractABI !== undefined) {
    const iface = new ethers.utils.Interface(state.contractABI);
    const encodedData = iface.encodeFunctionData(
      airdrop.claimableTokensMethod,
      [receiver]
    );

    Ethers.provider()
      .call({
        to: airdrop.contractId,
        data: encodedData,
      })
      .then((rawClaimableTokens) => {
        const claimableTokensHex = iface.decodeFunctionResult(
          airdrop.claimableTokensMethod,
          rawClaimableTokens
        );

        State.update({
          claimableTokens: parseFloat(Big(claimableTokensHex).toFixed()),
        });
      });
  }
};

const getTokenSymbol = (airdrop) => {
  if (state.erc20ABI !== undefined) {
    const iface = new ethers.utils.Interface(state.erc20ABI);
    const encodedData = iface.encodeFunctionData("symbol", []);

    Ethers.provider()
      .call({
        to: airdrop.tokenId,
        data: encodedData,
      })
      .then((rawData) => {
        State.update({
          tokenSymbol: iface.decodeFunctionResult("symbol", rawData),
        });
      });
  }
};

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

if (state.network) {
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
    claimableTokens(airdrop);
  } else {
    const claimButton = state.claimableTokens ? (
      <a class="btn btn-primary" onClick={() => claim(airdrop)}>
        Claim
      </a>
    ) : (
      ""
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
