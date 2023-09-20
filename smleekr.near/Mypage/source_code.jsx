const account_id = context.accountId ?? props.accountId;
const profileData = Social.getr(`${account_id}/profile`);
return (
  <>
    <div
      style={{
        width: "100%",
        height: "80px",
        background: "yellow",
        textAlign: "center",
        lineHeight: "80px",
        fontSize: "30px",
        marginBottom: "50px",
      }}
    >
      BANNER
    </div>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <div>
        <img
          src={`https://ipfs.near.social/ipfs/${profileData.image.ipfs_cid}`}
          style={{ borderRadius: "100%" }}
        />
      </div>
      <div>
        <p>
          Name: {profileData.name}
          <br />
          Account: {"@" + account_id}
        </p>
      </div>
    </div>
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%", margin: "1%" }}>
        <Widget src={`smleekr.near/widget/MyPosts`} props={props} />
      </div>
      <div style={{ width: "50%", margin: "1%" }}>
        <Widget src={`smleekr.near/widget/MySocial`} props={props} />
      </div>
    </div>
  </>
);
