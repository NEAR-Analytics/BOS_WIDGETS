// Constants
const widgetProvider = props.widgetProvider;
const refUrl = "https://api.stats.ref.finance/api/ft";
const tab = props.tab || "overview";

// Initial state
State.init({
  selectedDao: "marketing.sputnik-dao.near",
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
      account: state.selectedDao,
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
      ftList: ftList.body && ftList.body,
      widgetProvider,
    }}
  />
);

const Policy = (
  <Widget
    src={`${widgetProvider}/widget/NDC-policy`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const VotersByProposal = (
  <Widget
    src={`${widgetProvider}/widget/NDC-members-voters`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const VoteHistory = (
  <Widget
    src={`${widgetProvider}/widget/NDC-vote-history`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const TransfersOverview = (
  <Widget
    src={`${widgetProvider}/widget/NDC-transfers-overview`}
    props={{
      account: state.selectedDao,
      widgetProvider,
    }}
  />
);

const TransfersByAccount = (
  <Widget
    src={`${widgetProvider}/widget/NDC-transfers-by-account`}
    props={{
      account: state.selectedDao,
      widgetProvider,
      ftList: ftList.body && ftList.body,
    }}
  />
);

const Tabs = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Tabs`}
    props={{
      widgetProvider,
      tabs: [
        {
          value: "overview",
          label: "Overview",
          selected: tab === "overview",
          components: (
            <WidgetsContainer>
              {ProposalsByMonth}
              {TransfersOverview}
              {TransfersByAccount}
              {ProposalStatus}
            </WidgetsContainer>
          ),
        },
        {
          value: "proposals",
          label: "Proposals",
          selected: tab === "proposals",
          components: <WidgetsContainer>{Proposals}</WidgetsContainer>,
        },
        {
          value: "treasury",
          label: "Treasury",
          selected: tab === "treasury",
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
          selected: tab === "members",
          components: (
            <WidgetsContainer>
              {VoteHistory}
              {VotersByProposal}
              {TransfersByAccount}
            </WidgetsContainer>
          ),
        },
        {
          value: "policy",
          label: "Policy",
          selected: tab === "policy",
          components: <WidgetsContainer>{Policy}</WidgetsContainer>,
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
        { value: "marketing.sputnik-dao.near", label: "Marketing DAO" },
        { value: "creativesdao.sputnik-dao.near", label: "Creative DAO" },
        { value: "neardevgov.sputnik-dao.near", label: "Gov DAO" },
      ],
      selectedOption: state.selectedDao,
      onChange: selectDao,
      top: 29,
    }}
  />
);

return (
  <>
    {Select}
    {Tabs}
  </>
);
