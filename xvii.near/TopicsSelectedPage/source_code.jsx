// Array of accounts with their topics and links
const accounts = [
  {
    id: "cripteros.near",
    topic: "NEAR UX for Spanish speaking contributors",
    link: "https://docs.google.com/document/d/10eAXOIFTyCjEcHs9Izs2uC61OXFV43Q23uhC7SpqH3k/edit?usp=sharing",
  },
  {
    id: "dabbie3229.near",
    topic: "Gender in Web3 (women in near the ecosystem)",
    link: "https://docs.google.com/document/d/1qxHZu6IKTxxdIJrJNsIGAiHepkH58KyTincgv2i9VtU/edit?usp=sharing",
  },
  {
    id: "hannah17.near",
    topic: "Decentralized Finance (DeFi) and Ref Finance",
    link: "https://docs.google.com/document/d/1EhODQcNZKAaRdBy_SnERws6-BwlYGp3EVQLY0Zo0Q6E/edit?usp=sharing",
  },
  {
    id: "15870c8972a9fe6cdb7dfc2df835740108e8674cc170a091cd0ece0b9e4f6cfa",
    topic: "Cryptography in Blockchain",
    link: "https://docs.google.com/document/d/1cnE-3tJ-jWXCnIPZK8Mi8xvdL4VnrVwEFg6z-j27aQw/edit?usp=sharing",
  },
  {
    id: "ca391bd08dff676aba646e23d2a099dd2cefa728f11d864940e05433f09a4371",
    topic: "The impacts of musical NFT’s on near ecosystem",
    link: "https://docs.google.com/document/d/10RgXhAs6aaI_6JKy9oTjowjUElUxYeR_-amQpDegYIo/edit",
  },
  {
    id: "xvii.near",
    topic: "DeFi on NEAR VS ETH",
    link: "https://docs.google.com/document/d/1ymC009NWDZxne5CWKrUOhtXTys2MKjxQez5G1brWFyE/edit?usp=sharing",
  },
  {
    id: "racheludoka.near",
    topic: "Airdrop campaign and it's effects on new projects",
    link: "https://docs.google.com/document/d/1vBMw-TuXuzM5D1jiugBwBJ8lPPEgNmTmwHoKItGqdus/edit?usp=drivesdk",
  },
  {
    id: "bheegem.near",
    topic: "DeFi projects on Near",
    link: "https://docs.google.com/document/d/1y_GsDrA_VG8kQubplRqjy8ddIL_Fnjl7IkkNt5YpPbU/edit?usp=drivesdk",
  },
  {
    id: "trojanhorse15.near",
    topic: "NDC Election",
    link: "https://docs.google.com/document/d/1alFrnJ5cQBVouCG5kGytOSZOpd8-sjP1pAdjatTm_UY/edit?usp=drivesdk",
  },
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

const renderCard = (account) => {
  const { id, topic, link } = account;
  const profile = Social.get(`${id}/profile/**`, "final");
  const tags = Object.keys(profile.tags || {});
  const profileUrl = `#/near/widget/ProfilePage?accountId=${id}`;
  const daoId = "hacks.sputnik-dao.near";
  const role = "boshacks";
  const image =
    "https://ipfs.near.social/ipfs/bafkreig5mg6dfvtmctvmrjaybazql25yuidyf5mndmmir43tm4igm3yd34";
  const description = `I (${myProfile.name}) want you to be my partner at BOS HACKS`;

  const userRoles = id ? getUserRoles(id) : [];
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
            {profile.name || id.split(".near")[0]}
          </TextLink>
          <TextLink href={profileUrl} ellipsis>
            @{id}
          </TextLink>

          {tags.length > 0 && (
            <TagsWrapper>
              <Widget src="near/widget/Tags" props={{ tags, scroll: true }} />
            </TagsWrapper>
          )}
        </div>
      </CardLeft>
      <div>
        <strong>Research Project:</strong>
        <br />
        {link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            {topic}
          </a>
        ) : (
          <span>{topic}</span>
        )}
      </div>

      {!!context.accountId && context.accountId !== accountId && !isHacker && (
        <Widget
          src="ndcplug.near/widget/ProfileCard.DAOButton"
          props={{
            receiver: accountId,
          }}
        />
      )}
      {!!context.accountId && context.accountId !== accountId && (
        <Widget src="near/widget/FollowButton" props={{ accountId: id }} />
      )}
    </Card>
  );
};

return <div>{accounts.map((account) => renderCard(account))}</div>;
