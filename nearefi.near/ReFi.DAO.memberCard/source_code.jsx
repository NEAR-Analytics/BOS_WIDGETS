// To-DO
// fix class
// check if owner and gate the proposal
const accountId = props.accountId ?? "ndcplug.near";
const issuer = props.issuer ?? "issuer.regens.near";
const roleName = props.roleName ?? "Council";
const daoId = props.daoId ?? "refi.sputnik-dao.near";
const classId = props.classId ?? 1;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;
const reference = props.reference ?? null;
const isLoggedIn = context.accountId;
const isMintAuthority = false; // add sbt minter contract
const registry = props.registry ?? "registry.i-am-human.near";
const humanRequiredForSbt = props.humanRequiredForSbt ?? false; // need to check if this require then check it
// View call: issuer.regens.near.class_minter({"class": 1})
// {
//   requires_iah: false,
//   minters: [ 'nearefi.near', 'refi.sputnik-dao.near', 'admin.regens.near' ]
// }

const isHuman = false;
if (accountId) {
  const getFirstSBTToken = () => {
    const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
      account: `${accountId}`,
      issuer: "fractal.i-am-human.near",
    });
    return view?.[0]?.[1]?.[0];
  };
  isHuman = getFirstSBTToken() !== undefined;
}

const checkMintersJson = Near.view(issuer, "class_minter", { class: classId }); // need to extract all value and check if user is in minters array. // maybe conditional logic for dao
const mintAuthorities = checkMintersJson.minters;
isMintAuthority = mintAuthorities.includes(context.accountId);
const daoIsMinter = mintAuthorities.includes(daoId);
console.log("Dao is minter: " + daoIsMinter);
// now check if this person can propose in dao

// check if person already has sbt

// console.log(checkMintersJson);
// if (!!mintAuthorities) {
//   for (let i = 0; i < mintAuthorities.length; i++) {
//     console.log("MintAuthority " + i + " " + mintAuthorities[i]);

//   }
// }
// add where class is probably in return view
let hasToken = false;
if (accountId) {
  const getFirstSBTToken = () => {
    const view = Near.view(registry, "sbt_tokens_by_owner", {
      account: `${accountId}`,
      issuer: issuer,
    });
    return view?.[0]?.[1]?.[0];
  };
  hasToken = getFirstSBTToken() !== undefined;
}
const policy = Near.view(daoId, "get_policy");
// const accountId = props.accountId ?? context.accountId;
const daoBond = policy.proposal_bond;

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

const canPropose = isUserAllowedTo(
  context.accountId,
  proposalKinds.FunctionCall,
  actions.AddProposal
); // logic not working for some reason
console.log(
  "Can Propose Function call " + context.accountId + " " + canPropose
);

const onPointerUp =
  props.onClick ??
  ((event) => {
    if (props.debug) {
      console.log("click", event);
    }
  });

State.init({
  show: false,
});

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #ECEEF0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;

const CardLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
  min-width: 0;

  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 0;
  }
`;

const Avatar = styled.a`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  border: 1px solid #ECEEF0;
  overflow: hidden;
  border-radius: 56px;
  transition: border-color 200ms;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus {
    border-color: #D0D5DD;
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 18px;
  color: ${(p) => (p.bold ? "#11181C !important" : "#687076 !important")};
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "visible")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "unset")};
  white-space: nowrap;
  outline: none;

  &:focus,
  &:hover {
    text-decoration: underline;
  }
`;

const TagsWrapper = styled.div`
  padding-top: 4px;
`;

return (
  <Card>
    <CardLeft>
      <Avatar
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        onPointerUp={onPointerUp}
      >
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: profile.name,
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      </Avatar>

      <div>
        <TextLink
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onPointerUp={onPointerUp}
          ellipsis
          bold
        >
          {profile.name || accountId.split(".near")[0]}
        </TextLink>
        <TextLink
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          onPointerUp={onPointerUp}
          ellipsis
        >
          @{accountId}
        </TextLink>

        {tags.length > 0 && (
          <TagsWrapper>
            <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
          </TagsWrapper>
        )}
      </div>
    </CardLeft>

    {!!context.accountId && context.accountId !== props.accountId && (
      <Widget
        src="near/widget/FollowButton"
        props={{ accountId: props.accountId }}
      />
    )}
    {isMintAuthority &&
      !hasToken &&
      ((humanRequiredForSbt && isHuman) || !humanRequiredForSbt) && (
        <Widget
          src="nearefi.near/widget/ReFi.Regen.sbtMint"
          props={{
            showReciever: false,
            receiver: accountId,
            classId: classId,
            reference: reference,
            issuer: issuer,
          }}
        />
      )}
    {isLoggedIn &&
      canPropose &&
      daoIsMinter &&
      !hasToken &&
      ((humanRequiredForSbt && isHuman) || !humanRequiredForSbt) && (
        <Widget
          src="nearefi.near/widget/ReFi.DAO.Propose.sbtMint"
          props={{
            showReciever: false,
            showDAO: false,
            showReference: false,
            showIssuer: false,
            showHeader: false,
            showClass: false,
            daoId: daoId,
            issuer: issuer,
            classId: classId,
            reference: reference,
            receiver: accountId,
          }}
        />
      )}
  </Card>
);
// add number of members and recent activity, like time for last proposal using time ago
