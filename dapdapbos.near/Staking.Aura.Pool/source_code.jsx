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
  grid-template-columns: 50% 10% 10% 10% 20%;
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
  margin: 0 auto 10px;
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

const { poolKey } = props;
State.init({
  currentTab: "tab1",
});

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};

return (
  <AccordionItem value={poolKey}>
    <Accordion.Trigger asChild>
      <HeadWrapper>
        <GridContainer className="pool-head">
          <GridItem>
            <div className="title-primary">50wstETH-25BAL-25AURA</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">50.16%</div>
            <div className="title-sub">proj. 47.87%</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">$257.80K</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">123.25</div>
            <div className="title-sub">12.25</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">$12.23</div>
            <div className="title-sub">12.25</div>
          </GridItem>
        </GridContainer>
      </HeadWrapper>
    </Accordion.Trigger>
    <AccordionContent>
      <Tabs.Root value={state.currentTab} onValueChange={handleChangeTabs}>
        <TabsList>
          <TabListWrap>
            <Tabs.Trigger value="tab1" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "tab1" ? "active" : ""
                }`}
              >
                Stake
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "tab2" ? "active" : ""
                }`}
              >
                Unstake
              </div>
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" asChild>
              <div
                className={`tab-head-item ${
                  state.currentTab === "tab3" ? "active" : ""
                }`}
              >
                Info
              </div>
            </Tabs.Trigger>
          </TabListWrap>
        </TabsList>
        <Tabs.Content value="tab1">
          <Widget
            src="dapdapbos.near/widget/Staking.Aura.Stake"
            props={{ type: "STAKE" }}
          />
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <Widget
            src="dapdapbos.near/widget/Staking.Aura.Stake"
            props={{ type: "UN_STAKE" }}
          />
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <InfoPanel>
            <InfoPanelTitle>Contract</InfoPanelTitle>
            <InfoPanelList>
              <span className="list-key">Rewards contract address: </span>
              <span className="list-value">
                0x14a81c9283cc16897daa3f466847baa260b770eb
              </span>
            </InfoPanelList>
            <InfoPanelList>
              <span className="list-key">
                Rewards depositor contract address:{" "}
              </span>
              <span className="list-value">
                0x14a81c9283cc16897daa3f466847baa260b770eb
              </span>
            </InfoPanelList>
            <InfoPanelList>
              <span className="list-key">LP token address: </span>
              <span className="list-value">
                0x14a81c9283cc16897daa3f466847baa260b770eb
              </span>
            </InfoPanelList>
          </InfoPanel>
        </Tabs.Content>
      </Tabs.Root>
    </AccordionContent>
  </AccordionItem>
);
