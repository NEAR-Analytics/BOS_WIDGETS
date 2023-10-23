const {
  addresses,
  pairs,
  proxyAddress,
  defaultPair,
  userPositions,
  pair,
  chainName,
} = props;

const curPositionUSD = userPositions[addresses[pair.id]]?.balanceUSD;

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

const SliderContainer = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  .slider {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 10px;
    outline: none;
    background: #353749;
    background-image: linear-gradient(#979abe, #979abe);
    background-size: 0% 100%;
    background-repeat: no-repeat;
  }

  .slider::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #ffffff;

    border: 2px solid #181a27;
    border-radius: 50%;
    cursor: pointer;
  }

  .quick-buttons {
    margin-top: 10px;

    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .quick-button-100 {
    margin-right: -5px;
  }

  .quick-button {
    display: inline-block;
    cursor: pointer;
    color: #7c7f96;
    font-size: 12px;
  }

  .quick-button-25 {
    position: relative;
    left: 5px;
  }

  .quick-button-50 {
    position: relative;
    left: 5px;
  }

  .quick-button-75 {
    position: relative;
    left: 5px;
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
    .pair-filed {
      color: #fff;
    }
  }

  .input-info-filed {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
  }

  .price-filed {
    color: rgb(124, 127, 150);
  }

  .balance {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #7c7f96;
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
  asyncFetch("https://test-api.dapdap.net/api/action/add-action-data", {
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
        action_network_id: chainName || "zkEVM",
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
        action_network_id: chainName || "zkEVM",
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

const DELAY = 1000 * 60 * 5;
const timer = Storage.privateGet("priceTimer");
function getPrice() {
  asyncFetch("https://test-api.dapdap.net/get-token-price-by-dapdap")
    .then((res) => {
      const data = JSON.parse(res.body);
      data.native = data.aurora;
      delete data.aurora;
      Storage.privateSet("tokensPrice", data);
      setTimeout(getPrice, DELAY);
    })
    .catch((err) => {
      setTimeout(getPrice, DELAY);
    });
}
if (!Storage.privateGet("priceTimer")) {
  getPrice();
  Storage.privateSet("priceTimer", 1);
}

const tokensPrice = Storage.privateGet("tokensPrice");

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

const balance0 =
  !amount0 || !tokensPrice?.[token0]
    ? "-"
    : parseFloat(Big(amount0).times(tokensPrice[token0]).toFixed(4));

const balance1 =
  !amount1 || !tokensPrice?.[token1]
    ? "-"
    : parseFloat(Big(amount1).times(tokensPrice[token1]).toFixed(4));

const balanceLp =
  !lpAmount || !lpBalance || !curPositionUSD
    ? "-"
    : parseFloat(
        Big(lpAmount)
          .div(lpBalance || 1)
          .times(curPositionUSD)
          .toFixed(4)
      );

const onUpdateLpPercent = (percent) => {
  State.update({
    lpPercent: percent,
  });
};

const onChangeSlider = (percent) => {
  console.log("percent: ", percent);
  const newLpValue = Big(percent)
    .div(100)
    .times(lpBalance || 0)
    .toFixed();

  handleLPChange(newLpValue);
};

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
            <span className="title">
              Amount of
              <span className="pair-filed">{token0}</span>
            </span>

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

            <div className="input-info-filed">
              <div className="price-filed">≈$ {balance0}</div>

              <div className="balance">
                Balance:{" "}
                <span onClick={() => handleMax(true)} className="v">
                  {balances[token0]}
                </span>
              </div>
            </div>
          </InputWrapper>
          <InputWrapper>
            <span className="title">
              Amount of
              <span className="pair-filed">{token1}</span>
            </span>

            <InputFiledWrapper>
              <Input
                value={amount1}
                type="number"
                onChange={(e) => handleToken1Change(e.target.value)}
              />

              <div className="token-filed">{token1}</div>
            </InputFiledWrapper>

            <div className="input-info-filed">
              <div className="price-filed">≈$ {balance1}</div>

              <div className="balance">
                Balance:{" "}
                <span onClick={() => handleMax(false)} className="v">
                  {balances[token1]}
                </span>
              </div>
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
              Amount of{" "}
              <span className="pair-filed">
                {token0}-{token1}
              </span>
            </span>

            <InputFiledWrapper>
              <Input
                value={lpAmount}
                type="number"
                onChange={(e) => {
                  handleLPChange(e.target.value);

                  const value = e.target.value;

                  if (!value) {
                    onUpdateLpPercent(0);
                  }

                  if (value && Big(value).gt(0)) {
                    const newSliderPercent = Big(value || 0)
                      .div(lpBalance || 1)
                      .times(100)
                      .toFixed(0);
                    onUpdateLpPercent(newSliderPercent);
                  }
                }}
              />

              <div className="token-filed-pc">{`${token0}-${token1}`}</div>

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

            <div className="input-info-filed">
              <div className="price-filed">
                ≈$
                {balanceLp}
              </div>

              <div className="balance">
                Balance:{" "}
                <span
                  onClick={() => {
                    const newSliderPercent = Big(lpBalance || 0)
                      .div(lpBalance || 1)
                      .times(100)
                      .toFixed(0);

                    onUpdateLpPercent(newSliderPercent);

                    handleLPChange(lpBalance);
                  }}
                  className="v"
                >
                  {lpBalance}
                </span>
              </div>
            </div>
          </InputWrapper>

          <SliderContainer>
            <div class="slider-container">
              <input
                type="range"
                id="slider"
                min="0"
                max="100"
                step="1"
                value={state.lpPercent || 0}
                style={{
                  backgroundSize: `${state.lpPercent}% 100%`,
                }}
                className="slider"
                onChange={(e) => {
                  const percent = e.target.value;
                  onChangeSlider(percent);
                  onUpdateLpPercent(percent);
                }}
              />
            </div>
            <div class="quick-buttons">
              {[0, 25, 50, 75, 100].map((percent) => {
                return (
                  <div
                    className={`quick-button quick-button-${percent}`}
                    onClick={() => {
                      onChangeSlider(percent);
                      onUpdateLpPercent(percent);
                    }}
                  >
                    {percent}%
                  </div>
                );
              })}
            </div>
          </SliderContainer>

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
