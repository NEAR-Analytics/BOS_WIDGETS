// update

const profile = {
  avatar:
    "https://cdn.discordapp.com/attachments/1191273367085527070/1198339505325875362/Screenshot_2023-12-06_232116.png?ex=65be8ba2&is=65ac16a2&hm=25a527ae3ec5b711641847330e1496772c3e4d6ffdbcd4ca081e80e32dfdb3b7&", // Replace with the URL of your avatar image
  title: "Ali Ahmad", // Replace with your name
  subtitle: "Discord: aaaliahmad", // Replace with your Discord username
  links: [
    { title: "twitter", url: "https://twitter.com/khan70044057958" }, // Replace with your Twitter URL
    {
      title: "linkedin",
      url: "https://www.linkedin.com/in/ali-ahmad-67759325a/",
    }, // Replace with your LinkedIn URL
    // Add more links if needed
  ],
  socials: [
    { title: "twitter", url: "https://twitter.com/khan70044057958" }, // Replace with your Twitter URL
    {
      title: "linkedin",
      url: "https://www.linkedin.com/in/ali-ahmad-67759325a/",
    }, // Replace with your LinkedIn URL
    // Add more social links if needed
  ],
};

const titleToIcon = [
  {
    title: "twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
  // Add more icons for other social platforms if needed
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

// Deploy this component so that it can be public to everyone else.
