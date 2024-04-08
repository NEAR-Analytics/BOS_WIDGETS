
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
  storeAddress,
  ICON_VAULT_MAP,
} = dexConfig
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
  // fetchAllData()
  State.update({
    loading: true
  })
  setTimeout(() => {
    State.update({
      loading: false
    })
  }, 500)
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
        if (data.initialData.users.length > 0) {
          filterList.push(data)
        }
      })
    }
    State.update({
      filterList
    })
  }
}, [state.dataList, state.token, state.categoryIndex])

const columnList = [{
  width: '25%',
  key: 'pool',
  label: 'Pool',
  type: 'slot',
  render: (data) => {
    return (
      <>
        <StyledVaultImage>
          <img src={ICON_VAULT_MAP[data.token]} alt={data.token} />
        </StyledVaultImage>
        <TdTxt>{data.token}</TdTxt>
        {/* <PoolPercentage>{data?.initialData?.feeTier}%</PoolPercentage> */}
      </>
    )
  }
}, {
  width: '15%',
  key: 'chain',
  label: 'Chain',
  type: 'slot',
  render: () => <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
}, {
  width: '15%',
  key: 'myBalance',
  label: 'My Balance',
  type: 'slot',
  render: (data) => {
    return (
      <>
        <TdTxt>{data.myBalance}</TdTxt> <TdTxt>{data.token}</TdTxt>
      </>
    )
  }
}, {
  width: '15%',
  key: 'poolBalance',
  label: 'Pool Balance',
  type: 'slot',
  render: (data) => {
    return (
      <>
        <TdTxt>{data.poolBalance}</TdTxt> <TdTxt>{data.token}</TdTxt>
      </>
    )
  }
}, {
  width: '15%',
  key: 'apy',
  label: 'Fee APY',
  type: 'slot',
  render: () => {
    return (
      <TdTxt>-</TdTxt>
    )
  }
}, {
  width: '15%',
  key: 'trader',
  label: 'Trader Unr. PnL',
  type: 'slot',
  render: (data, index) => {
    return (
      <>
        <TdTxt>{data.trader}</TdTxt> <TdTxt>{data.token}</TdTxt>
        <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""]}>
          {IconRight}
        </SvgIcon>
      </>
    )
  }
}]

return state.loading ? <Widget src="bluebiu.near/widget/0vix.LendingSpinner" /> : (
  <Column>
    <Widget
      src={"bluebiu.near/widget/Liquidity.Data.METAVAULT"}
      props={{
        pairs,
        addresses,
        prices,
        curChain,
        multicallAddress,
        storeAddress,
        onLoad: (data) => {
          State.update({
            dataList: data.dataList,
            loading: false
          })
        }
      }}
    />
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
      src={"bluebiu.near/widget/Liquidity.Bridge.METAVAULT.List"}
      props={{
        toast,
        prices,
        refetch,
        columnList,
        storeAddress,
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
  </Column>
)