// To-DO
// check if owner and gate the proposal
const accountId = props.accountId ?? "ndcplug.near";
const issuer = props.issuer ?? "issuer.regens.near";
const roleName = props.roleName ?? "Council";
const daoId = props.daoId ?? "refi.sputnik-dao.near";
const classId = props.classId ?? 1;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;
const reference =
  props.reference ??
  "https://genadrop.mypinata.cloud/ipfs/QmUxy2gB1QQD8mqRSwKkU2k6an4o99ip5ZL12if2opyjas?_gl=1*qk5u0e*_ga*MTQ0ODg3NzEzNS4xNjgyNjA0ODQy*_ga_5RMPXG14TE*MTY4OTM1MzU2Mi4yLjEuMTY4OTM1MzU5Ny4yNS4wLjA";

const isMintAuthority = false; // add sbt minter contract
// View call: issuer.regens.near.class_minter({"class": 1})
// {
//   requires_iah: false,
//   minters: [ 'nearefi.near', 'refi.sputnik-dao.near', 'admin.regens.near' ]
// }
const canProposeToDAO = true; // add logic for whether can propose to DAO and whether dao is a minter

const checkMintersJson = Near.view(issuer, "class_minter", { class: classId }); // need to extract all value and check if user is in minters array. // maybe conditional logic for dao
const mintAuthorities = checkMintersJson.minters;
isMintAuthority = mintAuthorities.includes(context.accountId);
const daoIsMinter = mintAuthorities.includes(daoId);
// now check if this person can propose in dao

// console.log(checkMintersJson);
// if (!!mintAuthorities) {
//   for (let i = 0; i < mintAuthorities.length; i++) {
//     console.log("MintAuthority " + i + " " + mintAuthorities[i]);

//   }
// }
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
    {isMintAuthority && (
      <Widget
        src="nearefi.near/widget/ReFi.Regen.sbtMint"
        props={{ showReciever: false, receiver: accountId }}
      />
    )}
    {canProposeToDAO && (
      <Widget
        src="nearefi.near/widget/ReFi.DAO.Propose.sbtMint"
        props={{
          showReciever: false,
          showDAO: false,
          showReference: false,
          showIssuer: false,
          showHeader: false,
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
