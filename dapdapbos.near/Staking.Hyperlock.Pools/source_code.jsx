const { loading, list } = props;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: var(--grid-columns);

  &.grid-pool-asset {
    grid-template-columns: 40% 30% 30%;
  }
`;

const GridItem = styled.div`
  padding-left: 24px;
  &.action-item {
    display: flex;
    column-gap: 10px;
    padding-right: 18px;
    justify-content: right;
  }
  &.action-item-head {
    display: flex;
    justify-content: center;
  }
`;

const PoolItem = styled.div`
  margin-bottom: 10px;
`;

return (
  <>
    <GridContainer className="grid-pool-head">
      <GridItem>Pool</GridItem>
      <GridItem>LP Type</GridItem>
      <GridItem>Point Stack</GridItem>
      <GridItem>TVL</GridItem>
    </GridContainer>
    {loading && <Widget src="bluebiu.near/widget/Lending.Spinner" />}
    {list.map((item) => (
      <PoolItem key={item.id}>
        <Widget
          src="dapdapbos.near/widget/Staking.Hyperlock.Pool"
          props={{
            ...props,
            data: item,
            stakedTokens: state.stakedMap?.[item.id] || [],
            unStakedTokens: state.unstakedMap?.[item.id] || [],
            handler: state.handler,
            dappLink: dexConfig.dappLink,
            onSuccess: () => {
              State.update({
                loading: true,
                userDataUpdater: Date.now(),
              });
            },
            onOpenStakeModal: (data) => {
              State.update({
                modelData: data,
              });
            },
          }}
          key={item.id}
        />
      </PoolItem>
    ))}
  </>
);
