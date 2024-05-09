//

const profile = {
  avatar:
    "https://pbs.twimg.com/profile_images/1737131731877015552/3Qj_a6Mx_400x400.jpg",
  title: "Black Dragon",
  subtitle: "Ecosystem (⋈) | Community Links",
  links: [
    { title: "gitbook", url: "https://black-dragon.gitbook.io/black-dragon/" },
    { title: "twitter", url: "https://twitter.com/dragonisnear" },
  ],
  socials: [
    { title: "telegram", url: "https://t.me/dragonisnear" },
    {
      title: "swap",
      url: "https://app.ref.finance/#near%7Cblackdragon.tkn.near",
    },
    {
      title: "nearblocks",
      url: "https://nearblocks.io/token/blackdragon.tkn.near",
    },
  ],
};

const titleToIcon = [
  {
    title: "telegram",
    icon: <i class="bi bi-telegram"></i>,
  },
  {
    title: "swap",
    icon: <i class="bi bi-r-square-fill"></i>,
  },
  {
    title: "nearblocks",
    icon: <i class="bi bi-info-circle-fill"></i>,
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
