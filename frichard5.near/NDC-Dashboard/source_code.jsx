// Constants
const widgetProvider = "frichard5.near";
const refUrl = "https://api.stats.ref.finance/api/ft";

// Initial state
State.init({
  selectedDao: "marketing.sputnik-dao.near",
  selectedTab: "money",
});

// Style
const avenirFontFamily = fetch(
  "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;
const theme = {
  main: "#FFD50D",
  secondaryPink: "#F29BC0",
  secondaryBlue: "#4498E0",
};

//    background: ${(props) => props.theme.secondaryBlue};

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 750;
  }
  padding: 28px;
  background-size: contain;
  background-repeat: no-repeat;
  ${avenirFontFamily}
`;

const WidgetsContainer = styled.div`
    
`;

// Fetch
const ftList = fetch(refUrl);

// Components
const Banner = <Widget src={`${widgetProvider}/widget/NDC-Banner`} />;

const Balances = (
  <Widget
    src={`${widgetProvider}/widget/account_balance`}
    props={{
      account: state.selectedDao,
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const NearTransfers = (
  <Widget
    src={`${widgetProvider}/widget/near_transfers`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const FTransfers = (
  <Widget
    src={`${widgetProvider}/widget/ft_transfers`}
    props={{
      account: state.selectedDao,
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const ContractMetrics = (
  <Widget
    src={`${widgetProvider}/widget/contract_metrics`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Proposals = (
  <Widget
    src={`${widgetProvider}/widget/proposals`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const Tabs = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Tabs`}
    props={{
      tabs: [
        {
          value: "money",
          label: "Money",
          //selected: state.selectedTab === "money",
          components: (
            <WidgetsContainer>
              {Balances}
              {NearTransfers}
              {FTransfers}
            </WidgetsContainer>
          ),
        },
        {
          value: "metrics",
          label: "Metrics",
          //selected: state.selectedTab === "metrics",
          components: <WidgetsContainer>{ContractMetrics}</WidgetsContainer>,
        },
        {
          value: "proposals",
          label: "Proposals",
          //selected: state.selectedTab === "proposals",
          components: <WidgetsContainer>{Proposals}</WidgetsContainer>,
        },
        {
          value: "members",
          label: "Members",
          //selected: state.selectedTab === "members",
          components: <>No matching tab for {state.selectedTab}</>,
        },
      ],
      widgetProvider,
    }}
  />
);

const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};

const Select = (
  <Widget
    src={`${widgetProvider}/widget/NDC-select`}
    props={{
      options: [
        { value: "marketing.sputnik-dao.near", label: "Marketing" },
        { value: "creativesdao.sputnik-dao.near", label: "Creative" },
        { value: "neardevgov.sputnik-dao.near", label: "Gov" },
      ],
      selectedOption: state.selectedDao,
      onChange: selectDao,
    }}
  />
);

return (
  <>
    <DashboardContainer theme={theme}>
      {Banner}
      {Select}
      {Tabs}
    </DashboardContainer>
  </>
);
