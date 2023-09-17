const account_id = context.accountId ?? props.accountId;
const profileData = Social.getr(`${account_id}/profile`);
const user = "14ea88d51603eb512dae55d259b805b74b58c6ade02df799706c3e12ab26c14a";

const ProfileWrapper = styled.div`
  padding: 0 0 30px 0;
    .avatar-wrapper { width: 250px; height: 250px; border-radius: 70%; overflow: hidden; }
    .avatar { width: 100%; height: 100%; object-fit: cover; }
    name-wrapper { display: flex; flex-direction: column; justify-content: center; padding: 0 0 0 30px;}
    .profile-wrapper { padding: 0 50px; margin-top: 20px; display: flex; }
`;

const ActivityWrapper = styled.div`
    display: flex;
     .post-wrapper { padding: 30px; width: 50%; }
     .vertical-line { border: 1px solid #bbb; transform: scaleX(0.5);}
     .widget-wrapper { padding: 30px; width: 50%; }
`;

const Profile = () => {
  return (
    <div className="profile-wrapper">
      <div className="avatar-wrapper">
        <img
          className="avatar"
          src={`https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid}`}
        ></img>
      </div>

      <div className="name-wrapper">
        <h1>{profileData.name}</h1>
        <h5>{account_id}</h5>
      </div>
    </div>
  );
};

return (
  <div>
    <ProfileWrapper>
      <Profile />
    </ProfileWrapper>

    <ActivityWrapper>
      <div className="post-wrapper">
        <Widget src={`${user}/widget/my_post`} />
      </div>
      <div className="vertical-line" />
      <div className="widget-wrapper">
        <Widget src={`${user}/widget/my_widget`} />
      </div>
    </ActivityWrapper>
  </div>
);
