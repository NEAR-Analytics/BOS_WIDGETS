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
    convertTokenDecimal: true,
    claimUrl: "https://app.paraswap.io/#/",
    claimableTokensJsonUrl:
      "https://raw.githubusercontent.com/paraswap/paraswap-rewards-snapshot/master/data/airdrop-users.json",
    claimableTokensJsonFieldAddress: "address",
    claimableTokensJsonFieldAmount: "earnings",
  },
  {
    name: "Uniswap airdrop",
    chainId: 1,
    //tokenId: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    tokenSymbol: "UNI",
    convertTokenDecimal: false,
    claimUrl: "https://app.uniswap.org/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/d883cb7187a7c4fcf98c7a62f45568e7/raw/3718c95d572a29b9c3906d7c64726d3bd7524bfd/uniswap.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "1inch airdrop",
    chainId: 1,
    //tokenId: "0x111111111117dC0aa78b770fA6A738034120C302",
    tokenSymbol: "1INCH",
    convertTokenDecimal: false,
    claimUrl: "https://1inch.exchange",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/8f41d1511bf354d7e56810188116a410/raw/87d967e86e1435aa3a9ddb97ce20531e4e52dbad/1inch.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Tornado airdrop",
    chainId: 1,
    tokenSymbol: "TORN",
    convertTokenDecimal: false,
    claimUrl: "https://tornado.cash/",
    claimableTokensCsvUrl:
      "https://raw.githubusercontent.com/tornadocash/airdrop/master/airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: false,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Cornichon airdrop",
    chainId: 1,
    //tokenId: "0xa456b515303B2Ce344E9d2601f91270f8c2Fea5E",
    tokenSymbol: "CORN",
    convertTokenDecimal: false,
    claimUrl: "https://cornichon.ape.tax/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/5199d8bc6caa3253c343cd5084489088/raw/7e9ca4c4772fc50780bfe9997e1c43525e1b7445/cornichon_airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Grain airdrop",
    chainId: 1,
    //tokenId: "0x6589fe1271A0F29346796C6bAf0cdF619e25e58e",
    tokenSymbol: "GRAIN",
    convertTokenDecimal: false,
    claimUrl: "https://claim.harvest.finance/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/08d7a5b28876741b300c944650c89280/raw/987ab4a92d5363fdbe262f639565732bd1fd3921/grain_iou.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Furucombo airdrop",
    chainId: 1,
    //tokenId: "0xfFffFffF2ba8F66D4e51811C5190992176930278",
    tokenSymbol: "COMBO",
    convertTokenDecimal: false,
    claimUrl: "https://furucombo.app/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/69612e155e8063fd6b3422d4efbf22a3/raw/b9023960ab1c478ee2620c456e208e5124115c19/furucombo_airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Lido airdrop",
    chainId: 1,
    //tokenId: "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32",
    tokenSymbol: "LDO",
    convertTokenDecimal: false,
    claimUrl: "https://lido.fi/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/57a8d65280a482fed6f3e2cc00c0e540/raw/e6ebac56c438cc8a882585c5f5bfba64eb57c424/lido_airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Curve airdrop",
    chainId: 1,
    //tokenId: "0xD533a949740bb3306d119CC777fa900bA034cd52",
    tokenSymbol: "CRV",
    convertTokenDecimal: false,
    claimUrl: "https://www.curve.fi/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/9a37e5342ddb6219a805a82bcd3d63fe/raw/71e89f0e95ea8ef5503fb1ac569447fea63f1ede/curve_airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },
  {
    name: "Convex airdrop",
    chainId: 1,
    //tokenId: "0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B",
    tokenSymbol: "CRX",
    convertTokenDecimal: false,
    claimUrl: "https://www.convexfinance.com/",
    claimableTokensCsvUrl:
      "https://gist.githubusercontent.com/LefterisJP/fd0ebccbc645f7de2b142907bd207363/raw/0613689dd5212b81788ed1a108c751b29b2ce93a/convex_airdrop.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  } /*
  {
    name: "Fox airdrop",
    chainId: 1,
    //tokenId: "0xc770EEfAd204B5180dF6a14Ee197D99d808ee52d",
    tokenSymbol: "FOX",
    convertTokenDecimal: false,
    claimUrl: "https://shapeshift.com/shapeshift-decentralize-airdrop",
    claimableTokensCsvUrl:
      "https://raw.githubusercontent.com/rotki/data/main/airdrops/shapeshift.csv",
    claimableTokensCsvIndexAddress: 0,
    claimableTokensCsvIndexAmount: 1,
    claimableTokensCsvSkipFirstLine: true,
    claimableTokensCsvSeparator: ",",
  },*/,
];

const getAirdropId = (airdrop) => {
  // TODO
  return `${airdrop.name}_${airdrop.chainId}`;
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
          <div>Enter your address:</div>
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
      {state.senderId && <div>Your address: {state.senderId}</div>}
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
      airdrop.claimableTokensJsonFieldAddress &&
      airdrop.claimableTokensJsonFieldAmount &&
      (!airdrop.convertTokenDecimal || airdrop.tokenDecimals)
    ) {
      const data = fetch(airdrop.claimableTokensJsonUrl);

      if (data.ok) {
        const result = JSON.parse(data.body).filter(
          (item) => item[airdrop.claimableTokensJsonFieldAddress] == senderId
        );

        airdrop.claimableTokens = result.length
          ? Big(result[0][airdrop.claimableTokensJsonFieldAmount])
              .div(Big(10).pow(airdrop.tokenDecimals))
              .toFixed()
          : 0;
        updateAirdrop(airdrop);
      }
    } else if (
      airdrop.claimableTokensCsvUrl &&
      airdrop.claimableTokensCsvIndexAddress !== undefined &&
      airdrop.claimableTokensCsvIndexAmount !== undefined &&
      (!airdrop.convertTokenDecimal || airdrop.tokenDecimals)
    ) {
      const data = fetch(airdrop.claimableTokensCsvUrl);

      if (data.ok) {
        function csvToArray(csv, separator) {
          const rows = csv.split("\n");
          const result = [];

          for (const row of rows) {
            const values = row.split(separator);
            result.push(values);
          }

          if (claimableTokensCsvSkipFirstLine) {
            result.shift();
          }

          return result;
        }

        const result = csvToArray(
          data.body,
          airdrop.claimableTokensCsvSeparator
        ).filter(
          (item) =>
            item[airdrop.claimableTokensCsvIndexAddress].toLowerCase() ==
            senderId.toLowerCase()
        );

        airdrop.claimableTokens = result.length
          ? airdrop.convertTokenDecimal
            ? Big(result[0][airdrop.claimableTokensCsvIndexAddress])
                .div(Big(10).pow(airdrop.tokenDecimals))
                .toFixed()
            : result[0][airdrop.claimableTokensCsvIndexAmount]
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

const airdropsToSort = Object.keys(state.airdrops).map((airdropId) => ({
  airdropId,
  // TODO parse e-9 (ex Curve)
  claimableTokens: parseFloat(state.airdrops[airdropId].claimableTokens ?? 0),
}));

const airdropsSorted = airdropsToSort.sort((a, b) => {
  return a.claimableTokens < b.claimableTokens
    ? 1
    : b.claimableTokens < a.claimableTokens
    ? -1
    : 0;
});

airdropsSorted.map((airdropsSortedItem) => {
  const airdropId = airdropsSortedItem.airdropId;
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
        <h1>
          {airdrop.name} [{airdrop.networkName}]
        </h1>
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
