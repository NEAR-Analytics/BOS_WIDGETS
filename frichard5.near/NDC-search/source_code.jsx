const { account, widgetProvider, proposal_id, ftList, parent } = props;
const apiProposalUrl = `https://api.pikespeak.ai/daos/proposal/${account}`;
const apiPolicyUrl = `https://api.pikespeak.ai/daos/policy`;
const publicApiKey = "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5";

State.init({
  input: "",
  ftList: ftList,
  proposal_id: proposal_id,
});

// Fetch
if (!ftList) {
  const fetchedFtList = fetch(refUrl);
  State.update({ ftList: fetchedFtList.body });
}

const Input = (
  <Widget
    src={`${widgetProvider}/widget/NDC-input`}
    props={{
      buttonLabel: "Search",
      placeholder: "Enter a proposal id",
      sendInput: (i) => {
        if (!isNaN(i)) {
          State.update({ proposal_id: i, fetchingProposal: true });
        }
      },
    }}
  />
);

const getVoters = () => {
    let proposalType = state.proposal.proposal_type.toLowerCase();
    proposalType = proposalType==='functioncall'?'call':proposalType;
    return state.policy.state.policy.roles.reduce((acc,val) => {
        const isGroupAllowed = val.permissions.some((p) => {
            const parsedP = p.toLowerCase().replaceAll('_','');
            return parsedP.includes(`${proposalType}:voteapprove`)||parsedP.includes(`*:voteapprove`)
        });
        if(isGroupAllowed) {
            acc.push(...val.kind);
        }
        return acc
    }, [])
}

const ProposalCard = (
  <Widget
    src={`${widgetProvider}/widget/NDC-proposal-card`}
    props={{
      proposal: state.proposal,
      widgetProvider,
      ftList: state.ftList,
      council: state.policy && state.proposal && getVoters(),
      voteExpired: state.policy && state.policy.state.policy.proposal_period,
      parent,
    }}
  />
);

const fetchProposal = (id) => {
  const proposal = fetch(apiProposalUrl + `?id=${id}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  });
  proposal.body &&
    State.update({
      proposal: proposal.body.length ? proposal.body[0] : false,
      error: !proposal.body.length
        ? `Proposal ${state.proposal_id} not found`
        : false,
      fetchingProposal: false,
    });
};

const fetchPolicy = (daos) => {
  const policy = asyncFetch(apiPolicyUrl + `?daos=${daos}`, {
    mode: "cors",
    headers: {
      "x-api-key": publicApiKey,
    },
  }).then(({ err, body, ok }) => {
    if (ok) {
      State.update({
        policy: body,
      });
    }
  });
};

!state.policy && fetchPolicy([account]);

fetchProposal(state.proposal_id);

const Error = styled.div`
  text-align: center;
  margin-top: 40px;
`;

const InputWrapper = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  margin-top: 40px;
`;

return (
  <>
    <InputWrapper>{Input}</InputWrapper>
    {!state.fetchingProposal && state.proposal && state.policy && ProposalCard}
    {state.error && <Error>{state.error}</Error>}
  </>
);
