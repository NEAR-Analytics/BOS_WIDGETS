const multiSelectMode = props.multiSelectMode ?? false;
let { proposalString, proposalId, daoId, daoConfig } = props;
const accountId = context.accountId;

const CoADaoId = props.dev
    ? "coa.gwg-testing.near"
    : "congress-coa-v1.ndc-gwg.near";
const VotingBodyDaoId = props.dev
    ? "voting-body-v1.gwg-testing.near"
    : "voting-body-v1.ndc-gwg.near";
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
    daoId === HoMDaoId || daoId === CoADaoId || daoId === TCDaoId;

const isVotingBodyDao = daoId === VotingBodyDaoId;

if (!daoConfig) {
    if (isCongressDaoID || isVotingBodyDao) {
        daoConfig = Near.view(daoId, "config", {});
    }
}

const currentuserCongressHouse = null; // if the current user is a member of any house

function itemIsInArray(item, array) {
    return array.includes(item);
}

if (isVotingBodyDao || daoId === HoMDaoId) {
    currentuserCongressHouse = useCache(
        () =>
            Near.asyncView(HoMDaoId, "get_members").then((res) =>
                itemIsInArray(accountId, res?.members) ? HoMDaoId : null
            ),
        HoMDaoId + "-is-hom-member",
        { subscribe: false }
    );

    if (!currentuserCongressHouse) {
        currentuserCongressHouse = useCache(
            () =>
                Near.asyncView(CoADaoId, "get_members").then((res) =>
                    itemIsInArray(accountId, res?.members) ? CoADaoId : null
                ),
            CoADaoId + "-is-coa-member",
            { subscribe: false }
        );
    }

    if (!currentuserCongressHouse) {
        currentuserCongressHouse = useCache(
            () =>
                Near.asyncView(TCDaoId, "get_members").then((res) =>
                    itemIsInArray(accountId, res?.members) ? TCDaoId : null
                ),
            TCDaoId + "-is-tc-member",
            { subscribe: false }
        );
    }
}

const isHuman = useCache(
    () =>
        asyncFetch(
            `https://api.pikespeak.ai/sbt/sbt-by-owner?holder=${accountId}&registry=registry.i-am-human.near`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5"
                }
            }
        ).then((res) => res?.body?.length > 0),
    daoId + "-is-voting-allowed",
    { subscribe: false }
);

if (isHuman === null) {
    return <Widget src="nearui.near/widget/Feedback.Spinner" />;
}

const policy = isCongressDaoID
    ? Near.view(daoId, "get_members")
    : isVotingBodyDao
    ? ""
    : Near.view(daoId, "get_policy");
let roles = policy;

function getPreVoteVotes(supported) {
    const votes = {};
    for (const item of supported) {
        votes[item] = "Support";
    }
    return votes;
}

if (roles === null)
    return (
        <Widget src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.skeleton" />
    );

let new_proposal = null;
if (!proposalString && proposalId && daoId) {
    if (isCongressDaoID || isVotingBodyDao) {
        const resp = Near.view(daoId, "get_proposal", {
            id: parseInt(proposalId)
        });
        if (res === null) {
            return (
                <Widget src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.skeleton" />
            );
        } else {
            new_proposal = {
                id: resp.id,
                kind: resp.kind,
                votes:
                    resp.status === "PreVote"
                        ? getPreVoteVotes(resp.supported)
                        : resp.votes ?? {},
                status: resp.status,
                proposer: resp?.proposer,
                description: resp.description,
                vote_counts: {},
                submission_time: resp?.submission_time ?? resp?.start, // for vb it's start
                supported: resp?.supported ?? [], // for vb
                approve: resp?.approve ?? 0,
                reject: resp?.reject ?? 0,
                spam: resp?.spam ?? 0,
                abstain: resp?.abstain ?? 0
            };
        }
    } else {
        // TODO: THIS API IS SO WEIRD AND INCONSISTENT WITH PROPOSALS API, VOTE IS BROKEN
        new_proposal = fetch(
            `https://api.pikespeak.ai/daos/proposal/${daoId}?id=${proposalId}`,
            {
                mode: "cors",
                headers: {
                    "x-api-key": "36f2b87a-7ee6-40d8-80b9-5e68e587a5b5"
                }
            }
        );

        if (new_proposal === null) {
            return (
                <Widget src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.skeleton" />
            );
        } else if (!new_proposal.ok) {
            return "Proposal not found, check console for details.";
        }
        new_proposal = new_proposal.body[0].proposal;
    }
} else if (!proposalString) {
    return "Please provide a daoId and a proposal or proposalId.";
}

if (!proposalString && !new_proposal) {
    return (
        <Widget src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.skeleton" />
    );
}

const proposal = proposalString ? JSON.parse(proposalString) : new_proposal;

const expensiveWork = () => {
    let my_proposal = new_proposal ? new_proposal : proposal;

    // --- check user permissions
    const proposalKinds = {
        ChangeConfig: "config",
        ChangePolicy: "policy",
        AddMemberToRole: "add_member_to_role",
        RemoveMemberFromRole: "remove_member_from_role",
        FunctionCall: isCongressDaoID ? "FunctionCall" : "call",
        UpgradeSelf: "upgrade_self",
        UpgradeRemote: "upgrade_remote",
        Transfer: "transfer",
        SetStakingContract: "set_vote_token",
        AddBounty: "add_bounty",
        BountyDone: "bounty_done",
        Vote: "vote",
        FactoryInfoUpdate: "factory_info_update",
        ChangePolicyAddOrUpdateRole: "policy_add_or_update_role",
        ChangePolicyRemoveRole: "policy_remove_role",
        ChangePolicyUpdateDefaultVotePolicy:
            "policy_update_default_vote_policy",
        ChangePolicyUpdateParameters: "policy_update_parameters",
        Text: "Text",
        FundingRequest: "FundingRequest",
        RecurrentFundingRequest: "RecurrentFundingRequest",
        DismissAndBan: "DismissAndBan"
    };

    const actions = {
        AddProposal: "AddProposal",
        VoteApprove: "VoteApprove",
        VoteReject: "VoteReject",
        VoteRemove: "VoteRemove",
        VoteAbstain: "VoteAbstain"
    };

    // -- Get all the roles from the DAO policy
    roles = roles === null ? [] : roles?.roles ?? roles;

    // -- Filter the user roles
    const userRoles = [];
    if (Array.isArray(roles)) {
        for (const role of roles) {
            if (role.kind === "Everyone") {
                userRoles.push(role);
                continue;
            }
            if (!role.kind.Group) continue;
            if (
                accountId &&
                role.kind.Group &&
                role.kind.Group.includes(accountId)
            ) {
                userRoles.push(role);
            }
        }
    }

    if (isCongressDaoID) {
        userRoles = [
            {
                name: "all",
                kind: "Everyone",
                permissions: roles?.permissions,
                vote_policy: {}
            }
        ];
    }

    if (isVotingBodyDao) {
        userRoles = [
            {
                name: "all",
                kind: "Everyone",
                permissions: {},
                vote_policy: {}
            }
        ];
    }

    const isAllowedTo = (kind, action) => {
        // -- Check if the user is allowed to perform the action
        let allowed = false;
        userRoles
            .filter(({ permissions }) => {
                if (isCongressDaoID) {
                    const allowedRole =
                        permissions.includes(`${kind.toString()}`) &&
                        roles?.members?.includes(accountId);
                    allowed = allowed || allowedRole;
                    return allowedRole;
                } else {
                    const allowedRole =
                        permissions.includes(
                            `${kind.toString()}:${action.toString()}`
                        ) ||
                        permissions.includes(`${kind.toString()}:*`) ||
                        permissions.includes(`*:${action.toString()}`) ||
                        permissions.includes("*:*");
                    allowed = allowed || allowedRole;
                    return allowedRole;
                }
            })
            .map((role) => role.name);
        return allowed;
    };

    const kindName =
        typeof my_proposal.kind === "string"
            ? my_proposal.kind
            : isCongressDaoID || isVotingBodyDao
            ? Object.keys(my_proposal.kind)[0]
            : typeof my_proposal.kind.typeEnum === "string"
            ? my_proposal.kind.typeEnum
            : Object.keys(my_proposal.kind)[0];

    const isAllowedToVote = isVotingBodyDao
        ? [isHuman, isHuman, isHuman, isHuman]
        : [
              isAllowedTo(proposalKinds[kindName], actions.VoteApprove),
              isAllowedTo(proposalKinds[kindName], actions.VoteReject),
              isCongressDaoID
                  ? isAllowedTo(proposalKinds[kindName], actions.VoteAbstain)
                  : isAllowedTo(proposalKinds[kindName], actions.VoteRemove)
          ];

    // --- end check user permissions
    // --- Votes required:
    // TODO: Needs to be reviewed

    // Fixes pikespeak API for single proposal
    Object.keys(my_proposal.vote_counts).forEach((k) => {
        if (typeof my_proposal.vote_counts[k] !== "string") return;
        my_proposal.vote_counts[k] = my_proposal.vote_counts[k]
            .match(/.{1,2}/g)
            .slice(0, 3)
            .map((a) => parseInt(a));
    });

    let totalVotesNeeded = 0;

    if (policy?.roles) {
        policy.roles.forEach((role) => {
            // Determine if the role is eligible for the given proposalType
            const isRoleAllowedToVote =
                role.permissions.includes(
                    `${proposalKinds[kindName]}:VoteApprove`
                ) ||
                role.permissions.includes(
                    `${proposalKinds[kindName]}:VoteReject`
                ) ||
                role.permissions.includes(`${proposalKinds[kindName]}:*`) ||
                role.permissions.includes(`*:VoteApprove`) ||
                role.permissions.includes(`*:VoteReject`) ||
                role.permissions.includes("*:*");

            if (isRoleAllowedToVote) {
                const threshold = (role.vote_policy &&
                    role.vote_policy[proposalKinds[kindName]]?.threshold) ||
                    policy["default_vote_policy"]?.threshold || [0, 0];
                const eligibleVoters = role.kind.Group
                    ? role.kind.Group.length
                    : 0;

                // Apply the threshold
                const votesNeeded = Math.ceil(
                    (threshold[0] / threshold[1]) * eligibleVoters
                );

                totalVotesNeeded += votesNeeded;
            }
        });
    }
    my_proposal.typeName = kindName.replace(/([A-Z])/g, " $1").trim(); // Add spaces between camelCase
    if (isCongressDaoID) {
        totalVotesNeeded = daoConfig?.threshold;
    }

    if (isVotingBodyDao) {
        if (my_proposal.typeName === "Dissolve") {
            totalVotesNeeded = daoConfig?.super_consent?.quorum;
        } else if (my_proposal.typeName === "Pre Vote") {
            totalVotesNeeded = daoConfig?.pre_vote_support;
        } else {
            totalVotesNeeded = daoConfig?.simple_consent?.quorum;
        }
    }

    let totalVotes = {
        yes: 0,
        no: 0,
        spam: 0,
        abstain: 0,
        total: 0
    };

    Object.keys(my_proposal.vote_counts).forEach((key) => {
        totalVotes.yes += my_proposal.vote_counts[key][0];
        totalVotes.no += my_proposal.vote_counts[key][1];
        totalVotes.spam += my_proposal.vote_counts[key][2];
    });

    if (isVotingBodyDao) {
        totalVotes.yes = my_proposal?.approve ?? 0;
        totalVotes.no = my_proposal?.reject ?? 0;
        totalVotes.abstain = my_proposal?.abstain ?? 0;
        totalVotes.spam = my_proposal?.spam ?? 0;
    }

    if (isCongressDaoID) {
        for (const { vote } of Object.values(my_proposal.votes)) {
            if (vote === "Approve") {
                totalVotes.yes++;
            } else if (vote === "Reject") {
                totalVotes.no++;
            } else if (vote === "Abstain") {
                totalVotes.abstain++;
            } else if (vote === "Spam") {
                totalVotes.spam++;
            }
        }
    }
    totalVotes.total =
        totalVotes.yes + totalVotes.no + totalVotes.spam + totalVotes.abstain;

    if (my_proposal.status === "PreVote") {
        totalVotes.total = my_proposal?.support ?? 0;
    }

    my_proposal.totalVotesNeeded = totalVotesNeeded;
    my_proposal.totalVotes = totalVotes;
    // --- end Votes required

    my_proposal.statusName = my_proposal.status
        .replace(/([A-Z])/g, " $1")
        .trim();

    if (!state) {
        State.init({
            proposal: my_proposal,
            isAllowedToVote
        });
    } else {
        State.update({
            proposal: my_proposal,
            isAllowedToVote
        });
    }
};

const comments = Social.index("comment", {
    type: "dao_proposal_comment",
    path: `${daoId}/proposal/main`,
    proposal_id: proposal.id + "-beta"
});

if (!state || state.proposal.id !== proposal.id) {
    // Only execute expensive work once
    expensiveWork();
    return multiSelectMode ? (
        ""
    ) : (
        <Widget src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.skeleton" />
    );
}

const handleVote = ({ action, proposalId, daoId }) => {
    let args = {};
    if (isVotingBodyDao) {
        args["prop_id"] = parseInt(proposalId);
        args["caller"] = accountId;
        args["vote"] = action.replace("Vote", "");

        Near.call([
            {
                contractName: registry,
                methodName: "is_human_call_lock",
                args: {
                    ctr: daoId,
                    function: "vote",
                    payload: JSON.stringify(args),
                    lock_duration:
                        proposal?.submission_time +
                        daoConfig?.vote_duration -
                        Date.now() +
                        1,
                    with_proof: false
                },
                gas: 200000000000000,
                deposit: 100000000000000000000000
            }
        ]);
    } else {
        args["id"] = JSON.parse(proposalId);
        if (isCongressDaoID) {
            args["vote"] = action.replace("Vote", "");
        } else {
            args["action"] = action;
        }
        Near.call([
            {
                contractName: daoId,
                methodName: isCongressDaoID ? "vote" : "act_proposal",
                args: args,
                gas: 200000000000000
            }
        ]);
    }
};

const handlePreVoteAction = ({ action, proposalId }) => {
    switch (action) {
        case "support_proposal_by_congress": {
            Near.call([
                {
                    contractName: daoId,
                    methodName: "support_proposal_by_congress",
                    args: {
                        prop_id: parseInt(proposalId),
                        dao: currentuserCongressHouse
                    },
                    gas: 200000000000000
                }
            ]);
            break;
        }
        case "support_proposal": {
            Near.call([
                {
                    contractName: registry,
                    methodName: "is_human_call_lock",
                    args: {
                        ctr: daoId,
                        function: "support_proposal",
                        payload: JSON.stringify(parseInt(proposalId)),
                        lock_duration:
                            proposal?.submission_time +
                            daoConfig?.pre_vote_duration -
                            Date.now() +
                            1,
                        with_proof: false
                    },
                    gas: 200000000000000
                }
            ]);
            break;
        }
        case "top_up_proposal": {
            const deposit =
                parseInt(daoConfig?.active_queue_bond) -
                parseInt(daoConfig?.pre_vote_bond);

            Near.call([
                {
                    contractName: daoId,
                    methodName: "top_up_proposal",
                    args: {
                        id: parseInt(proposalId)
                    },
                    gas: 200000000000000,
                    deposit: deposit
                }
            ]);
            break;
        }
    }
};

return (
    <Widget
        src="astraplusplus.ndctools.near/widget/DAO.Proposals.Card.ui"
        props={{
            proposal: state.proposal,
            isAllowedToVote: state.isAllowedToVote,
            multiSelectMode,
            daoId,
            policy,
            comments: comments,
            handleVote,
            isCongressDaoID,
            isVotingBodyDao,
            daoConfig,
            handlePreVoteAction,
            isHuman,
            currentuserCongressHouse,
            dev: props.dev,
            HoMDaoId,
            CoADaoId,
            registry
        }}
    />
);
