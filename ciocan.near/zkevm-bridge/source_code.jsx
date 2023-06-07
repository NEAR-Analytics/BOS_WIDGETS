const Container = styled.div`
  display: flex;
  gap: 8px;

  .side {
    margin-top: 20px;
  }
`;

const tokens = [
  // eth testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 5,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x4701Aa9471d7bfAc765D87dcb1Ea6BB23AD32733",
    chainId: 5,
    symbol: "MATIC",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  {
    address: "0xd35cceead182dcee0f148ebac9447da2c4d449c4",
    chainId: 5,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    address: "0xD7E55eB808693D5Ff81a3391c59886C7E0449f35",
    chainId: 5,
    symbol: "DAI",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/9956/small/4943.png",
  },
  {
    address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    chainId: 5,
    symbol: "UNI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  },
  // eth mainnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    chainId: 1,
    symbol: "MATIC",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  {
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    chainId: 1,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    symbol: "DAI",
    decimals: 18,
    chainId: 1,
    logoURI: "https://assets.coingecko.com/coins/images/9956/small/4943.png",
  },
  {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    chainId: 1,
    symbol: "USDT",
    decimals: 6,
    logoURI: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  },
  {
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    chainId: 1,
    symbol: "WBTC",
    decimals: 8,
    logoURI:
      "https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png",
  },
  // zkevm testnet assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1442,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0x8Ba0a934ef4C24e475C78072cCa3Ed306c1aBaDD",
    chainId: 1442,
    symbol: "USDC",
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
  {
    address: "0x378588D64A464d61c646e5e86F4DA5277e65802C",
    chainId: 1442,
    symbol: "UNI",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png",
  },
  // zkevm assets
  {
    address: "0x0000000000000000000000000000000000000000",
    chainId: 1101,
    symbol: "ETH",
    decimals: 18,
    logoURI: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
  },
  {
    address: "0xa2036f0538221a77A3937F1379699f44945018d0",
    chainId: 1101,
    symbol: "MATIC",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png",
  },
  {
    address: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
    chainId: 1101,
    symbol: "USDC",
    decimals: 18,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];

const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

const { chainId, isContractAllowedToSpendToken } = state;
const isMainnet = chainId === 1 || chainId === 1101;

const BRIDGE_CONTRACT_ADDRESS = isMainnet
  ? "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe"
  : "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

const bridgeAbi = [
  {
    inputs: [
      { internalType: "uint32", name: "destinationNetwork", type: "uint32" },
      { internalType: "address", name: "destinationAddress", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "token", type: "address" },
      { internalType: "bool", name: "forceUpdateGlobalExitRoot", type: "bool" },
      { internalType: "bytes", name: "permitData", type: "bytes" },
    ],
    name: "bridgeAsset",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });
}

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const handleBridge = (props) => {
  const { amount, token, network } = props;
  const networkId = network === "ethereum" ? 1 : 0;

  const amountBig = ethers.utils.parseUnits(amount, token.decimals);
  const permitData = "0x";

  console.log(amountBig);

  const encodedData = bridgeIface.encodeFunctionData(
    "bridgeAsset(uint32,address,uint256,address,bool,bytes)",
    [networkId, sender, amountBig, token.address, true, permitData]
  );

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: BRIDGE_CONTRACT_ADDRESS,
      data: encodedData,
      value: amountBig,
      gasLimit: ethers.BigNumber.from("500000"),
    })
    .then((tx) => {
      consle.log("tx:", tx);
    })
    .catch((e) => {
      console.log("bridge error:", e);
    });
};

const setName = (token) => {
  const abi = ["function name() external view returns (string)"];
  const erc20contract = new ethers.Contract(
    token.address,
    abi,
    Ethers.provider()
  );
  erc20contract
    .name()
    .then((name) => {
      State.update({ name });
    })
    .catch((e) => {
      console.log("name error", e);
    });
};

const setIsContractAllowedToSpendToken = ({ token, amount }) => {
  if (!amount) return;
  const abi = [
    "function allowance(address owner, address spender) external view returns (uint256)",
  ];
  const erc20contract = new ethers.Contract(
    token.address,
    abi,
    Ethers.provider()
  );

  erc20contract
    .allowance(sender, BRIDGE_CONTRACT_ADDRESS)
    .then((data) => {
      const allowance = Number(ethers.utils.formatUnits(data, token.decimals));
      State.update({
        isContractAllowedToSpendToken: allowance >= Number(amount),
      });
    })
    .catch((e) => {
      console.log("setIsContractAllowedToSpendToken", e);
    });
};

const approve = (props) => {
  const { token, network, amount } = props;
  if (isContractAllowedToSpendToken) return;

  const abi = [
    "function approve(address spender, uint256 amount) external returns (bool)",
  ];
  const erc20contract = new ethers.Contract(
    token.address,
    abi,
    Ethers.provider().getSigner()
  );

  return erc20contract.approve(
    BRIDGE_CONTRACT_ADDRESS,
    ethers.BigNumber.from(MAX_AMOUNT)
  );
};

const setNonce = (props) => {
  console.log("setNonce", props);
  const { token } = props;
  const signer = Ethers.provider().getSigner();

  const abi = [
    "function nonces(address owner) external view returns (uint256)",
  ];
  const erc20contract = new ethers.Contract(
    token.address,
    abi,
    Ethers.provider()
  );

  erc20contract
    .nonces(sender)
    .then((nonce) => {
      console.log("nonce", nonce);
    })
    .catch((e) => {
      console.log("setNonce err:", e);
    });
};

const handlePermit = (props) => {
  /*
  const signature = signer._signTypedData(domain, types, values);
  const { r, s, v } = splitSignature(signature);
  return erc20Contract.interface.encodeFunctionData("permit", [
    account,
    spender,
    value,
    MaxUint256,
    v,
    r,
    s,
  ]);
  */
};

const onConfirm = (props) => {
  // handlePermit(props);return;
  const { token, network, amount } = props;
  if (token.symbol !== "ETH" && network === "ethereum") {
    approve(props)
      .then((tx) => {
        console.log("approve", tx);
        handlePermit(props);
        // tx.wait()
        //   .then((data) => {
        //     cnsole.log("tx data", data);
        //   })
        //   .catch((err) => {
        //     console.log("tx err", err);
        //   });
      })
      .catch((e) => {
        console.log("approve err", e);
      });
  } else {
    handleBridge(props);
  }
};

const onChangeAmount = (props) => {
  console.log("onChangeAmount", props);
  setIsContractAllowedToSpendToken(props);
};

const onUpdateToken = (props) => {
  console.log("onUpdateToken", props);
  setIsContractAllowedToSpendToken(props);
  setName(props.token);
  setNonce(props);
};

if (!sender) {
  return <Web3Connect connectLabel="Connect ETH Wallet" />;
}

console.log(state);

return (
  <Container>
    <Widget
      src="ciocan.near/widget/zkevm-bridge-ui"
      props={{ onConfirm, onUpdateToken, onChangeAmount, tokens }}
    />
    <div class="side">
      <Widget
        src="ciocan.near/widget/zkevm-bridge-transactions"
        props={{ tokens }}
      />
    </div>
  </Container>
);
