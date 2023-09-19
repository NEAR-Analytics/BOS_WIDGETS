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

const ActivityWrapper = styled.div`
     display: flex;
     .post-wrapper { padding: 30px; width: 50%; }
     .vertical-line { border: 1px solid #bbb; transform: scaleX(0.5);}
     .widget-wrapper { padding: 30px; width: 50%; }
`;

const VR = styled.div` `;

const Banner = () => {
  return (
    <>
      <div className="banner-wrapper">
        <div className="banner">

        </div>
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
            src="https://pbs.twimg.com/profile_images/1632115273137549312/PxWn6CSS_400x400.jpg"
          ></img>
        </div>
        <div className="name-wrapper">
          <h1 className="profile-name">Zero</h1>
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
          src={`idknwhoru.near/widget/collegium.bos.wk3.MyPosts`}
          props={props}
        />
      </div>
      <div className="vertical-line" />
      <div className="widget-wrapper">
        <Widget
          src={`idknwhoru.near/widget/collegium.bos.wk3.SocialWidget`}
          props={props}
        />
      </div>
    </ActivityWrapper>
  </>
);
