const {
  Row,
  Column,
  DetailWrapper,
  FilterButtonList,
  FilterButton,
  InputWrapList,
  InputWrap,
  Input,
  InputSuffix,
  StyledImageList,
  PriceWrap,
  TotalPrice,
  BalancePrice,
  StyledButtonList,
  StyledButton,
  CycleWrap,
  TokenImg,
} = VM.require("bluebiu.near/widget/Staking.Teahouse.Styles");
const ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "_assets", type: "uint256" },
      { internalType: "address", name: "_receiver", type: "address" },
    ],
    name: "claimAndRequestDeposit",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_shares", type: "uint256" },
      { internalType: "address", name: "_owner", type: "address" },
    ],
    name: "claimAndRequestWithdraw",
    outputs: [{ internalType: "uint256", name: "shares", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_receiver", type: "address" }],
    name: "claimOwedAssets",
    outputs: [{ internalType: "uint256", name: "assets", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
];
const {
  account,
  data,
  toast,
  prices,
  addresses,
  defaultDex,
  addAction,
  userPositions,
  ICON_VAULT_MAP,
  onSuccess,
} = props;

const { formatUnits, parseUnits } = ethers.utils;

const defaultDeposit = props.tab === "deposit" || !props.tab;

const curPositionUSD = userPositions[data.vaultAddress]?.balanceUSD;

State.init({
  isDeposit: true,
  lpBalance: "",
  balances: [],
  amount0: "",
  lpAmount: "",
  isError: false,
  isLoading: false,
  isToken0Approved: true,
  isToken0Approving: false,
  loadingMsg: "",
  isPostTx: false,
  showPairs: false,
  updater: 0,
});

const { vaultAddress, token0, decimals0, totalAmount0, totalSupply } = data;

function isValid(a) {
  if (!a) return false;
  if (isNaN(Number(a))) return false;
  if (a === "") return false;
  return true;
}

const updateBalance = (token) => {
  console.log("updateBalance--", token, account);
  const { address, decimals, symbol } = token;
  if (symbol === "ETH") {
    Ethers.provider()
      .getBalance(account)
      .then((balanceBig) => {
        const adjustedBalance = formatUnits(balanceBig);
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
    tokenContract
      .balanceOf(account)
      .then((balanceBig) => {
        const adjustedBalance = Big(
          formatUnits(balanceBig, decimals)
        ).toFixed();
        State.update({
          balances: {
            ...state.balances,
            [symbol]: adjustedBalance,
          },
        });
      })
      .catch((error) => {
        console.log("error: ", error);
        // setTimeout(() => {
        //   updateBalance(token);
        // }, 1500);
      });
  }
};

useEffect(() => {
  if (!account || !token0) return;

  [{ symbol: token0, address: addresses[token0], decimals: decimals0 }].map(
    updateBalance
  );
}, [account, token0, state.updater]);

const {
  isDeposit,
  balances,
  amount0,

  isLoading,
  isError,
  isToken0Approved,
  isToken0Approving,
  loadingMsg,
  lpBalance,
  lpAmount,
  isPostTx,
} = state;

// const detailLoading = Object.keys(balances).length < 2 && lpBalance === "";
const detailLoading = false;

const checkApproval = (token0Amount) => {
  const token0Wei = parseUnits(Big(token0Amount).toFixed(decimals0), decimals0);

  const abi = [
    "function allowance(address, address) external view returns (uint256)",
  ];

  const token0Contract = new ethers.Contract(
    addresses[token0],
    abi,
    Ethers.provider()
  );

  token0Contract
    .allowance(account, vaultAddress)
    .then((allowance0) => {
      State.update({
        isToken0Approved: !new Big(allowance0.toString()).lt(token0Wei),
      });
    })
    .catch((e) => console.log(e));
};
const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = () => {
  handleToken0Change(balances[token0]);
};
const handleToken0Change = (amount) => {
  State.update({ amount0: amount });
  if (Number(amount) === 0) {
    State.update({
      isToken0Approved: true,
    });
    return;
  }

  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount...",
  });

  State.update({ isLoading: false });
  checkApproval(amount);
};

const handleLPChange = (amount) => {
  State.update({
    lpAmount: amount,
  });
};

const handleApprove = (isToken0) => {
  const _token = token0;
  const payload = { isToken0Approving: true };

  const amount = Big(amount0).toFixed(decimals0);

  const toastId = toast?.loading({
    title: `Approve ${amount} ${_token}`,
  });

  State.update({
    ...payload,
    isLoading: true,
    loadingMsg: `Approving ${_token}...`,
  });

  const tokenWei = parseUnits(amount, decimals0);

  const abi = ["function approve(address, uint) public"];

  const tokenContract = new ethers.Contract(
    addresses[_token],
    abi,
    Ethers.provider().getSigner()
  );

  tokenContract
    .approve(vaultAddress, tokenWei)
    .then((tx) => tx.wait())
    .then((receipt) => {
      const payload = { isToken0Approved: true, isToken0Approving: false };

      State.update({ ...payload, isLoading: false, loadingMsg: "" });
      toast?.dismiss(toastId);
      toast?.success({
        title: "Approve Successfully!",
        text: `Approve ${amount} ${_token}`,
        tx: receipt.transactionHash,
        chainId: props.chainId,
      });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
        isToken0Approving: false,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approve ${amount} ${_token}`,
      });
    });
};
const handleDeposit = () => {
  const toastId = toast?.loading({
    title: `Depositing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Depositing...",
  });

  const token0Wei = parseUnits(Big(amount0).toFixed(decimals0), decimals0);

  // const _shares = parseUnits(calcShares(amount0));

  const depositContract = new ethers.Contract(
    vaultAddress,
    ABI,
    Ethers.provider().getSigner()
  );
  depositContract
    .claimAndRequestDeposit(token0Wei, account, {
      gasLimit: 4000000,
    })
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      const { status, transactionHash } = receipt;

      addAction?.({
        type: "Liquidity",
        action: "Deposit",
        token0,
        amount: amount0,
        template: defaultDex,
        status: status,
        add: false,
        transactionHash,
        chain_id: props.chainId,
      });

      State.update({
        amount0: "",
        isLoading: false,
        isPostTx: true,
        updater: new Date().getTime(),
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      toast?.dismiss(toastId);
      toast?.success({
        title: "Deposit Successfully!",
      });
      onSuccess?.();
    })
    .catch((error) => {
      console.log("error: ", error);
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Deposit Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : error?.message ?? "",
      });
    });
};

const handleRedeem = () => {
  const toastId = toast?.loading({
    title: `Redeeming...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Redeeming...",
  });

  const lpWeiAmount = parseUnits(Big(lpAmount).toFixed(18));

  const withdrawContract = new ethers.Contract(
    vaultAddress,
    ABI,
    Ethers.provider().getSigner()
  );

  withdrawContract
    .claimAndRequestWithdraw(lpWeiAmount, account, {
      gasLimit: 4000000,
    })
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      State.update({
        lpAmount: "",
        isLoading: false,
        isPostTx: true,
        updater: new Date().getTime(),
      });

      const { status, transactionHash } = receipt;

      // addAction?.({
      //   type: "Liquidity",
      //   action: "Withdraw",
      //   token0,
      //   amount: lpAmount,
      //   template: defaultDex,
      //   status: status,
      //   add: false,
      //   transactionHash,
      //   chain_id: state.chainId,
      // });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      toast?.dismiss(toastId);
      toast?.success({
        title: "Redeem Successfully!",
      });
      onSuccess?.();
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Redeem Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : error?.message ?? "",
      });
    });
};
const handleWithdraw = () => {
  const toastId = toast?.loading({
    title: `Withdrawing...`,
  });
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Withdrawing...",
  });

  const lpWeiAmount = parseUnits(Big(lpAmount).toFixed(18));

  const withdrawContract = new ethers.Contract(
    vaultAddress,
    ABI,
    Ethers.provider().getSigner()
  );

  withdrawContract
    .claimOwedAssets(account, {
      gasLimit: 4000000,
    })
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      State.update({
        lpAmount: "",
        isLoading: false,
        isPostTx: true,
        updater: new Date().getTime(),
      });

      const { status, transactionHash } = receipt;

      addAction?.({
        type: "Liquidity",
        action: "Withdraw",
        token0,
        amount: lpAmount,
        template: defaultDex,
        status: status,
        add: false,
        transactionHash,
        chain_id: state.chainId,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      toast?.dismiss(toastId);
      toast?.success({
        title: "Withdraw Successfully!",
      });
      onSuccess?.();
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Withdraw Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : error?.message ?? "",
      });
    });
};

const isInSufficient = Number(amount0) > Number(balances[token0]);

const isWithdrawInsufficient = Number(lpAmount) > Number(data?.shares);

const balance0 =
  !amount0 || !prices?.[token0]
    ? "-"
    : parseFloat(Big(amount0).times(prices[token0]).toFixed(4));

// const onUpdateLpPercent = (percent) => {
//   State.update({
//     lpPercent: percent,
//   });
// };

useEffect(() => {
  if (amount0) {
    handleToken0Change(amount0);
  }
}, [data]);

return (
  <DetailWrapper>
    <FilterButtonList>
      <FilterButton
        className={isDeposit ? "isActive" : ""}
        onClick={() => changeMode(true)}
      >
        Deposit
      </FilterButton>
      <FilterButton
        className={!isDeposit ? "isActive" : ""}
        onClick={() => changeMode(false)}
      >
        Withdraw
      </FilterButton>
    </FilterButtonList>
    <CycleWrap>
      <span>Round #{data?.cycleIndex} in progress</span>
      <span className="times">
        <Widget
          src="bluebiu.near/widget/Utils.CountDown"
          props={{
            time: data?.fundingLockTimestamp - Date.now() / 1000,
          }}
        />
      </span>
    </CycleWrap>
    {detailLoading ? (
      <div style={{ padding: "30px 0 45px" }}>
        <Widget
          props={{
            color: "#999",
          }}
          src="bluebiu.near/widget/Liquidity.Bridge.Loading"
        />
      </div>
    ) : (
      <>
        {isDeposit ? (
          <>
            <Row className="price-input">
              <Column>
                <InputWrap
                  className={
                    Number(amount0) > Number(balances[token0])
                      ? "inSufficient"
                      : ""
                  }
                >
                  <Input
                    value={amount0}
                    type="number"
                    onChange={(e) => handleToken0Change(e.target.value)}
                  />
                  <InputSuffix>
                    <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                    <span>{token0}</span>
                  </InputSuffix>
                </InputWrap>
                <PriceWrap>
                  <TotalPrice>${balance0}</TotalPrice>
                  <BalancePrice>
                    Balance:
                    <span onClick={() => handleMax(true)}>
                      {Big(balances[token0] ?? 0).toFixed(6)}
                    </span>{" "}
                    {token0}
                  </BalancePrice>
                </PriceWrap>
              </Column>
            </Row>
            <StyledButtonList>
              {isInSufficient && (
                <StyledButton disabled>InSufficient Balance</StyledButton>
              )}
              {!isInSufficient &&
                (isToken0Approved && !isToken0Approving ? (
                  <StyledButton
                    disabled={isLoading || !amount0}
                    onClick={handleDeposit}
                  >
                    {isLoading ? (
                      <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                    ) : (
                      "Deposit"
                    )}
                  </StyledButton>
                ) : (
                  <>
                    <StyledButton
                      disabled={isToken0Approved || isToken0Approving}
                      onClick={() => handleApprove(true)}
                    >
                      {isToken0Approving ? (
                        <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                      ) : (
                        <>
                          {isToken0Approved ? "Approved" : "Approve"} {token0}
                        </>
                      )}
                    </StyledButton>
                  </>
                ))}
            </StyledButtonList>
            <CycleWrap>
              <span
                className="assets"
                title="Amount will be deployed after processing.
This may take up to 2 workdays in the UTC+8 timezone."
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="svg"
                >
                  <path fill="#8DC0D6" d="M6 4h12v.895H6z"></path>
                  <path
                    fill="#8DC0D6"
                    fill-rule="evenodd"
                    d="M8.23 4.895H7.154V8.1a4.846 4.846 0 1 0 9.693 0V4.895h-1.078v3.388a3.77 3.77 0 1 1-7.539 0V4.895Z"
                    clip-rule="evenodd"
                  ></path>
                  <path fill="#8DC0D6" d="M18 21H6v-.895h12z"></path>
                  <path
                    fill="#8DC0D6"
                    fill-rule="evenodd"
                    d="M15.77 20.105h1.076V16.9a4.846 4.846 0 1 0-9.693 0v3.206h1.078v-3.388a3.77 3.77 0 1 1 7.539 0v3.388Z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#F4D2B9"
                    d="M9.308 7.579h5.384v.886a2.692 2.692 0 0 1-5.384 0V7.58ZM8.23 17.421h7.538v2.684H8.23z"
                  ></path>
                </svg>
                <span className="title">Pending</span>
              </span>
              <span className="assets">
                <TokenImg src={ICON_VAULT_MAP[token0]} alt={token0} />
                {formatUnits(data?.pendingAssets, decimals0)}
              </span>
            </CycleWrap>
          </>
        ) : (
          <>
            <Row className="price-input">
              <Column>
                <InputWrap>
                  <Input
                    value={lpAmount}
                    type="number"
                    onChange={(e) => {
                      handleLPChange(e.target.value);
                    }}
                  />

                  <InputSuffix>
                    <StyledImageList>
                      <img
                        src="https://ipfs.near.social/ipfs/bafkreid5qrwbz7xq56opxfhi5pxukxf2kxs53ciuxpnhfqugaf7c4rw4jy"
                        alt=""
                      />
                    </StyledImageList>
                    {/* <span>{token0}</span> */}
                  </InputSuffix>
                </InputWrap>
                <PriceWrap>
                  <TotalPrice>{/* ${balanceLp} */}</TotalPrice>
                  <BalancePrice>
                    Balance:{" "}
                    <span
                      onClick={() => {
                        handleLPChange(data?.shares);
                      }}
                    >
                      {Number(data?.shares).toFixed(4)}
                    </span>
                    Shares
                  </BalancePrice>
                </PriceWrap>
              </Column>
            </Row>
            <StyledButtonList>
              <StyledButton
                disabled={
                  true
                  // isWithdrawInsufficient || isLoading || Number(lpAmount) <= 0
                }
                onClick={handleRedeem}
              >
                {isLoading ? (
                  <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                ) : (
                  <>
                    {isWithdrawInsufficient ? "InSufficient Balance" : "Redeem"}
                  </>
                )}
              </StyledButton>
            </StyledButtonList>
            <CycleWrap>
              <span
                className="assets"
                title={`Amount will be exchanged back into ${token0} after processing.
This may take up to 2 workdays in the UTC+8 timezone.`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="svg"
                >
                  <path fill="#8DC0D6" d="M6 4h12v.895H6z"></path>
                  <path
                    fill="#8DC0D6"
                    fill-rule="evenodd"
                    d="M8.23 4.895H7.154V8.1a4.846 4.846 0 1 0 9.693 0V4.895h-1.078v3.388a3.77 3.77 0 1 1-7.539 0V4.895Z"
                    clip-rule="evenodd"
                  ></path>
                  <path fill="#8DC0D6" d="M18 21H6v-.895h12z"></path>
                  <path
                    fill="#8DC0D6"
                    fill-rule="evenodd"
                    d="M15.77 20.105h1.076V16.9a4.846 4.846 0 1 0-9.693 0v3.206h1.078v-3.388a3.77 3.77 0 1 1 7.539 0v3.388Z"
                    clip-rule="evenodd"
                  ></path>
                  <path
                    fill="#F4D2B9"
                    d="M9.308 7.579h5.384v.886a2.692 2.692 0 0 1-5.384 0V7.58ZM8.23 17.421h7.538v2.684H8.23z"
                  ></path>
                </svg>
                <span className="title">Pending</span>
              </span>
              <span className="assets">
                <TokenImg
                  src="https://ipfs.near.social/ipfs/bafkreid5qrwbz7xq56opxfhi5pxukxf2kxs53ciuxpnhfqugaf7c4rw4jy"
                  alt=""
                />
                {data?.requestedWithdrawals}
              </span>
            </CycleWrap>
            <CycleWrap>
              <span
                className="assets"
                title="Amount ready to be claimed and moved to your wallet"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="svg"
                >
                  <path
                    fill="#8DC0D6"
                    d="M4.455 20.727H17.69v1.026H4.455v-1.026Z"
                  ></path>
                  <path
                    stroke="#8DC0D6"
                    stroke-width="1.2"
                    d="M5.054 8.237h11.891v9a1.8 1.8 0 0 1-1.8 1.8h-8.29a1.8 1.8 0 0 1-1.8-1.8v-9Z"
                  ></path>
                  <path
                    stroke="#8DC0D6"
                    stroke-width="1.3"
                    d="M18 9.35h-.65v4.573h2.032c.8 0 1.45-.65 1.45-1.45V10.8c0-.8-.65-1.45-1.45-1.45H18Z"
                  ></path>
                  <path
                    fill="#F4D2B9"
                    d="m9.95 16.257-2.128-2.378a.397.397 0 0 1 0-.517l.463-.517a.304.304 0 0 1 .463 0l1.433 1.601 3.07-3.43a.304.304 0 0 1 .462 0l.463.518a.397.397 0 0 1 0 .517l-3.764 4.206a.304.304 0 0 1-.462 0Z"
                  ></path>
                  <path
                    fill="#FFE9D9"
                    d="M8.528 2.247h1.018v3.08H8.528zM12.602 3.273h1.018v2.053h-1.018z"
                  ></path>
                </svg>
                <span className="title">Ready</span>
              </span>
              <span className="assets">
                <TokenImg src={ICON_VAULT_MAP[token0]} alt={token0} />
                {/* {formatUnits(data?.pendingAssets, decimals0)} */}
              </span>
            </CycleWrap>
            <StyledButtonList>
              <StyledButton disabled={true} onClick={handleWithdraw}>
                {isLoading ? (
                  <Widget src="bluebiu.near/widget/Liquidity.Bridge.Loading" />
                ) : (
                  "Withdraw"
                )}
              </StyledButton>
            </StyledButtonList>
          </>
        )}
      </>
    )}
  </DetailWrapper>
);
