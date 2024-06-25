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
} = VM.require("bluebiu.near/widget/Staking.Beefy.Styles");

State.init({
  loading: false,
  dataList: [],
  dataIndex: -1,
  chainIndex: 0,
  token: "",
});
const IconRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="8"
    height="10"
    viewBox="0 0 8 10"
    fill="none"
  >
    <path
      d="M7.18407 4.21913C7.68448 4.61945 7.68448 5.38054 7.18407 5.78087L2.28485 9.70024C1.63009 10.2241 0.660156 9.75788 0.660156 8.91937L0.660156 1.08062C0.660156 0.242118 1.63009 -0.224055 2.28485 0.299756L7.18407 4.21913Z"
      fill="#979ABE"
    />
  </svg>
);
const {
  account,
  toast,
  CHAIN_LIST,
  multicallAddress,
  dexConfig,
  defaultDex,
  curChain,
  isChainSupported,
  onSwitchChain,
  addAction,
  connectProps,
  prices,
  chainIdNotSupport,
} = props;
console.log("PROPS--", props);
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
useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);
if (!account || !isChainSupported) {
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

const { pairs, addresses, ICON_VAULT_MAP } = dexConfig;

function handleChangeDataIndex(index) {
  state.dataIndex === index
    ? State.update({
        dataIndex: -1,
      })
    : State.update({
        dataIndex: index,
      });
}

function handleChangeChainIndex(index) {
  const chain = CHAIN_LIST[index];
  onSwitchChain({
    chainId: `0x${Number(chain.chain_id).toString(16)}`,
  });
}
function handleSearchInput(event) {
  State.update({
    token: event.target.value,
  });
}

useEffect(() => {
  const index = CHAIN_LIST.findIndex((chain) => chain.id === curChain.id);

  if (index > -1) {
    State.update({
      chainIndex: index,

      dataList: [],
      userPositions: null,
    });
  }
}, [curChain]);
const columnList = [
  {
    width: "25%",
    key: "pool",
    label: "VAULT",
    type: "slot",
    render: (data) => {
      return (
        <>
          <StyledVaultImage>
            <img
              style={{ marginRight: -6 }}
              src={ICON_VAULT_MAP[data.token0]}
              alt={data.token0}
            />
            <img src={ICON_VAULT_MAP[data.token1]} alt={data.token1} />
          </StyledVaultImage>
          <TdTxt>
            {data.token0} / {data.token1}
          </TdTxt>
          {/* <PoolPercentage>{data.fee}%</PoolPercentage> */}
        </>
      );
    },
  },
  {
    width: "10%",
    key: "chain",
    label: "CHAIN",
    type: "slot",
    render: () => (
      <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
    ),
  },
  {
    width: "15%",
    key: "strategy",
    label: "STRATEGY",
    type: "slot",
    render: (data) => {
      return <StrategyTxt>{data.strategy}</StrategyTxt>;
    },
  },
  {
    width: "15%",
    key: "TVL",
    label: "TVL",
    type: "slot",
    render: (data) => {
      return (
        <div>
          <TdTxt>{formatFiat(data.beefyTVL)}</TdTxt>
          <TdTxt className="gray">{formatFiat(data.gammaTVL)}</TdTxt>
        </div>
      );
    },
  },
  {
    width: "15%",
    key: "APY",
    label: "APY",
    type: "slot",
    render: (data) => {
      return (
        <StyledDashedUndeline>
          <TdTxt>{data.APY}%</TdTxt>
        </StyledDashedUndeline>
      );
    },
  },
  {
    width: "15%",
    key: "DAILY",
    label: "DAILY",
    type: "slot",
    render: (data) => {
      return (
        <StyledDashedUndeline>
          <TdTxt>{data.DAILY}%</TdTxt>
        </StyledDashedUndeline>
      );
    },
  },
  {
    width: "15%",
    direction: "column",
    key: "liquidity",
    label: "DEPOSITED",
    type: "slot",
    render: (data, index) => {
      return (
        <div>
          <TdTxt>
            {data.deposits}
            {/* {Big(userBalance ?? 0).gt(0) ? `${formatFiat(userBalance)}` : "-"} */}
          </TdTxt>
          {/* {Big(data?.shares ?? 0).gt(0) && (
            <TdTxt className="gray">
              {Big(data?.shares ?? 0).lt(0.01)
                ? "<0.01"
                : Big(data?.shares).toFixed(4)}
            </TdTxt>
          )} */}
          <SvgIcon
            className={[
              "icon-right",
              index === state.dataIndex ? "rotate" : "",
            ]}
          >
            {IconRight}
          </SvgIcon>
        </div>
      );
    },
  },
];

console.log("dataList---", state.dataList);
return (
  <Column>
    <Widget
      src={"bluebiu.near/widget/Staking.Beefy.Data"}
      props={{
        ...props,
        ...dexConfig,
        update: state.loading,
        onLoad: (data) => {
          State.update({
            dataList: data.dataList,
            loading: false,
          });
        },
      }}
    />
    {state.loading ? (
      <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
    ) : (
      <Widget
        src={"bluebiu.near/widget/Staking.Beefy.List"}
        props={{
          ...props,
          ...dexConfig,

          // dataList: state.filterList,
          dataList: state.dataList,
          dataIndex: state.dataIndex,
          onChangeDataIndex: handleChangeDataIndex,
          userPositions: state.userPositions,
          columnList,
        }}
      />
    )}
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
);
