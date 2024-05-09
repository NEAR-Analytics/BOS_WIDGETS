const Wrapper = styled.div`
  --bg-1: #262836;
  --bg-2: #373a53;
  --bg-3: #2e3142;
  --white: #fff;
  --purple: #979abe;
  --dark: #1b1e27;

  --fz-12: 12px;
  --fz-14: 14px;
  --fz-16: 16px;
  --fz-24: 24px;

  --grid-columns: 30% 17% 19% 17% 17%;

  /* --secondary: #6c757d; */

  color: var(--white);

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .form-control::placeholder {
    color: white;
  }
  .form-control:focus {
    box-shadow: 0 0 0 0.25rem rgba(120, 58, 227, 0.5);
  }

  padding-top: 34px;
  .grid-pool-head {
    max-width: 1244px;
    margin: 0 auto 12px;
    font-size: 14px;
    color: var(--purple);
  }
  .fee-wrapper {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .type-label {
    width: 27px;
    height: 16px;
    border-radius: 4px;
    background: #373a53;
    color: #fff;
    font-family: Gantari;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    text-align: center;
    line-height: 16px;
  }
  .button {
    width: 118px;
    height: 46px;
    flex-shrink: 0;
    border-radius: 8px;
    text-align: center;
    font-family: Gantari;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    transition: 0.5s;
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    &:hover:not(:disabled) {
      opacity: 0.9;
    }
    &:active:not(:disabled) {
      opacity: 0.8;
    }
  }
  .button.primary {
    background: var(--primary);
    color: #000;
  }
  .button.ghost {
    border: 1px solid var(--primary);
    background-color: transparent;
    color: var(--primary);
  }
  .link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--primary);
    text-align: center;
  }

  .link-text {
    color: var(--primary);
    font-family: Gantari;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-decoration-line: underline;
  }
`;
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
const TabsList = styled("Tabs.List")`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 420px;
  height: 46px;
  background-color: var(--bg-1);
  border-radius: 10px;
  color: var(--white);
  padding: 0 5px;
  margin-bottom: 30px;
  border: 1px solid #262836;
  .tab-head-item {
    flex: 1;
    display: flex;
    height: 36px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    border-radius: 5px;
    color: var(--white);
    cursor: pointer;
  }
  .tab-head-item.active {
    background-color: var(--bg-2);
  }
`;

State.init({
  currentTab: "TAB_POOL",
  loading: false,
  pools: [],
  staked: [],
});

const {
  isChainSupported,
  account,
  chainId,
  dexConfig,
  curChain,
  onSwitchChain,
  switchingChain,
} = props;

useEffect(() => {
  if (isChainSupported) {
    State.update({
      userDataUpdater: Date.now(),
      loading: true,
    });
  }
}, [isChainSupported]);

return (
  <Wrapper style={{ ...(dexConfig.theme || {}) }}>
    <Tabs.Root
      value={state.currentTab}
      onValueChange={(value) => {
        if (value === "TAB_ASSETS" && state.getV3Fees) {
          state.getV3Fees(state.staked);
        }
        State.update({
          currentTab: value,
        });
      }}
    >
      <TabsList>
        <Tabs.Trigger value="TAB_POOL" asChild>
          <div
            className={`tab-head-item ${
              state.currentTab === "TAB_POOL" ? "active" : ""
            }`}
          >
            All Pools
          </div>
        </Tabs.Trigger>
        <Tabs.Trigger value="TAB_ASSETS" asChild>
          <div
            className={`tab-head-item ${
              state.currentTab === "TAB_ASSETS" ? "active" : ""
            }`}
          >
            Your Assets
          </div>
        </Tabs.Trigger>
      </TabsList>
      <Tabs.Content value="TAB_POOL">
        <GridContainer className="grid-pool-head">
          <GridItem>Pool</GridItem>
          <GridItem>LP Type</GridItem>
          <GridItem>Point Stack</GridItem>
          <GridItem>Points/$1K</GridItem>
          <GridItem>TVL</GridItem>
        </GridContainer>
        <Accordion.Root type="single" collapsible>
          {state.loading && !Object.values(state.pools).length && (
            <Widget src="bluebiu.near/widget/Lending.Spinner" />
          )}
          {Object.values(state.pools)
            ?.sort((a, b) => (Big(a.tvl).gt(b.tvl) ? -1 : 1))
            .map((item) => (
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
                  }}
                  key={item.id}
                />
              </PoolItem>
            ))}
        </Accordion.Root>
      </Tabs.Content>
      <Tabs.Content value="TAB_ASSETS">
        <Widget
          src="dapdapbos.near/widget/Staking.Hyperlock.Assets"
          props={{
            unstaked: state.unstaked,
            staked: state.staked,
            fees: state.fees,
            handler: state.handler,
            pools: state.pools,
            dappLink: dexConfig.dappLink,
            onSuccess: () => {
              State.update({
                userDataUpdater: Date.now(),
              });
            },
          }}
        />
      </Tabs.Content>
    </Tabs.Root>
    <Widget
      src="dapdapbos.near/widget/Staking.Hyperlock.PoolData"
      props={{
        ...props,
        update: state.loading,
        onLoad: (data) => {
          State.update({
            loading: false,
            ...data,
          });
        },
      }}
    />
    <Widget
      src="dapdapbos.near/widget/Staking.Hyperlock.UserData"
      props={{
        ...props,
        update: state.userDataUpdater,
        onLoad: (data) => {
          State.update({
            ...data,
          });
        },
      }}
    />
    <Widget
      src="dapdapbos.near/widget/Staking.Hyperlock.Handler"
      props={{
        ...props,
        onLoad: (fn) => {
          State.update({
            handler: fn,
          });
        },
      }}
    />
    {!isChainSupported && (
      <Widget
        src="bluebiu.near/widget/Swap.ChainWarnigBox"
        props={{
          chain: curChain,
          onSwitchChain: onSwitchChain,
          switchingChain: switchingChain,
          theme: dexConfig.theme,
        }}
      />
    )}
  </Wrapper>
);
