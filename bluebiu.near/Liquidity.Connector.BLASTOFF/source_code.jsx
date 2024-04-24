
const StyledBlastoff = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`
const StyledCapsuleButtonList = styled.div`
  margin-top: 33px;
  display: flex;
  align-items: center;
  padding: 4px;
  /* gap: 20px; */

  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`
const StyledCapsuleButton = styled.div`
  padding: 8px 33px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;

  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledVaultContainer = styled.div`
  margin-top: 20px;
  width: 478px;
  height: 655px;
  padding: 20px 18px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledVaultTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledVaultTitle = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const StyledTokenButtonList = styled.div`
  margin: 28px 0 20px;
  display: flex;
  align-items: center;
  gap: 9px;
`
const StyledTokenButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 218px;
  height: 37px;
  border-radius: 8px;
  border: 1px solid var(--button-color);
  cursor: pointer;

  color: var(--button-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.active {
    color: var(--button-text-color);
    background: var(--button-color);
  }
  
`
const StyledVaultTipsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
const StyledVaultTips = styled.div`
  width: 100%;
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledStackedRectangle = styled.div`
  margin: 20px 0;
  height: 213px;
  border-radius: 12px;
  border: 1px solid #373A53;
  padding: 13px 12px 15px;

`
const StyledStackedRectangleTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StackedRectangleBalance = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const StackedRectangleBalanceTitle = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StackedRectangleBalanceSubTitle = styled.div`
  color: #F49102;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledStackedRectangleMiddle = styled.div`
  margin: 14px 0;
  padding: 10px 14px;
  height: 71px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
`
const StyledStackedRectangleMiddleTop = styled.div`
  margin-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledStackedRectangleMiddleTitle = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledStackedRectangleMiddleMax = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
  cursor: pointer;
`
const StyledStackedRectangleMiddleInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  color: #979ABE;
  font-family: Gantari;
  font-size: 26px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type="number"]::-webkit-outer-spin-button,
  &[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }

`
const StyledStackedRectangleBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledStakeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: var(--button-color);
  cursor: pointer;

  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledStakeLoadingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  background: var(--button-color);
  opacity: 0.8;
`
const StyledPositionsContainer = styled.div`

`
const StyledPositionsTips = styled.div`
  margin-top: 73px;
  text-align: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPostions = styled.div`
  margin-top: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`
const StyledPostion = styled.div`
  display: flex;
  align-items: center;

  padding: 0 22px;
  width: 1200px;
  height: 97px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledPostionColumn = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const StyledPostionRow = styled.div`
  display: flex;
  gap: 10px;
`

const StyledPostionLabel = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPostionValue = styled.div`
  color: #F49102;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledClaimButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 182px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;

  color: #000;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  background: #FFF;
  
`
const StyledUnstakeButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 182px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;

  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 1px solid #FFF;
`
const {
  toast,
  chainId,
  CHAIN_LIST,
  multicallAddress,
  dexConfig,
  curChain,
  isChainSupported,
  onSwitchChain,
  addAction,
  connectProps,
  prices,
} = props
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) {
  return (
    <Widget
      style={dexConfig.theme}
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...connectProps,
        isWrongNetwork: false,
      }}
    />
  );
}


State.init({
  categoryList: ["Vaults", "Positions"],
  categoryIndex: 0,
  symbolList: ["ETH", "USDC"],
  symbolIndex: 0,
  pool: null,
  positionList: [],
  stakeLoading: false,
  stakedAmount: "",
})

const {
  pool,
  categoryList,
  categoryIndex,
  symbolList,
  symbolIndex,
  stakedAmount,
  stakeLoading,
  positionList,
} = state

const COLUMN_LIST = [{
  key: "userStakePosition",
  type: "money",
  width: "15%",
}, {
  key: "yield",
  label: "Yield Earned",
  type: "money",
  width: "15%",
}, {
  key: "off",
  label: "$OFFxPoints / Hour",
  width: "15%",
}, {
  key: "bx",
  label: "$BxPoints / Hour",
  width: "15%",
}, {
  key: "operation",
  label: "",
  width: "40%",
}]
const contractAddress = "0xd9747a98624f0B64B4412632C420672E16432334"
const isInSufficient = Number(stakedAmount) > Number(pool?.walletBalance)

function promiseContractQuery(address, abi, method, data) {
  const contract = new ethers.Contract(
    ethers.utils.getAddress(address),
    abi,
    Ethers.provider().getSigner()
  );
  return new Promise((resolve, reject) => {
    contract[method](...data).then(resolve).catch(reject)
  })

}
function queryPool(poolId) {
  const promiseArray = []
  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "poolInfo",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "yieldAPY",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "yieldToken",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "stakeToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "totalStaked",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getUserStakePosition",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "lastCalcTs",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "pendingReward",
            "type": "uint256"
          }
        ],
        "internalType": "struct INonLockStaking.StakePosition",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
  // query poolInfo
  promiseArray.push(promiseContractQuery(
    contractAddress,
    abi,
    "poolInfo",
    [poolId]
  ))
  // query getUserStakePosition
  promiseArray.push(promiseContractQuery(
    contractAddress,
    abi,
    "getUserStakePosition",
    [poolId, sender]
  ))
  return new Promise((resolve, reject) => {
    Promise.all(promiseArray)
      .then(result => {
        const [poolInfoResult, getUserStakePositionResult] = result
        const yieldAPY = Big(poolInfoResult[0]).div(1000).toString()
        const stakeToken = poolInfoResult[2]
        const userStakePosition = ethers.utils.formatUnits(getUserStakePositionResult[0], 18)
        if (poolId === 0) {
          Ethers.provider()
            .getBalance(sender)
            .then((balanceResult) => {
              const walletBalance = ethers.utils.formatEther(balanceResult);
              const pool = {
                yieldAPY,
                stakeToken,
                walletBalance,
                userStakePosition
              }
              resolve(pool)
            });
        } else {
          const contract = new ethers.Contract(
            stakeToken,
            ["function balanceOf(address) view returns (uint256)"],
            Ethers.provider()
          );
          contract.balanceOf(sender)
            .then(balanceResult => {
              const walletBalance = ethers.utils.formatUnits(balanceResult, 18);
              const pool = {
                yieldAPY,
                stakeToken,
                walletBalance,
                userStakePosition
              }
              resolve(pool)
            })
        }
      })
      .catch(reject)
  })

}
function handleQueryPool(poolId) {
  queryPool(poolId).then(pool => {
    State.update({
      pool
    })
  }).catch(error => {
    console.log('=error', error)
  })
}
function handleStakedAmountChange(amount) {
  if (Number(amount) === 0) {
    State.update({
      stakedAmount: amount
    })
    return
  }
  State.update({
    stakedAmount: amount
  })
}
function handleQueryPositions() {
  const promiseArray = []
  promiseArray.push(queryPool(0))
  promiseArray.push(queryPool(1))
  Promise.all(promiseArray)
    .then(result => {
      State.update({
        positionList: result.map((pool, poolId) => {
          return {
            poolId,
            ...pool,
          }
        }).filter(position => Big(position.userStakePosition).gt(0))
      })
    })
}
function doStake(_amount) {
  const toastId = toast?.loading({
    title: `Stake ${stakedAmount} ${symbolList[symbolIndex]}`,
  });
  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(contractAddress),
    abi,
    Ethers.provider().getSigner()
  );
  const params = symbolIndex === 0 ? [symbolIndex, _amount, { value: _amount }] : [symbolIndex, _amount]
  contract.stake(...params)
    .then((tx) => tx.wait())
    .then(result => {
      const { status, transactionHash } = result;
      toast?.dismiss(toastId);
      if (status !== 1) throw new Error("");
      toast?.success({
        title: "Stake Successfully!",
        text: `Stake ${stakedAmount} ${symbolList[symbolIndex]}`,
        tx: transactionHash,
        chainId,
      });
      State.update({
        stakeLoading: false
      })
      handleQueryPool(symbolIndex)
    })
    .catch(error => {
      State.update({
        stakeLoading: false
      })
      toast?.fail({
        title: "Stake Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Stake ${stakedAmount} ${symbolList[symbolIndex]}`,
      });
    })
}
function handleStake() {
  const _amount = Big(stakedAmount)
    .mul(Big(10).pow(18))
    .toFixed(0);
  State.update({
    stakeLoading: true
  })
  if (symbolIndex === 0) {
    doStake(_amount)
  } else {
    const toastId = toast?.loading({
      title: `Approve ${stakedAmount} ${symbolList[symbolIndex]}`,
    });
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }]
    const contract = new ethers.Contract(
      ethers.utils.getAddress(pool.stakeToken),
      abi,
      Ethers.provider().getSigner()
    );
    contract
      .approve(contractAddress, _amount)
      .then(tx => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error("");
        toast?.success({
          title: "Approve Successfully!",
          text: `Approved ${stakedAmount} ${symbolList[symbolIndex]}`,
          tx: transactionHash,
          chainId,
        });
        doStake(_amount)
      })
      .catch(error => {
        State.update({
          stakeLoading: false
        })
        toast?.fail({
          title: "Approve Failed!",
          text: error?.message?.includes("user rejected transaction")
            ? "User rejected transaction"
            : `Approved ${stakedAmount} ${symbolList[symbolIndex]}`,
        });
      })
  }
}
function handleClaim(index) {
  const position = positionList[index]
  const toastId = toast?.loading({
    title: `Claim ${position.userStakePosition} ${symbolList[position.poolId]}`,
  });
  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "claimPendingReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    Ethers.provider().getSigner()
  );
  contract.claimPendingReward(position.poolId)
    .then(tx => tx.wait())
    .then(result => {
      const { status, transactionHash } = result;
      toast?.dismiss(toastId);
      if (status !== 1) throw new Error("");
      toast?.success({
        title: "Claim Successfully!",
        text: `Claimed ${position.userStakePosition} ${symbolList[position.poolId]}`,
        tx: transactionHash,
        chainId,
      });
      handleQueryPositions()
    })
}
function handleUnstake(index) {
  const position = positionList[index]
  const toastId = toast?.loading({
    title: `unstake ${position.userStakePosition} ${symbolList[position.poolId]}`,
  });
  const abi = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "poolId",
        "type": "uint256"
      }
    ],
    "name": "unstake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    contractAddress,
    abi,
    Ethers.provider().getSigner()
  );
  contract.unstake(position.poolId)
    .then(tx => tx.wait())
    .then(result => {
      const { status, transactionHash } = result;
      toast?.dismiss(toastId);
      if (status !== 1) throw new Error("");
      toast?.success({
        title: "unstake Successfully!",
        text: `unstaked ${position.userStakePosition} ${symbolList[position.poolId]}`,
        tx: transactionHash,
        chainId,
      });
      handleQueryPositions()
    })
}
function handleMax() {
  State.update({
    stakedAmount: state.pool?.walletBalance
  })
}
useEffect(() => {
  handleQueryPool(symbolIndex)
  State.update({
    stakedAmount: ""
  })
}, [symbolIndex])
useEffect(() => {
  if (categoryIndex > 0) {
    handleQueryPositions()
  }
}, [categoryIndex])
return (
  <StyledBlastoff>
    <StyledCapsuleButtonList>
      {
        categoryList.map((category, index) => (
          <StyledCapsuleButton
            key={index}
            style={{
              background: categoryIndex === index ? "#32364B" : "transparent",
              borderColor: categoryIndex === index ? "#373A53" : "transparent",
              color: categoryIndex === index ? "#FFF" : "#979ABE"
            }}
            onClick={() => {
              State.update({
                categoryIndex: index
              })
            }}
          >{category}</StyledCapsuleButton>
        ))
      }

    </StyledCapsuleButtonList>
    {
      categoryIndex === 0 ? (
        <StyledVaultContainer>
          <StyledVaultTop>
            <StyledVaultTitle>GEN1 YIELD VAULT</StyledVaultTitle>
            {/* <svg width="37" height="29" viewBox="0 0 37 29" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect opacity="0.3" width="37" height="29" fill="url(#pattern0_9403_665)" />
          <defs>
            <pattern id="pattern0_9403_665" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_9403_665" transform="matrix(0.00819672 0 0 0.0104579 0 -0.00197852)" />
            </pattern>
            <image id="image0_9403_665" width="122" height="96" xlink:href="data:image/png;base64,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" />
          </defs>
        </svg> */}
          </StyledVaultTop>
          <StyledTokenButtonList>
            {
              symbolList.map((symbol, index) => (
                <StyledTokenButton
                  key={index}
                  className={symbolIndex === index ? "active" : ""}
                  onClick={() => {
                    State.update({
                      symbolIndex: index
                    })
                  }}
                >{symbol}</StyledTokenButton>
              ))
            }
          </StyledTokenButtonList>
          <StyledVaultTipsList>
            <StyledVaultTips>The Staking Vault generates Future Yield Tokens that can be used in YIDOs and runs strategies to accumulate Points across Blast Projects.</StyledVaultTips>
            <StyledVaultTips>Every 1 ETH Staked generates 100 $OFFxPoints Daily.</StyledVaultTips>
            <StyledVaultTips>Every 1 ETH Staked generates 30 $BPoints Daily. Earlier participation will be rewarded with higher daily distribution.</StyledVaultTips>
            <StyledVaultTips>To withdraw Staked ETH head over to “Positions” and “Request Unstake”, assets will be available to withdraw after 24 Hours.</StyledVaultTips>
          </StyledVaultTipsList>
          <StyledStackedRectangle>
            <StyledStackedRectangleTop>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Staked {symbolList[symbolIndex]} Balance</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>{state.pool?.userStakePosition} {symbolList[symbolIndex]}</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Wallet Balance</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>{state.pool?.walletBalance} {symbolList[symbolIndex]}</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
            </StyledStackedRectangleTop>
            <StyledStackedRectangleMiddle>
              <StyledStackedRectangleMiddleTop>
                <StyledStackedRectangleMiddleTitle>Staked {symbolList[symbolIndex]}</StyledStackedRectangleMiddleTitle>
                <StyledStackedRectangleMiddleMax onClick={handleMax}>Max</StyledStackedRectangleMiddleMax>
              </StyledStackedRectangleMiddleTop>
              <StyledStackedRectangleMiddleInput type="number" placeholder="0" value={stakedAmount} onChange={(event) => handleStakedAmountChange(event.target.value)} />
            </StyledStackedRectangleMiddle>
            <StyledStackedRectangleBottom>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Future Yield APR</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>{state.pool?.yieldAPY}% fy{symbolList[symbolIndex]}</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>$BxPoints</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>1x</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>$OFFxPoints</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>1x</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
            </StyledStackedRectangleBottom>
          </StyledStackedRectangle>


          {
            isInSufficient ? (
              <StyledStakeButton disabled>InSufficient Balance</StyledStakeButton>
            ) : stakeLoading ? (
              <StyledStakeLoadingButton disabled>
                <Widget src={"bluebiu.near/widget/Liquidity.Bridge.Loading"} />
              </StyledStakeLoadingButton>
            ) : (
              <StyledStakeButton onClick={handleStake}>Stake {symbolList[symbolIndex]}</StyledStakeButton>
            )
          }
        </StyledVaultContainer>
      ) : (
        <StyledPositionsContainer>
          {
            state.positionList.length > 0 ? (
              <StyledPostions>
                {
                  state.positionList.map((position, index) => {
                    return (
                      <StyledPostion>
                        {
                          COLUMN_LIST.map(column => {
                            return column.key === "operation" ? (
                              <StyledPostionRow
                                key={column.key}
                                style={{ width: column.width }}
                              >
                                <StyledClaimButton onClick={() => handleClaim(index)}>Claim Yield</StyledClaimButton>
                                <StyledUnstakeButton onClick={() => handleUnstake(index)}>Unstake</StyledUnstakeButton>
                              </StyledPostionRow>
                            ) : (
                              <StyledPostionColumn
                                key={column.key}
                                style={{ width: column.width }}
                              >
                                <StyledPostionLabel>{column.key === "userStakePosition" ? `Staked ${symbolList[position.poolId]}` : column.label}</StyledPostionLabel>
                                {
                                  column.type === "money" ? (
                                    <StyledPostionValue>{position[column.key] ?? "0"} {symbolList[position.poolId]}</StyledPostionValue>
                                  ) : (
                                    <StyledPostionValue>{position[column.key] ?? "0"}</StyledPostionValue>
                                  )
                                }
                              </StyledPostionColumn>
                            )
                          })
                        }
                      </StyledPostion>
                    )
                  })
                }
              </StyledPostions>
            ) : (
              <StyledPositionsTips>Your positions will appear here.</StyledPositionsTips>
            )
          }
        </StyledPositionsContainer>
      )
    }
  </StyledBlastoff>
)