// We obtain the accountId from the props, if it is not found then it is taken from the gateway session.
const accountId = props.accountId ?? context.accountId;

// We validate that an accountId is found to continue loading the component.
if (!accountId) {
  return "No account ID";
}

// Get profile information from SOCIAL DB.
const profile = props.profile ?? Social.getr(`${accountId}/profile`);

// Constant with widget address.
const accountUrl = `/yairnava.near/widget/LinkTree?accountId=${accountId}`;

// Profile Data.
const tags = Object.keys(profile.tags || {});
const viewingOwnAccount = accountId === context.accountId;
const shareUrl = `https://near.social${accountUrl}`;

// Follower Count.
const following = Social.keys(`${accountId}/graph/follow/*`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followers = Social.keys(`*/graph/follow/${accountId}`, "final", {
  return_type: "BlockHeight",
  values_only: true,
});
const followingCount = following
  ? Object.keys(following[accountId].graph.follow || {}).length
  : null;
const followersCount = followers ? Object.keys(followers || {}).length : null;

// We define each of the components using styled components for the design.
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

const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  position: relative;

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #fbfcfd;
    border: 1px solid #d7dbdf;
    color: #11181c !important;

    &.button--primary {
      width: 100%;
      color: #006adc !important;

      @media (max-width: 1024px) {
        width: auto;
      }
    }

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    .bi-16 {
      font-size: 16px;
    }
  }

  @media (max-width: 900px) {
    gap: 24px;
  }
`;

const Section = styled.div`
  display: grid;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 200px;
  height: 200px;
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

const Title = styled.h1`
  font-weight: 600;
  font-size: "40px";
  line-height: 1.2em;
  color: #11181c;
  margin: "0")};
  overflow-wrap: anywhere;
`;

const Text = styled.p`
  margin: 0;
  text-align: center;
  line-height: 1.5rem;
  color: "#687076" !important;
  font-weight: "400";
  font-size: "20px";
  overflow-wrap: anywhere;
  b {
    font-weight: 600;
    color: #11181c;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLinks = styled.div`
  display: grid;
  gap: 9px;
`;

const Verifications = styled.div`
  padding: 0;
`;

const Button = styled.button`
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    border-radius: 30px;
    max-width: 230px;
    background-color: rgb(0, 0, 0);
    padding: 10px;
    font-weight: 500;
    border: 0px;
    color: white;
`;

// Rendering of the UI putting into use the styled components in each corresponding section,
// as well as the information obtained from SOCIAL DB.
return (
  <Wrapper>
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
    <div style={{ display: "flex", justifyContent: "center" }}>
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
    </div>
    <Section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <Title>{profile.name || accountId}</Title>
          <Text>@{accountId}</Text>
        </div>
        {accountId !== context.accountId && (
          <>
            {state.showToast && (
              <Widget
                src={`near/widget/DIG.Toast`}
                props={{
                  type: "info",
                  title: state.flaggedMessage.header,
                  description: state.flaggedMessage.detail,
                  open: state.showToast,
                  onOpenChange: () => {
                    State.update({ showToast: false });
                  },
                  duration: 5000,
                }}
              />
            )}
          </>
        )}
      </div>

      <Actions style={{ display: "flex", justifyContent: "center" }}>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Copy URL to clipboard</Tooltip>}
        >
          <button
            className="button"
            type="button"
            onMouseLeave={() => {
              State.update({ copiedShareUrl: false });
            }}
            onClick={() => {
              clipboard.writeText(shareUrl).then(() => {
                State.update({ copiedShareUrl: true });
              });
            }}
          >
            {state.copiedShareUrl ? (
              <i className="bi-16 bi bi-check"></i>
            ) : (
              <i className="bi-16 bi-link-45deg"></i>
            )}
            Share
          </button>
        </OverlayTrigger>
      </Actions>

      <Verifications
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Widget
          src="near/widget/ProfilePage.ProfileBadges"
          props={{ accountId }}
        />
      </Verifications>
    </Section>

    <Section>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Widget
          src="near/widget/Tags"
          props={{
            tags,
          }}
        />
      </div>
    </Section>

    <Section>
      <Stats style={{ display: "flex", justifyContent: "center" }}>
        <Text>
          <b bold as="span">
            {followingCount === null ? "--" : followingCount}
          </b>{" "}
          Following
        </Text>
        <Text>
          <b>{followersCount === null ? "--" : followersCount}</b> Followers
        </Text>
      </Stats>
    </Section>

    {profile.linktree && (
      <Section>
        <SocialLinks style={{ display: "flex", justifyContent: "center" }}>
          {profile.linktree.website && (
            <a href={`https://${profile.linktree.website}`} target="_blank">
              <Button>
                <i className="bi bi-globe"></i> {profile.linktree.website}
              </Button>
            </a>
          )}

          {profile.linktree.github && (
            <a
              href={`https://github.com/${profile.linktree.github}`}
              target="_blank"
            >
              <Button>
                <i className="bi bi-github"></i> {profile.linktree.github}
              </Button>
            </a>
          )}

          {profile.linktree.twitter && (
            <a
              href={`https://twitter.com/${profile.linktree.twitter}`}
              target="_blank"
            >
              <Button>
                <i className="bi bi-twitter"></i> {profile.linktree.twitter}
              </Button>
            </a>
          )}

          {profile.linktree.telegram && (
            <a
              href={`https://t.me/${profile.linktree.telegram}`}
              target="_blank"
            >
              <Button>
                <i className="bi bi-telegram"></i> {profile.linktree.telegram}
              </Button>
            </a>
          )}
        </SocialLinks>
      </Section>
    )}
  </Wrapper>
);
