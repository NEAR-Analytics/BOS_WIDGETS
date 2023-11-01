const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "multi.sputnik-dao.near";
const onClose = props.onClose;
const powerType = props.powerType;
const isCongressDaoID = props.isCongressDaoID;
const isVotingBodyDao = props.isVotingBodyDao;
const registry = props.registry;

const HoMDaoId = props.dev
    ? "hom.gwg-testing.near"
    : "congress-hom-v1.ndc-gwg.near";

if (!accountId) {
    return "Please connect your NEAR wallet :)";
}

State.init({
    description: state.description,
    error: state.error,
    attachDeposit: 0,
    proposalQueue: null
});

const handleProposal = () => {
    if (!state.description) {
        State.update({
            error: "Please enter a description"
        });
        return;
    }
    const gas = 200000000000000;
    const deposit = state.attachDeposit
        ? Big(state.attachDeposit)
        : 100000000000000000000000;
    const args = isCongressDaoID
        ? {
              description: state.description,
              kind: "Text"
          }
        : {
              proposal: {
                  description: state.description,
                  kind: "Vote"
              }
          };
    if (isVotingBodyDao) {
        const args = JSON.stringify({
            description: state.description,
            kind: "Text",
            caller: accountId
        });

        if (!state.proposalQueue) {
            State.update({
                error: "Please select proposal queue"
            });
            return;
        }

        Near.call([
            {
                contractName: registry,
                methodName: "is_human_call",
                args: {
                    ctr: daoId,
                    function: "create_proposal",
                    payload: args
                },
                gas: gas,
                deposit: deposit
            }
        ]);
    } else {
        Near.call([
            {
                contractName: daoId,
                methodName:
                    isCongressDaoID || isVotingBodyDao
                        ? "create_proposal"
                        : "add_proposal",
                args: args,
                gas: gas,
                deposit: deposit
            }
        ]);
    }
};

const onChangeDescription = (description) => {
    State.update({
        description,
        error: undefined
    });
};

const onChangeQueue = ({ amount, queue }) => {
    State.update({
        attachDeposit: amount,
        proposalQueue: queue,
        error: undefined
    });
};

const defaultDescription =
    "### [Your Title Here]\n\n#### Description\n\n[Detailed description of what the proposal is about.]\n\n#### Why This Proposal?\n\n[Explanation of why this proposal is necessary or beneficial.]\n\n#### Execution Plan\n\n[Description of how the proposal will be implemented.]\n\n#### Budget\n\n[If applicable, outline the budget required to execute this proposal.]\n\n#### Timeline\n\n[Proposed timeline for the execution of the proposal.]";

return (
    <>
        <Widget
            src="astraplusplus.ndctools.near/widget/DAO.Proposal.Common.ProposalQueue"
            props={{
                daoId: daoId,
                onUpdate: onChangeQueue,
                dev: props.dev
            }}
        />
        <div className="mb-3">
            <h5>Proposal Description</h5>
            <Widget
                src="sking.near/widget/Common.Inputs.Markdown"
                props={{
                    onChange: (value) => onChangeDescription(value),
                    height: "270px",
                    initialText: defaultDescription
                }}
            />
        </div>
        {state.error && <div className="text-danger">{state.error}</div>}
        <div className="ms-auto">
            <Widget
                src="sking.near/widget/Common.Button"
                props={{
                    children: "Create Proposal",
                    onClick: handleProposal,
                    className: "mt-2",
                    variant: "success"
                }}
            />
            {onClose && (
                <Widget
                    src="sking.near/widget/Common.Button"
                    props={{
                        children: "Close",
                        onClick: onClose,
                        className: "mt-2"
                    }}
                />
            )}
        </div>
    </>
);
