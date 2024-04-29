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
  padding: 16px 16px 20px;
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
  padding: 0 16px 16px;
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
`
const PROXY_ADDRESS = "0x8F53fA7928305Fd4f78c12BA9d9DE6B2420A2188"

const sender = Ethers.send("eth_requestAccounts", [])[0];
const {
  toast,
  prices,
  dexConfig,
  connectProps,
  multicall,
  multicallAddress,
} = props
// if (!sender) {
//   return (
//     <Widget
//       style={dexConfig.theme}
//       src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
//       props={{
//         ...connectProps,
//         isWrongNetwork: false,
//       }}
//     />
//   );
// }
State.init({
  stakeAmount: "",
  stakeLoading: false,
  data: {
  }
})
const isInSufficient = Number(stakedAmount) > Number(state.data.balance)
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
    const promiseArray = []
    promiseArray.push(promiseFetchQuery("http://penpad.io/api/pub/dapdap/staked/participated/user"))
    promiseArray.push(promiseFetchQuery("http://penpad.io/api/pub/dapdap/point/user/" + sender))
    Promise.all(promiseArray)
      .then(secondResult => {
        console.log('=secondResult', secondResult)
        const totalStaked = maxTotalValueLockedResult ? ethers.utils.formatUnits(maxTotalValueLockedResult[0]) : 0
        const yourStaked = userStakeAmountsResult ? ethers.utils.formatUnits(userStakeAmountsResult[0]) : 0
        State.update({
          data: {
            totalStaked,
            yourStaked,
            yourPoolShare: Big(yourStaked).div(totalStaked).toString(),
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
}
useEffect(() => {
  sender && handleQueryData()
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
        <StyledPenpadValue>{state.data.paticipatedUsers}</StyledPenpadValue>
      </StyledPenpadColumn>
    </StyledPenpadTop>
    <StyledPenpadMiddleContainer>
      <StyledPenpadMiddle>
        <StyledPenpadMiddleTop>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Your Pool Share</StyledPenpadLabel>
            <StyledPenpadValue>{state.data.yourPoolShare}%</StyledPenpadValue>
          </StyledPenpadColumn>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Wallet Balance</StyledPenpadLabel>
            <StyledPenpadValue>0 ETH</StyledPenpadValue>
          </StyledPenpadColumn>
        </StyledPenpadMiddleTop>
        <StyledPenpadMiddleMiddleContainer>
          <StyledPenpadMiddleMiddle>
            <StyledPenpadColumn>
              <StyledPenpadLabel>Staked ETH</StyledPenpadLabel>
              <StyledPenpadInput type="number" placeholder="0.0" value={state.stakeAmount} onChange={event => handleStakeAmountChange(event.target.value)} />
              {/* <StyledPenpadValue>0 ETH</StyledPenpadValue> */}
            </StyledPenpadColumn>
            <StyledPenpadColumn>
              <StyledPenpadLabel style={{
                textDecoration: "underline"
              }}>Max</StyledPenpadLabel>
            </StyledPenpadColumn>
          </StyledPenpadMiddleMiddle>
        </StyledPenpadMiddleMiddleContainer>
        <StyledPenpadMiddleBottom>
          <StyledPenpadColumn>
            <StyledPenpadLabel>You Staked ETH</StyledPenpadLabel>
            <StyledPenpadValue>0 ETH</StyledPenpadValue>
          </StyledPenpadColumn>
          <StyledPenpadColumn>
            <StyledPenpadLabel>Your Points</StyledPenpadLabel>
            <StyledPenpadValue>{state.data.yourPoints} Points</StyledPenpadValue>
          </StyledPenpadColumn>
        </StyledPenpadMiddleBottom>
      </StyledPenpadMiddle>
    </StyledPenpadMiddleContainer>
    <StyledPenpadBottom>
      {
        isInSufficient ? (
          <StyledPenpadButton disabled>InSufficient Balance</StyledPenpadButton>
        ) : state.stakeLoading ? (
          <StyledPenpadButton disabled>
            <Widget src={"bluebiu.near/widget/Liquidity.Bridge.Loading"} />
          </StyledPenpadButton>
        ) : state.stakeAmount > 0 ? (
          <StyledPenpadButton onClick={handleStake}>Stake ETH</StyledPenpadButton>
        ) : (
          <StyledPenpadButton disabled>Stake ETH</StyledPenpadButton>
        )
      }
      {/* <StyledPenpadButton>Stake ETH</StyledPenpadButton> */}
    </StyledPenpadBottom>
  </StyledPenpadContainer>
)