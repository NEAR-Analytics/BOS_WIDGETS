const widgetProvider = props.widgetProvider;
const account = props.account || "marketing.sputnik-dao.near";
const proposer = props.proposer;
const apiUrl = `https://api.pikespeak.ai/daos/account-proposal-history/${account}`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";
const resPerPage = 10;

const DetailWrapper = styled.div`
  position: relative;
  height: 400px;
  width: 80%;
  margin: 50px auto;
  box-shadow: 3px 2px 24px rgba(68, 152, 224, 0.3);
  overflow: auto;
  border-radius: 4px;
  padding: 20px;
  background: white;
  svg {
    height: 20px;
    &.approved-icon {
      fill:#13a36e;
    }
    &.rejected-icon {
      fill: #ff5e03;
    }
    &.not-voted-yet-icon {
      fill:  rgb(140, 140, 140)
    }
  }`;

const columns = [
  {
    id: "submission_time",
    label: "Date",
    formatter: (data) => {
      return new Date(data.submission_time).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
    },
  },
  {
    id: "proposal_type",
    label: "Type",
  },
  {
    id: "proposal_id",
    label: "Proposal id",
    formatter: (d) => {
      return (
        <a
          href={`https://near.org/${widgetProvider}/widget/NDC-Page?tab=proposal&proposal_id=${d.proposal_id}`}
          target="_blank"
        >
          {d.proposal_id}
        </a>
      );
    },
  },
];

State.init({
  displayedHistory: [],
  history: [],
  offset: 0,
});

const nextPage = () => {
  const currentOffset = state.offset + resPerPage;

  State.update({
    offset: currentOffset,
    displayedHistory: [...state.history.slice(
      currentOffset,
      resPerPage + currentOffset
    )],
  });
};

const previousPage = () => {
  const currentOffset = state.offset - resPerPage;
  State.update({
    offset: currentOffset,
    displayedHistory: [...state.history.slice(
      currentOffset,
      resPerPage + currentOffset
    )],
  });
};

const GenericTable = (
  <Widget
    src={`${widgetProvider}/widget/generic_table`}
    props={{
      columns,
      data: state.displayedHistory,
      nextPage,
      previousPage,
      offset: state.offset,
      resPerPage,
      boxShadow: 'unset',
      maxHeight: 800
    }}
  />
);

const fetchProposerHistory = () => {
  const history = fetch(apiUrl + `?proposer=${proposer}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  history.body &&
    State.update({
      displayedHistory: history.body.slice(0, resPerPage),
      history: history.body,
    });
};

!state.history.length && fetchProposerHistory();
return (
  <DetailWrapper>
    <h2>
      <a
        href={`https://explorer.near.org/accounts/${proposer}`}
        target="_blank"
      >
        {proposer}
      </a>
      <span> proposal history</span>
    </h2>
    {state.displayedHistory && GenericTable}
  </DetailWrapper>
);
