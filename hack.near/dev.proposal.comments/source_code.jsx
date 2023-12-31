const daoId = props.daoId ?? "multi.sputnik-dao.near";
const proposal = props.proposal && JSON.parse(JSON.stringify(props.proposal));
const accountId = context.accountId;

const totalVoters = Object.keys(proposal?.votes || {}).length || 0;

const item = {
  type: "dao_proposal_comment",
  path: `${daoId}/proposal/main`,
  proposal_id: proposal.id + "-beta",
};
const comments = Social.index("comment", item);
const totalComments = comments?.length || 0;

State.init({
  activeTab: state.activeTab ?? undefined,
});

const TabsStyled = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: row;
    gap: 1em;
    margin: 0;
  }
  button {
    background: #f1f1f1;
    padding: 0.5em 1em;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 25px;
    color: #687076;
    transition: 200ms ease-out;
    border: none;
    display: flex;
    align-items: center;

    &:hover {
      color: #11181c;
      background: #e1e1e1;
    }

    &.active {
      background: #11181c;
      color: #e1e1e1;
    }

    label {
      background: #e1e1e1;
      color: #11181c;
      border-radius: 50%;
      padding: 0.25em 0.5em;
      margin-left: 0.5em;
      font-size: 0.7rem;
      font-weight: 600;
      cursor: inherit;
      min-width: 19px;
      height: 23px;
    }

    i {
      color: inherit;
      margin-right: 0.5em;
    }
  }
`;

const onTabChange = (tab) => {
  if (state.activeTab === tab) return State.update({ activeTab: undefined });
  State.update({ activeTab: tab });
};

const Tabs = () => {
  return (
    <TabsStyled>
      <ul>
        <li>
          <button
            className={"comments" === state.activeTab ? "active" : ""}
            onClick={() => onTabChange("comments")}
          >
            <i className="bi bi-chat-left-text"></i>
            comments
            <label>{totalComments}</label>
          </button>
        </li>
        {proposal && (
          <li>
            <button
              className={"voters" === state.activeTab ? "active" : ""}
              onClick={() => onTabChange("voters")}
            >
              <i className="bi bi-people"></i>
              voters
              <label>{totalVoters}</label>
            </button>
          </li>
        )}
      </ul>
    </TabsStyled>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

return (
  <>
    <Tabs />
    <Wrapper>
      {state.activeTab === "comments" && (
        <div className="mt-3">
          <Widget
            src="hack.near/widget/dao.proposal.comments"
            props={{
              daoId: daoId,
              proposalId: proposal.id,
              commentsCount: totalComments,
            }}
          />
        </div>
      )}
      {state.activeTab === "voters" && proposal && (
        <div className="mt-3">
          <Widget
            src="hack.near/widget/dev.proposal.voters"
            props={{
              votes: proposal.votes,
            }}
          />
        </div>
      )}
    </Wrapper>
  </>
);
