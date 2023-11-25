const widgetOwner = props.widgetOwner ?? "astraplusplus.ndctools.near";

const Wrapper = styled.div`
    p {
        font-size: 13px;
    }
    .text-subdued {
        color: rgba(130, 134, 136, 1);
    }
`;
const constructURL = (paramObj, base) => {
    paramObj = { ...paramObj, page: "dao" };
    const baseURL = base ?? `#/${widgetOwner}/widget/home`;
    let params = "";
    for (const [key, value] of Object.entries(paramObj)) {
        if (key === "dev" && value === false) {
            continue;
        }
        params += `${key}=${value}&`;
    }
    params = params.slice(0, -1);
    return `${baseURL}?${params}`;
};

const initialAnswers = {
    gracePeriod: ""
};

const proposalKinds = {
    ChangeDAOConfig: {
        title: "Change DAO Config",
        key: "config"
    },
    ChangeDAOPolicy: {
        title: "Change DAO Policy",
        key: "policy"
    },
    Bounty: {
        title: "Bounty",
        key: "add_bounty"
    },
    BountyDone: {
        title: "Bounty Done",
        key: "bounty_done"
    },
    Transfer: {
        title: "Transfer",
        key: "transfer"
    },
    Polls: {
        title: "Polls",
        key: "vote"
    },
    RemoveMembers: {
        title: "Remove Members",
        key: "remove_member_from_role"
    },
    AddMembers: {
        title: "Add Members",
        key: "add_member_to_role"
    },
    FunctionCall: {
        title: "Function Call",
        key: "call"
    },
    UpgradeSelf: {
        title: "Upgrade Self",
        key: "upgrade_self"
    },
    UpgradeRemote: {
        title: "Upgrade Remote",
        key: "upgrade_remote"
    },
    SetVoteToken: {
        title: "Set Vote Token",
        key: "set_vote_token"
    }
};

const proposalActions = {
    AddProposal: {
        title: "Add Proposal",
        key: "AddProposal"
    },
    VoteApprove: {
        title: "Vote Approve",
        key: "VoteApprove"
    },
    VoteReject: {
        title: "Vote Reject",
        key: "VoteReject"
    },
    VoteRemove: {
        title: "Vote Remove",
        key: "VoteRemove"
    }
};

const allActionArray = Object.keys(proposalActions).map(
    (key) => proposalActions[key].key
);
const allProposalKindArray = Object.keys(proposalKinds).map(
    (key) => proposalKinds[key].key
);

const renderTable = (roles, rows, action) => {
    return (
        <Table>
            <li className="fw-bold">
                <span>Actions</span>
                {roles.map((role) => (
                    <span className="hide-on-mobile">{role}</span>
                ))}
            </li>
            {Object.keys(rows).map((key) => (
                <li>
                    <div>{rows[key].title}</div>
                    {roles.map((role) => (
                        <Widget
                            src="nearui.near/widget/Input.Checkbox"
                            props={{
                                label: role,
                                onChange: (checked) => {
                                    if (action === "Vote") {
                                        setVotePermission(
                                            role,
                                            rows[key].key,
                                            checked
                                        );
                                    } else if (action === "AddProposal") {
                                        setCreatePermission(
                                            role,
                                            rows[key].key,
                                            checked
                                        );
                                    }
                                },
                                checked:
                                    action === "Vote"
                                        ? hasPermission(
                                              role,
                                              rows[key].key,
                                              "VoteApprove"
                                          ) ||
                                          hasPermission(
                                              role,
                                              rows[key].key,
                                              "VoteReject"
                                          ) ||
                                          hasPermission(
                                              role,
                                              rows[key].key,
                                              "VoteRemove"
                                          )
                                        : hasPermission(
                                              role,
                                              rows[key].key,
                                              action
                                          )
                            }}
                        />
                    ))}
                </li>
            ))}
        </Table>
    );
};

const hasPermission = (role, proposalKind, permissionType) => {
    const roleObj = state.answers.policy.roles.find((r) => r.name === role);

    if (roleObj) {
        const permission = `${proposalKind}:${permissionType}`;
        return roleObj.permissions.some(
            (p) =>
                p === permission ||
                p === "*:*" ||
                p === `${proposalKind}:*` ||
                p === `*:${permissionType}`
        );
    } else {
        return false;
    }
};

State.init({
    tab: "Proposal Creation",
    answers: initialAnswers
});

const update = (key, value) =>
    State.update({
        answers: {
            ...state.answers,
            [key]: value
        }
    });

const ProposalCreation = () => {
    return (
        <div className="d-flex flex-column gap-2">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column gap-1">
                    <h6>Proposal Creation</h6>
                    <p>Choose what creation rights you give DAO groups. </p>
                </div>
                <div className="d-flex gap-2">
                    <Widget
                        src="nearui.near/widget/Input.Button"
                        props={{
                            children: "Cancel",
                            variant: "info outline",
                            onClick: () => {}
                        }}
                    />
                    <Widget
                        src="nearui.near/widget/Input.Button"
                        props={{
                            children: (
                                <>
                                    Propose Changes{" "}
                                    <i class="bi bi-check-lg"></i>
                                </>
                            ),
                            variant: "info ",
                            onClick: () => {}
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
const tabs = {
    "Proposal Creation": {
        name: "Proposal Creation",
        component: <ProposalCreation />
    },
    "Voting Permissions": {
        name: "Voting Permissions",
        component: <ProposalCreation />
    },
    "Bond & Deadlines": {
        name: "Bond & Deadlines",
        component: <ProposalCreation />
    },
    Groups: {
        name: "Groups",
        component: <ProposalCreation />
    },
    "Visual Changes": {
        name: "Visual Changes",
        component: <ProposalCreation />
    }
};

const tabContent = tabs[state.tab].component;

return (
    <Wrapper>
        <div className="d-flex gap-2 ">
            <div className="ndc-card d-flex flex-column gap-2 p-4">
                <h5>DAO Name and Purpose</h5>
                <h6 className="text-subdued">DAO Name</h6>
                <p>ksjdnf</p>
                <h6 className="text-subdued ">DAO Purpose</h6>
                <p>dkhbfdsj</p>
            </div>
            <div className="ndc-card d-flex flex-column gap-2 p-4">
                <h5>Legal Status and Doc</h5>
                <h6 className="text-subdued">Legal Status</h6>
                <p></p>
                <h6 className="text-subdued ">Documents</h6>
                <p></p>
            </div>
            <div className="ndc-card d-flex flex-column gap-2 p-4">
                <h5>Links</h5>

                <p></p>
            </div>
            <div className="ndc-card d-flex flex-column gap-2 p-4">
                <h5>Cooldown Period</h5>
                <p>
                    Setup the period between when a proposal is approved and is
                    executed
                </p>
                <Widget
                    src="nearui.near/widget/Input.ExperimentalText"
                    props={{
                        label: "Define Period",
                        placeholder: "Enter days",
                        size: "lg",
                        inputProps: {
                            type: "number",
                            min: 0,
                            max: 3650,
                            name: "gracePeriod",
                            defaultValue: state.answers.gracePeriod
                        },
                        error: errors["gracePeriod"],
                        onChange: (v) => update("gracePeriod", parseInt(v))
                    }}
                />
            </div>
        </div>
        <div className="mt-4">
            <div className="ndc-card d-flex flex-column gap-2 p-4">
                <h5>More DAO settings</h5>
                <div className="w-100">
                    <Widget
                        src={`${widgetOwner}/widget/DAO.Layout.Tabs`}
                        props={{
                            tabs: tabs,
                            tab: state.tab,
                            update: (state) => State.update(state)
                        }}
                    />
                    {tabContent}
                </div>
            </div>
        </div>
    </Wrapper>
);
