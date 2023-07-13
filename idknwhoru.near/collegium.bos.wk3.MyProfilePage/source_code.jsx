const account_id = context.accountId;

const profileData = Social.getr(`${account_id}/profile`);

const ProfileWrapper = styled.div`
    .banner-wrapper { padding: 15px; }
    .banner { width: 100%;  height: 250px; background-color: #eceef0; border-radius: 20px; }
    .profile-wrapper { padding: 0 30px; margin-top: -55px }
    .avatar-wrapper { width: 250px; height: 250px; border-radius: 70%; overflow: hidden; }
    .avatar { width: 100%; height: 100%; object-fit: cover; }
    .profile-name { padding: 45px 0 0; }
    .account-id { color: #656d76; font-size: 1.4rem; }
`;

const ActivityWrapper = styled.div` display: flex; `;

const Banner = () => {
  return (
    <>
      <div className="banner-wrapper">
        <div className="banner"></div>
      </div>
    </>
  );
};

const Profile = () => {
  return (
    <>
      <Banner />
      <div className="profile-wrapper">
        <div className="avatar-wrapper">
          <img
            className="avatar"
            src={`https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid}`}
          ></img>
        </div>
        <h1 className="profile-name">{profileData.name}</h1>
        <h2 className="account-id">@{account_id}</h2>
      </div>
    </>
  );
};

return (
  <>
    <ProfileWrapper>
      <Profile />
    </ProfileWrapper>
    <ActivityWrapper>
      <Widget src={`idknwhoru.near/widget/collegium.bos.wk3.MyPosts`} />
      <Widget src={`idknwhoru.near/widget/collegium.bos.wk3.SocialWidget`} />
    </ActivityWrapper>
  </>
);
