const StyledButtonList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`
const StyledLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 1.5s linear  infinite;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
const StyledButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(180deg, #eef3bf 0%, #e9f456 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-size: 18px;
  line-height: 22px;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
  transition: 0.3s;
  border: none;
  float: right;
  margin-bottom: 20px;

  &:disabled {
    background: linear-gradient(180deg, #5f614d 0%, #3a3d11 100%);
  }
  &:not(disabled):hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.8;
  }
`;
const iconCircle = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8" stroke="#1E2028" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const {
  toast,
  token0,
  token1,
  amount0,
  amount1,
  balance0,
  balance1,
  addAction,
  addresses,
  hypeAddress,
  setAmount0,
  setAmount1,
  currentPair,
  proxyAddress,
  onLoad,
  onSuccess,

} = props


State.init({
  isLoading: false,
  isError: false,
  loadingMsg: '',
  isToken0Approved: false,
  isToken1Approved: false,
  isToken0Approving: false,
  isToken1Approving: false,
})

const {
  isLoading,
  isError,
  loadingMsg,
  isToken0Approved,
  isToken1Approved,
  isToken0Approving,
  isToken1Approving
} = state


const isInSufficient = Number(amount0) > Number(balance0) || Number(amount1) > Number(balance1)

const sender = Ethers.send("eth_requestAccounts", [])[0];

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
      a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) &&
      b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)
    ) {
      return midpointFixed;
    }
  }

  return "0";
};
const checkApproval = (token0Amount, token1Amount) => {
  const token0Wei = ethers.utils.parseUnits(
    Big(token0Amount).toFixed(token0.decimals),
    token0.decimals
  );
  const token1Wei = ethers.utils.parseUnits(
    Big(token1Amount).toFixed(token1.decimals),
    token1.decimals
  );
  const abi = [
    "function allowance(address, address) external view returns (uint256)",
  ];

  const token0Contract = new ethers.Contract(
    addresses[token0.symbol],
    abi,
    Ethers.provider()
  );

  token0Contract
    .allowance(sender, hypeAddress)
    .then((allowance0) => {
      State.update({
        isToken0Approved: !new Big(allowance0.toString()).lt(token0Wei),
      })
    })
    .catch((e) => console.log(e));

  const token1Contract = new ethers.Contract(
    addresses[token1.symbol],
    abi,
    Ethers.provider()
  );

  token1Contract
    .allowance(sender, hypeAddress)
    .then((allowance1) => {
      State.update({
        isToken1Approved: !new Big(allowance1.toString()).lt(token1Wei),
      })
    })
    .catch((e) => console.log(e));
};

const handleTokenChange = (amount, symbol) => {
  (symbol === token0.symbol) ? setAmount0(amount) : setAmount1(amount)


  if (Number(amount) === 0) {
    symbol === token0.symbol ? setAmount1("") : setAmount0("")
    State.update({
      isToken0Approved: true,
      isToken1Approved: true
    })
    return;
  }
  State.update({
    isLoading: true,
    isError: false,
    loadingMsg: "Computing deposit amount..."
  })

  const decimals = (symbol === token0.symbol ? token0.decimals : token1.decimals)
  const otherDecimals = symbol === token0.symbol ? token1.decimals : token0.decimals

  const tokenWei = ethers.utils.parseUnits(
    Big(amount).toFixed(decimals),
    decimals
  );
  const proxyAbi = [
    "function getDepositAmount(address, address, uint256) public view returns (uint256, uint256)",
  ];
  const proxyContract = new ethers.Contract(
    proxyAddress,
    proxyAbi,
    Ethers.provider()
  );
  proxyContract
    .getDepositAmount(ethers.utils.getAddress(hypeAddress), addresses[symbol], tokenWei)
    .then((depositAmount) => {
      const otherAmount = getFromDepositAmount(depositAmount, otherDecimals);
      symbol === token0.symbol ? setAmount1(otherAmount) : setAmount0(otherAmount)
      State.update({
        isLoading: false,
      })
      checkApproval(amount, otherAmount);
    })
    .catch((e) => {
      State.update({
        isLoading: true,
        isError: true,
        loadingMsg: "Something went wrong. Please try again."
      })
      symbol === token0.symbol ? setAmount1(0) : setAmount0(0)
    });
};

const handleApprove = (symbol) => {
  const isToken0 = symbol === token0.symbol
  const payload = isToken0
    ? { isToken0Approving: true }
    : { isToken1Approving: true };
  const amount = isToken0 ? Big(amount0).toFixed(token0.decimals) : Big(amount1).toFixed(token1.decimals);
  const toastId = toast?.loading({
    title: `Approve ${amount} ${symbol}`,
  });

  State.update({
    ...payload,
    isLoading: true,
    loadingMsg: `Approving ${_token}...`,
  });
  const tokenWei = ethers.utils.parseUnits(
    amount,
    isToken0 ? token0.decimals : token1.decimals
  );
  const abi = ["function approve(address, uint) public"];
  const tokenContract = new ethers.Contract(
    addresses[symbol],
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
      toast?.dismiss(toastId);
      toast?.success({
        title: "Approve Successfully!",
        text: `Approve ${amount} ${symbol}`,
        tx: receipt.transactionHash,
        chainId,
      });
    })
    .catch((error) => {
      State.update({
        isError: true,
        isLoading: false,
        loadingMsg: error,
        isToken0Approving: false,
        isToken1Approving: false,
      });
      toast?.dismiss(toastId);
      toast?.fail({
        title: "Approve Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Approve ${amount} ${symbol}`,
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

  const token0Wei = ethers.utils.parseUnits(
    Big(amount0).toFixed(token0.decimals),
    token0.decimals
  );
  const token1Wei = ethers.utils.parseUnits(
    Big(amount1).toFixed(token1.decimals),
    token1.decimals
  );

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

      addAction?.({
        type: "Liquidity",
        action: "Liquidity",
        token0: token0.symbol,
        token1: token1.symbol,
        amount: amount0,
        template: "Gamma",
        status: status,
        transactionHash,
        chain_id: chainId,
      });
      State.update({
        isLoading: false,
      });
      onSuccess()
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
onLoad({
  onTokenChange: handleTokenChange
})

if (amount0 === '0.01' && amount1 === '') {
  sender && handleTokenChange('0.01', token0.symbol)
}
return (
  <StyledButtonList>
    {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
    {
      !isInSufficient &&
      (isToken0Approved &&
        isToken1Approved &&
        !isToken0Approving &&
        !isToken1Approving ? (

        <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
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
          <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(token0.symbol)}>{
            isToken0Approving ? (
              <StyledLoading>{iconCircle}</StyledLoading>
            ) : (
              <>
                {isToken0Approved ? "Approved" : "Approve"} {currentPair.token0}
              </>
            )}
          </StyledButton>
          <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(token1.symbol)}>{
            isToken1Approving ? (
              <StyledLoading>{iconCircle}</StyledLoading>
            ) : (
              <>
                {isToken1Approved ? "Approved" : "Approve"} {currentPair.token1}
              </>
            )}
          </StyledButton>
        </>
      ))
    }
  </StyledButtonList>
)