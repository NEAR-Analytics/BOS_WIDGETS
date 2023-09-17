const accountId = props.accountId || context.accountId;

if (!accountId) return "Login or send accountId in the props";

const profile = Social.getr(`${accountId}/profile`);

const name = profile?.name;
const image = profile?.image;

const url = image.ipfs_cid
  ? `https://ipfs.near.social/ipfs/${image?.ipfs_cid}`
  : "https://thewiki.io/static/media/sasha_anon.6ba19561.png";

State.init({
  showEditProfile: false,
});

console.log(profile)

const SocialCardStyle = styled.div`
    background-color:${props.theme.ui2};
    width:100%;
    display: flex;
    justify-content:space-around;
    padding-top:20px;
    text-align: center;
    padding-bottom:18px;
    border-radius:10px;
`;

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 16,
      paddingTop: 16,
      paddingInline: 16,
    }}
  >
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ width: 160 }}>
          <img
            style={{
              width: 160,
              height: 160,
              objectFit: "cover",
              borderRadius: 100,
              outline: "2px solid #dbdcdd",
            }}
            src={url}
            alt="profile"
          />
        </div>
        <div style={{ padding: 10, paddingLeft: 20, width: "100%" }}>
          <h3 style={{ color: props.theme.textColor }}>{name}</h3>
          <p style={{ color: props.theme.textColor3 }}>@{accountId}</p>
          <SocialCardStyle>
            <div
              style={{
                width: "100%",
                border: `0px solid ${props.theme.textColor3}`,
                borderRightWidth: 1,
              }}
            >
              <div style={{ transform: "translateY(6px)" }}>
                <h5 style={{ color: props.theme.textColor }}>12</h5>
                <p style={{ color: props.theme.textColor }}>Followers</p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                border: `0px solid ${props.theme.textColor3}`,
                borderRightWidth: 1,
              }}
            >
              <div style={{ transform: "translateY(6px)" }}>
                <h5 style={{ color: props.theme.textColor }}>45</h5>
                <p style={{ color: props.theme.textColor }}>Following</p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                borderRightWidth: 1,
                borderColor: "#ffffff",
              }}
            >
              <div style={{ transform: "translateY(6px)" }}>
                <h5 style={{ color: props.theme.textColor }}>Verified</h5>
                <p style={{ color: props.theme.textColor }}>Status</p>
              </div>
            </div>
          </SocialCardStyle>
        </div>
      </div>
    </div>

    {state.showEditProfile ? (
      <>
        <Widget
          src="saidulbadhon.near/widget/ProfileSidebar.Editor"
          props={{ showEditProfile, theme: props?.theme }}
        />

        <button
          style={{ marginBottom: 20, backgroundColor: props.theme.buttonColor }}
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
        {props.myAccountId === accountId && (
          <button
            onClick={() => {
              State.update({
                showEditProfile: true,
              });
            }}
          >
            Edit Profile
          </button>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div>
            <h3 style={{ color: props.theme.textColor }}>Total Statistics</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                textAlign: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: props.theme.ui2,
                  width: "100%",
                  borderRadius: 5,
                  padding: 8,
                }}
              >
                <div
                  style={{
                    backgroundColor: props.theme.ui,
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: 5,
                    marginBottom: 15,
                  }}
                >
                  <Widget src="harrydhillon.near/widget/ProfilePage.PullRequestIcon" />
                </div>
                <h4 style={{ color: props.theme.textColor }}>210</h4>
                <h6 style={{ color: props.theme.textColor }}>Pull Requests</h6>
              </div>
              <div
                style={{
                  backgroundColor: props.theme.ui2,
                  width: "100%",
                  borderRadius: 5,
                  padding: 8,
                }}
              >
                <div
                  style={{
                    backgroundColor: props.theme.ui,
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: 5,
                    marginBottom: 15,
                  }}
                >
                  <Widget src="harrydhillon.near/widget/ProfilePage.PullRequestIcon" />
                </div>
                <h4 style={{ color: props.theme.textColor }}>605</h4>
                <h6 style={{ color: props.theme.textColor }}>Deployments</h6>
              </div>
              <div
                style={{
                  backgroundColor: props.theme.ui2,
                  width: "100%",
                  borderRadius: 5,
                  padding: 8,
                }}
              >
                <div
                  style={{
                    backgroundColor: props.theme.ui,
                    height: 140,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderRadius: 5,
                    marginBottom: 15,
                  }}
                >
                  <Widget src="harrydhillon.near/widget/ProfilePage.PullRequestIcon" />
                </div>
                <h4 style={{ color: props.theme.textColor }}>6372</h4>
                <h6 style={{ color: props.theme.textColor }}>Lines of Code</h6>
              </div>
            </div>
          </div>
          <div
            style={{
              gap: 10,
              marginTop: 20,
              alignItems: "center",
            }}
          >
            <h3 style={{ color: props.theme.textColor }}>Bio</h3>
            <h6
              style={{
                color: props.theme.textColor,
                fontWeight: 500,
                margin: 0,
                padding: 0,
              }}
            >
              {profile?.description ??
                "Full-Stack Developer for Jutsu.AI with a keen eye for fixing bugs and developing great products in a timely manner."}
            </h6>
          </div>
          <div
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <h3 style={{ color: props.theme.textColor }}>Location</h3>
            <h6
              style={{
                color: props.theme.textColor,
                fontWeight: 500,
                margin: 0,
                padding: 0,
              }}
            >
              {profile?.location ?? "Dhaka, Bangladesh"}
            </h6>
          </div>
          <div
            style={{
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <h3 style={{ color: props.theme.textColor }}>Member Since</h3>
            <h6
              style={{
                color: props.theme.textColor,
                fontWeight: 500,
                margin: 0,
                padding: 0,
              }}
            >
              {profile?.location ?? "October 2022"}
            </h6>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
            marginTop: 10,
          }}
        >
          <Widget
            src="saidulbadhon.near/widget/ProfileSidebar.SocialLinks"
            props={{ profile, theme: props.theme }}
          />
        </div>
      </>
    )}
  </div>
);
