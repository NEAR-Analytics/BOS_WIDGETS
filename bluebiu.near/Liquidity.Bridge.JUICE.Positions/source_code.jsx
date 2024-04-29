const StyledContainer = styled.div`
  width: 1000px;
`
const StyledTitle = styled.div`
  margin-bottom: 16px;
  color: #FFF;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`
const StyledDashboardContainer = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  padding-left: 26px;
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;

`
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledLabel = styled.div`
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledValue = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledPostionsContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373A53;
  background: #262836;
`
const StyledPostionsTop = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  padding-left: 26px;
  border-bottom: 1px solid #373A53;
`
const StyledPostionsTopColumn = styled.div`
  width: 20%;
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const StyledPostionsBottom = styled.div`
  padding-bottom: 58px;
`
const StyledPosition = styled.div`
  padding: 20px 0 20px 26px;
  display: flex;
  align-items: center;
`
const StyledPositionColumn = styled.div`
  width: 20%;
  display: flex;
  align-items: center;
  gap: 8px;

`
const StyledPositionColumnImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  border-radius: 6px;
  background: #FFF;
`
const StyledPositionColumnImage = styled.img`
  width: 20px;
`
const StyledPositionColumnTxt = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`
const StyledPositionColumnButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 32px;
  flex-shrink: 0;
  border-radius: 6px;
  background: var(--button-color);
  color: var(--button-text-color);
  text-align: center;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`
const StyledNotHave = styled.div`
  padding-top: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const {
  sender,
  vaults,
  prices,
  PROXY_ADDRESS,
  multicall,
  multicallAddress,
  smartContractAddress,
  onManage
} = props
State.init({
  dashboard: null,
  filterVaults: [],
  pnl: 0,
})
function isNotEmptyArray(value) {
  return value && value[0]
}
function handleQueryDashboard() {
  const calls = []
  const abi = [{
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getAccountHealth",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "debtAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "collateralValue",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "investmentValue",
            "type": "uint256"
          },
          {
            "internalType": "UD60x18",
            "name": "healthFactor",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "isLiquidatable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "isRisky",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "hasBadDebt",
            "type": "bool"
          }
        ],
        "internalType": "struct AccountLib.Health",
        "name": "health",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getDebtAmount",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOfAssets",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "assets",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }]
  calls.push({
    address: PROXY_ADDRESS,
    name: "getAccountHealth",
    params: [smartContractAddress]
  })
  calls.push({
    address: PROXY_ADDRESS,
    name: "getDebtAmount",
    params: [smartContractAddress]
  })
  calls.push({
    address: PROXY_ADDRESS,
    name: "balanceOfAssets",
    params: [sender]
  })
  console.log('====111====', multicallAddress)
  multicall({
    abi,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  }).then(result => {
    const [
      getAccountHealthResult,
      getDebtAmountResult,
      balanceOfAssetsResult,
    ] = result
    const [A1, A2, A3] = isNotEmptyArray(getAccountHealthResult) ? getAccountHealthResult[0] : [1, 0, 0]
    State.update({
      dashboard: {
        accountHealth: Big(A1).gt(0) ? (Big(Big(A2).plus(A3)).div(A1).times(100).toFixed(2) + "%") : "N/A",
        debtAmount: Big(isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0).toFixed(4),
        balanceOfAssets: Big(isNotEmptyArray(balanceOfAssetsResult) ? ethers.utils.formatUnits(balanceOfAssetsResult[0]) : 0).toFixed(4)
      }
    })
  }).catch(error => {
    console.log('=error', error)
  })


}
function doQueryPnl(x, y) {
  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "x",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "y",
          "type": "uint256"
        }
      ],
      "name": "zeroFloorSub",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "z",
          "type": "uint256"
        }
      ],
      "stateMutability": "pure",
      "type": "function"
    }
  ]
  const contract = new ethers.Contract(
    ethers.utils.getAddress("0xe1dA6F46d757699f6D783a2876E01937a1eCa9a9"),
    abi,
    Ethers.provider().getSigner()
  );
  contract.zeroFloorSub(x, y)
    .then(result => {
      State.update({
        pnl: ethers.utils.formatUnits(result)
      })
    })
}
function handleQueryPnl() {
  const calls = []
  const abi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getTotalAccountValue",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "totalValue",
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
          "name": "account",
          "type": "address"
        }
      ],
      "name": "getDebtAmount",
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
    name: "getTotalAccountValue",
    params: [smartContractAddress]
  })
  calls.push({
    address: PROXY_ADDRESS,
    name: "getDebtAmount",
    params: [smartContractAddress]
  })
  multicall({
    abi,
    calls,
    options: {},
    multicallAddress,
    provider: Ethers.provider(),
  }).then(result => {
    const [getTotalAccountValueResult, getDebtAmountResult] = result
    if (isNotEmptyArray(getTotalAccountValueResult) && isNotEmptyArray(getDebtAmountResult)) {
      doQueryPnl(getTotalAccountValueResult[0], getDebtAmountResult[0])
    }
  })
}
useEffect(() => {
  handleQueryDashboard()
  handleQueryPnl()
}, [])

useEffect(() => {
  console.log('====11111=====')
  State.update({
    filterVaults: vaults.filter(vault => Number(vault.positionValue) > 0)
  })
}, [vaults])

return (
  <StyledContainer>
    <StyledTitle>Dashboard</StyledTitle>
    <StyledDashboardContainer>
      <StyledColumn style={{
        width: "20%"
      }}>
        <StyledLabel>Deposited WETH</StyledLabel>
        <StyledValue>{state.dashboard?.balanceOfAssets}</StyledValue>
      </StyledColumn>
      <StyledColumn style={{
        width: "20%"
      }}>
        <StyledLabel>Borrowed WETH</StyledLabel>
        <StyledValue>{state.dashboard?.debtAmount}</StyledValue>
      </StyledColumn>
      <StyledColumn style={{
        width: "20%"
      }}>
        <StyledLabel>WETH Borrow APY</StyledLabel>
        <StyledValue>23.65%</StyledValue>
      </StyledColumn>
      <StyledColumn style={{
        width: "20%"
      }}>
        <StyledLabel>Margin Health Factor</StyledLabel>
        <StyledValue
          style={{
            color: "#74F368"
          }}
        >{state.dashboard?.accountHealth}</StyledValue>
      </StyledColumn>
      <StyledColumn style={{
        width: "20%"
      }}>
        <StyledLabel>PnL</StyledLabel>
        <StyledValue style={{
          color: "#FF547D"
        }}>{Big(state.pnl).toFixed(4)}</StyledValue>
      </StyledColumn>
    </StyledDashboardContainer>
    <StyledTitle
      style={{
        marginTop: 36
      }}
    >Active Vault Positions</StyledTitle>
    <StyledPostionsContainer>
      <StyledPostionsTop>
        <StyledPostionsTopColumn style={{
          width: "30%"
        }}>Name</StyledPostionsTopColumn>
        <StyledPostionsTopColumn style={{
          width: "25%"
        }}>Protocol</StyledPostionsTopColumn>
        <StyledPostionsTopColumn style={{
          width: "15%"
        }}>Borrowed Asset</StyledPostionsTopColumn>
        <StyledPostionsTopColumn style={{
          width: "15%"
        }}>Position Value</StyledPostionsTopColumn>
        <StyledPostionsTopColumn style={{
          width: "15%"
        }}></StyledPostionsTopColumn>
      </StyledPostionsTop>
      <StyledPostionsBottom>
        {
          state.filterVaults?.length > 0 ? state.filterVaults.map(vault => (
            <StyledPosition>
              <StyledPositionColumn style={{
                width: "30%"
              }}>
                <StyledPositionColumnImageContainer
                  style={{ backgroundColor: vault.iconBgColor }}
                >
                  <StyledPositionColumnImage src={vault.icon} />
                </StyledPositionColumnImageContainer>
                <StyledPositionColumnTxt>{vault.name}</StyledPositionColumnTxt>
              </StyledPositionColumn>
              <StyledPositionColumn style={{
                width: "25%"
              }}>
                <StyledPositionColumnTxt>{vault.protocol}</StyledPositionColumnTxt>
              </StyledPositionColumn>
              <StyledPositionColumn style={{
                width: "15%"
              }}>
                <StyledPositionColumnTxt>WETH</StyledPositionColumnTxt>
              </StyledPositionColumn>
              <StyledPositionColumn style={{
                width: "15%"
              }}>
                <StyledPositionColumnTxt>{"$" + Big(vault?.positionValue ?? 0).times(prices["WETH"]).toFixed(2)}</StyledPositionColumnTxt>
              </StyledPositionColumn>
              <StyledPositionColumn style={{
                width: "15%"
              }}>
                <StyledPositionColumnButton onClick={() => {
                  onManage(vault)
                }}>Manage</StyledPositionColumnButton>
              </StyledPositionColumn>
            </StyledPosition>
          )) : (
            <StyledNotHave>
              You didn’t add any vault yet
            </StyledNotHave>
          )
        }
      </StyledPostionsBottom>
    </StyledPostionsContainer>
  </StyledContainer>
)