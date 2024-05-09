const StyledContainer = styled.div`
  padding-top: 18px;
`;

const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  prices,
  account,
  addAction,
  toast,
  chainId,
  nativeCurrency,
  tab,
  orbitTab,
  switchToMarkets,
} = props;
// console.log("CONTENT--", props);
useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);

useEffect(() => {
  // if (tab !== "markets") {
  //   switchToMarkets();
  // }
  State.update({
    loading: true,
  });
}, [orbitTab]);

const handleTableButtonClick = (address, actionText) => {
  const market = state.markets[address];
  const dapp = {
    userTotalSupplyUsd: state.userTotalSupplyUsd,
    userTotalBorrowUsd: state.userTotalBorrowUsd,
    totalCollateralUsd: state.totalCollateralUsd,
    rewards: state.rewards,
    dappIcon: dexConfig.icon,
    dappName: dexConfig.name,
  };

  State.update({
    tableButtonClickData: {
      ...dapp,
      ...market,
      config: { ...dexConfig, wethAddress },
      actionText,
    },
    showDialog: true,
  });
};

return (
  <StyledContainer>
    {tab === "market" && (
      <Widget
        src="bluebiu.near/widget/Lending.Orbit.Markets"
        props={{
          markets: state.markets,
          totalCollateralUsd: state.totalCollateralUsd,
          userTotalBorrowUsd: state.userTotalBorrowUsd,
          borrowLimit: state.borrowLimitUsd,
          userTotalSupplyUsd: state.userTotalSupplyUsd,
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig,
          account,
          prices,
          orbitTab,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "yours" ? (
      <Widget
        src="bluebiu.near/widget/Lending.Orbit.Yours"
        props={{
          prices,
          orbitTab,
          currentDapp: dexConfig.name,
          markets: state.markets,
          timestamp: state.timestamp,
          borrowLimit: state.borrowLimitUsd,
          dapps: {
            [dexConfig.name]: {
              userTotalSupplyUsd: state.userTotalSupplyUsd,
              userTotalBorrowUsd: state.userTotalBorrowUsd,
              totalCollateralUsd: state.totalCollateralUsd,
              rewards: state.rewards,
              dappIcon: dexConfig.icon,
              dappName: dexConfig.name,
            },
          },
          dappsConfig: {
            [dexConfig.name]: dexConfig,
          },
          toast,
          account,
          onButtonClick: handleTableButtonClick,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    ) : null}
    {state.loading && <Widget src="bluebiu.near/widget/Lending.Spinner" />}
    <Widget
      src={dexConfig.data}
      props={{
        update: state.loading,
        account,
        wethAddress,
        multicallAddress,
        multicall,
        prices,
        ...dexConfig,
        orbitTab,
        onLoad: (data) => {
          console.log("DATA_onLoad:", data);
          State.update({
            loading: false,
            timestamp: Date.now(),
            ...data,
          });
        },
      }}
    />
    <Widget
      src="bluebiu.near/widget/Lending.Orbit.Dialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        chainId,
        addAction,
        toast,
        source: "dapp",
        account,
        orbitTab,
        onClose: () => {
          State.update({
            showDialog: false,
          });
        },
        onSuccess: () => {
          State.update({
            loading: true,
          });
        },
      }}
    />
  </StyledContainer>
);
