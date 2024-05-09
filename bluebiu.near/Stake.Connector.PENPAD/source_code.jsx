const StyledPenpadContainer = styled.div`
  margin: 30px auto 0;
  width: 478px;
  /* height: 430px; */
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledPenpadTitle = styled.div`
  padding: 24px 21px 16px;
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const StyledPenpadTop = styled.div`
  padding: 0 21px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledPenpadColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`
const StyledPenpadLabel = styled.div`
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPenpadValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`
const StyledPenpadValueImage = styled.img`
  width: 20px;
`
const StyledPenpadValue = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledPenpadInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
  
  color: #FFF;
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
const StyledPenpadMiddleContainer = styled.div`
  padding: 16px 16px 0;
`
const StyledPenpadMiddleTips = styled.div`
  padding-top: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`
const StyledPenpadMiddleTipsTxt = styled.div`
  color: #FF9343;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPenpadMiddleTipsButton = styled.div`
  cursor: pointer;
  color: #29C8A5;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
`

const StyledPenpadMiddle = styled.div`
  height: 213px;
  border-radius: 12px;
  border: 1px solid #373A53;
`
const StyledPenpadMiddleTop = styled.div`
  padding: 13px 22px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const StyledPenpadMiddleMiddleContainer = styled.div`
  padding: 14px 12px;
`
const StyledPenpadMiddleMiddle = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px;
  height: 71px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: #2E3142;
`
const StyledPenpadMiddleBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px 15px;
`
const StyledPenpadBottom = styled.div`
  padding: 20px 16px 16px;
`
const StyledPenpadButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  border-radius: 8px;
  background: var(--button-color);
  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`
const sender = Ethers.send("eth_requestAccounts", [])[0];
const {
  toast,
  prices,
  chainId,
  dexConfig,
  addAction,
  connectProps,
  multicall,
  multicallAddress,
  windowOpen,
  isChainSupported,
  curChain,
  onSwitchChain,
  switchingChain
} = props
const {
  PROXY_ADDRESS
} = dexConfig
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
  stakeAmount: "",
  stakeLoading: false,
  data: {
  },
  balance: 0,
  penpadRegister: false,
  showDialog: false
})
const isInSufficient = Number(state.stakeAmount) > Number(state.balance)
function promiseFetchQuery(url) {
  return new Promise((resolve, reject) => {
    asyncFetch(url).then(result => {
      if (result.ok) {
        resolve(result.body)
      } else {
        reject(result.status)
      }
    }).catch(reject)
  })
}
function handleStakeAmountChange(amount) {
  if (Number(amount) < 0) {
    return
  }
  if (Number(amount) === 0) {
    State.update({
      stakeAmount: amount,
    })
    return
  }
  State.update({
    stakeAmount: amount
  })
}
function handleStake() {
  if (state.penpadRegister === "false") {
    State.update({
      showDialog: true
    })
    return
  }
  State.update({
    stakeLoading: true
  })
  const toastId = toast?.loading({
    title: `Stake ${state.stakeAmount} ETH`,
  });
  const abi = [{
    "inputs": [],
    "name": "stake",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }]
  const contract = new ethers.Contract(
    ethers.utils.getAddress(PROXY_ADDRESS),
    abi,
    Ethers.provider().getSigner()
  );
  const _amount = Big(state?.stakeAmount)
    .mul(Big(10).pow(18))
    .toFixed(0);
  contract
    .stake(
      {
        value: _amount
      }
    )
    .then(tx => tx.wait())
    .then((result) => {
      const { status, transactionHash } = result;
      toast?.dismiss(toastId);
      State.update({
        stakeLoading: false
      })
      toast?.success({
        title: "Stake Successfully!",
        text: `Stake ${state.stakeAmount} ETH`,
        tx: transactionHash,
        chainId,
      });
      if (status === 1) {
        addAction?.({
          type: "Staking",
          action: "Stake",
          token: {
            symbol: "ETH"
          },
          amount: state.stakeAmount,
          template: "Penpad",
          add: true,
          status,
          transactionHash,
        });
        handleQueryData()
      }
    }).catch(error => {
      console.log('error', error)
      State.update({
        stakeLoading: false
      })
      toast?.fail({
        title: "Stake Failed!",
        text: error?.message?.includes("user rejected transaction")
          ? "User rejected transaction"
          : `Stake ${state.stakeAmount} ETH`,
      });
    });
}
function handleQueryData() {
  const calls = []
  const abi = [
    {
      "inputs": [],
      "name": "maxTotalValueLocked",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "userStakeAmounts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]
  calls.push({
    address: PROXY_ADDRESS,
    name: "maxTotalValueLocked"
  })
  calls.push({
    address: PROXY_ADDRESS,
    name: "userStakeAmounts",
    params: [sender]
  })

  multicall({
    abi,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  }).then(firstResult => {
    const [maxTotalValueLockedResult, userStakeAmountsResult] = firstResult
    const totalStaked = maxTotalValueLockedResult ? ethers.utils.formatUnits(maxTotalValueLockedResult[0]) : 0
    const yourStaked = userStakeAmountsResult ? ethers.utils.formatUnits(userStakeAmountsResult[0]) : 0

    console.log('=yourStaked', yourStaked)
    const promiseArray = []
    promiseArray.push(promiseFetchQuery("https://penpad.io/api/pub/dapdap/staked/participated/user"))
    promiseArray.push(promiseFetchQuery("https://penpad.io/api/pub/dapdap/point/user/" + sender))
    Promise.all(promiseArray)
      .then(secondResult => {
        State.update({
          data: {
            totalStaked,
            yourStaked,
            yourPoolShare: Big(yourStaked).div(totalStaked).times(100).toString(),
            paticipatedUsers: secondResult[0],
            yourPoints: secondResult[1]
          }
        })

      })
  }).catch(error => {
    setTimeout(() => {
      handleQueryData()
    }, 1000)
  })
  Ethers.provider()
    .getBalance(sender)
    .then((result) => {
      const balance = ethers.utils.formatEther(result);
      State.update({
        balance
      })
    });
}
function handleQueryPenpadRegister() {
  promiseFetchQuery("https://penpad.io/api/pub/quest/social/platform/dapdap/address/" + sender)
    .then(result => {
      State.update({
        penpadRegister: result
      })
    })
}
function handleMax() {
  State.update({
    stakeAmount: state.balance
  })
}
useEffect(() => {
  if (sender) {
    handleQueryData()
    handleQueryPenpadRegister()
  }
}, [sender])

return (
  <StyledPenpadContainer>
    <StyledPenpadTitle>ETH</StyledPenpadTitle>
    <StyledPenpadTop>
      <StyledPenpadColumn>
        <StyledPenpadLabel>Total Staked</StyledPenpadLabel>
        <StyledPenpadValue>{Big(state.data?.totalStaked ?? 0).toFixed(2)} ETH</StyledPenpadValue>
      </StyledPenpadColumn>
      <StyledPenpadColumn>
        <StyledPenpadLabel>Paticipated Users</StyledPenpadLabel>
        <StyledPenpadValue>{state.data?.paticipatedUsers ?? 0}</StyledPenpadValue>
      </StyledPenpadColumn>
    </StyledPenpadTop>
    <StyledPenpadMiddleContainer>
      <StyledPenpadMiddle>
        <StyledPenpadMiddleTop>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Your Pool Share</StyledPenpadLabel>
            <StyledPenpadValue>{Big(state.data?.yourPoolShare ?? 0).toFixed(4)}%</StyledPenpadValue>
          </StyledPenpadColumn>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Wallet Balance</StyledPenpadLabel>
            <StyledPenpadValue>{Big(state.balance).toFixed(4)} ETH</StyledPenpadValue>
          </StyledPenpadColumn>
        </StyledPenpadMiddleTop>
        <StyledPenpadMiddleMiddleContainer>
          <StyledPenpadMiddleMiddle>
            <StyledPenpadColumn>
              <StyledPenpadLabel>Staked ETH</StyledPenpadLabel>
              <StyledPenpadInput type="number" placeholder="0.0" value={state.stakeAmount} onChange={event => handleStakeAmountChange(event.target.value)} />
            </StyledPenpadColumn>
            <StyledPenpadColumn>
              <StyledPenpadLabel style={{
                textDecoration: "underline",
                cursor: "pointer"
              }} onClick={handleMax}>Max</StyledPenpadLabel>
            </StyledPenpadColumn>
          </StyledPenpadMiddleMiddle>
        </StyledPenpadMiddleMiddleContainer>
        <StyledPenpadMiddleBottom>
          <StyledPenpadColumn>
            <StyledPenpadLabel>You Staked ETH</StyledPenpadLabel>
            <StyledPenpadValue>{state.data?.yourStaked} ETH</StyledPenpadValue>
          </StyledPenpadColumn>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Your Points</StyledPenpadLabel>
            <StyledPenpadValueContainer>
              <StyledPenpadValueImage src="https://ipfs.near.social/ipfs/bafkreidp5p376r2xzvahoypa4427couidi44mxmrjvlmcvnas64k5ny5qi" />
              <StyledPenpadValue>{state.data?.yourPoints ?? 0} Points</StyledPenpadValue>
            </StyledPenpadValueContainer>
          </StyledPenpadColumn>
        </StyledPenpadMiddleBottom>
      </StyledPenpadMiddle>
    </StyledPenpadMiddleContainer>
    {
      Big(state.balance).lt(0.05) && (
        <StyledPenpadMiddleTips>
          <StyledPenpadMiddleTipsTxt>Insufficient gas or fund, please bridging over from other chain</StyledPenpadMiddleTipsTxt>
          <StyledPenpadMiddleTipsButton onClick={() => {
            windowOpen("https://penpad.io/bridge", "_blank")
          }}>Go to Bridge</StyledPenpadMiddleTipsButton>
        </StyledPenpadMiddleTips>
      )
    }
    <StyledPenpadBottom>
      {
        isInSufficient ? (
          <StyledPenpadButton disabled>InSufficient Balance</StyledPenpadButton>
        ) : state.stakeLoading ? (
          <StyledPenpadButton disabled>
            <Widget src={"bluebiu.near/widget/Liquidity.Bridge.Loading"} />
          </StyledPenpadButton>
        ) : Big(state?.stakeAmount ? state?.stakeAmount : 0).lt(0.05) ? (
          <StyledPenpadButton disabled>Stake ETH</StyledPenpadButton>
        ) : (
          <StyledPenpadButton onClick={handleStake}>Stake ETH</StyledPenpadButton>
        )
      }
    </StyledPenpadBottom>
    {
      state.showDialog && (
        <Widget
          src={"bluebiu.near/widget/Stake.Bridge.PENPAD.Dialog"}
          props={{
            windowOpen,
            onClose: () => {
              State.update({
                showDialog: false
              })
            }
          }}
        />
      )
    }
    {!isChainSupported && (
      <Widget
        src="bluebiu.near/widget/Swap.ChainWarnigBox"
        props={{
          chain: curChain,
          onSwitchChain: onSwitchChain,
          switchingChain: switchingChain,
          theme: dexConfig.theme?.button,
        }}
      />
    )}

  </StyledPenpadContainer>
)