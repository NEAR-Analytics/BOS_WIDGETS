const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

const username = props.username;
const action = props.action;
const componentName = props.componentName;
const timestamp = props.timestamp;
const desc = props.desc;

const Avatar = styled.a`
  > img {
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
  }
`;

return (
  <div>
    <div>
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
    </div>
    <div>
      <span>{username}</span>
      <span>{action}</span>
      <span>{componentName}</span>
      <span>{timestamp}</span>
    </div>
    <div>{desc}</div>
  </div>
);
