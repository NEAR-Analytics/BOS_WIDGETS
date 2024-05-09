
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
    width: 26px;
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
} = {
  chainId: 59144,
  name: 'Arrakis',
  CHAIN_LIST: [
    {
      tag: 'optimism',
      native_currency:
        '{"name":"OP","symbol":"Optimism","decimals":18,"logo":"https://s3.amazonaws.com/dapdap.test/images/image520.png"}',
      tbd_token: 'N',
      rpc: '["https://mainnet.optimism.io"]',
      block_explorer: 'https://optimistic.etherscan.io',
      show: true,
      created_at: '2023-12-06T10:31:28.760000+00:00',
      description:
        'OP Mainnet is an EVM-equivalent Optimistic Rollup chain. It aims to be fast, simple, and secure. With the Nov 2021 upgrade to OVM 2.0 old fraud proof system has been disabled while the new fraud-proof system is being built.',
      logo: 'https://s3.amazonaws.com/dapdap.test/images/optimism.png',
      technology: 'Optimistic Rollup',
      id: 13,
      milestones:
        '[{"title":"Optimism mainnet Bedrock upgrade has entered the consensus and function freezing stage","url":"","date":"2023 Apr 29th"},{"title":"Optimism will undergo Optimism Goerli hard fork upgrade","url":"","date":"2023 Mar 18th"}]',
      sub_description:
        'OP Mainnet is an EVM-equivalent Optimistic Rollup. It aims to be fast, simple, and secure.',
      chain_id: 10,
      deepdive: false,
      priority: 7,
      updated_at: '2024-01-31T13:17:25+00:00',
      name: 'Optimism'
    }
  ],
  curChain: {
    tag: 'optimism',
    native_currency:
      '{"name":"OP","symbol":"Optimism","decimals":18,"logo":"https://s3.amazonaws.com/dapdap.test/images/image520.png"}',
    tbd_token: 'N',
    rpc: '["https://mainnet.optimism.io"]',
    block_explorer: 'https://optimistic.etherscan.io',
    show: true,
    created_at: '2023-12-06T10:31:28.760000+00:00',
    description:
      'OP Mainnet is an EVM-equivalent Optimistic Rollup chain. It aims to be fast, simple, and secure. With the Nov 2021 upgrade to OVM 2.0 old fraud proof system has been disabled while the new fraud-proof system is being built.',
    logo: 'https://s3.amazonaws.com/dapdap.test/images/optimism.png',
    technology: 'Optimistic Rollup',
    id: 13,
    milestones:
      '[{"title":"Optimism mainnet Bedrock upgrade has entered the consensus and function freezing stage","url":"","date":"2023 Apr 29th"},{"title":"Optimism will undergo Optimism Goerli hard fork upgrade","url":"","date":"2023 Mar 18th"}]',
    sub_description:
      'OP Mainnet is an EVM-equivalent Optimistic Rollup. It aims to be fast, simple, and secure.',
    chain_id: 10,
    deepdive: false,
    priority: 7,
    updated_at: '2024-01-31T13:17:25+00:00',
    name: 'Optimism'
  },
  defaultDex: 'Arrakis',
  id: 99,
  created_at: '2024-02-03T13:31:05.963000+00:00',
  updated_at: '2024-02-03T13:31:05.963000+00:00',
  description: '',
  route: '/dapp/arrakis-finance',
  logo: '',
  favorite: 0,
  default_chain_id: 10,
  priority: 0,
  tbd_token: 'N',
  recommend: false,
  recommend_icon: '',
  category_ids: [4],
  network_ids: [13],
  tag: '',
  native_currency: '{"name":"","symbol":"","decimals":0,"logo":""}',
  theme: {
    bridge: {
      background: 'rgba(169, 51, 51, 0.15)',
      color: 'rgba(169, 51, 51, 1)'
    }
  },
  dapp_network: [
    {
      dapp_id: 99,
      network_id: 13,
      chain_id: 10,
      dapp_src: '/bluebiu.near/widget/Liquidity.ARRAKISFINANCE'
    }
  ],
  wethAddress: '0x4200000000000000000000000000000000000006',
  multicallAddress: '0xD9bfE9979e9CA4b2fe84bA5d4Cf963bBcB376974',
  dexConfig: {
    name: 'arrakis-finance',
    logo:
      'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
    amountOutFn: 'bluebiu.near/widget/Liquidity.ARRAKISFINANCE',
    ICON_VAULT_MAP: {
      THALES:
        'https://assets.dex.guru/icons/0x217d47011b23bb961eb6d93ca9945b7501a5bb11-optimism.png',
      WETH:
        'https://assets.dex.guru/icons/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-eth.png',
      HAN:
        'https://raw.githubusercontent.com/hanchain-paykhan/hanchain/3058eecc5d26f980db884f1318da6c4de18a7aea/logo/logo.svg',
      OP:
        'https://assets.dex.guru/icons/0x4200000000000000000000000000000000000042-optimism.png',
      LYRA:
        'https://assets.dex.guru/icons/0x50c5725949a6f0c72e6c4a641f24049a917db0cb-optimism.png'
    },
    ALL_DATA_URL:
      'https://indexer.api.arrakis.finance/api/vault/all?version=V1&networks=optimism&sortDirection=desc&sort=tvl',
    pairs: [
      {
        id: 'THALES/WETH',
        strategy: 'LST (volatile)',
        strategy2: '',
        token0: 'THALES',
        token1: 'WETH'
      },
      {
        id: 'WETH/HAN',
        strategy: 'LST (volatile)',
        strategy2: '',
        token0: 'WETH',
        token1: 'HAN'
      },
      {
        id: 'WETH/OP',
        strategy: 'LST (volatile)',
        strategy2: '',
        token0: 'WETH',
        token1: 'OP'
      },
      {
        id: 'WETH/LYRA',
        strategy: 'LST (volatile)',
        strategy2: '',
        token0: 'WETH',
        token1: 'LYRA'
      }
    ],
    addresses: {
      THALES: '0x217d47011b23bb961eb6d93ca9945b7501a5bb11',
      WETH: '0x4200000000000000000000000000000000000006',
      HAN: '0x50bce64397c75488465253c0a034b8097fea6578',
      OP: '0x4200000000000000000000000000000000000042',
      LYRA: '0x50c5725949a6f0c72e6c4a641f24049a917db0cb',
      'THALES/WETH': '0xac6705bc7f6a35eb194bdb89066049d6f1b0b1b5',
      'WETH/HAN': '0x3fa8cee6795220ac25dd35d4d39ec306a3e4fb3f',
      'WETH/OP': '0xd1dce56f7d8300d43d8b7d3b67650ddf9b2caf54',
      'WETH/LYRA': '0x70535c46ce04181adf749f34b65b6365164d6b6e'
    },
    theme: {
      '--button-color': '#783ae3',
      '--button-text-color': '#FFFFFF'
    }
  },
  prices: {
    cbETH: '2440.840000000',
    WETH: '2302.130000000',
    ETH: '2302.390000000',
    axlUSDC: '1.000000000',
    BSWAP: '0.355883000',
    DAI: '0.999928000',
    USDbC: '1.000000000',
    RCKT: '0.172588000',
    BALD: '0.014691870',
    BASE: '0.000000146',
    SYNTH: '11.020000000',
    MNT: '0.590952000',
    USDT: '0.999369000',
    WBTC: '42927.000000000',
    WMNT: '0.590686000',
    ARB: '1.770000000',
    'USDC.e': '1.000000000',
    USDC: '1.000000000',
    FCTR: '0.107228000',
    WINR: '0.081884000',
    PENDLE: '2.940000000',
    GMX: '43.180000000',
    TROVE: '0.008517630',
    JONES: '1.022000000',
    SPARTA: '0.677578000',
    GSWIFT: '0.503138000',
    GRAIL: '1738.470000000',
    BNB: '300.380000000',
    WBNB: '300.320000000',
    BTCB: '42972.000000000',
    'BSC-USD': '0.179998000',
    BUSD: '0.999175000',
    BSW: '0.090289000',
    BANANA: '0.000671880',
    CHRP: '0.009934890',
    CEEK: '0.047923770',
    ORN: '0.798697000',
    INJ: '33.260000000',
    XDAI: '1.003000000',
    GNO: '216.720000000',
    WXDAI: '0.993363000',
    DONUT: '0.012537380',
    HNY: '8.800000000',
    axlUSDT: '0.998115000',
    HZN: '0.005038860',
    iZi: '0.013164750',
    METIS: '74.660000000',
    'm.USDT': '0.999369000',
    'm.USDC': '1.000000000',
    MAIA: '26.820000000',
    WMATIC: '0.783062000',
    CASH: '0.998372000',
    RETRO: '0.030918650',
    SPACE: '0.076910000',
    ceBNB: '300.380000000',
    ceBUSD: '0.999175000',
    NETT: '0.835828000',
    PEAK: '0.000907160',
    BYTE: '0.273091000',
    HERA: '5.320000000',
    agEUR: '1.083000000',
    GUSD: '1.000000000',
    LUSD: '0.998734000',
    XSGD: '0.742725000',
    CEUR: '1.079000000',
    'BTC.b': '43022.000000000',
    ankrBNB: '322.520000000',
    frxETH: '2297.320000000',
    BNBx: '323.020000000',
    stkBNB: '312.060000000',
    VC: '0.060023000',
    WAIFU: '0.001355060',
    LSD: '0.012081430',
    USX: '1.091000000',
    iUSD: '1.013000000',
    rETH: '2526.040000000',
    DVF: '0.598460000',
    zkUSD: '1.001000000',
    Matic: '0.782355000',
    USDR: '0.649539000',
    wUSDR: '0.699640000',
    CVR: '0.103013000',
    PEARL: '0.114975000',
    MATIC: '0.782355000',
    APE: '1.380000000',
    HAPI: '23.170000000',
    KNC: '0.590363000',
    LDO: '2.770000000',
    LINK: '17.940000000',
    PEPE: '0.000000907',
    SHIB: '0.000009090',
    UNI: '6.110000000',
    sDAI: '1.041000000',
    wstETH: '2660.610000000',
    crvUSD: '0.999989000',
    AURA: '0.650528000',
    BAL: '3.580000000',
    staBAL3: '0.996142000',
    COW: '0.338880000',
    stEUR: '1.094000000',
  },
  switchingChain: false,
  nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
  isChainSupported: false
}


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
const {
  pairs,
  addresses,
  ALL_DATA_URL,
  ICON_VAULT_MAP,
} = dexConfig
function fetchAllData() {
  State.update({
    loading: true
  });
  asyncFetch(ALL_DATA_URL).then((res) => {
    if (!res.ok) return;
    const allData = {
    }
    res.body.vaults.forEach(data => {
      allData[data.id] = data
    })
    State.update({
      allData,
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
  width: '15%',
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
  width: '15%',
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
        {data.liquidity && <TdTxt className="gray">{formatFiat(data.liquidity)} LP</TdTxt>}
        <SvgIcon className={["icon-right", index === state.dataIndex ? "rotate" : ""]}>
          {IconRight}
        </SvgIcon>
      </>
    )
  }
}]

return (
  <StyledColumn style={dexConfig.theme}>
    {state.allData && (
      <Widget
        src={"bluebiu.near/widget/Liquidity.Data.ArrakisFinance"}
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


  </StyledColumn>
)