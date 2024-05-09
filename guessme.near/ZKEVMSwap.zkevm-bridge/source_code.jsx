const { layout, from } = props;

const Container = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  /* position: fixed; */
  align-items: center;

  z-index: 0;
  width: 100%;
`;
const ThemeContainer = styled.div`
  --button-color: rgb(121, 79, 221);
  --button-text-color: #fff;
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) {
  return (
    <ThemeContainer>
      {" "}
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          chainId: 1101,
          chainName: "Polygon zkEVM",
          noAccountTips: "Polygon zkEVM-Ethereum Bridge",
          isWrongNetwork: false,
        }}
      />
    </ThemeContainer>
  );
}

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
    decimals: 6,
    logoURI:
      "https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png",
  },
];

const MAX_AMOUNT =
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

useEffect(() => {
  State.init({
    gasLimit: ethers.BigNumber.from("300000"),
    add: false,
    onChangeAdd: (add) => {
      State.update({ add });
    },
    hide: true,
  });
}, []);

const { chainId, name, isContractAllowedToSpendToken } = state;
const isMainnet = chainId === 1 || chainId === 1101;

const BRIDGE_CONTRACT_ADDRESS = isMainnet
  ? "0x2a3DD3EB832aF982ec71669E178424b10Dca2EDe"
  : "0xF6BEEeBB578e214CA9E23B0e9683454Ff88Ed2A7";

const provider = Ethers.provider();

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

useEffect(() => {
  if (!sender) return;
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    })
    .catch((e) => {});
}, [sender]);

if (state.chainId !== 1 && state.chainId !== 1101) {
  return (
    <ThemeContainer>
      {" "}
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          chainId: 1101,
          chainName: "Polygon zkEVM",
          wrongNetworkTips: "To proceed, kindly switch to Polygon zkEVM Chain.",
          isWrongNetwork: true,
        }}
      />
    </ThemeContainer>
  );
}

const bridgeIface = new ethers.utils.Interface(bridgeAbi);

const updateGasLimit = (params) => {
  const { amount, token, network } = params;
  if (network !== "ethereum") return;
  const amountBig = ethers.utils.parseUnits(
    Big(amount).toString(),
    token.decimals
  );

  const bridgeContract = new ethers.Contract(
    BRIDGE_CONTRACT_ADDRESS,
    bridgeAbi,
    Ethers.provider().getSigner()
  );
  bridgeContract.estimateGas
    .bridgeAsset(1, sender, amountBig, token.address, true, "0x")
    .then((data) => {
      console.log("gasLimit", data);
    })
    .catch((e) => {
      console.log("gasLimit error", e);
    });
};

const handleBridge = (params) => {
  console.log("handleBridge", params);
  const { amount, token, network, permit } = params;
  const chainNames =
    chainId === 1
      ? ["Ethereum", "Polygon zkEVM"]
      : ["Polygon zkEVM", "Ethereum"];
  const toastText = `Bridge ${amount} ${token.symbol} from ${chainNames[0]} to ${chainNames[1]}`;

  const toastId = props.toast?.loading({
    title: toastText,
  });

  const networkId = network === "ethereum" ? 1 : 0;

  const amountBig = ethers.utils.parseUnits(
    Big(amount).toString(),
    token.decimals
  );
  // const permitData = permit || "0x";
  const permitData = "0x";

  const encodedData = bridgeIface.encodeFunctionData(
    "bridgeAsset(uint32,address,uint256,address,bool,bytes)",
    [networkId, sender, amountBig, token.address, true, permitData]
  );

  updateGasLimit(params);

  Ethers.provider()
    .getSigner()
    .sendTransaction({
      to: BRIDGE_CONTRACT_ADDRESS,
      data: encodedData,
      value: token.symbol === "ETH" ? amountBig : "0",
      gasLimit: 300000,
    })
    .then((tx) => {
      console.log("tx: ", tx);
      tx.wait()
        .then((receipt) => {
          const { transactionHash, status } = receipt;

          props.addAction?.({
            type: "Bridge",
            fromChainId: chainId,
            toChainId: chainId === 1 ? 1101 : 1,
            token: token,
            amount: amount,
            template: "native bridge",
            add: state.add,
            status,
            transactionHash,
          });
          props.toast?.dismiss(toastId);
          props.toast?.success({
            title: "Bridge Successfully!",
            text: toastText,
            tx: transactionHash,
            chainId,
          });
        })
        .catch((err) => {
          props.toast?.dismiss(toastId);
          props.toast?.fail({
            title: "Bridge Failed!",
            text: toastText,
            tx: tx.hash,
            chainId,
          });
        });
    })
    .catch((err) => {
      props.toast?.dismiss(toastId);
      props.toast?.fail({
        title: "Bridge Failed!",
        text: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : toastText,
      });
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
  console.log(token, amount);

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
      console.log("allowance: ", allowance);
      State.update({
        isContractAllowedToSpendToken: allowance >= Number(amount),
      });
    })
    .catch((e) => {
      console.log("setIsContractAllowedToSpendToken", e);
    });
};

const setNonce = (params) => {
  console.log("setNonce", params);
  const { token } = params;
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
      State.update({ nonce });
    })
    .catch((e) => {
      console.log("setNonce err:", e);
    });
};

const handlePermit = (params) => {
  console.log("handlePermit", params);
  const { amount, token, network } = params;

  const domain = {
    chainId,
    name: state.name,
    verifyingContract: token.address,
    version: "1",
  };

  const toastText = `Permit ${amount} ${token.symbol}`;

  const toastId = props.toast?.loading({
    title: toastText,
  });

  const types = {
    Permit: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
      { name: "value", type: "uint256" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const amountBig = ethers.utils.parseUnits(
    Big(amount).toString(),
    token.decimals
  );

  const values = {
    deadline: MAX_AMOUNT,
    nonce: state.nonce || 0,
    owner: sender,
    spender: BRIDGE_CONTRACT_ADDRESS,
    value: amountBig,
  };

  Ethers.provider()
    .getSigner()
    ._signTypedData(domain, types, values)
    .then((signature) => {
      const { r, s, v } = ethers.utils.splitSignature(signature);

      const erc20Abi = [
        {
          inputs: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "address",
              name: "spender",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
            {
              internalType: "uint8",
              name: "v",
              type: "uint8",
            },
            {
              internalType: "bytes32",
              name: "r",
              type: "bytes32",
            },
            {
              internalType: "bytes32",
              name: "s",
              type: "bytes32",
            },
          ],
          name: "permit",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const erc20Iface = new ethers.utils.Interface(erc20Abi);

      const permit = erc20Iface.encodeFunctionData(
        "permit(address,address,uint256,uint256,uint8,bytes32,bytes32)",
        [sender, BRIDGE_CONTRACT_ADDRESS, amountBig, MAX_AMOUNT, v, r, s]
      );
      props.toast?.dismiss(toastId);
      handleBridge({ ...props, permit, ...params });
    })
    .catch((err) => {
      props.toast?.dismiss(toastId);
      props.toast?.fail({
        title: "Permit Failed!",
        text: err?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : toastText,
      });
    });
};

const approve = (params) => {
  console.log("approve params: ", params);

  const { token, network, amount } = params;
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
    Big(amount).times(Big(10).pow(token.decimals)).toFixed(0)
  );
};

const onConfirm = (params) => {
  const { token, network, amount } = params;
  if (token.symbol !== "ETH" && network === "ethereum") {
    const res = approve(params);
    console.log("approve res: ", res);
    if (res) {
      res
        .then((tx) => {
          handlePermit(params);
        })
        .catch((e) => {});
    } else {
      handlePermit(params);
    }
  } else {
    handleBridge(params);
  }
};

const onChangeAmount = (params) => {
  console.log("onChangeAmount", params);
  setIsContractAllowedToSpendToken(params);
};

const onUpdateToken = (params) => {
  console.log("props: ", params);
  console.log("onUpdateToken", params);
  setIsContractAllowedToSpendToken(params);
  setName(params.token);
  setNonce(params);
};

if (chainId === undefined) return <div />;

return (
  <>
    <Container
      style={{
        alignItems: layout == "left" ? "start" : "center",
      }}
    >
      <Widget
        src="guessme.near/widget/ZKEVMSwap.zkevm-bridge-ui"
        props={{
          ...props,
          onConfirm,
          onUpdateToken,
          onChangeAmount,
          tokens,
          chainId,
          updateChainId: (chainId) => State.update(chainId),
          updateHide: (hide) => State.update({ hide }),
        }}
      />
      <Widget
        src="guessme.near/widget/ZKEVMSwap.zkevm-bridge-transactions"
        props={{ tokens }}
      />
    </Container>
  </>
);
