
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
const sender = Ethers.send("eth_requestAccounts", [])[0];
if (!sender) {
  return (
    <>
      <TitleText>Liquidity Manage</TitleText>
      <ContainerLogin
        style={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          margin: "80px auto auto auto",
        }}
      >
        <Web3Connect
          className="web3-connect"
          connectLabel="Connect ETH wallet"
        />
      </ContainerLogin>
    </>
  );
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
const ICON_VAULT_MAP = {
  USDC: 'https://app.gamma.xyz/_next/static/media/icon.4435c0e9.svg',
  WETH: 'https://app.gamma.xyz/_next/static/media/icon.dddcef40.svg',
  USDT: 'https://app.gamma.xyz/_next/static/media/icon.16fadc1b.svg',
  WBTC: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
  BUSD: 'https://app.gamma.xyz/_next/static/media/icon.6be491a5.svg',
  MATIC: 'https://app.gamma.xyz/_next/static/media/icon.fe758f26.svg',
  WBNB: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg',
  BTCB: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
  BNBx: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg'
}

const chains = [{
  icon: (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="26" height="26" rx="8" fill="#AF1616" />
    </svg>

  ),
  type: 'Avalanche'
}]
const CHAIN_MAP = {
  Avalanche: {
    url: 'https://wire2.gamma.xyz/sushi/base/hypervisors/allData',
    pairs: [{
      id: "WETH-USDbC-500",
      strategy: "Dynamic",
      strategy2: "",
      token0: "USDC",
      token1: "WETH",
      chainName: 'Base',
      chainSvg: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="24" height="24" rx="8" fill="#0038FF" />
          <path d="M11.9862 20C16.4126 20 20 16.4189 20 12C20 7.58109 16.4126 4 11.9862 4C7.7866 4 4.34172 7.22327 4 11.3265H14.5935V12.672H4C4.34172 16.7767 7.7866 20 11.9862 20Z" fill="white" />
        </svg>
      ),
      ammName: 'Sushi',
      ammImage: 'https://app.gamma.xyz/_next/static/media/icon.615337dd.svg'
    }],
    addresses: {
      USDC: "0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca",
      WETH: "0x4200000000000000000000000000000000000006",
      "WETH-USDbC-500": "0x11c4011772594c5f124a027da35329559447853d",
    }
  }
}
const MULTICALL_ADDRESS = "0xcA11bde05977b3631167028862bE2a173976CA11";
State.init({
  loading: false,
  dataList: [],
  dataIndex: -1,
  categoryIndex: 0,
  chainIndex: 0,
  token: ''
})
const {
  url,
  pairs,
  addresses
} = CHAIN_MAP[chains[state?.chainIndex ?? 0].type]
function fetchDataList() {
  State.update({
    loading: true
  });
  asyncFetch(url).then((res) => {
    if (!res.ok) return;
    State.update({
      allData: res.body,
      loading: false
    })
  })
}
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
  State.update({
    chainIndex: index,
    allData: null,
    dataList: [],
  })
}

if (!state.allData) {
  fetchDataList()
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
        <PoolPercentage>0.05%</PoolPercentage>
      </>
    )
  }
}, {
  width: '10%',
  key: 'chainSvg',
  label: 'Chain',
  type: 'svg'
}, {
  width: '20%',
  key: 'amm',
  label: 'AMM',
  type: 'slot',
  render: (data) => {
    return (
      <>
        <img src={data.ammImage} alt={data.ammName} width={22} />
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
  // type: 'slot',
  // render: (data) => {
  //   const chainType = chains[state?.chainIndex ?? 0].type
  //   let totalApr = 0
  //   if (['Base', 'Optimism'].includes(chainType)) {
  //     totalApr = formatPercent(data.returns.weekly.feeApr)
  //   } else if (chainType === 'BSC') {
  //     totalApr = 1
  //   } else {
  //     totalApr = 2
  //   }
  //   return <TdTxt>{totalApr}</TdTxt>
  // }
}, {
  width: '10%',
  direction: 'column',
  key: 'liquidity',
  label: 'Your Liquidity',
  type: 'slot',
  render: (data, index) => {
    return (
      <>
        <TdTxt>{data.balance ? '$' + data.balance : '-'}</TdTxt>
        <TdTxt className="gray">0.24 LP</TdTxt>
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
        src={"bluebiu.near/widget/Linea.Liquidity.Data.Gamma"}
        props={{
          pairs,
          addresses,
          allData: state.allData,
          multicallAddress: MULTICALL_ADDRESS,
          chainType: chains[state?.chainIndex ?? 0].type,
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
      src={"bluebiu.near/widget/Linea.Liquidity.Bridge.Logo"}
    />
    <Widget
      src={"bluebiu.near/widget/Linea.Liquidity.Bridge.Filter"}
      props={{
        token: state.token,
        chains,
        categoryIndex: state.categoryIndex,
        chainIndex: state.chainIndex,
        onSearchInput: handleSearchInput,
        onChangeCategoryIndex: handleChangeCategoryIndex,
        onChangeChainIndex: handleChangeChainIndex,
      }}
    />
    <Widget
      src={"bluebiu.near/widget/Linea.Liquidity.Bridge.List"}
      props={{
        columnList,
        loading: state.loading,
        dataIndex: state.dataIndex,
        onChangeDataIndex: handleChangeDataIndex,
        dataList: state.dataList,
        addresses,
        ICON_VAULT_MAP
      }}
    />
  </StyledColumn>
)