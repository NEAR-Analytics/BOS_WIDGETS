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
} = VM.require("bluebiu.near/widget/Staking.Teahouse.Styles");

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
  tab,
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
    label: "Pool",
    type: "slot",
    render: (data) => {
      let _res;
      if (tab === "LP") {
        _res = (
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
            <PoolPercentage>{data.fee}%</PoolPercentage>
          </>
        );
      }
      if (tab === "MANAGED")
        _res = (
          <>
            <StyledVaultImage>
              <img
                // style={{ marginRight: -6 }}
                src={ICON_VAULT_MAP[data.token0]}
                alt={data.token0}
              />
            </StyledVaultImage>
            <TdTxt>{data.name}</TdTxt>
          </>
        );
      return _res;
    },
  },
  {
    width: "10%",
    key: "chain",
    label: "Chain",
    type: "slot",
    render: () => (
      <img style={{ width: 26 }} src={curChain.logo} alt={curChain.name} />
    ),
  },
  {
    width: "15%",
    key: "strategy",
    label: "AMM",
    type: "slot",
    render: (data) => {
      return <StrategyTxt>{data.strategy}</StrategyTxt>;
    },
  },
  {
    width: "15%",
    key: "AUM",
    label: "AUM",
    type: "slot",
    render: (data) => {
      return <TdTxt>{formatFiat(data.AUM)}</TdTxt>;
    },
  },
  {
    width: "15%",
    key: "APR",
    label: "APR",
    type: "slot",
    render: (data) => {
      return (
        <StyledDashedUndeline>
          <TdTxt>{data.APR}%</TdTxt>
        </StyledDashedUndeline>
      );
    },
  },
  {
    width: "15%",
    direction: "column",
    key: "liquidity",
    label: "Your Shares",
    type: "slot",
    render: (data, index) => {
      return (
        <div>
          <TdTxt>
            {data.token0Value > 0 || data.token1Value > 0
              ? `${Big(data.token0Value || 0)
                  .plus(data.token1Value || 0)
                  .toFixed(2)} $`
              : ""}

            {/* {Big(userBalance ?? 0).gt(0) ? `${formatFiat(userBalance)}` : "-"} */}
          </TdTxt>
          {Big(data?.shares ?? 0).gt(0) && (
            <TdTxt className="gray">
              {Big(data?.shares ?? 0).lt(0.01)
                ? "<0.01"
                : Big(data?.shares).toFixed(4)}
            </TdTxt>
          )}
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
useEffect(() => {
  State.update({
    loading: true,
  });
}, [tab]);

console.log("dataList---", state.dataList, "tab--", tab);
return (
  <Column>
    {tab === "LP" && (
      <Widget
        src={"bluebiu.near/widget/Staking.Teahouse.LPData"}
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
    )}
    {tab === "MANAGED" && (
      <Widget
        src={"bluebiu.near/widget/Staking.Teahouse.ManagedData"}
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
    )}
    {state.loading ? (
      <Widget src="bluebiu.near/widget/0vix.LendingSpinner" />
    ) : (
      <Widget
        src={"bluebiu.near/widget/Staking.Teahouse.List"}
        props={{
          ...props,
          ...dexConfig,

          // dataList: state.filterList,
          dataList: state.dataList,
          dataIndex: state.dataIndex,
          onChangeDataIndex: handleChangeDataIndex,
          userPositions: state.userPositions,
          columnList,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
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
