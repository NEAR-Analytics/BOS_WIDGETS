const account_id = context.accountId ?? props.accountId;

const profileData = Social.getr(`${account_id}/profile`);

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

const Content = styled.div`
     display: flex;
     .widget { padding: 30px; width: 50%;}
     .line { border: 1px solid #bbb;}
`;

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
        <div className="name-wrapper">
          <h1 className="profile-name">{profileData.name}</h1>
          <h2 className="account-id">@{account_id}</h2>
        </div>
      </div>
    </>
  );
};

return (
  <>
    <ProfileWrapper>
      <Profile />
    </ProfileWrapper>
    <Content>
      <div className="widget">
        <Widget
          src={`c842b1a648114a20cfca00f01718ee4c6f46d772951d9f8f31dffc189da63b80/widget/collegium.bos.wk3.MyPosts`}
          props={props}
        />
      </div>
      <div className="line" />
      <div className="widget">
        <Widget
          src={`c842b1a648114a20cfca00f01718ee4c6f46d772951d9f8f31dffc189da63b80/widget/collegium.bos.wk3.SocialWidget`}
          props={props}
        />
      </div>
    </Content>
  </>
);
