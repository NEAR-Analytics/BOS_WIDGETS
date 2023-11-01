const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId;
const onClose = props.onClose;
const registry = props.registry;
const house = props.house;
const proposalID = props.proposalID;

if (!accountId) {
    return "Please connect your NEAR wallet :)";
}

function isEmpty(value) {
    return !value || value === "";
}

function isNearAddress(address) {
    const ACCOUNT_ID_REGEX =
        /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;
    return (
        address.length >= 2 &&
        address.length <= 64 &&
        ACCOUNT_ID_REGEX.test(address)
    );
}

State.init({
    prop_id: proposalID, // proposal id
    dao: house,
    error: null,
    attachDeposit: 0,
    proposalQueue: null,
    description: null
});

const handleProposal = () => {
    if (isEmpty(state.dao) || !isNearAddress(state.dao)) {
        State.update({
            error: "Please enter a valid DAO ID"
        });
        return;
    }

    if (isEmpty(state.prop_id)) {
        State.update({
            error: "Please enter a proposal ID"
        });
        return;
    }

    if (isEmpty(state.description)) {
        State.update({
            error: "Please enter a description"
        });
        return;
    }

    if (!state.proposalQueue) {
        State.update({
            error: "Please select proposal queue"
        });
        return;
    }

    const gas = 20000000000000;
    const deposit = state.attachDeposit
        ? Big(state.attachDeposit)
        : 100000000000000000000000;

    const args = JSON.stringify({
        description: state.description,
        kind: { Veto: { prop_id: parseInt(state.prop_id), dao: state.dao } },
        caller: accountId
    });

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
};

const onChangePropID = (prop_id) => {
    State.update({
        prop_id,
        error: undefined
    });
};

const onChangeDao = (dao) => {
    State.update({
        dao,
        error: undefined
    });
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

        <Widget
            src="astraplusplus.ndctools.near/widget/DAO.Proposal.Common.CongressHouseDropdown"
            props={{
                daoId: daoId,
                house: state.dao,
                label: "House",
                placeholder: "Select house account",
                onUpdate: onChangeDao,
                dev: props.dev
            }}
        />
        <div className="mb-3">
            <h5>Proposal ID</h5>
            <input
                type="number"
                value={state.prop_id}
                onChange={(e) => onChangePropID(e.target.value)}
                min="0"
            />
        </div>
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
