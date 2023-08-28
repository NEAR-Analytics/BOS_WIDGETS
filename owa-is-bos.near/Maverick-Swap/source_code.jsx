const routerAbi = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/maverick-router.txt"
);
if (!routerAbi.ok) {
  return "Loading";
}

const TOKENS = [
  //{
  //name: "ETH",
  //icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/eth.svg",
  //address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
  //coinGeckoId: "ethereum",
  //decimals: 18,
  //},
  {
    name: "USDC",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/usdc.svg",
    address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
    coinGeckoId: "usd-coin",
    decimals: 6,
  },
  {
    name: "CBUSD",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/busd.png",
    address: "0x2039bb4116B4EFc145Ec4f0e2eA75012D6C0f181",
    coinGeckoId: "binance-usd",
    decimals: 18,
  },
  {
    name: "MAV",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/mav.png",
    address: "0x787c09494Ec8Bcb24DcAf8659E7d5D69979eE508",
    coinGeckoId: "maverick-protocol",
    decimals: 18,
  },
  {
    name: "LUSD",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/lusd.svg",
    address: "0x503234F203fC7Eb888EEC8513210612a43Cf6115",
    coinGeckoId: "liquity-usd",
    decimals: 18,
  },
  {
    name: "RETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/reth.png",
    address: "0x32Fd44bB869620C0EF993754c8a00Be67C464806",
    coinGeckoId: "rocket-pool-eth",
    decimals: 18,
  },
  {
    name: "CBETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/cbeth.png",
    address: "0x75Af292c1c9a37b3EA2E6041168B4E48875b9ED5",
    coinGeckoId: "coinbase-wrapped-staked-eth",
    decimals: 18,
  },
  {
    name: "USD+",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/usd+.png",
    address: "0x8E86e46278518EFc1C5CEd245cBA2C7e3ef11557",
    coinGeckoId: "usd",
    decimals: 6,
  },
  {
    name: "GRAI",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/grai.png",
    address: "0x5FC44E95eaa48F9eB84Be17bd3aC66B6A82Af709",
    coinGeckoId: "grai",
    decimals: 18,
  },
  {
    name: "FRAX",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/frax.png",
    address: "0xb4C1544cb4163f4C2ECa1aE9Ce999F63892d912A",
    coinGeckoId: "frax",
    decimals: 18,
  },
  {
    name: "WETH",
    icon: "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/weth.png",
    address: "0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91",
    coinGeckoId: "ethereum",
    decimals: 18,
  },
];

const POOLS = [
  { name: "WETH-USDC", address: "0x41c8cf74c27554a8972d3bf3d2bd4a14d8b604ab" },
  { name: "WETH-CBUSD", address: "0x3Ae63FB198652E294B8DE4C2EF659D95D5ff28BE" },
  { name: "WETH-MAV", address: "0x4D47167e66e86d1a1083f52136832d4f1eF5809A" },
  { name: "WETH-LUSD", address: "0xB1338207DE233aE6a9A6D63309221b577F8Cd6E8" },
  { name: "WETH-RETH", address: "0x07e1F845819D7CABc03684fdb4Bf99D5cd2B2964" },
  { name: "WETH-CBETH", address: "0x23e8d6269717C567e4A2E9680491C8c65B67Ad0d" },
  { name: "WETH-USD+", address: "0x15461e7D0d6061e082b2c9B641634BB096527679" },
  { name: "WETH-GRAI", address: "" },
  { name: "WETH-FRAX", address: "" },
  { name: "USDC-CBUSD", address: "0x88D29317A355d8586bd0D98E8745ec3171d68F56" },
  { name: "USDC-MAV", address: "0xbf90be5bbc07fbf548d3bceed34f1d471c018f34" },
  { name: "USDC-LUSD", address: "0x6A9143A5f9BaF73841992DCB737844e5ad16A283" },
  { name: "USDC-RETH", address: "" },
  { name: "USDC-CBETH", address: "" },
  { name: "USDC-USD+", address: "0xaCA5d8805D6f160Eb46E273e28169DDBF703eCdc" },
  { name: "USDC-GRAI", address: "" },
  { name: "USDC-FRAX", address: "0x4e1852cf46b24940412e13C358B4f19eC92b9eaE" },
  { name: "CBUSD-MAV", address: "0x9f4A993b3120e52044810F1c91088a5630a8bF63" },
  { name: "CBUSD-LUSD", address: "" },
  { name: "CBUSD-RETH", address: "" },
  { name: "CBUSD-CBETH", address: "" },
  { name: "CBUSD-USD+", address: "" },
  { name: "CBUSD-GRAI", address: "" },
  { name: "CBUSD-FRAX", address: "" },
  { name: "MAV-LUSD", address: "" },
  { name: "MAV-RETH", address: "" },
  { name: "MAV-CBETH", address: "" },
  { name: "MAV-USD+", address: "" },
  { name: "MAV-GRAI", address: "" },
  { name: "MAV-FRAX", address: "" },
  { name: "LUSD-RETH", address: "" },
  { name: "LUSD-CBETH", address: "" },
  { name: "LUSD-USD+", address: "" },
  { name: "LUSD-GRAI", address: "0x28f57e5c2823183280CC9B3B45d746A2943111C3" },
  { name: "LUSD-FRAX", address: "" },
  { name: "RETH-CBETH", address: "" },
  { name: "RETH-USD+", address: "" },
  { name: "RETH-GRAI", address: "" },
  { name: "RETH-FRAX", address: "" },
  { name: "CBETH-USD+", address: "" },
  { name: "CBETH-GRAI", address: "" },
  { name: "CBETH-FRAX", address: "" },
  { name: "USD+-GRAI", address: "" },
  { name: "USD+-FRAX", address: "" },
  { name: "GRAI-FRAX", address: "" },
];

State.init({
  isZkSync: false,
  poolSelected: null,
  tokenSendSelected: null,
  tokenRecieveSelected: null,
  amountInput: null,
  amountRecieve: 0,
  rate: 0,
  routerContract: "0x39E098A153Ad69834a9Dac32f0FCa92066aD03f4",
  onApproving: false,
  onSwap: false,
  needMoreAllowance: false,
  reloadTransactions: false,
});

const getNetwork = () => {
  let chainId = 324;
  Ethers.provider()
    .getNetwork()
    .then((res) => {
      if (res.chainId == chainId) {
        State.update({ isZkSync: true });
      } else {
        switchNetwork(324);
      }
    });
};

function handleReloadTransactions() {
  console.log();
  State.update({ reloadTransactions: false });
}

const switchNetwork = (chainId) => {
  Ethers.provider().send("wallet_switchEthereumChain", [
    { chainId: `0x${chainId.toString(16)}` },
  ]);
};

const getErc20Balance = (tokenId, receiver, decimals, asset) => {
  if (state.sender === undefined) {
    return;
  }
  if (asset == "ETH") {
    Ethers.provider()
      .getBalance(state.sender)
      .then((balance) => {
        State.update({
          inputBalance: (
            parseFloat(ethers.utils.formatUnits(balance, decimals)).toFixed(6) -
            0.000001
          ).toString(),
          unFixedInputBalance: balance.toHexString(),
        });
      });
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    )
      .catch((res) => {
        console.log(err);
      })
      .then((res) => {
        const contract = new ethers.Contract(
          tokenId,
          res.body,
          Ethers.provider().getSigner()
        );
        contract.balanceOf(receiver).then((res) => {
          let balance = ethers.utils.formatUnits(res, decimals);
          State.update({
            inputBalance: parseFloat(balance - 0.000001)
              .toFixed(6)
              .toString(),
            unFixedInputBalance: res.toHexString(),
          });
        });
      });
  }
};

function getPrice(type, data) {
  let tokenIdForCoingeckoAPI;
  tokenIdForCoingeckoAPI = data.coinGeckoId;
  if (type) {
    getErc20Balance(data.address, state.sender, data.decimals, data.name);
  }
  let dataUrl = `https://api.coingecko.com/api/v3/coins/${tokenIdForCoingeckoAPI}`;
  asyncFetch(dataUrl).then((res) => {
    const tokenData = res.body;
    const price = Number(tokenData.market_data.current_price.usd);
    if (
      (state.tokenSendSelected != null || type) &&
      (state.tokenRecieveSelected != null || !type)
    ) {
      type
        ? State.update({ rate: price / state.tokenRecieveSelected.price })
        : State.update({ rate: state.tokenSendSelected.price / price });
    }
    type
      ? State.update({ tokenSendSelected: { price: price, ...data } })
      : State.update({ tokenRecieveSelected: { price: price, ...data } });
  });
}

const tokenInApprovaleNeededCheck = (data) => {
  if (data.name == "ETH") {
    State.update({
      approvalNeeded: false,
    });
  } else {
    asyncFetch(
      "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
    ).then((res) => {
      const ifaceErc20 = new ethers.utils.Interface(res.body);
      const encodedTokenAllowancesData = ifaceErc20.encodeFunctionData(
        "allowance",
        [state.sender, state.routerContract]
      );
      return Ethers.provider()
        .call({
          to: data.address,
          data: encodedTokenAllowancesData,
        })
        .then((encodedTokenAllowanceHex) => {
          const tokenAllowance = ifaceErc20.decodeFunctionResult(
            "allowance",
            encodedTokenAllowanceHex
          );
          if (tokenAllowance) {
            State.update({
              approvalNeeded: new Big(tokenAllowance).toFixed() == "0",
            });
          } else {
            State.update({
              approvalNeeded: false,
            });
          }
        });
    });
  }
};

const getAccountAllowance = (token, vAllowance) => {
  asyncFetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  ).then((res) => {
    const approveContract = new ethers.Contract(
      token.address,
      res.body,
      Ethers.provider().getSigner()
    );
    approveContract
      .allowance(state.sender, state.routerContract)
      .then((res) => {
        State.update({ tokenAllowance: parseInt(res.toString()) });
        if (vAllowance) {
          validateAllowance(state.amountInput, parseInt(res.toString()));
        }
        console.log("Allowance actual: " + parseInt(res.toString()));
      });
  });
};

const approveErc20Token = () => {
  asyncFetch(
    "https://gist.githubusercontent.com/veox/8800debbf56e24718f9f483e1e40c35c/raw/f853187315486225002ba56e5283c1dba0556e6f/erc20.abi.json"
  ).then((res) => {
    const value = state.unFixedInputBalance;

    const approveContract = new ethers.Contract(
      state.tokenSendSelected.address,
      res.body,
      Ethers.provider().getSigner()
    );

    let gasArgs = {};

    if (gweiPrice !== undefined && gasLimit !== undefined) {
      gasArgs.gasPrice = ethers.utils.parseUnits(gweiPrice ?? "0.26", "gwei");
      gasArgs.gasLimit = gasLimit ?? 20000000;
    }

    approveContract
      .approve(state.routerContract, value, gasArgs)
      .then((transactionHash) => {
        State.update({
          onApproving: true,
        });
        setTimeout(() => {
          State.update({
            onApproving: false,
            approvalNeeded: false,
          });
          getAccountAllowance(state.tokenSendSelected, true);
        }, 20000);
      });
  });
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
    getNetwork();
  }
}

const handleSendSelect = (data) => {
  State.update({
    amountInput: "",
  });
  const token = TOKENS.find((token) => token.name === data.target.value);
  getPrice(true, token);
  tokenInApprovaleNeededCheck(token);
  getAccountAllowance(token, true);
};

const handleRecieveSelect = (data) => {
  const token = TOKENS.find((token) => token.name === data.target.value);
  getPrice(false, token);
};

const turnTokens = () => {
  const tokenSendSelected = state.tokenSendSelected;
  const tokenRecieveSelected = state.tokenRecieveSelected;
  getAccountAllowance(tokenRecieveSelected);
  if (tokenSendSelected && tokenRecieveSelected) {
    State.update({ tokenSendSelected: null, tokenRecieveSelected: null });
    setTimeout(() => {
      State.update({
        amountInput: "",
        tokenSendSelected: tokenRecieveSelected,
        tokenRecieveSelected: tokenSendSelected,
      });
      getErc20Balance(
        tokenRecieveSelected.address,
        state.sender,
        tokenRecieveSelected.decimals,
        tokenRecieveSelected.name
      );
      const price = Number(tokenRecieveSelected.price);
      State.update({ rate: price / tokenSendSelected.price });
      tokenInApprovaleNeededCheck(tokenRecieveSelected);
    });
  }
};

const cantSwap = () => {
  return (
    state.tokenSendSelected && state.tokenRecieveSelected && state.amountInput
  );
};

const existPool = () => {
  const poolName1 = `${state.tokenSendSelected.name}-${state.tokenRecieveSelected.name}`;
  const poolName2 = `${state.tokenRecieveSelected.name}-${state.tokenSendSelected.name}`;

  if (!state.tokenSendSelected.name || !state.tokenRecieveSelected.name) {
    return true;
  }

  const pool = POOLS.find((p) => p.name === poolName1 || p.name === poolName2);

  if (pool && pool.address != "") {
    State.update({ poolSelected: pool.address });
    return true;
  } else {
    return false;
  }
};

const isSufficientBalance = () => {
  if (!state.amountInput) {
    return true;
  } else if (state.amountInput > state.inputBalance) {
    return false;
  }
  return true;
};

const setMaxBalance = () => {
  if (state.inputBalance > 0) {
    State.update({ amountInput: state.inputBalance });
    validateAllowance(state.inputBalance);
  }
};

const confirmTransaction = () => {
  const router = new ethers.Contract(
    state.routerContract,
    routerAbi.body,
    Ethers.provider().getSigner()
  );
  let amountIn = ethers.utils.parseUnits(
    state.amountInput,
    state.tokenSendSelected.decimals
  );
  let paramsv2 = {
    tokenIn: state.tokenSendSelected.address,
    tokenOut: state.tokenRecieveSelected.address,
    pool: state.poolSelected,
    recipient: state.sender,
    deadline: 1e13,
    amountIn: amountIn,
    amountOutMinimum: 0,
    sqrtPriceLimitD18: 0,
  };
  let amountIn2 = ethers.utils.parseUnits(
    "0",
    state.tokenSendSelected.decimals
  );
  const overrides = {
    value: amountIn2,
    gasLimit: 2303039,
  };
  try {
    router.exactInputSingle(paramsv2, overrides).then((res) => {
      State.update({
        onSwap: true,
        reloadTransactions: true,
      });
      setTimeout(() => {
        State.update({
          tokenSendSelected: null,
          tokenRecieveSelected: null,
          amountInput: 0,
          inputBalance: 0,
          amountRecieve: 0,
          rate: 0,
          poolSelected: null,
          onSwap: false,
          reloadTransactions: true,
        });
      }, 15000);
    });
  } catch (err) {
    console.log(err);
  }
};

const getRecipient = () => {
  return (
    state.sender.substring(0, 5) +
    "..." +
    state.sender.substring(state.sender.length - 4, state.sender.length)
  ).toUpperCase();
};

const validateAllowance = (input, allowanceAmount) => {
  State.update({ amountInput: input });
  const divider =
    state.tokenSendSelected.decimals == 18 ? 1000000000000000000 : 1000000;
  const tokenAllowance = allowanceAmount
    ? allowanceAmount / divider
    : state.tokenAllowance / divider;
  if (input * 1 > tokenAllowance) {
    console.log("Necesitas más allowance");
    State.update({ needMoreAllowance: true });
  } else {
    console.log("No necesitas más allowance");
    State.update({ needMoreAllowance: false });
  }
};

const css = fetch(
  "https://raw.githubusercontent.com/yaairnaavaa/Maverick/main/widget.css"
).body;

if (!css) return "";

if (!state.theme) {
  State.update({
    theme: styled.div`
    ${css}
`,
  });
}
