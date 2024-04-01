
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`

const StyledVaultImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
`
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-right {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);

    &.rotate {
      transform: translateY(-50%) rotate(90deg);
    }
  }
`
const StyledDashedUndeline = styled.div`
  padding: 2px 0;
  border-bottom: 1px dashed #979ABE;
`
const TdTxt = styled.div`
  color: #FFF;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  &.gray {
    color: #979ABE;
    font-size: 12px;
  }
`
const PoolPercentage = styled.div`
  padding: 3px 8px;
  border-radius: 24px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`

const StrategyTxt = styled.div`
  padding: 7px 10px;
  border-radius: 6px;
  background: rgba(151, 154, 190, 0.1);
  color: #979ABE;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`
const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
`;
const ContainerLogin = styled.div`
  display: flex;
  max-width: 500px;

  flex-direction: column;
  margin: 80px auto auto auto;

  .web3-connect {
    width: 480px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
    color: #0f1126;
    font-size: 18px;
    font-weight: 500;
    border: none;
    margin-top: 20px;
  }

  @media (max-width: 736px) {
    max-width: 100%;
    .web3-connect {
      width: 100%;

      font-size: 16px;
      height: 40px;
    }
  }
`;
State.init({
  allData: null,
  userData: null,
  feesData: null,
  rangeData: null,
  loading: false,
  dataList: [],
  filterList: [],
  dataIndex: -1,
  categoryIndex: 0,
  chainIndex: 0,
  token: '',
})
const IconRight = (
  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
    <path d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z" fill="#979ABE" />
  </svg>
)
const {
  toast,
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
// const CONNECT_PROPS = {
//   ...props.connectProps,
//   chainId: MAINNET_CHAIN_ID,
//   chainName: CHAIN_CONFIG.chainName,
//   noAccountTips: `${CHAIN_CONFIG.chainName} Liquidity`,
//   wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_CONFIG.chainName} Chain.`,
// };

const formatFiat = (value) => {
  const number = Number(value).toLocaleString("en", {
    currency: "USD",
    style: "currency",
    compactDisplay: "short",
    notation: "compact",
    maximumFractionDigits: 2,
  });
  return number;
};

const formatPercent = (value) => {
  return `${Number(value * 100).toLocaleString("en", {
    maximumFractionDigits: 2,
  })}%`;
};

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

const {
  pairs,
  addresses,
  ammName,
  ammImage,
  proxyAddress,
  ALL_DATA_URL,
  ICON_VAULT_MAP,
  USER_DATA_BASE,
  FEES_URL,
  RANGE_URL
} = dexConfig
function fetchAllData() {
  State.update({
    loading: true
  });
  asyncFetch(ALL_DATA_URL).then(result => {
    try {
      if (result.ok) {
        State.update({
          allData: JSON.parse(result.body)?.data,
          loading: false
        })
      }
    } catch (error) {
      State.update({
        loading: false
      })
    }
  }).catch(() => {
    State.update({
      loading: false
    })
  })
}
function fetchUserData() {
  asyncFetch(RANGE_URL, {
    method: 'POST',
    body: JSON.stringify({
      "variables": {},
      "query": "{\n  users(where: {id: \"" + sender + "\"}) {\n    id\n    vaultBalances {\n      token0\n      token1\n      balance\n      address\n      vault {\n        id\n        token0\n        token1\n      }\n    }\n  }\n}"
    })
  }).then(result => {
    try {
      if (result.ok) {
        const users = result.body.data.users
        const userData = {
        }
        users.forEach(user => {
          user.vaultBalances.forEach(vaultBalance => {
            userData[vaultBalance.vault.id] = vaultBalance
          })
        })
        State.update({
          userData,
        })
      }
    } catch (error) {
    }
  })
}
function fetchFeesData() {
  asyncFetch(FEES_URL).then(result => {
    try {
      if (result.ok) {
        const data = JSON.parse(result.body)
        State.update({
          feesData: data,
        })
      }
    } catch (error) {
    }
  })
}
function handleFetchRangeData(vault) {
  return new Promise((resolve, reject) => {
    asyncFetch(RANGE_URL, {
      method: 'POST',
      body: JSON.stringify({
        "variables": {},
        "query": "{\n  vault(id: \"" + vault + "\") {\n    liquidity\n    balance0\n    balance1\n    totalSupply\n    totalFeesEarned0\n    totalFeesEarned1\n    token0\n    token1\n    name\n    tag\n    pool\n  }\n}"
      })
    })
      .then(result => {
        if (result.ok) {
          resolve({
            [vault]: result.body.data.vault
          })
        }
      })
      .catch(reject)
  })
}
function fetchRangeData() {
  const promiseArray = []
  for (let i = 0; i < pairs.length; i++) {
    const vault = addresses[pairs[i].id]
    promiseArray.push(handleFetchRangeData(vault))
  }
  Promise.all(promiseArray).then((resultArray) => {
    const rangeData = {}
    for (let i = 0; i < resultArray.length; i++) {
      const result = resultArray[i]
      Object.assign(rangeData, result)
    }
    State.update({
      rangeData
    })
  })
}

function handleChangeDataIndex(index) {
  state.dataIndex === index ? State.update({
    dataIndex: -1
  }) : State.update({
    dataIndex: index
  })
}
function handleChangeCategoryIndex(index) {
  State.update({
    categoryIndex: index
  })
}
function handleChangeChainIndex(index) {
  const chain = CHAIN_LIST[index]
  onSwitchChain({
    chainId: `0x${Number(chain.chain_id).toString(16)}`,
  });
}
function handleSearchInput(event) {
  State.update({
    token: event.target.value
  })
}
function refetch() {
  fetchAllData()
  fetchFeesData()
  fetchRangeData()
}
useEffect(() => {
  if (state.dataList) {
    let filterList = []
    if (state.categoryIndex === 0) {
      filterList = state.dataList.filter(data => {
        const source = data.id.toUpperCase()
        const target = (state.token || '').toUpperCase()
        return source.indexOf(target) > -1
      })
    } else if (state.categoryIndex === 1 && state.userData) {

      state.dataList.forEach(data => {
        if (state.userData && addresses[data.id].toLowerCase() in state.userData) {
          filterList.push(data)
        }
      })
    }
    State.update({
      filterList
    })
  }
}, [state.dataList, state.token, state.categoryIndex])

useEffect(() => {
  const index = CHAIN_LIST.findIndex(chain => chain.id === curChain.id)
  if (index > -1) {
    State.update({
      chainIndex: index,
      allData: null,
      dataList: [],
      categoryIndex: 0,
      userPositions: null
    })
    if (!state.allData) {
      fetchAllData()
    }
    if (!state.userData) {
      fetchUserData()
    }
    if (!state.fees) {
      fetchFeesData()
    }
    if (!state.range) {
      fetchRangeData()
    }
  }
}, [curChain])
const columnList = [{
  width: '30%',
  key: 'pool',
  label: 'Pool',
  type: 'slot',
  render: (data) => {
    return (
      <>
        <StyledVaultImage>
          <img style={{ marginRight: -6 }} src={ICON_VAULT_MAP[data.token0]} alt={data.token0} />
          <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
        </StyledVaultImage>
        <TdTxt>{data.token0} / {data.token1}</TdTxt>
        <PoolPercentage>{data.fee}%</PoolPercentage>
      </>
    )
  }
}, {
  width: '10%',
  key: 'chain',
  label: 'Chain',
  type: 'slot',
  render: () => <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
}, {
  width: '20%',
  key: 'amm',
  label: 'AMM',
  type: 'slot',
  render: () => {
    return (
      <>
        <img src={ammImage} alt={ammName} style={{ width: 22 }} />
        <TdTxt>{ammName}</TdTxt>
      </>
    )
  }
}, {
  width: '10%',
  key: 'strategy',
  label: 'Strategy',
  type: 'slot',
  render: (data) => {
    return (
      <StrategyTxt>{data.strategy2 ? data.strategy2 : data.strategy}</StrategyTxt>
    )
  }
}, {
  width: '10%',
  key: 'tvlUSD',
  label: 'TVL',
  type: 'slot',
  render: (data) => {
    return (
      <TdTxt>{formatFiat(data.tvlUSD)}</TdTxt>
    )
  }
}, {
  width: '10%',
  key: 'apy',
  label: 'APR (7d)',
  type: 'slot',
  render: (data) => {
    return (
      <StyledDashedUndeline>
        <TdTxt>{data.apy}</TdTxt>
      </StyledDashedUndeline>
    )
  }
}, {
  width: '10%',
  direction: 'column',
  key: 'liquidity',
  label: 'Your Liquidity',
  type: 'slot',
  render: (data, index) => {
    return (
      <>
        <TdTxt>{data.liquidityUSD ? `${formatFiat(data.liquidityUSD)}` : "-"}</TdTxt>
        {data.liquidity && <TdTxt className="gray">{data.liquidity} LP</TdTxt>}
        <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""]}>
          {IconRight}
        </SvgIcon>
      </>
    )
  }
}]

return state.loading ? <Widget src="bluebiu.near/widget/0vix.LendingSpinner" /> : (
  <StyledColumn>
    {state.allData &&
      state.feesData &&
      state.rangeData && (
        <Widget
          src={"bluebiu.near/widget/Liquidity.Data.RANGEPROTOCOL"}
          props={{
            pairs,
            addresses,
            allData: state.allData,
            prices,
            curChain,
            feesData: state.feesData,
            rangeData: state.rangeData,
            multicallAddress,
            // LAST_SNAP_SHOT_DATA_URL,
            onLoad: (data) => {
              State.update({
                dataList: data.dataList,
                loading: false
              })
            }
          }}
        />
      )}
    <Widget
      src={"bluebiu.near/widget/Liquidity.Bridge.Filter"}
      props={{
        token: state.token,
        chains: CHAIN_LIST,
        categoryIndex: state.categoryIndex,
        chainIndex: state.chainIndex,
        onSearchInput: handleSearchInput,
        onChangeCategoryIndex: handleChangeCategoryIndex,
        onChangeChainIndex: handleChangeChainIndex,
      }}
    />
    <Widget
      src={"bluebiu.near/widget/Liquidity.Bridge.RANGEPROTOCOL.List"}
      props={{
        toast,
        prices,
        refetch,
        columnList,
        userPositions: state.userPositions,
        dataIndex: state.dataIndex,
        onChangeDataIndex: handleChangeDataIndex,
        dataList: state.filterList,
        addresses,
        addAction,
        proxyAddress,
        multicallAddress,
        ICON_VAULT_MAP,
      }}
    />
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
  </StyledColumn>
)