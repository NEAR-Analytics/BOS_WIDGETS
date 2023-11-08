const profile = {
  title: "Daniel Herrmann",
  subtitle: "Data Scientist | Software Engineer | Artist",
  claim: "Exploring the nexus of technology and art with a focus on organic growth patterns within non-trivial systems, drawing inspiration from consciousness and rhizomatic structures.",
  links: [
    { title: "github", url: "https://github.com/scopalaffairs" },
    { title: "linkedin", url: "https://www.linkedin.com/in/daniel-herrmann/" },
    { title: "instagram", url: "https://www.instagram.com/nother_land/" },
    { title: "spotify", url: "https://open.spotify.com/track/0WDPVuGA4IjUxOFRLoILPo" },
  ],
  socials: [
    { title: "github", url: "https://github.com/scopalaffairs" },
    { title: "linkedin", url: "https://www.linkedin.com/in/daniel-herrmann/" },
    { title: "instagram", url: "https://www.instagram.com/nother_land/" },
    { title: "spotify", url: "https://open.spotify.com/track/0WDPVuGA4IjUxOFRLoILPo" },
  ],
};

const titleToIcon = [
  {
    title: "github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "instagram",
    icon: <i class="bi bi-instagram"></i>,
  },
  {
    title: "spotify",
    icon: <i class="bi bi-spotify"></i>,
  },
  {
    title: "linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
];

return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 36,
      height: "100%",
      padding: "0 8px",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: props.theme.textColor }}>{profile.title}</h2>
      <h5 style={{ color: props.theme.textColor2 }}>{profile.subtitle}</h5>
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
      {profile.claim && (
        <p style={{ width: "100%", color: props.theme.textColor }}>
          {profile.claim}
        </p>
      )}


    </div>

    <div style={{ display: "flex", gap: 42 }}>
      {profile.socials?.map((link) => (
        <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
          {titleToIcon.find((ti) => ti.title === link.title).icon}
        </a>
      ))}
    </div>
  </div>
);
