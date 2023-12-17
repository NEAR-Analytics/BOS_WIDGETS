const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const accountUrl = `/near/widget/ProfilePage?accountId=${accountId}`;
const viewingOwnAccount = accountId === context.accountId;
const shareUrl = `https://near.org${accountUrl}`;
const followersCount = followers ? Object.keys(followers || {}).length : 0;

const Wrapper = styled.div`
    display: flex;
  gap: 40px;
  position: relative;
`;

const Avatar = styled.div`
  width: 133px;
  height: 133px;
  flex-shrink: 0;
  border: 3px solid #fff;
  overflow: hidden;
  border-radius: 100%;
  box-shadow:
    0px 12px 16px rgba(16, 24, 40, 0.08),
    0px 4px 6px rgba(16, 24, 40, 0.03);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const Detail = styled.div`
margin: 2em
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }

`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }
`;

const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
  }
`;

const FollowButtonWrapper = styled.div`
  flex: 1 0 auto;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1024px) {
    flex: 0 0 auto;
    div,
    button {
      width: auto;
    }
  }
`;

return (
  <>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
          }}
        />
      )}
    </BackgroundImage>
    <Wrapper>
      <Avatar>
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
        <div className="d-flex align-items-start justify-content-between ">
          <Detail>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
            >
              <Title
                onMouseLeave={() => {
                  State.update({ copiedShareUrl: false });
                }}
                onClick={() => {
                  clipboard.writeText(shareUrl).then(() => {
                    State.update({ copiedShareUrl: true });
                  });
                }}
              >
                {profile.name || accountId}
                {state.copiedShareUrl ? (
                  <i className="bi-16 bi bi-check"></i>
                ) : (
                  <i className="bi-16 bi-link-45deg"></i>
                )}
              </Title>
            </OverlayTrigger>
            <Text>@{accountId}</Text>
            Follwer: {followersCount}
          </Detail>
        </div>
      </div>

      <Detail>
        {viewingOwnAccount ? (
          <Link
            className="button button--primary"
            href="/near/widget/ProfileEditor"
          >
            <i className="bi bi-pencil"></i>
            Edit Profile
          </Link>
        ) : context.accountId ? (
          <>
            <FollowButtonWrapper>
              <Widget
                src="near/widget/FollowButton"
                props={{
                  accountId,
                }}
              />
            </FollowButtonWrapper>
          </>
        ) : (
          <></>
        )}
      </Detail>
    </Wrapper>
  </>
);
