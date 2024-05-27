const HeadWrapper = styled.div`
  border-radius: 16px;
  color: var(--white);
  font-size: var(--fz-14);
  position: relative;
  .pool-head {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    align-items: center;
    cursor: pointer;
    background-color: var(--bg-1);
  }
  .title-primary {
    font-size: var(--fz-16);
    font-weight: 500;
  }
  .title-secondary {
  }
  .title-sub {
    font-size: var(--fz-12);
    color: var(--purple);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: var(--grid-columns);
`;
const GridItem = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
`;

// tabs begin
const TabListWrap = styled.div`
  border-right: 1px solid var(--bg-2);
  display: flex;
  margin: 0 auto;
  width: 510px;
  align-items: center;
`;
const TabsList = styled.div`
  border: 1px solid var(--bg-2);
  margin-bottom: 20px;
  .tab-head-item {
    flex: 1;
    display: flex;
    height: 46px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--purple);
    cursor: pointer;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: transparent;
    border-left: 1px solid var(--bg-2);
  }
  .tab-head-item.active {
    color: var(--white);
    border-bottom-color: var(--primary);
  }
`;
// tabs end

// Accordion begin
const StyledRow = styled.div`
  /* margin-bottom: 10px; */
  border: 1px solid #373a53;
  max-width: 1244px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  .AccordionChevron {
    position: absolute;
    right: 24px;
    top: 45%;
    transition: all 0.1s ease-out;
  }
  &[data-state="open"] .AccordionChevron {
    transform: rotate(90deg);
  }
`;

const ExpandWrapper = styled.div`
  height: 0px;
  animation: fadeOut 0.4s 0.1s ease both;
  &.expand {
    animation: fadeIn 0.4s 0.1s ease both;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
    100% {
      opacity: 1;
      transform: translateY(0);
      height: 260px;
      border: 1px solid #373a53;
      border-top: none;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
      transform: translateY(0);
      border: 1px solid #373a53;
      border-top: none;
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
      height: 0px;
      border: none;
    }
  }
`;

const AccordionContent = styled.div`
  /* max-width: 1244px;
  margin: 0 auto; */
  border-color: var(--bg-3);
  background-color: var(--bg-3);
  padding-bottom: 20px;
  border-radius: 0px 0px 13px 13px;
  background: #2e3142;
`;
//Accordion end

const {
  data,
  currentChain,
  stakedTokens,
  unStakedTokens,
  dappLink,
  handler,
  onSuccess,
  onOpenStakeModal,
} = props;

State.init({
  currentTab: "STAKE_TAB",
});

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};

return (
  <StyledRow>
    <HeadWrapper
      onClick={() => {
        State.update({
          expand: !state.expand,
        });
      }}
    >
      <GridContainer className="pool-head">
        <GridItem>
          <div className="title-primary">
            <Widget
              src="dapdapbos.near/widget/Staking.Hyperlock.PoolIcons"
              props={{
                icons: [data.token0.icon, data.token1.icon],
              }}
            />
            <span style={{ marginLeft: 20 }}>{data.name}</span>
          </div>
        </GridItem>
        <GridItem>
          <div className="fee-wrapper">
            {data.fee && (
              <div className="title-secondary">{data.fee / 10000}%</div>
            )}
            <div className="type-label">{data.type}</div>
          </div>
        </GridItem>
        <GridItem>
          <Widget
            src="dapdapbos.near/widget/Staking.Hyperlock.PoolIcons"
            props={{
              icons: data.stackIcons,
            }}
          />
        </GridItem>
        <GridItem>{data.points || 0}</GridItem>
        <GridItem>
          <Widget
            src="bluebiu.near/widget/Avalanche.Lending.Total"
            props={{
              total: data.tvl,
              digit: 2,
              unit: "$",
            }}
          />
        </GridItem>
      </GridContainer>
      <svg
        className="AccordionChevron"
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="10"
        viewBox="0 0 8 10"
        fill="none"
      >
        <path
          d="M7.02391 4.21913C7.52432 4.61945 7.52432 5.38054 7.02391 5.78087L2.1247 9.70024C1.46993 10.2241 0.5 9.75788 0.5 8.91937L0.5 1.08062C0.5 0.242118 1.46993 -0.224055 2.12469 0.299755L7.02391 4.21913Z"
          fill="#979ABE"
        />
      </svg>
    </HeadWrapper>
    <ExpandWrapper className={state.expand ? "expand" : ""}>
      <AccordionContent>
        <TabsList>
          <TabListWrap>
            {[
              { key: "STAKE_TAB", label: "Stake" },
              { key: "WITHDRAW_TAB", label: "Withdraw" },
            ].map((item) => (
              <div
                className={`tab-head-item ${
                  state.currentTab === item.key ? "active" : ""
                }`}
                onClick={() => {
                  State.update({
                    currentTab: item.key,
                  });
                }}
              >
                {item.label}
              </div>
            ))}
          </TabListWrap>
        </TabsList>
        {state.currentTab === "STAKE_TAB" && (
          <Widget
            src="dapdapbos.near/widget/Staking.Hyperlock.PoolTab"
            props={{
              tokens: unStakedTokens,
              token0: data.token0,
              token1: data.token1,
              price0: data.token0.price,
              price1: data.token1.price,
              name: data.name,
              dappLink,
              handler,
              onSuccess,
              onOpenStakeModal,
              from: "stake",
              type: data.type,
            }}
          />
        )}
        {state.currentTab === "WITHDRAW_TAB" && (
          <Widget
            src="dapdapbos.near/widget/Staking.Hyperlock.PoolTab"
            props={{
              tokens: stakedTokens,
              token0: data.token0,
              token1: data.token1,
              price0: data.token0.price,
              price1: data.token1.price,
              name: data.name,
              dappLink,
              handler,
              onSuccess,
              onOpenStakeModal,
              from: "withdraw",
            }}
          />
        )}
      </AccordionContent>
    </ExpandWrapper>
  </StyledRow>
);
