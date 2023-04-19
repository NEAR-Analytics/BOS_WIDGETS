// Constants
const widgetProvider = props.widgetProvider;
const refUrl = "https://api.stats.ref.finance/api/ft";

// Initial state
State.init({
  selectedDao: "marketing.sputnik-dao.near",
  selectedTab: "money",
});

const WidgetsContainer = styled.div`
    
`;

// Fetch
const ftList = fetch(refUrl);

// Components

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

const ProposalStatus = (
  <Widget
    src={`${widgetProvider}/widget/proposals-status`}
    props={{
      account,
      widgetProvider,
    }}
  />
);

const ProposalsByMonth = (
  <Widget
    src={`${widgetProvider}/widget/proposal-by-month`}
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
          value: "overview",
          label: "Overview",
          selected: true,
          //selected: state.selectedTab === "metrics",
          components: (
            <WidgetsContainer>
              {ProposalsByMonth}
              {ProposalStatus}
            </WidgetsContainer>
          ),
        },
        {
          value: "proposals",
          label: "Proposals",
          components: <WidgetsContainer>{Proposals}</WidgetsContainer>,
        },
        {
          value: "money",
          label: "Money",
          components: (
            <WidgetsContainer>
              {Balances}
              {NearTransfers}
              {FTransfers}
            </WidgetsContainer>
          ),
        },
        {
          value: "members",
          label: "Members",
          //selected: state.selectedTab === "members",
          components: <>Coming soon</>,
        },
      ],
      widgetProvider,
    }}
  />
);

const selectDao = ({ target: { value } }) => {
  State.update({ selectedDao: value });
};
console.log("SELECTED DAO", state.selectedDao);
const Select = (
  <Widget
    src={`${widgetProvider}/widget/NDC-select`}
    props={{
      options: [
        { value: "marketing.sputnik-dao.near", label: "Marketing DAO" },
        { value: "creativesdao.sputnik-dao.near", label: "Creative DAO" },
        { value: "neardevgov.sputnik-dao.near", label: "Gov DAO" },
      ],
      selectedOption: state.selectedDao,
      onChange: selectDao,
    }}
  />
);

return (
  <>
    {Select}
    {Tabs}
  </>
);
