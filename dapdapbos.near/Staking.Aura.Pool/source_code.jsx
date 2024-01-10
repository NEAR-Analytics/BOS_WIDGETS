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

const { data, chainId, account, TOKENS, CHAIN_ID, TVLS } = props;
const {
  Aura_Pool_ID,
  poolName,
  tokens,
  tokenAssets,
  stakedAmount,
  reward,
  Rewards_contract_address,
  Rewards_depositor_contract_address,
  LP_token_address,
} = data;
State.init({
  currentTab: "STAKE_TAB",
});

const handleChangeTabs = (value) => {
  State.update({
    currentTab: value,
  });
};
// console.info(poolName, "de poo:", data);

const renderPoolIcon = () => {
  if (tokenAssets) {
    return tokenAssets.map((addr, index) => {
      if (TOKENS[addr]) {
        return (
          <span key={index} style={{ marginRight: -12 }}>
            <Widget
              src="dapdapbos.near/widget/UI.Avatar"
              props={{ src: TOKENS[addr].icon }}
            />
          </span>
        );
      }
      return null;
    });
  }
};
function nFormatter(num, digits) {
  const si = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (Number(num) >= si[i].value) {
      break;
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

const simplifyNum = (number) => {
  if (typeof Number(number) !== "number") return 0;
  if (isNaN(Number(number))) return 0;

  let str_num;
  if (number >= 1e3 && number < 1e6) {
    str_num = number / 1e3;
    return str_num.toFixed(2) + "k";
  } else if (number >= 1e6) {
    str_num = number / 1e6;
    return str_num.toFixed(2) + "m";
  } else {
    //一千以下
    return str_num.toFixed(2);
  }
};

function renderTVL() {
  const tvl = TVLS?.find((item) => item.Aura_Pool_ID === Aura_Pool_ID).TVL;
  if (tvl) {
    // return `$${simplifyNum(86886)}`;
    return `$${simplifyNum(Big(tvl).toFixed(0))}`;
  } else {
    return "-";
  }
}
return (
  <AccordionItem value={poolName}>
    <Accordion.Trigger asChild>
      <HeadWrapper>
        <GridContainer className="pool-head">
          <GridItem>
            <div className="title-primary">
              {renderPoolIcon()}
              <span style={{ marginLeft: 20 }}>{poolName}</span>
            </div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">%</div>
            <div className="title-sub">proj. %</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">{renderTVL()}</div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">
              {!isNaN(Number(stakedAmount)) && Number(stakedAmount) > 0
                ? `$${stakedAmount}`
                : "-"}
            </div>
            <div className="title-sub"></div>
          </GridItem>
          <GridItem>
            <div className="title-secondary">
              {!isNaN(Number(reward)) && Number(reward) > 0
                ? `$${reward}`
                : "-"}
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
            src="dapdapbos.near/widget/Staking.Aura.Stake"
            props={{ ...props }}
          />
        </Tabs.Content>
        <Tabs.Content value="UNSTAKE_TAB">
          <Widget
            src="dapdapbos.near/widget/Staking.Aura.Unstake"
            props={{ ...props }}
          />
        </Tabs.Content>
        <Tabs.Content value="INFO_TAB">
          <InfoPanel>
            <InfoPanelTitle>Contract</InfoPanelTitle>
            <InfoPanelList>
              <span className="list-key">Rewards contract address: </span>
              <span className="list-value">{Rewards_contract_address}</span>
            </InfoPanelList>
            <InfoPanelList>
              <span className="list-key">
                Rewards depositor contract address:{" "}
              </span>
              <span className="list-value">
                {Rewards_depositor_contract_address}
              </span>
            </InfoPanelList>
            <InfoPanelList>
              <span className="list-key">LP token address: </span>
              <span className="list-value">{LP_token_address}</span>
            </InfoPanelList>
          </InfoPanel>
        </Tabs.Content>
      </Tabs.Root>
    </AccordionContent>
  </AccordionItem>
);
