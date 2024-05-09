const StyledContainer = styled.div`
  padding-top: 18px;
`;
State.init({
  rowData: null,
  assets: [],
});
const {
  dexConfig,
  wethAddress,
  multicallAddress,
  chainIdNotSupport,
  multicall,
  account,
  addAction,
  toast,
  chainId,
  curChain,
  nativeCurrency,
  tab,
} = props;

useEffect(() => {
  State.update({
    loading: !chainIdNotSupport,
  });
}, [chainIdNotSupport]);

const handleClickRow = (data) => {
  State.update({
    rowData: data,
  });
};
return (
  <StyledContainer>
    {state.rowData && (
      <Widget
        src="bluebiu.near/widget/Lending.CompoundV3.Bridge.Detail"
        props={{
          data: state.rowData,
          getAccountInfo: state.getAccountInfo,
          addAction,
          toast,
          chainId,
          curChain,
          dexConfig,
          account,
          onBack: () => {
            State.update({
              rowData: null,
            });
          },
          onSuccess: () => {
            State.update({
              loading: true,
            });
          },
        }}
      />
    )}
    {!state.rowData && (
      <Widget
        src="bluebiu.near/widget/Lending.CompoundV3.Bridge.List"
        props={{
          assets: state.assets || [],
          addAction,
          toast,
          chainId,
          curChain,
          nativeCurrency,
          dexConfig,
          account,
          onClickRow: handleClickRow,
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
  </StyledContainer>
);
