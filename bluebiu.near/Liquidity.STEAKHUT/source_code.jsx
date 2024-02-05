
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
  CHAIN_LIST,
  multicallAddress,
  dexConfig,
  curChain,
  isChainSupported,
  onSwitchChain,
  prices
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
      src="bluebiu.near/widget/Linea.Liquidity.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: false,
      }}
    />
  );
} else {
  const index = CHAIN_LIST.findIndex(chain => chain.id === curChain.id)
  if (index > -1) {
    State.update({
      chainIndex: index,
    })
  }
}
// const ALL_DATA_URL = 'https://api.thegraph.com/subgraphs/name/0xsirloin/steakhutlb'
const {
  pairs,
  addresses,
  ALL_DATA_URL,
  ICON_VAULT_MAP,
  USER_DATA_BASE,
  LAST_SNAP_SHOT_DATA_URL,
} = {
  ALL_DATA_URL: 'https://api.thegraph.com/subgraphs/name/0xsirloin/steakhutlb',
  // USER_DATA_BASE: 'https://wire2.gamma.xyz/quickswap/polygon/user/',
  LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/quickswap/polygon/hypervisors/lastSnapshot',
  pairs: [{
    id: "SHLB_USDC.e-USDC_C",
    strategy: "Balanced",
    strategy2: "Concentrated",
    token0: "USDC.e",
    token1: "USDC",
  }, {
    id: "SHLB_USDT-USDC_B",
    strategy: "Balanced",
    strategy2: "Concentrated",
    token0: "USDC.e",
    token1: "USDC",
    ammName: 'QuickSwap',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
  }, {
    id: "SHLB_USDC.e-USDC_C",
    strategy: "Balanced",
    strategy2: "Concentrated",
    token0: "USDC.e",
    token1: "USDC",
    ammName: 'QuickSwap',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg'
  }],
  addresses: {
    'USDC.e': "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
    'USDC': "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e",
    'USDt': '0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7',
    'USDT.e': '0xc7198437980c041c805a1edcba50c1ce5db95118',
    'JOE': '0x6e84a6216ea6dacc71ee8e6b0a5b7322eebc0fdd',
    'WAVAX': '0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7',
    'WETH.e': '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
    'BTC.b': '0x152b9d0fdc40c096757f570a51e494bd4b943e50',

    "SHLB_USDC.e-USDC_C": "0x37e0f0513ae3d3c4403e7b11c8a15b06c7cb1412",
    "SHLB_USDT-USDC_B": "0xb41506675a0977a34e8cec7da8c061d6753b5b03",
    "SHLB_USDT-USDC_C": "0xc4bbd4ba96eaf7ccb3d0f2e0819b1f6e5c900b16",
    "SHLB_USDT.e-USDt_B": "0x07462883abb2350e5243b94aeb27f4d37e3238e8",
    "SHLB_USDT.e-USDt_C": "0x9f44e67ba256c18411bb041375e572e3dd11fa72",
    "SHLB_USDC.e-USDC_B": "0x3b27aee8df3a3791eb57b59a770a530a93dc0221",
    "SHLB_JOE-AVAX_B": "0x89547441489262feb5cee346fdacb9037c2574db",
    "SHLB_AVAX-USDC_B": "0x668530302c6ecc4ebe693ec877b79300ac72527c",
    "SHLB_WETH-AVAX_B": "0x9c9cea14731821f4d08889717043977e6dee766a",
    "BTC.b/USDC_B": "0x9cc15d1204d768380cec8d35bc1d8e1945083397",
    "SHLB_BTC.b-AVAX_B": "0x536d7e7423e8fb799549caf574cfa12aae95ffcd",
  },
  ICON_VAULT_MAP: {
    'USDC.e': 'https://raw.githubusercontent.com/traderjoe-xyz/joe-tokenlists/main/logos/0xB6076C93701D6a07266c31066B298AeC6dd65c2d/logo.png',
    'USDC': '',
    'USDt': ''
  }
}
function fetchAllData() {
  State.update({
    loading: true
  });
  asyncFetch(ALL_DATA_URL).then((res) => {
    if (!res.ok) return;
    State.update({
      allData: res.body,
      loading: false
    })
  })
}
function fetchUserData() {
  asyncFetch(USER_DATA_BASE + `${sender}`).then((res) => {
    if (!res.ok) return;
    State.update({
      userPositions: res.body[sender],
    });
  });
};
function handleChangeDataIndex(index) {
  State.update({
    dataIndex: state.dataIndex > -1 ? -1 : index
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
  State.update({
    allData: null,
    dataList: [],
    categoryIndex: 0,
    userPositions: null
  })
}
function handleSearchInput(event) {
  State.update({
    token: event.target.value
  })
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
    } else if (state.categoryIndex === 1 && state.userPositions) {
      state.dataList.forEach(data => {
        if (userPositions && addresses[data.id] in userPositions) {
          filterList.push(data)
        }
      })
    }
    State.update({
      filterList
    })
  }
}, [state.dataList, state.token, state.categoryIndex])
if (!state.allData) {
  fetchAllData()
}
if (sender && state.userPositions === undefined) {
  fetchUserData();
}
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
  render: (data) => {
    return (
      <>
        <img src={data.ammImage} alt={data.ammName} style={{ width: 22 }} />
        <TdTxt>{data.ammName}</TdTxt>
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
  key: 'totalApr',
  label: 'Total APR',
}, {
  width: '10%',
  direction: 'column',
  key: 'liquidity',
  label: 'Your Liquidity',
  type: 'slot',
  render: (data, index) => {
    const userPositions = state.userPositions
    const userBalance = userPositions && addresses[data.id] in userPositions
      ? userPositions[addresses[data.id]].balanceUSD
      : undefined;
    return (
      <>
        <TdTxt>{userBalance ? `${formatFiat(userBalance)}` : "-"}</TdTxt>
        {data.liquidity && <TdTxt className="gray">{data.liquidity} LP</TdTxt>}
        <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""]}>
          {IconRight}
        </SvgIcon>
      </>
    )
  }
}]

return (
  <StyledColumn>
    {state.allData && (
      <Widget
        src={"bluebiu.near/widget/Liquidity.Data.Gamma"}
        props={{
          pairs,
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
    {/* <Widget
      src={"bluebiu.near/widget/Liquidity.Bridge.Logo"}
    /> */}
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
      src={"bluebiu.near/widget/Liquidity.Bridge.List"}
      props={{
        columnList,
        loading: state.loading,
        dataIndex: state.dataIndex,
        onChangeDataIndex: handleChangeDataIndex,
        dataList: state.filterList,
        addresses,
        multicallAddress,
        ICON_VAULT_MAP
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