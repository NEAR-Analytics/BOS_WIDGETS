
const {
  Column,
  Row,
  StyledVaultImage,
  SvgIcon,
  StyledDashedUndeline,
  TdTxt,
  PoolPercentage,
  StrategyTxt,
  TitleText,
  ContainerLogin,
} = VM.require('bluebiu.near/widget/Liquidity.Handler.Styles')

State.init({
  allData: null,
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
  account,
  CHAIN_LIST,
  multicallAddress,
  dexConfig,
  curChain,
  isChainSupported,
  onSwitchChain,
  addAction,
  defaultDex,
  connectProps,
  prices,
} = props

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
const sender = account;
if (!sender || !isChainSupported) {
  return (
    <Widget
      src="bluebiu.near/widget/Swap.ChainWarnigBox"
      props={{
        chain: curChain,
        onSwitchChain: onSwitchChain,
        switchingChain: switchingChain,
        theme: dexConfig.theme?.button,
      }}
    />
  );
}

const {
  pairs,
  addresses,
  proxyAddress,
  ALL_DATA_URL,
  ICON_VAULT_MAP,
  USER_DATA_BASE,
  LAST_SNAP_SHOT_DATA_URL,
} = dexConfig
function fetchAllData() {
  State.update({
    loading: true
  });

  asyncFetch(ALL_DATA_URL).then((res) => {
    if (!res.ok) return;
    console.log('====res', res)
    State.update({
      allData: res.body?.vaults ?? [],
      loading: false
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
    } else if (state.categoryIndex === 1) {
      state.dataList.forEach(data => {
        if (Big(data?.liquidity ?? 0).gt(0)) {
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
    fetchAllData()
  }
}, [curChain])
const columnList = [{
  width: '40%',
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
        <PoolPercentage>{data?.initialData?.feeTier}%</PoolPercentage>
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
  width: '15%',
  key: 'Fee APR',
  label: 'Fee APR',
  type: 'slot',
  render: (data) => {
    return (
      <StyledDashedUndeline>
        <TdTxt>{data.feeApr}</TdTxt>
      </StyledDashedUndeline>
    )
  }
}, {
  width: '15%',
  direction: 'column',
  key: 'liquidity',
  label: 'Your Liquidity',
  type: 'slot',
  render: (data, index) => {
    return (
      <>
        <TdTxt>{Big(data?.liquidity ?? 0).gt(0) ? `${Big(data?.liquidity ?? 0).lt(0.01) ? '<$0.01' : formatFiat(data.liquidity)}` : "-"}</TdTxt>
        {Big(data?.balance ?? 0).gt(0) && <TdTxt className="gray">{Big(data?.balance ?? 0).lt(0.01) ? '<0.01' : Big(data.balance).toFixed(2)} LP</TdTxt>}
        <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""]}>
          {IconRight}
        </SvgIcon>
      </>
    )
  }
}]

return state.loading ? <Widget src="bluebiu.near/widget/0vix.LendingSpinner" /> : (
  <Column>
    {state.allData && (
      <Widget
        src={"bluebiu.near/widget/Liquidity.Data.ARRAKIS"}
        props={{
          pairs,
          sender,
          addresses,
          allData: state.allData,
          prices,
          curChain,
          multicallAddress,
          LAST_SNAP_SHOT_DATA_URL,
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
      src={"bluebiu.near/widget/Liquidity.Bridge.ARRAKIS.List"}
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
        defaultDex,
        proxyAddress,
        multicallAddress,
        ICON_VAULT_MAP,
      }}
    />
  </Column>
)