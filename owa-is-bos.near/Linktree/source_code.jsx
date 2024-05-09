const accountId = "owa-is-bos.near";

if (!accountId) {
  return "No account ID";
}

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

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
  gap: 25px;
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
  font-weight: 500;
  font-size: 20px;
  overflow-wrap: anywhere;
  b {
    font-weight: 700;
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
    width: 120px;
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <Title>Open Web Academy</Title>
          <h5>@{accountId}</h5>
          <br />
          <Text>
            Únete a la comunidad de founders y builders <br /> #Web3 de #LATAM.
            🚀👷‍♂️
          </Text>
        </div>
      </div>
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

    <Section
      style={{
        height: "100%",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <SocialLinks
        style={{
          marginTop: "10px",
          display: "grid",
          "grid-template-columns": "repeat(4, 1fr)",
          "grid-column-gap": "10px",
          "grid-row-gap": "10px",
          height: "100%",
        }}
      >
        <a href={`https://ow.academy/`} target="_blank">
          <Button>
            <i className="bi bi-globe mx-1"></i> Website
          </Button>
        </a>
        <a href={`https://t.me/openwebacademy1`} target="_blank">
          <Button>
            <i className="bi bi-telegram mx-1"></i> Telegram
          </Button>
        </a>
        <a href={`https://discord.gg/XNcXfWnx `} target="_blank">
          <Button>
            <i className="bi bi-discord mx-1"></i> Discord
          </Button>
        </a>
        <a href={`https://github.com/open-web-academy`} target="_blank">
          <Button>
            <i className="bi bi-github mx-1"></i> GitHub
          </Button>
        </a>
        <a href={`https://twitter.com/openwebacademy_`} target="_blank">
          <Button>
            <i className="bi bi-twitter mx-1"></i> Twitter
          </Button>
        </a>
        <a href={`https://www.instagram.com/openwebacademy/`} target="_blank">
          <Button>
            <i className="bi bi-instagram mx-1"></i> Instagram
          </Button>
        </a>
        <a href={`https://www.youtube.com/@openwebacademy`} target="_blank">
          <Button>
            <i className="bi bi-youtube mx-1"></i> Youtube
          </Button>
        </a>
        <a
          href={`https://www.linkedin.com/company/open-web-academy`}
          target="_blank"
        >
          <Button>
            <i className="bi bi-linkedin mx-1"></i> LinkedIn
          </Button>
        </a>
      </SocialLinks>
    </Section>
  </Wrapper>
);
