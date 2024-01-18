const HeadWrapper = styled.div`
  border-radius: 16px;
  color: var(--white);
  font-size: var(--fz-14);
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
  grid-template-columns: 40% 12% 12% 12% 24%;
`;
const GridItem = styled.div`
  height: 84px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 24px;
`;

const InfoPanel = styled.div`
  width: 610px;
  margin: 0 auto;
`;
const InfoPanelTitle = styled.div`
  font-size: var(--fz-16);
  font-weight: 500;
  color: var(--white);
  margin-bottom: 14px;
`;
const InfoPanelList = styled.div`
  font-size: var(--fz-14);
  font-weight: 400;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  .list-key {
    color: var(--purple);
  }
  .list-value {
    color: var(--white);
    flex-grow: 1;
    text-align: right;
  }
`;

// tabs begin
const TabListWrap = styled.div`
  border-right: 1px solid var(--bg-2);
  display: flex;
  margin: 0 auto;
  width: 510px;
  align-items: center;
`;
const TabsList = styled("Tabs.List")`
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
const AccordionItem = styled("Accordion.Item")`
  /* margin-bottom: 10px; */
  border: 1px solid #373a53;
  max-width: 1244px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
`;

const AccordionContent = styled("Accordion.Content")`
  /* max-width: 1244px;
  margin: 0 auto; */
  border-color: var(--bg-3);
  background-color: var(--bg-3);
  padding-bottom: 20px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;
//Accordion end

const { data, chainId, account, TOKENS, CHAIN_ID, tokenPrices } = props;
const {
  tvl,
  poolName,
  tokenAddress,
  StakingAddress,
  poolType,
  stakedAmount,
  totalDeposit,
  unlocking,
  rewardAmount,
  LPPrice,
} = data;

State.init({
  currentTab: "STAKE_TAB",
});

function calcUSD(price, amount) {
  if (!price || !amount) return "-";
  return Big(price).times(Big(amount)).toFixed(2);
}

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};

return (
  <AccordionItem value={poolName}>
    <Accordion.Trigger asChild>
      <HeadWrapper>
        <GridContainer className="pool-head">
          <GridItem>
            <div className="title-primary">
              <Widget
                src="dapdapbos.near/widget/UI.Avatar"
                props={{
                  src: TOKENS[tokenAddress].icon,
                }}
              />

              <span style={{ marginLeft: 8 }}>{poolName}</span>
            </div>
          </GridItem>
          <GridItem>
            <div className="title-secondary"></div>
            <div className="title-sub"></div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">${tvl}</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">
              $
              {poolType === "Locking"
                ? calcUSD(tokenPrices[tokenAddress], stakedAmount)
                : calcUSD(LPPrice, stakedAmount)}
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Widget
                src="dapdapbos.near/widget/UI.Avatar"
                props={{
                  src: TOKENS[tokenAddress].icon,
                  size: 18,
                }}
              />
              <div className="title-sub" style={{ marginLeft: 5 }}>
                {stakedAmount}
              </div>
            </div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">
              ${!Number(rewardAmount) ? 0 : rewardAmount}
            </div>
            <div className="title-sub"></div>
          </GridItem>
        </GridContainer>
      </HeadWrapper>
    </Accordion.Trigger>
    <AccordionContent>
      <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
        <TabsList>
          <TabListWrap>
            <Tabs.Trigger value="STAKE_TAB" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "STAKE_TAB" ? "active" : ""
                }`}
              >
                Stake
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="UNSTAKE_TAB" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "UNSTAKE_TAB" ? "active" : ""
                }`}
              >
                Unstake
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="INFO_TAB" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "INFO_TAB" ? "active" : ""
                }`}
              >
                Info
              </div>
            </Tabs.Trigger>
          </TabListWrap>
        </TabsList>
        <Tabs.Content value="STAKE_TAB">
          <Widget
            src="dapdapbos.near/widget/Staking.Athena.Stake"
            props={{ ...props }}
          />
        </Tabs.Content>
        <Tabs.Content value="UNSTAKE_TAB">
          <Widget
            src="dapdapbos.near/widget/Staking.Athena.Unstake"
            props={{ ...props }}
          />
        </Tabs.Content>
        <Tabs.Content value="INFO_TAB">
          <InfoPanel>
            <InfoPanelTitle>Contract</InfoPanelTitle>

            <InfoPanelList>
              <span className="list-key">Token: </span>
              <span className="list-value">{tokenAddress}</span>
            </InfoPanelList>
            <InfoPanelList>
              <span className="list-key">Locking:</span>
              <span className="list-value">{StakingAddress}</span>
            </InfoPanelList>
          </InfoPanel>
        </Tabs.Content>
      </Tabs.Root>
    </AccordionContent>
  </AccordionItem>
);
