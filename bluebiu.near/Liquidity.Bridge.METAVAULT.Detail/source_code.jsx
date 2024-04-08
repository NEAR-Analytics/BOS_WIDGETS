
const {
  data,
  toast,
  prices,
  refetch,
  addresses,
  addAction,
  storeAddress,
  ICON_VAULT_MAP
} = props;

const {
  StyledFont,
  StyledFlex,
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
  StyledLoading
} = VM.require('bluebiu.near/widget/Liquidity.Handler.Styles')


const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="#1E2028" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>

)
const defaultDeposit = props.tab === "deposit" || !props.tab;

// const curPositionUSD = userPositions[data.vaultAddress]?.balanceUSD;

State.init({
  isDeposit: defaultDeposit,
  lpBalance: "",
  balances: [],
  amount: "",
  lpAmount: "",
  isError: false,
  isLoading: false,
  isTokenApproved: true,
  isTokenApproving: false,
  loadingMsg: "",
  isPostTx: false,
  showPairs: false,
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
const { token, decimals, id, poolAddress } = data || defaultPair;

const vaultAddress = addresses[id];

const updateLPBalance = () => {
  const sender = Ethers.send("eth_requestAccounts", [])[0];
  const abi = [{
    "inputs": [
      {
        "internalType": "address[]",
        "name": "_assets",
        "type": "address[]"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getUserBalances",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(storeAddress),
    abi,
    Ethers.provider()
  );
  contract
    .getUserBalances([vaultAddress], sender)
    .then((result) => {
      State.update({
        lpBalance: Big(ethers.utils.formatUnits(result[0], decimals)).toFixed(6),
      });
    })
};
const updateBalance = () => {
  const symbol = token
  const address = addresses[token]
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
    const abi = ["function balanceOf(address) view returns (uint256)"];
    const contract = new ethers.Contract(
      address,
      abi,
      Ethers.provider()
    );
    contract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = Big(
        ethers.utils.formatUnits(balanceBig, decimals)
      ).toString();
      State.update({
        balances: {
          ...state.balances,
          [symbol]: adjustedBalance,
        },
      });
    });
  }
};

const {
  isDeposit,
  balances,
  amount,
  isLoading,
  isError,
  isTokenApproved,
  isTokenApproving,
  loadingMsg,
  lpBalance,
  lpAmount,
  isPostTx,
} = state;

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
};

const handleMax = () => {
  handleTokenChange(balances[token], token);
};

const handleTokenChange = (value, symbol) => {
  State.update({
    amount: value
  })
  if (Number(value) === 0) {
    State.update({
      isTokenApproved: true,
    })
    return;
  }
};

const handleLPChange = (amount) => {
  State.update({
    lpAmount: amount,
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
  const _amount = Big(amount)
    .mul(Big(10).pow(decimals))
    .toFixed(0);


  const abi = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "_asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }];
  const contract = new ethers.Contract(
    ethers.utils.getAddress(storeAddress),
    abi,
    Ethers.provider().getSigner()
  );
  contract
    .deposit(vaultAddress, _amount, {
      value: _amount
    })
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      const { status, transactionHash } = receipt;
      // addAction?.({
      //   type: "Liquidity",
      //   action: "Deposit",
      //   token,
      //   amount,
      //   template: "Metavault",
      //   status: status,
      //   transactionHash,
      //   chain_id: props.chainId,
      // });

      State.update({
        isLoading: false,
        isPostTx: true,
      });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      if (refetch) refetch();

      toast?.dismiss(toastId);
      toast?.success({
        title: "Deposit Successfully!",
      });
    })
    .catch((error) => {
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
          : "",
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
  const _amount = Big(lpAmount)
    .mul(Big(10).pow(18))
    .toFixed(0)

  const abi = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "_asset",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }];

  const contract = new ethers.Contract(
    ethers.utils.getAddress(storeAddress),
    abi,
    Ethers.provider().getSigner()
  );
  contract
    .withdraw(vaultAddress, _amount)
    .then((tx) => {
      return tx.wait();
    })
    .then((receipt) => {
      State.update({
        isLoading: false,
        isPostTx: true,
      });

      const { status, transactionHash } = receipt;

      // addAction?.({
      //   type: "Liquidity",
      //   action: "Withdraw",
      //   token,
      //   amount: lpAmount,
      //   template: "Metavault",
      //   status: status,
      //   transactionHash,
      //   chain_id: state.chainId,
      // });

      setTimeout(() => State.update({ isPostTx: false }), 10_000);

      if (refetch) refetch();

      toast?.dismiss(toastId);
      toast?.success({
        title: "Withdraw Successfully!",
      });
    })
    .catch((error) => {
      console.log('error', error)
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
          : "",
      });
    });
};

const tokensPrice = prices;

const isInSufficient =
  Number(amount) > Number(balances[token])

const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

const balance =
  !amount || !tokensPrice?.[token]
    ? "-"
    : parseFloat(Big(amount).times(tokensPrice[token]).toFixed(4));



const balanceLp =
  !lpAmount || !tokensPrice?.[token]
    ? "-"
    : parseFloat(
      parseFloat(Big(lpAmount).times(tokensPrice[token]).toFixed(4))
    );

const onUpdateLpPercent = (percent) => {
  State.update({
    lpPercent: percent,
  });
};

const onChangeSlider = (percent) => {
  const newLpValue = Big(percent)
    .div(100)
    .times(lpBalance || 0)
    .toFixed(6);

  handleLPChange(newLpValue);
};

useEffect(() => {
  if (!sender || !token) return;
  updateBalance()
  updateLPBalance();
}, [sender, token]);

useEffect(() => {
  if (amount) {
    handleTokenChange(amount, token);
  }
}, [data]);

return (
  <DetailWrapper>
    <FilterButtonList>
      <FilterButton className={isDeposit ? 'isActive' : ''} onClick={() => changeMode(true)}>Deposit</FilterButton>
      <FilterButton className={!isDeposit ? 'isActive' : ''} onClick={() => changeMode(false)}>Withdraw</FilterButton>
    </FilterButtonList>
    {
      isDeposit ? <>
        <Row className="price-input">
          <Column>
            <InputWrap className={Number(amount) > Number(balances[token]) ? "inSufficient" : ""}>
              <Input value={amount} type="number" onChange={(e) => handleTokenChange(e.target.value, token)} />
              <InputSuffix>
                <img src={ICON_VAULT_MAP[token]} alt={token} />
                <span>{token}</span>
              </InputSuffix>
            </InputWrap>
            <PriceWrap>
              <TotalPrice>${balance}</TotalPrice>
              <BalancePrice>Balance:<span onClick={() => handleMax(true)}>{Big(balances[token] ?? 0).toFixed(6)}</span> {token}</BalancePrice>
            </PriceWrap>
          </Column>
        </Row>
        <StyledButtonList>
          {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
          {
            !isInSufficient &&
            (isTokenApproved &&
              !isTokenApproving ? (

              <StyledButton disabled={isLoading || !amount} onClick={handleDeposit}>
                {
                  isLoading ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    "Deposit"
                  )
                }
              </StyledButton>
            ) : (
              <>
                <StyledButton disabled={isTokenApproved || isTokenApproving} onClick={() => handleApprove(true)}>{
                  isTokenApproving ? (
                    <StyledLoading>{iconCircle}</StyledLoading>
                  ) : (
                    <>
                      {isTokenApproved ? "Approved" : "Approve"} {token}
                    </>
                  )}
                </StyledButton>
              </>
            ))
          }
        </StyledButtonList>
      </> : <>
        <Row className="price-input">
          <Column>
            <InputWrap>
              <Input value={lpAmount} type="number" onChange={(e) => {
                handleLPChange(e.target.value);

                const value = e.target.value;

                if (!value) {
                  onUpdateLpPercent(0);
                }

                if (value && Big(value).gt(0)) {
                  const newSliderPercent = Big(value || 0)
                    .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                    .times(100)
                    .toFixed(0);
                  onUpdateLpPercent(newSliderPercent);
                }
              }} />

              <InputSuffix>
                <StyledImageList>
                  <img src={ICON_VAULT_MAP[token]} alt={token} />
                </StyledImageList>
                <span>{token}</span>
              </InputSuffix>
            </InputWrap>
            <PriceWrap>
              <TotalPrice>${balanceLp}</TotalPrice>
              <BalancePrice>Balance: <span
                onClick={() => {
                  const newSliderPercent = Big(lpBalance || 0)
                    .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                    .times(100)
                    .toFixed(0);

                  onUpdateLpPercent(newSliderPercent);

                  handleLPChange(lpBalance);
                }}
              >
                {lpBalance}
              </span></BalancePrice>
            </PriceWrap>
          </Column>
        </Row>
        <StyledButtonList>
          <StyledButton
            disabled={isWithdrawInsufficient || isLoading || !lpAmount}
            onClick={handleWithdraw}
          >
            {isLoading ? (
              <StyledLoading>{iconCircle}</StyledLoading>
            ) : (
              <>
                {isWithdrawInsufficient ? "InSufficient Balance" : "Withdraw"}
              </>
            )}
          </StyledButton>
        </StyledButtonList>
      </>
    }

  </DetailWrapper>
)