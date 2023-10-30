const daoId = props.daoId;
const accountId = props.accountId ?? context.accountId;
const onClose = props.onClose;

const CoADaoId = props.dev
    ? "coa.gwg-testing.near"
    : "congress-coa-v1.ndc-gwg.near";
const VotingBodyDaoId = props.dev
    ? "vb-beta.gwg-testing.near"
    : "";
const TCDaoId = props.dev
    ? "tc.gwg-testing.near"
    : "congress-tc-v1.ndc-gwg.near";
const HoMDaoId = props.dev
    ? "hom.gwg-testing.near"
    : "congress-hom-v1.ndc-gwg.near";
const registry = props.dev
    ? "registry-v1.gwg-testing.near"
    : "registry.i-am-human.near";

const isCongressDaoID =
    props.daoId === HoMDaoId ||
    props.daoId === CoADaoId ||
    props.daoId === TCDaoId;

let permissions = [];
const isVotingBodyDao = props.daoId === VotingBodyDaoId;

const proposalTypes = isVotingBodyDao
    ? [
          {
              text: "Text",
              value: "Text"
          },
          {
              text: "Dismiss",
              value: "Dismiss"
          },
          {
              text: "Approve Budget",
              value: "ApproveBudget"
          },
          {
              text: "Veto big budget item",
              value: "Veto"
          },
          {
              text: "Dissolve House",
              value: "Dissolve"
          },
          {
              text: "Function Call",
              value: "FunctionCall"
          },
          {
              text: "Update Bonds",
              value: "UpdateBonds"
          }
      ]
    : [
          {
              text: "Text",
              value: "Vote"
          },
          {
              text: "Transfer",
              value: "Transfer"
          },
          {
              text: "Function Call",
              value: "FunctionCall"
          },
          {
              text: "Add Member To Role",
              value: "AddMemberToRole"
          },
          {
              text: "Remove Member From Role",
              value: "RemoveMemberFromRole"
          }
      ];

State.init({
    members: [],
    proposalTypes: proposalTypes,
    daoId
});

function convertCapitalLetterToSpace(inputString) {
    var resultString = inputString.replace(/([A-Z])/g, " $1");
    // Remove leading space if present
    if (resultString.charAt(0) === " ") {
        resultString = resultString.slice(1);
    }
    return resultString;
}

// fetch proposal types for congress dao
if (isCongressDaoID) {
    const policy = useCache(
        () => Near.asyncView(daoId, "get_members").then((members) => members),
        daoId + "-processed_congress_members",
        { subscribe: false }
    );
    if (policy === null) {
        return;
    }
    const type = policy?.permissions?.map((item) => {
        return {
            text: convertCapitalLetterToSpace(item),
            value: item
        };
    });
    State.update({
        members: policy?.members,
        proposalTypes: type,
        showCreateProposal: policy?.members?.includes(accountId)
    });
}

const Wrapper = styled.div`
    margin: 16px auto;
    width: 100%;
    max-width: 900px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    overflow-y: auto;

    @media (max-width: 600px) {
        border-radius: 0;
    }

    p {
        line-height: 1.4;
        font-weight: 400;
        font-size: 15px;
        color: #868682;
        margin: 0;
    }

    h3 {
        font-weight: 600;
        font-size: 24px;
        color: #1b1b18;
    }

    h5 {
        font-size: 12px;
        font-weight: 400;
        line-height: 1.2;
        color: #6c757d;
    }
`;

const CloseButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(27, 27, 24);
    border-radius: 100px;
    height: 40px;
    width: 40px;
    border: none;
    margin: 0;
    font-size: 26px;
    background-color: rgb(246, 246, 245);

    &:hover {
        background-color: rgb(243, 243, 242);
        color: rgb(0, 0, 0);
    }
`;

return (
    <Wrapper>
        <Widget
            src={`sking.near/widget/Common.Inputs.Select`}
            props={{
                label: "Proposal Type",
                noLabel: false,
                placeholder: "Select a Proposal Type",
                options: state.proposalTypes,
                value: state.proposalType,
                onChange: (proposalType) =>
                    State.update({ ...state, proposalType }),
                validate: () => {
                    if (!state.proposalType) {
                        throw {
                            message: "Please select a Proposal Type"
                        };
                    }

                    if (
                        !proposalTypes.find(
                            ({ value }) => state.proposalType.value === value
                        )
                    ) {
                        throw {
                            message: "Please select a valid Proposal Type"
                        };
                    }
                },
                error: undefined
            }}
        />
        <div className="d-flex gap-3 flex-wrap">
            <div>
                <h5>DAO</h5>
                <Widget
                    src="mob.near/widget/Profile.ShortInlineBlock"
                    props={{ accountId: daoId, tooltip: true }}
                />
            </div>
            <div>
                <h5>Proposer</h5>
                <Widget
                    src="mob.near/widget/Profile.ShortInlineBlock"
                    props={{ accountId: accountId, tooltip: true }}
                />
            </div>
        </div>

        <div className="d-flex flex-column gap-2">
            {(state.proposalType.value === "Vote" ||
                state.proposalType.value === "Text") && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.Text"
                    props={{
                        daoId,
                        onClose,
                        isCongressDaoID,
                        isVotingBodyDao,
                        registry,
                        dev: props.dev
                    }}
                />
            )}
            {state.proposalType.value === "Transfer" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.Transfer"
                    props={{ daoId, onClose }}
                />
            )}
            {state.proposalType.value === "AddMemberToRole" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.AddMemberToRole"
                    props={{ daoId, onClose }}
                />
            )}
            {state.proposalType.value === "RemoveMemberFromRole" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.RemoveMemberFromRole"
                    props={{ daoId, onClose }}
                />
            )}
            {state.proposalType.value === "FunctionCall" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.FunctionCall"
                    props={{
                        daoId,
                        onClose,
                        isCongressDaoID,
                        registry,
                        isVotingBodyDao,
                        dev: props.dev
                    }}
                />
            )}
            {(state.proposalType.value === "FundingRequest" ||
                state.proposalType.value === "RecurrentFundingRequest") && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.FundingRequest"
                    props={{
                        daoId,
                        onClose,
                        proposalType: state.proposalType.value
                    }}
                />
            )}
            {state.proposalType.value === "DismissAndBan" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.FunctionCall"
                    props={{
                        daoId,
                        onClose,
                        powerType: "DismissAndBan",
                        showPowers: false,
                        isCongressDaoID
                    }}
                />
            )}
            {state.proposalType.value === "Veto" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.Veto"
                    props={{
                        daoId,
                        dev: props.dev,
                        registry
                    }}
                />
            )}
            {state.proposalType.value === "Dismiss" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.Dismiss"
                    props={{
                        daoId,
                        dev: props.dev,
                        registry
                    }}
                />
            )}
            {state.proposalType.value === "Dissolve" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.Dissolve"
                    props={{
                        daoId,
                        dev: props.dev,
                        registry
                    }}
                />
            )}
            {state.proposalType.value === "ApproveBudget" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.ApproveBudget"
                    props={{
                        daoId,
                        dev: props.dev,
                        registry
                    }}
                />
            )}
            {state.proposalType.value === "UpdateBonds" && (
                <Widget
                    src="astraplusplus.ndctools.near/widget/DAO.Proposal.Create.UpdateBonds"
                    props={{
                        daoId,
                        dev: props.dev,
                        registry
                    }}
                />
            )}
        </div>
    </Wrapper>
);
