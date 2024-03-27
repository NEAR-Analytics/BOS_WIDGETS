// update

const profile = {
  avatar:
  "https://pbs.twimg.com/profile_images/1536919525190516737/SvU144V6_400x400.jpg",
  title: "Kayleigh Svensson",
  subtitle: "Head of Operations",
  links: [
    { title: "Telegram", url: "t.me/kaysve" },
    { title: "Twitter", url: "https://twitter.com/kaysve" },
  ],
  socials: [
    { title: "Telegram", url: "t.me/kaysve" },
    { title: "Twitter", url: "https://twitter.com/kaysve" },
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

  {
    title: "telegram",
    icon: <i class="bi bi-telegram"></i>,
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
