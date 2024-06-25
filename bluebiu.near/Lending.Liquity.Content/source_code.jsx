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

const { markets, VesselManagerOperations } = dexConfig;

State.init({
  newMarkets: "",
  tvl: "",
  deposits: "",
  tokenBal: "",
});

const IS_ETHOS_DAPP = dexConfig.name === "Ethos Finance" ? true : false;
const IS_PREON_DAPP = dexConfig.name === "Preon Finance" ? true : false;
const IS_GRAVITA_DAPP = dexConfig.name === "Gravita Protocol" ? true : false;
const IS_LYVE_DAPP = dexConfig.name === "Lyve" ? true : false;

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);

useEffect(() => {
  if (!state.newMarkets) return;
  const _marketsArray = Object.values(state.newMarkets);
  const totalDebt = _marketsArray.reduce((total, item) => {
    return Big(total || 0)
      .plus(item.vesselDebt || 0)
      .toFixed(2);
  }, 0);
  const totalCollateral = _marketsArray.reduce((total, item) => {
    return Big(total || 0)
      .plus(
        Big(item.vesselDeposit || 0).times(
          prices[item.underlyingToken.symbol] || 1
        )
      )
      .toFixed(2);
  }, 0);

  const marketTotalCollateral = _marketsArray.reduce((total, item) => {
    return Big(total || 0)
      .plus(
        Big(item.poolTotalColl || 0).times(
          prices[item.underlyingToken.symbol] || 1
        )
      )
      .toFixed(2);
  }, 0);

  const marketTotalDebt = _marketsArray.reduce((total, item) => {
    return Big(total || 0)
      .plus(Big(item.poolTotalDebt || 0))
      .toFixed(2);
  }, 0);
  State.update({
    totalDebt,
    totalCollateral,
    marketTotalCollateral,
    marketTotalDebt,
  });
}, [state.newMarkets]);

return (
  <StyledContainer>
    {tab === "market" && (
      <Widget
        src="bluebiu.near/widget/Lending.Liquity.Markets"
        props={{
          ...props,
          IS_ETHOS_DAPP,
          IS_PREON_DAPP,
          IS_GRAVITA_DAPP,
          IS_LYVE_DAPP,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          tokenBal: state.tokenBal,
          deposits: state.deposits,
          totalDebt: state.totalDebt,
          totalCollateral: state.totalCollateral,
          marketTotalCollateral: state.marketTotalCollateral,
          marketTotalDebt: state.marketTotalDebt,
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
        src="bluebiu.near/widget/Lending.Liquity.Yours"
        props={{
          ...props,
          tvl: state.tvl,
          deposits: state.deposits,
          tokenBal: state.tokenBal,
          dexConfig: {
            ...dexConfig,
            markets: state.newMarkets,
          },
          IS_ETHOS_DAPP,
          IS_PREON_DAPP,
          IS_GRAVITA_DAPP,
          IS_LYVE_DAPP,
          onSuccess: () => {
            // fresh balance..
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    <Widget
      src={dexConfig.data}
      props={{
        update: state.loading,
        ...props,
        IS_ETHOS_DAPP,
        IS_PREON_DAPP,
        IS_GRAVITA_DAPP,
        IS_LYVE_DAPP,
        onLoad: (data) => {
          console.log("ONLOAD--", data);
          State.update({
            loading: false,
            timestamp: Date.now(),
            ...data,
          });
        },
      }}
    />
  </StyledContainer>
);
