const accountId = props.accountId ?? context.accountId;
const daoId = props.daoId ?? "research-collective.sputnik-dao.near";

const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "Loading...";
}

// Filter only the "alumni" group
const alumniGroup = policy.roles.find((role) => role.name === "alumni");

// Check if the alumni group exists
if (!alumniGroup) {
  return "Alumni group not found";
}

// Extract members of the alumni group
const alumniMembers = alumniGroup.kind.Group;

// Styled components definitions
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

// Render profile cards for each alumni member
const renderAlumniProfileCard = (accountId) => {
  const profile = Social.get(`${accountId}/profile/**`, "final");
  const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

  return (
    <Card>
      <CardLeft>
        <Avatar href={profileUrl}>
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: profile.image,
              alt: profile.name,
              fallbackUrl: "https://via.placeholder.com/60",
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
        </div>
      </CardLeft>
      {!!context.accountId && context.accountId !== accountId && (
        <Widget
          src="near/widget/FollowButton"
          props={{ accountId: accountId }}
        />
      )}
    </Card>
  );
};

return (
  <div>
    {alumniMembers.map((member, index) => (
      <div key={index}>{renderAlumniProfileCard(member)}</div>
    ))}
  </div>
);
