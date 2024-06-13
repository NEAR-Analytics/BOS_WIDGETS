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

const TabsList = styled.div`
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
  pools: null,
  poolsList: [],
});

const {
  isChainSupported,
  account,
  chainId,
  dexConfig,
  curChain,
  onSwitchChain,
  switchingChain,
  toast,
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
    <div style={{ position: "relative", margin: "0 auto", width: "1244px" }}>
      <TabsList>
        {[
          { key: "TAB_POOL", label: "All Pools" },
          { key: "TAB_ASSETS", label: "Your Assets" },
        ].map((item) => (
          <div
            key={item.key}
            className={`tab-head-item ${
              state.currentTab === item.key ? "active" : ""
            }`}
            onClick={() => {
              if (item.key === "TAB_ASSETS" && state.getV3Fees) {
                state.getV3Fees(state.staked);
              }
              State.update({
                currentTab: item.key,
              });
            }}
          >
            {item.label}
          </div>
        ))}
      </TabsList>
      <Widget
        src="dapdapbos.near/widget/Staking.Hyperlock.Search"
        props={{
          disabled: state.loading && !state.poolsList.length,
          onChange: (val) => {
            State.update({
              list: val
                ? state.poolsList.filter((item) => {
                    if (!val) return true;
                    return item.name.toLowerCase().includes(val.toLowerCase());
                  })
                : state.poolsList,
            });
          },
        }}
      />
    </div>
    {state.currentTab === "TAB_POOL" && (
      <Widget
        src="dapdapbos.near/widget/Staking.Hyperlock.Pools"
        props={{
          loading: state.loading,
          list: state.list || state.poolsList,
        }}
      />
    )}
    {state.currentTab === "TAB_ASSETS" && (
      <Widget
        src="dapdapbos.near/widget/Staking.Hyperlock.Assets"
        props={{
          unstaked: state.unstaked,
          staked: state.staked || [],
          fees: state.fees,
          handler: state.handler,
          pools: state.pools || {},
          dappLink: dexConfig.dappLink,
          onOpenStakeModal: (data) => {
            State.update({
              modelData: data,
            });
          },
          onSuccess: () => {
            State.update({
              userDataUpdater: Date.now(),
            });
          },
        }}
      />
    )}
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
        pools: state.pools,
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
    {state.modelData && (
      <Widget
        src="dapdapbos.near/widget/Staking.Hyperlock.StakeOrWithdraw"
        props={{
          ...state.modelData,
          dexConfig,
          account,
          toast,
          handler: state.handler,
          onSuccess: () => {
            State.update({
              userDataUpdater: Date.now(),
            });
          },
          onClose: () => {
            State.update({
              modelData: {
                display: false,
              },
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
          theme: dexConfig.theme,
        }}
      />
    )}
  </Wrapper>
);
