const accountIds = [
  "chloe.near",
  "pironi.near",
  "jeffgold.near",
  "fiftycent.near",
  "alan777.near",
  "bheegem.near",
  "microchipgnu.near",
  "starpause.near",
  "bjirken.near",
];

// -- Get all the roles from the DAO policy
let roles = Near.view(daoId, "get_policy");
roles = roles && roles.roles ? roles.roles : [];

const getUserRoles = (user) => {
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      continue;
    }
    if (!role.kind.Group) continue;
    if (user && role.kind.Group && role.kind.Group.includes(user)) {
      userRoles.push(role.name);
    }
  }
  return userRoles;
};

const isUserAllowedTo = (user, kind, action) => {
  // -- Filter the user roles
  const userRoles = [];
  for (const role of roles) {
    if (role.kind === "Everyone") {
      userRoles.push(role);
      continue;
    }
    if (!role.kind.Group) continue;
    if (user && role.kind.Group && role.kind.Group.includes(user)) {
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

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px;
`;

// ... other styled components here ...
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
  border: 1px solid #eceef0;
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
    border-color: #d0d5dd;
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

const renderCard = (accountId) => {
  const profile = Social.get(`${accountId}/profile/**`, "final");
  const myProfile = Social.get(`${context.accountId}/profile/**`, "final");
  const tags = Object.keys(profile.tags || {});
  const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;
  const daoId = "hacks.sputnik-dao.near";
  const role = "boshacks";
  const image =
    "https://ipfs.near.social/ipfs/bafkreig5mg6dfvtmctvmrjaybazql25yuidyf5mndmmir43tm4igm3yd34";
  const description = `I (${myProfile.name}) want you to be my partner at BOS HACKS`;

  const userRoles = accountId ? getUserRoles(accountId) : [];
  const isHacker = userRoles.includes(roleToCheck);

  return (
    <Card>
      <CardLeft>
        <Avatar href={profileUrl}>
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
          <TextLink href={profileUrl} ellipsis bold>
            {profile.name || accountId.split(".near")[0]}
          </TextLink>
          <TextLink href={profileUrl} ellipsis>
            @{accountId}
          </TextLink>

          {tags.length > 0 && (
            <TagsWrapper>
              <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
            </TagsWrapper>
          )}
        </div>
      </CardLeft>
      {!!context.accountId && context.accountId !== accountId && !isHacker && (
        <Widget
          src="ndcplug.near/widget/ProfileCard.DAOButton"
          props={{
            receiver: accountId,
            //   buttonName: "NFT Partner Request",
          }}
        />
      )}
      {!!context.accountId && context.accountId !== accountId && (
        <Widget
          src="near/widget/FollowButton"
          props={{ accountId: accountId }}
        />
      )}
    </Card>
  );
};

return <div>{accountIds.map((accountId) => renderCard(accountId))}</div>;
