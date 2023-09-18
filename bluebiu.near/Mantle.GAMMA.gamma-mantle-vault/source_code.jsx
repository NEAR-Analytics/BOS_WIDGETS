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
  overflow: hidden;
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
  margin-bottom: -24px;
  color: ${(props) => (props.isError ? "#E25D58" : "#7C7F96")};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  font-family: "Inter";
  color: #fff;
  border-radius: 8px;

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"] {
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield !important;
  }
  .top-title {
    display: flex;
    justify-content: space-between;
    .title-text {
      font-size: 20px;
      font-weight: 700;
    }
  }
  @media (max-width: 900px) {
    .top-title {
      display: block;
      padding: 0 24px;
      .title-text {
        display: none;
      }
    }
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
  flex-direction: column;
  justify-content: center;
  .input-flex {
    display: flex;
  }
  @media (max-width: 900px) {
    display: block;
    margin: 0 24px 24px 24px;
    padding: 24px;
    background: #292c3c;
    border-radius: 10px;
    .input-flex {
      display: block;
    }
  }
`;
const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  position: relative;
  margin-right: 32px;
  margin-bottom: 20px;
  flex-direction: column;
  gap: 4px;
  .title {
    font-size: 14px;
    color: #7c7f96;
  }
  .merge {
    display: flex;
    .title {
      color: #7c7f96;
      font-size: 14px;
      margin-bottom: 0;
      font-weight: 500;
      white-space: nowrap;
      margin-right: 12px;
      span {
        color: #ffffff;
      }
    }
  }
  .balance {
    display: inline-flex;
    align-items: center;
    color: #7c7f96;
    font-size: 12px;
    margin-left: auto;
    white-space: nowrap;
    .v {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  @media (max-width: 900px) {
    margin: 0;
    .merge {
      p {
        display: inline-block;
      }
    }
  }
`;
const Input = styled.input`
  border: none;
  background: rgba(53, 55, 73, 0.5);
  outline: none;
  color: #fff;
  padding: 14px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: bold;
  height: 55px;
`;
const Button = styled.button`
  margin-top: 22px;
  background: #fff;
  border-radius: 10px;
  width: 200px;
  border: none;
  color: #0f1126;
  padding: 8px 0;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  height: 55px;
  cursor: pointer;
  &:disabled {
    background: rgba(255, 255, 255, 0.3);
    color: #ccc;
    cursor: not-allowed;
  }
  @media (max-width: 900px) {
    width: 100%;
    box-shadow: 0px 1px 8px 0px #af8dffb0;
    border: 0.3px solid #794fdd;
    background: linear-gradient(0deg, #794fdd, #794fdd),
      linear-gradient(0deg, #ffffff, #ffffff);
    border-radius: 30px;
  }
`;
const Tab = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1px;
  border: 1px solid #332c4b;
  background: #222436;
  border-radius: 10px;
  padding: 2px;
  height: 40px;
  line-height: 20px;
  margin-bottom: 26px;
  @media (max-width: 736px) {
    border: 1px solid #332c4b;
    border-radius: 10px;
    overflow: hidden;
    background: linear-gradient(0deg, #181a27, #181a27);
    margin-bottom: 12px;
  }
`;
const TabItem = styled.div`
  border-radius: 10px;
  flex: 1;
  padding: 8px 32px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#fff" : "#7C7F96")};
  background: ${(props) => (props.isActive ? "#794FDD" : "#222436")};
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

State.init({
  isDeposit: true,
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

const { can_add_action } = props;

function add_action(param_body) {
  asyncFetch("https://bos-api.delink.one/add-action-data", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(param_body),
  });
}

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
      if (can_add_action) {
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
      }
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
      if (can_add_action) {
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
      }

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

const isInSufficient =
  Number(amount0) > Number(balances[token0]) ||
  Number(amount1) > Number(balances[token1]);

const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

return (
  <VStack>
    <Wrapper>
      <div className="top-title">
        <div className="title-text">Liquidity Manage</div>
        <Tab>
          <TabItem isActive={isDeposit} onClick={() => changeMode(true)}>
            Deposit
          </TabItem>
          <TabItem isActive={!isDeposit} onClick={() => changeMode(false)}>
            Withdraw
          </TabItem>
        </Tab>
      </div>
      {isDeposit ? (
        <SubWrapper>
          <div className="input-flex">
            <InputWrapper>
              <div className="merge">
                <p className="title">
                  Amount of <span>{token0}</span>
                </p>
                <div className="balance">
                  Balance:{" "}
                  <span onClick={() => handleMax(true)} className="v">
                    {balances[token0]}
                  </span>
                </div>
              </div>
              <Input
                value={amount0}
                type="number"
                onChange={(e) => handleToken0Change(e.target.value)}
              />
            </InputWrapper>
            <InputWrapper>
              <div className="merge">
                <p className="title">
                  Amount of <span>{token1}</span>
                </p>
                <div className="balance">
                  Balance:{" "}
                  <span onClick={() => handleMax(false)} className="v">
                    {balances[token1]}
                  </span>
                </div>
              </div>
              <Input
                value={amount1}
                type="number"
                onChange={(e) => handleToken1Change(e.target.value)}
              />
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
          </div>
        </SubWrapper>
      ) : (
        <SubWrapper>
          <div className="input-flex">
            <InputWrapper>
              <div className="merge">
                <p className="title">
                  Amount of{" "}
                  <span>
                    {token0}-{token1}
                  </span>
                </p>
                <div className="balance">
                  Balance:{" "}
                  <span onClick={() => handleLPChange(lpBalance)} className="v">
                    {lpBalance}
                  </span>
                </div>
              </div>
              <Input
                value={lpAmount}
                type="number"
                onChange={(e) => handleLPChange(e.target.value)}
              />
            </InputWrapper>
            <VStack>
              {isLoading && <Comment isError={isError}>{loadingMsg}</Comment>}
              <Button
                disabled={isWithdrawInsufficient || isLoading || !lpAmount}
                onClick={handleWithdraw}
              >
                {isLoading ? (
                  <Spinner className="ph-bold ph-circle-notch" />
                ) : (
                  <>
                    {isWithdrawInsufficient
                      ? "InSufficient Balance"
                      : "Withdraw"}
                  </>
                )}
              </Button>
            </VStack>
          </div>
        </SubWrapper>
      )}
    </Wrapper>
    {isPostTx && (
      <Info>
        If you dont see the updated balance in the table after 1 minute, please
        click the refresh button above.
      </Info>
    )}
  </VStack>
);
