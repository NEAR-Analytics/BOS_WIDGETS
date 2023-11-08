const profile = {
  avatar:
    "https://media.licdn.com/dms/image/D4E03AQEWB5trS40OMw/profile-displayphoto-shrink_400_400/0/1672349229160?e=1704931200&v=beta&t=62w0lviOJ69S1bZ59d6-t2TyQ7ShJkKNU3DwS-ETOrA",
  title: "Daniel Herrmann",
  subtitle: "Data Scientist | Software Engineer | Artist",
  links: [
    { title: "github", url: "https://github.com/scopalaffairs" },
    { title: "linkedin", url: "https://linkedin.com/daniel-herrmann" },
  ],
  socials: [
    { title: "github", url: "https://github.com/scopalaffairs" },
    { title: "linkedin", url: "https://linkedin.com/daniel-herrmann" },
  ],
};

const titleToIcon = [
  {
    title: "github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "facebook",
    icon: <i class="bi bi-facebook"></i>,
  },
  {
    title: "whatsapp",
    icon: <i class="bi bi-whatsapp"></i>,
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
      src={profile.avatar}
      alt={profile.title}
    />

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
      {profile.links?.map((link) => (
        <a href={link.url} target="_blank">
          <button style={{ width: "100%" }}>{link.title}</button>
        </a>
      ))}
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      {profile.socials?.map((link) => (
        <a href={link.url} target="_blank" style={{ fontSize: "1.5rem" }}>
          {titleToIcon.find((ti) => ti.title === link.title).icon}
        </a>
      ))}
    </div>
  </div>
);
