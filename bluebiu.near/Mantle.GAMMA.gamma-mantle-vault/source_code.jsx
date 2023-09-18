const addresses = {
  USDT: "0x201eba5cc46d216ce6dc03f6a759e8e766e956ae",
  MINU: "0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed",
  WMNT: "0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8",
  WBTC: "0xcabae6f6ea1ecab08ad02fe02ce9a44f09aebfa2",
  USDC: "0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9",
  WETH: "0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111",

  "N USDT-WMNT-500": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
  "W USDT-WMNT-500": "0x1ee3ae551188661553882fdc75f8f62eaa6726ad",

  "N MINU-WMNT-10000": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  "W MINU-WMNT-10000": "0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca",

  "N USDT-WETH-500": "0xde7421f870ffb2b99998d9ed07c4d9b22e783922",
  "W USDT-WETH-500": "0xfe4bb996926aca85c9747bbec886ec2a3f510c66",

  "N USDT-WBTC-500": "0x2e18b825b049c4994370b0db6c35d0100295b96c",
  "W USDT-WBTC-500": "0xa18d3073441b0774a1efa45ba9d2e7da3441da2f",

  "W USDC-USDT-100": "0x561f5cf838429586d1f8d3826526891b289270ee",
};
const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621";

const defaultPair = {
  id: "W USDT-WETH-500",
  strategy: "Dynamic",
  strategy2: "Wide",
  token0: "USDT",
  token1: "WETH",
  decimals0: 6,
  decimals1: 18,
};

const HStack = styled.div`
  display: flex;
  gap: 8px;
`;

const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 16px;
  border: 1px solid #332c4b;
  background-color: #181a27;
  overflow: hidden;

  @media (max-width: 736px) {
    border: none;

    background-color: transparent;
  }
`;
const VStackNoColor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-radius: 16px;
  overflow: hidden;
`;

const Comment = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 12px;
  color: ${(props) => (props.isError ? "#E25D58" : "#7C7F96")};
`;

const { can_add_action, poolsData, handlePairClick } = props;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;

  font-family: "Inter";
  color: #fff;
  border-radius: 8px;
  overflow: hidden;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"] {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield !important;
  }
`;

const Info = styled.div`
  background: #1d1e1f;
  width: 320px;

  font-family: "Inter";
  color: #fff;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  text-align: center;
`;
const SubWrapper = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  justify-content: center;
  gap: 32px;

  /* background-color: #181a27; */

  @media (max-width: 736px) {
    background-color: #181a27;
    border: 1px solid #332c4b;
    border-radius: 16px;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  gap: 4px;
  .title {
    font-size: 14px;
    color: #7c7f96;
  }
  .balance {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #7c7f96;
    font-size: 12px;
    .v {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const ArrowDownIcon = (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 1L7 6L13 1"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
    />
  </svg>
);

const InputFiledWrapper = styled.div`
  border: none;
  background: rgba(53, 55, 73, 0.5);
  outline: none;
  color: #fff;
  padding-right: 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  width: 100%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  .token-filed {
    @media (min-width: 736px) {
      display: none;
    }

    padding-right: 12px;

    flex-shrink: 0;

    white-space: nowrap;

    gap: 8px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
    line-height: 18px;
    letter-spacing: 0em;
    text-align: right;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  color: #fff;
  padding: 14px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  background: transparent;

  @media (max-width: 736px) {
    width: 100%;
  }
`;

const Button = styled.button`
  background: #fff;
  border-radius: 10px;
  width: 100%;
  border: none;
  color: #0f1126;
  padding: 8px 0;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  height: 50px;
  cursor: pointer;
  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    color: #ccc;
    cursor: not-allowed;
  }
`;
const Tab = styled.div`
  display: flex;
  gap: 1px;

  @media (max-width: 736px) {
    border: 1px solid #332c4b;

    border-radius: 10px;
    overflow: hidden;

    background: linear-gradient(0deg, #181a27, #181a27);

    margin-bottom: 12px;
  }
`;
const TabItem = styled.div`
  flex: 1;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#fff" : "#7C7F96")};
  background: ${(props) => (props.isActive ? "#181A27" : "#272838")};
  &:hover {
    background: #181a27;
  }

  @media (max-width: 736px) {
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const MaxButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  color: #fff;
  padding: 8px;
  font-size: 14px;
  right: 0;
  bottom: 28%;
`;

const Spinner = styled.i`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  margin: calc(24px * -0.5) auto 0;
  width: 24px;
  height: 24px;
  font-size: 24px;
  line-height: 24px;
  animation: spin 800ms infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const SelectPairs = styled.div`
  background: #25273a;
  position: fixed;
  width: 100vw;
  display: flex;
  align-items: center;
  bottom: 0;
  left: 0;
  flex-direction: column;

  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  z-index: 1000;

  .close-modal-icon {
    display: flex;
    align-items: end;
    justify-content: end;
    width: 100%;

    padding-top: 20px;
    padding-right: 20px;
  }

  max-height: 40vh;

  overflow: auto;

  .pair-line {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    letter-spacing: 0em;
    text-align: center;

    padding: 12px 0;
    color: white;
    cursor: pointer;

    :hover {
      background: #181a27;
    }
    position: relative;

    width: 100%;
    .type-box {
      border-radius: 13px;
      min-width: 61px;
      height: 26px;
      font-size: 13px;
      padding: 0px 6px;
      position: absolute;

      right: 24px;

      top: 10px;

      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0em;
      text-align: left;

      display: flex;
      align-items: center;
      justify-content: center;

      background: #d9d9d91a;
    }
  }
`;

function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}

const defaultDeposit = props.tab === "deposit" || !props.tab;

State.init({
  isDeposit: defaultDeposit,
  lpBalance: "",
  balances: [],
  amount0: "",
  amount1: "",
  lpAmount: "",
  isError: false,
  isLoading: false,
  isToken0Approved: true,
  isToken1Approved: true,
  isToken0Approving: false,
  isToken1Approving: false,
  loadingMsg: "",
  isPostTx: false,
  showPairs: false,
});

const getFromDepositAmount = (depositAmount, tokenDecimal) => {
  let a = new Big(depositAmount[0].toString());
  let b = new Big(depositAmount[1].toString());

  if (a.eq(0) && b.eq(0)) return "0";

  let diff;
  let midpoint;
  if (a.gt(b)) {
    diff = a.minus(b);
    midpoint = diff.div(new Big(2)).plus(b);
  } else {
    diff = b.minus(a);
    midpoint = diff.div(new Big(2)).plus(a);
  }

  for (let i = tokenDecimal; i > 0; i--) {
    const midpointFixed = midpoint
      .div(new Big(10).pow(tokenDecimal))
      .toFixed(i);
    if (
      a.div(new Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
      b.div(new Big(10).pow(tokenDecimal)).gte(midpointFixed)
    ) {
      return midpointFixed;
    }
  }

  return "0";
};

const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const { token0, token1, decimals0, decimals1, id } = props.pair || defaultPair;
const hypeAddress = addresses[id];

const updateLPBalance = () => {
  const abi = ["function balanceOf(address) view returns (uint256)"];
  const vaultContract = new ethers.Contract(
    hypeAddress,
    abi,
    Ethers.provider()
  );
  vaultContract.balanceOf(sender).then((balanceBig) => {
    const adjustedBalance = ethers.utils.formatUnits(balanceBig, 18);
    State.update({
      lpBalance: adjustedBalance,
    });
  });
};
const updateBalance = (token) => {
  const { address, decimals, symbol } = token;

  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(sender)
      .then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        State.update({
          balances: {
            ...state.balances,
            [symbol]: adjustedBalance,
          },
        });
      });
  } else {
    const erc20Abi = ["function balanceOf(address) view returns (uint256)"];
    const tokenContract = new ethers.Contract(
      address,
      erc20Abi,
      Ethers.provider()
    );
    tokenContract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, decimals);
      State.update({
        balances: {
          ...state.balances,
          [symbol]: adjustedBalance,
        },
      });
    });
  }
};

if (sender) {
  [
    { symbol: token0, address: addresses[token0], decimals: decimals0 },
    { symbol: token1, address: addresses[token1], decimals: decimals1 },
  ].map(updateBalance);

  updateLPBalance();
}

const {
  isDeposit,
  balances,
  amount0,
  amount1,
  isLoading,
  isError,
  isToken0Approved,
  isToken1Approved,
  isToken0Approving,
  isToken1Approving,
  loadingMsg,
  lpBalance,
  lpAmount,
  isPostTx,
} = state;

const checkApproval = (token0Amount, token1Amount) => {
  const token0Wei = new Big(ethers.utils.parseUnits(token0Amount, decimals0));
  const token1Wei = new Big(ethers.utils.parseUnits(token1Amount, decimals1));

  const abi = [
    "function allowance(address, address) external view returns (uint256)",
  ];

  const token0Contract = new ethers.Contract(
    addresses[token0],
    abi,
    Ethers.provider()
  );

  token0Contract
    .allowance(sender, hypeAddress)
    .then((allowance0) => {
      State.update({
        isToken0Approved: !new Big(allowance0.toString()).lt(token0Wei),
      });
    })
    .catch((e) => console.log(e));

  const token1Contract = new ethers.Contract(
    addresses[token1],
    abi,
    Ethers.provider()
  );

  token1Contract
    .allowance(sender, hypeAddress)
    .then((allowance1) => {
      State.update({
        isToken1Approved: !new Big(allowance1.toString()).lt(token1Wei),
      });
    })
    .catch((e) => console.log(e));
};

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = (isToken0) => {
  if (isToken0) handleToken0Change(balances[token0]);
  else handleToken1Change(balances[token1]);
};

const handleToken0Change = (amount) => {
  State.update({ amount0: amount });

  if (Number(amount) === 0) {
    State.update({
      amount1: "",
      isToken0Approved: true,
      isToken1Approved: true,
    });
    return;
  }

  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount...",
  });

  const token0Wei = ethers.utils.parseUnits(amount, decimals0).toString();

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );

  proxyContract
    .getDepositAmount(hypeAddress, addresses[token0], token0Wei)
    .then((depositAmount) => {
      const amount1 = getFromDepositAmount(depositAmount, decimals1);
      State.update({ amount1 });
      State.update({ isLoading: false });
      checkApproval(amount, amount1);
    })
    .catch((e) => {
      State.update({
        isLoading: true,
        isError: true,
        amount1: 0,
        loadingMsg: "Something went wrong. Please try again.",
      });
    });
};

const handleToken1Change = (amount) => {
  State.update({ amount1: amount });

  if (Number(amount) === 0) {
    State.update({
      amount0: "",
      isToken0Approved: true,
      isToken1Approved: true,
    });
    return;
  }

  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount...",
  });
  const token1Wei = ethers.utils.parseUnits(amount, decimals1).toString();

  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );

  proxyContract
    .getDepositAmount(hypeAddress, addresses[token1], token1Wei)
    .then((depositAmount) => {
      const amount0 = getFromDepositAmount(depositAmount, decimals0);
      State.update({ amount0 });
      State.update({ isLoading: false });
      checkApproval(amount0, amount);
    })
    .catch((e) => {
      State.update({
        isLoading: true,
        isError: true,
        amount0: 0,
        loadingMsg: "Something went wrong. Please try again.",
      });
    });
};

const handleLPChange = (amount) => {
  State.update({
    lpAmount: amount,
  });
};

const handleApprove = (isToken0) => {
  const _token = isToken0 ? token0 : token1;
  const payload = isToken0
    ? { isToken0Approving: true }
    : { isToken1Approving: true };

  State.update({
    ...payload,
    isLoading: true,
    loadingMsg: `Approving ${_token}...`,
  });

  const tokenWei = ethers.utils.parseUnits(
    isToken0 ? amount0 : amount1,
    isToken0 ? decimals0 : decimals1
  );

  const abi = ["function approve(address, uint) public"];

  const tokenContract = new ethers.Contract(
    addresses[_token],
    abi,
    Ethers.provider().getSigner()
  );

  tokenContract
    .approve(hypeAddress, tokenWei)
    .then((tx) => tx.wait())
    .then((receipt) => {
      const payload = isToken0
        ? { isToken0Approved: true, isToken0Approving: false }
        : { isToken1Approved: true, isToken1Approving: false };

      State.update({ ...payload, isLoading: false, loadingMsg: "" });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
    });
};

const handleDeposit = () => {
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Depositing...",
  });

  const token0Wei = ethers.utils.parseUnits(amount0, decimals0);
  const token1Wei = ethers.utils.parseUnits(amount1, decimals1);

  const proxyAbi = [
    "function deposit(uint256, uint256,address,address,uint256[4] memory)  external returns (uint256)",
  ];

  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider().getSigner()
  );

  proxyContract
    .deposit(token0Wei, token1Wei, sender, hypeAddress, [0, 0, 0, 0])
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      const { status, transactionHash } = receipt;

      const uuid = Storage.get(
        "zkevm-warm-up-uuid",
        "guessme.near/widget/ZKEVMWarmUp.generage-uuid"
      );

      add_action({
        action_title: `Deposit ${token0}-${token1} on Gamma`,
        action_type: "Deposit",
        action_tokens: JSON.stringify([token0, token1]),
        action_amount: "",
        account_id: sender,
        action_network_id: "zkEVM",
        account_info: uuid,
        template: "Gamma",
        action_status: status === 1 ? "Success" : "Failed",
        action_switch: can_add_action ? 1 : 0,
        tx_id: transactionHash,
      });

      State.update({
        isLoading: false,
        isPostTx: true,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      const { refetch } = props;
      if (refetch) refetch();
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
    });
};

const handleWithdraw = () => {
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Withdrawing...",
  });

  const lpWeiAmount = ethers.utils.parseUnits(lpAmount, 18);
  const abi = [
    "function withdraw(uint256, address, address,uint256[4] memory) external returns (uint256, uint256)",
  ];

  const hypeContract = new ethers.Contract(
    hypeAddress,
    abi,
    Ethers.provider().getSigner()
  );

  hypeContract
    .withdraw(lpWeiAmount, sender, sender, [0, 0, 0, 0])
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      State.update({
        isLoading: false,
        isPostTx: true,
      });

      const { status, transactionHash } = receipt;

      const uuid = Storage.get(
        "zkevm-warm-up-uuid",
        "guessme.near/widget/ZKEVMWarmUp.generage-uuid"
      );

      add_action({
        action_title: `Withdraw ${token0}-${token1} on Gamma`,
        action_type: "Withdraw",
        action_tokens: JSON.stringify([token0, token1]),
        action_amount: lpAmount,
        account_id: sender,
        action_network_id: "zkEVM",
        account_info: uuid,
        template: "Gamma",
        action_status: status === 1 ? "Success" : "Failed",
        action_switch: can_add_action ? 1 : 0,
        tx_id: transactionHash,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      const { refetch } = props;
      if (refetch) refetch();
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
    });
};

const pairs = [
  {
    id: "W WETH-USDC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "N WETH-USDC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "W WETH-MATIC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N WETH-MATIC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W WETH-WBTC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "WETH",
    token1: "WBTC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N WETH-WBTC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WETH",
    token1: "WBTC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "W USDC-WBTC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "USDC",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "N USDC-WBTC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDC",
    token1: "WBTC",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "USDT-USDC",
    strategy: "Stable",
    token0: "USDT",
    token1: "USDC",
    decimals0: 6,
    decimals1: 6,
  },
  {
    id: "USDC-DAI",
    strategy: "Stable",
    token0: "USDC",
    token1: "DAI",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "USDT-DAI",
    strategy: "Stable",
    token0: "USDT",
    token1: "DAI",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "stMATIC-MATIC",
    strategy: "Pegged Price",
    token0: "stMATIC",
    token1: "MATIC",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N MATIC-USDC",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MATIC",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "W MATIC-USDC",
    strategy: "Dynamic",
    strategy2: "Wide",
    token0: "MATIC",
    token1: "USDC",
    decimals0: 18,
    decimals1: 6,
  },
];

const Layer = styled.div`
  position: fixed;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(20, 22, 43, 0.8);
`;

const isInSufficient =
  Number(amount0) > Number(balances[token0]) ||
  Number(amount1) > Number(balances[token1]);

const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

return (
  <VStack>
    <Wrapper>
      <Tab>
        <TabItem isActive={isDeposit} onClick={() => changeMode(true)}>
          Deposit
        </TabItem>
        <TabItem isActive={!isDeposit} onClick={() => changeMode(false)}>
          Withdraw
        </TabItem>
      </Tab>
      {isDeposit ? (
        <SubWrapper>
          <InputWrapper>
            <span className="title">Amount of {token0}</span>

            <InputFiledWrapper>
              <Input
                value={amount0}
                type="number"
                onChange={(e) => handleToken0Change(e.target.value)}
              />

              <div
                className="token-filed"
                onClick={() =>
                  State.update({
                    showPairs: true,
                  })
                }
              >
                {token0}

                {ArrowDownIcon}
              </div>
            </InputFiledWrapper>

            <div className="balance">
              Balance:{" "}
              <span onClick={() => handleMax(true)} className="v">
                {balances[token0]}
              </span>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span className="title">Amount of {token1}</span>

            <InputFiledWrapper>
              <Input
                value={amount1}
                type="number"
                onChange={(e) => handleToken1Change(e.target.value)}
              />

              <div className="token-filed">{token1}</div>
            </InputFiledWrapper>

            <div className="balance">
              Balance:{" "}
              <span onClick={() => handleMax(false)} className="v">
                {balances[token1]}
              </span>
            </div>
          </InputWrapper>
          <VStackNoColor>
            {isLoading && <Comment isError={isError}>{loadingMsg}</Comment>}
            {isInSufficient && <Button disabled>InSufficient Balance</Button>}
            {!isInSufficient &&
              (isToken0Approved &&
              isToken1Approved &&
              !isToken0Approving &&
              !isToken1Approving ? (
                <Button
                  disabled={isLoading || !amount0 || !amount1}
                  onClick={handleDeposit}
                >
                  {isLoading ? (
                    <Spinner className="ph-bold ph-circle-notch" />
                  ) : (
                    "Deposit"
                  )}
                </Button>
              ) : (
                <HStack>
                  <Button
                    disabled={isToken0Approved || isToken0Approving}
                    onClick={() => handleApprove(true)}
                  >
                    {isToken0Approving ? (
                      <Spinner className="ph-bold ph-circle-notch" />
                    ) : (
                      <>
                        {isToken0Approved ? "Approved" : "Approve"} {token0}
                      </>
                    )}
                  </Button>
                  <Button
                    disabled={isToken1Approved || isToken1Approving}
                    onClick={() => handleApprove(false)}
                  >
                    {isToken1Approving ? (
                      <Spinner className="ph-bold ph-circle-notch" />
                    ) : (
                      <>
                        {isToken1Approved ? "Approved" : "Approve"} {token1}
                      </>
                    )}
                  </Button>
                </HStack>
              ))}
          </VStackNoColor>
        </SubWrapper>
      ) : (
        <SubWrapper>
          <InputWrapper>
            <span className="title">
              Amount of {token0}-{token1}
            </span>

            <InputFiledWrapper>
              <Input
                value={lpAmount}
                type="number"
                onChange={(e) => handleLPChange(e.target.value)}
              />

              <div
                className="token-filed"
                onClick={() =>
                  State.update({
                    showPairs: true,
                  })
                }
              >
                {`${token0}-${token1}`}

                {ArrowDownIcon}
              </div>
            </InputFiledWrapper>

            <div className="balance">
              Balance:{" "}
              <span onClick={() => handleLPChange(lpBalance)} className="v">
                {lpBalance}
              </span>
            </div>
          </InputWrapper>

          <VStack
            style={{
              border: "none",
            }}
          >
            {isLoading && <Comment isError={isError}>{loadingMsg}</Comment>}

            <Button
              disabled={isWithdrawInsufficient || isLoading || !lpAmount}
              onClick={handleWithdraw}
            >
              {isLoading ? (
                <Spinner className="ph-bold ph-circle-notch" />
              ) : (
                <>
                  {isWithdrawInsufficient ? "InSufficient Balance" : "Withdraw"}
                </>
              )}
            </Button>
          </VStack>
        </SubWrapper>
      )}
    </Wrapper>

    {isPostTx && (
      <Info>
        If you dont see the updated balance in the table after 1 minute, please
        click the refresh button above.
      </Info>
    )}

    <Widget src="guessme.near/widget/ZKEVMWarmUp.generage-uuid" />
    {state.showPairs && poolsData && (
      <SelectPairs>
        <div className="close-modal-icon">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              State.update({
                showPairs: false,
              });
            }}
          >
            <path
              d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
              fill="#C0C4E9"
            />
          </svg>
        </div>

        {pairs.map((pair) => {
          const pairDisplay = `${pair.token0}-${pair.token1}`;

          return (
            <div
              className="pair-line"
              style={{
                background:
                  activePair.id === pair.id ? "rgba(24,26,39,0.3)" : "",
              }}
              onClick={() => {
                handlePairClick(pair);

                State.update({
                  showPairs: false,
                });
              }}
            >
              {pairDisplay}
              <div className="type-box">
                {pair.strategy2 ? pair.strategy2 : pair.strategy}
              </div>
            </div>
          );
        })}
      </SelectPairs>
    )}

    {state.showPairs && poolsData && (
      <Layer
        onClick={() => {
          State.update({
            showPairs: false,
          });
        }}
      />
    )}
  </VStack>
);
