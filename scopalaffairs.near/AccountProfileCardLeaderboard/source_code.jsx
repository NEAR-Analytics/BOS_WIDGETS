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

const Button = styled.div`
  div > .follow-button {
    color: #000 !important;
}
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  width: 100%;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 16px 0;
`;

const Score = styled.div`
  font-size: 14px;
  color: #90908C;
  padding: 0;
`;

const Scores = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  border-bottom: 1px solid #eceef0

`;

const TagsWrapper = styled.div`
  padding-top: 4px;
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

const accountId = props.accountId;
const profile = props.profile || Social.get(`${accountId}/profile/**`, "final");
const tags = Object.keys(profile.tags || {});
const profileUrl = `#/near/widget/ProfilePage?accountId=${accountId}`;

return (
  <Card>
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
    {props.following !== null &&
      props.followers !== null &&
      props.likers !== null && (
        <Scores>
          <Score>Followers: {props.followers.toString()}</Score>
          <Score>Following: {props.following.toString()}</Score>
          <Score>Likes: {props.likers.toString()}</Score>
        </Scores>
      )}

    {!!context.accountId && context.accountId !== props.accountId && (
      <Button>
        <Widget
          src="near/widget/FollowButton"
          props={{ accountId: props.accountId }}
        />
      </Button>
    )}
  </Card>
);
