const [profile, setProfile] = useState(null);

const fetchProfile = async () => {
  try {
    const response = await fetch("https://api.near.social/get", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keys: [`${props.account}/profile/**`],
      }),
    });
    let p = (await response.json())?.[props.account]?.profile;
    if (!p && response.ok) {
      // defaults
      p = {
        name: props.account,
        image: {
          ipfs_cid:
            "bafkreibiyqabm3kl24gcb2oegb7pmwdi6wwrpui62iwb44l7uomnn3lhbi",
        },
      };
    }
    // debugger;
    setProfile(p);
  } catch (err) {
    console.log("profile fetch error", err);
  }
};

useEffect(() => {
  fetchProfile();
}, []);

return profile ? (
  <div
    style={{
      display: "flex",
      flexDirection: "row",
      columnGap: "0.5rem",
      alignItems: "center",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        flexShrink: 0,
        border: "1px solid #eceef0",
        overflow: "hidden",
        borderRadius: "40px",
        transition: "border-color 200ms",
      }}
    >
      <img
        src={`https://ipfs.near.social/ipfs/${profile.image.ipfs_cid}`}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          margin: "0 !important",
        }}
      />
    </div>
    <div>{profile.name}</div>
  </div>
) : (
  <>...</>
);
