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
} = props;
useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);

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
        src="bluebiu.near/widget/Lending.Markets"
        props={{
          markets: state.markets,
          totalCollateralUsd: state.totalCollateralUsd,
          userTotalBorrowUsd: state.userTotalBorrowUsd,
          addAction,
          toast,
          chainId,
          nativeCurrency,
          dexConfig,
          account,
          prices,
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {tab === "yours" && (
      <Widget
        src="bluebiu.near/widget/Avalanche.Lending.Yours"
        props={{
          currentDapp: dexConfig.name,
          markets: state.markets,
          timestamp: state.timestamp,
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
    )}
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
      src="bluebiu.near/widget/Avalanche.Lending.Dialog"
      props={{
        display: state.showDialog,
        data: state.tableButtonClickData,
        chainId,
        addAction,
        toast,
        source: "dapp",
        account,
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
