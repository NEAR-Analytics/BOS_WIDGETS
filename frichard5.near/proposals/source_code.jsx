const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const apiUrl = `https://api.pikespeak.ai/daos/proposals/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

const forgeUrl = (apiUrl, params) =>
  apiUrl +
  Object.keys(params).reduce(
    (paramString, p) => paramString + `${p}=${params[p]}&`,
    "?"
  );

const ProposalContainer = styled.div`
  margin-top: 40px;
  min-height: 500px;
`;

const NoProposal = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const resPerPage = 10;

State.init({
  offset: 0,
  lastProposalFetch: [],
  proposals: [],
  isLoading: false,
  types: [],
  account: account,
  status: [],
});

const columns = [
  {
    id: "submission_time",
    label: "Submission time",
  },
  {
    id: "proposal_id",
    label: "Proposal Id",
  },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "proposal_type",
    label: "type",
  },
];

const nextPage = () => {
  State.update({ offset: state.offset + resPerPage });
};

const previousPage = () => {
  State.update({ offset: state.offset - resPerPage });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      title: `${account} proposals`,
      columns,
      data: state.proposals,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
    }}
  />
);

const fetchPolicy = () => {
  asyncFetch(apiPolicyUrl, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        council: body.state.policy.roles.find((r) => r.name === "Council").kind,
      });
    }
  });
};

const fetchProposal = (params) => {
  asyncFetch(forgeUrl(apiUrl, params), {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      const allProposals = [...state.proposals, ...body];
      State.update({
        lastProposalFetch: body,
        proposals: allProposals,
        isLoading: false,
      });
    }
  });
};

if (!state.proposals.length) {
  fetchProposal({
    limit: resPerPage,
    offset: state.offset,
    proposal_types: state.types,
    status: state.status,
  });
  fetchPolicy();
}
if (state.account != account) {
  State.update({ proposals: [], account, offset: 0 });
}

const fetchMore = () => {
  if (!state.isLoading) {
    State.update({ offset: state.offset + resPerPage, isLoading: true });
    fetchProposal({
      limit: resPerPage,
      offset: state.offset,
      proposal_types: state.types,
      status: state.status,
    });
  }
};

const ProposalCards = [];

state.proposals.forEach((proposal) => {
  ProposalCards.push(
    <Widget
      src={`${widgetProvider}/widget/NDC-proposal-card`}
      props={{
        proposal,
        council: state.council,
      }}
    />
  );
});

const selectType = (types) => {
  State.update({
    status: state.status,
    proposals: [],
    offset: 0,
    limit: resPerPage,
    types: types,
  });
};

const typeOptions = [
  "Transfer",
  "Vote",
  "FunctionCall",
  "AddBounty",
  "BountyDone",
  "AddMemberToRole",
  "RemoveMemberFromRole",
  "ChangeConfig",
  "ChangePolicy",
  "ChangePolicyUpdateParameters",
  "ChangePolicyUpdateDefaultVotePolicy",
  "ChangePolicyRemoveRole",
  "ChangePolicyAddOrUpdateRole",
  "FactoryInfoUpdate",
  "SetStakingContract",
  "UpgradeRemote",
  "UpgradeSelf",
].map((t) => {
  return {
    value: t,
    label: t,
  };
});
const SelectType = (
  <Widget
    src={`${widgetProvider}/widget/NDC-checkbox-list`}
    props={{
      widgetProvider,
      checkboxes: typeOptions,
      selectedBoxes: state.types,
      onChange: selectType,
      label: "Type",
      id: "proposal-type-selector",
    }}
  />
);

const selectStatus = (status) => {
  State.update({
    status,
    proposals: [],
    offset: 0,
    limit: resPerPage,
    types: state.types,
  });
};

const statusOptions = ["Approved", "Rejected", "InProgress", "Expired"].map(
  (t) => {
    return {
      value: t,
      label: t,
    };
  }
);

const SelectStatus = (
  <Widget
    src={`${widgetProvider}/widget/NDC-checkbox-list`}
    props={{
      widgetProvider,
      checkboxes: statusOptions,
      selectedBoxes: state.status,
      onChange: selectStatus,
      label: "Status",
      id: "proposal-status-selector",
    }}
  />
);

const ProposalInfiniteScroll = (
  <Widget
    src={`${widgetProvider}/widget/proposals_scroll`}
    props={{
      cards: ProposalCards,
      fetchMore: fetchMore,
      hasMore: state.lastProposalFetch.length === resPerPage,
    }}
  />
);

const ProposalFilters = (
  <Widget
    src={`${widgetProvider}/widget/NDC-filter-menu`}
    props={{
      widgetProvider,
      comps: [SelectType, SelectStatus],
      filters: [...state.status, ...state.types],
      removeFilter: (filter) => {
        State.update({
          types: [...state.types.filter((t) => t != filter)],
          status: [...state.status.filter((s) => s != filter)],
          proposals: [],
          offset: 0,
          limit: resPerPage,
        });
      },
    }}
  />
);

return (
  <ProposalContainer>
    {ProposalFilters}
    {state.proposals.length ? (
      ProposalInfiniteScroll
    ) : (
      <NoProposal>No proposal found.</NoProposal>
    )}
  </ProposalContainer>
);
