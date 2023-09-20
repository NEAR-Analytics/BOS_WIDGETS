const account_id = context.accountId ?? props.accountId;

const profileData = Social.getr(`${account_id}/profile`);

console.log(profileData);

const ProfileWrapper = styled.div`
    padding: 0 0 30px 0;
    .banner-wrapper { padding: 15px; }
    .banner-image {
      width: 100%;
      object-fit: cover;
      border-radius: 20px;
    }
    .profile-wrapper { padding: 0 30px; margin-top: -55px; }
    .avatar-wrapper {  width: 250px; height: 250px; border-radius: 70%; border: 3px solid green; overflow: hidden;}
    .avatar { width: 100%; height: 100%; object-fit: cover; }
    .name-wrapper { display: flex; flex-direction: column; justify-content: center; padding: 0 0 0 30px;}
    .profile-name { }
    .account-id { color: #656d76; font-size: 1.4rem; }
`;

const ActivityWrapper = styled.div`
     display: flex;
     .post-wrapper { padding: 30px; width: 50%; }
     .vertical-line { border: 1px solid green; transform: scaleX(0.5);}
     .widget-wrapper { padding: 30px; width: 50%; }
`;

const VR = styled.div` `;

const Banner = () => {
  return (
    <>
      <div className="banner-wrapper">
          <img
            className="banner-image"
            src={
              `https://ipfs.near.social/ipfs/${profileData.backgroundImage.ipfs_cid}` ??
              `https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid}`
            }
          ></img>
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
    <ActivityWrapper>
      <div className="post-wrapper">
        <Widget
          src={`ebcf2af7ee0a89f3de0d5ca125069f64ee966b68a9b9eb5216751d6a8de89c01/widget/collegium.bos.wk3.MyPosts`}
          props={props}
        />
      </div>
      <div className="vertical-line" />
      <div className="widget-wrapper">
        <Widget
          src={`ebcf2af7ee0a89f3de0d5ca125069f64ee966b68a9b9eb5216751d6a8de89c01/widget/collegium.bos.wk3.SocialWidget`}
          props={props}
        />
      </div>
    </ActivityWrapper>
  </>
);
