const daoId = props.daoId ?? "multi.sputnik-dao.near";
const accountId = props.accountId ?? context.accountId;

const proposalKinds = {
  ChangeConfig: "config",
  ChangePolicy: "policy",
  AddMemberToRole: "add_member_to_role",
  RemoveMemberFromRole: "remove_member_from_role",
  FunctionCall: "call",
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
  ChangePolicyUpdateDefaultVotePolicy: "policy_update_default_vote_policy",
  ChangePolicyUpdateParameters: "policy_update_parameters",
};

const actions = {
  AddProposal: "AddProposal",
  VoteApprove: "VoteApprove",
  VoteReject: "VoteReject",
  VoteRemove: "VoteRemove",
};

// -- Get all the roles from the DAO policy
let roles = Near.view(daoId, "get_policy");
roles = roles === null ? [] : roles.roles;

const isUserAllowedTo = (user, kind, action) => {
  // -- Filter the user roles
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      userRoles.push(role);
      continue;
    }
    if (!role.kind.Group) continue;
    if (accountId && role.kind.Group && role.kind.Group.includes(accountId)) {
      userRoles.push(role);
    }
  }

  // -- Check if the user is allowed to perform the action
  let allowed = false;

  userRoles
    .filter(({ permissions }) => {
      const allowedRole =
        permissions.includes(`${kind.toString()}:${action.toString()}`) ||
        permissions.includes(`${kind.toString()}:*`) ||
        permissions.includes(`*:${action.toString()}`) ||
        permissions.includes("*:*");
      allowed = allowed || allowedRole;
      return allowedRole;
    })
    .map((role) => role.name);

  return allowed;
};

console.log(
  "Is User Allowed To 'Add a Proposal' of type 'FunctionCall'?",
  isUserAllowedTo(accountId, proposalKinds.FunctionCall, actions.AddProposal)
);

console.log(
  "Is User Allowed To 'Vote Yes' on a proposal of type 'FunctionCall'?",
  isUserAllowedTo(accountId, proposalKinds.FunctionCall, actions.VoteApprove)
);

console.log(
  "Is User Allowed To 'Add a Proposal' of type 'AddMemberToRole'?",
  isUserAllowedTo(accountId, proposalKinds.AddMemberToRole, actions.AddProposal)
);

return (
  <div className="d-flex flex-column gap-2">
    <div>
      <b>Is {accountId} Allowed To 'Add a Proposal' of type 'FunctionCall'?</b>
      <div className="text-muted">
        {isUserAllowedTo(
          accountId,
          proposalKinds.FunctionCall,
          actions.AddProposal
        ).toString()}
      </div>
    </div>
    <div>
      <b>
        Is {accountId} Allowed To 'Vote Yes' on a proposal of type
        'FunctionCall'?
      </b>
      <div className="text-muted">
        {isUserAllowedTo(
          accountId,
          proposalKinds.FunctionCall,
          actions.VoteApprove
        ).toString()}
      </div>
    </div>
    <div>
      <b>
        Is {accountId} Allowed To 'Add a Proposal' of type 'AddMemberToRole'?
      </b>
      <div className="text-muted">
        {isUserAllowedTo(
          accountId,
          proposalKinds.AddMemberToRole,
          actions.AddProposal
        ).toString()}
      </div>
    </div>
  </div>
);
