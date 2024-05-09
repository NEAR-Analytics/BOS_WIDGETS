const profile = {
  avatar:
    "https://i.seadn.io/gae/F6N03Zp2ROlZH0gyQTi_eF_MBb0h7n0HY5TEU51f6tmyLnQtkMzM_Y6WzfqNa3ooHtGGnY6lU0NmMZ3Cq0Rs6pzXqJA-9uIPjY0E?w=500&auto=format",
  name: "abc0xmattyic333.btc",
  title: "#NEAR Imma BOS",
  links: [
    { title: "github", url: "https://github.com/abc0xmattyic333" },
    { title: "twitter", url: "https://twitter.com/abc0xmattyic333" },
  ],
  socials: [
    { title: "github", url: "https://github.com/abc0xmattyic333" },
    { title: "twitter", url: "https://twitter.com/abc0xmattyic333" },
  ],
};

const socials = {
  github: <i class="bi bi-github"></i>,
  twitter: <i class="bi bi-twitter"></i>,
};

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      height: "100%",
      padding: "0 8px",
    }}
  >
    <img
      style={{
        height: "100%",
        maxHeight: 200,
        borderRadius: "50%",
        aspectRatio: 1 / 1,
        objectFit: "cover",
      }}
      src={
        profile.avatar ??
        "https://i.seadn.io/gae/F6N03Zp2ROlZH0gyQTi_eF_MBb0h7n0HY5TEU51f6tmyLnQtkMzM_Y6WzfqNa3ooHtGGnY6lU0NmMZ3Cq0Rs6pzXqJA-9uIPjY0E?w=500&auto=format"
      }
      alt={profile.name}
    />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: props.theme.textColor }}>{profile.name}</h2>
      <h5 style={{ color: props.theme.textColor2 }}>{profile.title}</h5>
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
        maxWidth: 400,
      }}
    >
      {profile.links?.map((link) => (
        <a href={link.url} target="_blank">
          <button style={{ width: "100%" }}>{link.title}</button>
        </a>
      ))}
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      {profile.socials?.map((link) => (
        <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
          {socials[link?.title]}
        </a>
      ))}
    </div>
  </div>
);
