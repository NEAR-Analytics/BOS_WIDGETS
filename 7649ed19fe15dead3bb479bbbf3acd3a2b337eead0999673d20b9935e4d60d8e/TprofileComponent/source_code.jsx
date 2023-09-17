const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;

const url = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

const cssFont = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
).body;

const css = fetch(
  "https://raw.githubusercontent.com/cryptosynk/near-social-profile/main/css/mainLight.css"
).body;

const Theme = styled.div`
  font-family: "Open Sans", sans-serif;
  ${cssFont}
  ${css}
`;

const ProfileWrapper = styled.div`
    padding: 0 0 30px 0;
    .banner-wrapper { padding: 15px; }
    .banner { width: 100%;  height: 250px; background-color: #eceef0; border-radius: 20px; }
    .profile-wrapper { padding: 0 30px; margin-top: -55px; display: flex; }
    .avatar-wrapper { width: 250px; height: 250px; border-radius: 70%; overflow: hidden; }
    .avatar { width: 100%; height: 100%; object-fit: cover; }
    .name-wrapper { display: flex; flex-direction: column; justify-content: center; padding: 0 0 0 30px;}
    .profile-name { }
    .account-id { color: #656d76; font-size: 1.4rem; }
`;

const ActivityWrapper = styled.div`
     display: flex;
     .post-wrapper { padding: 30px; width: 50%; }
     .vertical-line { border: 1px solid #bbb; transform: scaleX(0.5);}
     .widget-wrapper { padding: 30px; width: 50%; }
`;

if (!cssFont || !css) return "Loading fonts & css";

State.init({
  showEditProfile: false,
});

const Banner = () => {
  return (
    <>
      <div className="banner-wrapper">
        <div className="banner"></div>
      </div>
    </>
  );
};

return (
  <Theme>
    <ProfileWrapper>
      <Banner />
    </ProfileWrapper>
    <div className="leftSection">
      <div>
        <div>
          <img className="profileImage" src={url} alt="profile" />
          <div style={{ paddingBlock: 10 }}>
            <h2>{name}</h2>
            <p>@{accountId}</p>
          </div>
        </div>

        <p className="description">{profile?.description}</p>
      </div>

      {state.showEditProfile ? (
        <>
          <Widget
            src="zahidulislam.near/widget/Profile.Editor"
            props={{ showEditProfile }}
          />

          <button
            style={{ marginBottom: 20 }}
            onClick={() => {
              State.update({
                showEditProfile: false,
              });
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <Widget
            src="zahidulislam.near/widget/Profile.SocialLinks"
            props={{ profile }}
          />
          <button
            onClick={() => {
              State.update({
                showEditProfile: true,
              });
            }}
          >
            Edit Profile
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Widget src="mob.near/widget/FollowStats" props={{ accountId }} />

            <Widget
              src="zahidulislam.near/widget/Profile.IconButton"
              props={{
                icon: "https://cdn-icons-png.flaticon.com/512/3179/3179068.png",
                label: profile?.location ?? "Add Location",
              }}
            />
          </div>
        </>
      )}
    </div>

    <ActivityWrapper>
      <div className="post-wrapper">
        <Widget
          src={`7649ed19fe15dead3bb479bbbf3acd3a2b337eead0999673d20b9935e4d60d8e/widget/TSocialPosts`}
          props={props}
        />
      </div>
      <div className="vertical-line" />
      <div className="widget-wrapper">
        <Widget
          src={`7649ed19fe15dead3bb479bbbf3acd3a2b337eead0999673d20b9935e4d60d8e/widget/YouJun.collegium.bos.wk3.SocialWidget`}
          props={props}
        />
      </div>
    </ActivityWrapper>
  </Theme>
);
