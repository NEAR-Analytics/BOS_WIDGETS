const profile = {
  avatar: "https://i.ibb.co/41QryyQ/Whats-App-Image-2024-02-26-at-00-46-59.jpg",
  title: "Valentín Martínez",
  subtitle: "Creativo y Desarrollador",
  links: [
    {
      title: "Textos y proyectos",
      url: "https://valentinmartinezmx.wixsite.com/ideas",
    },
    { title: "Github", url: "https://github.com/ValenteCreativo" },
    {
      title: "ValenteCreativo IG",
      url: "https://www.instagram.com/valentecreativo/",
    },
    {
      title: "TA'AK Studio",
      url: "https://taak-studio.bubbleapps.io/version-test",
    }, // Nuevo link
  ],
  socials: [
    { title: "Instagram", url: "https://www.instagram.com/ValentePantera4" },
    { title: "Twitter", url: "https://twitter.com/ValenteCreativo" },
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/valentinmartinezmx/",
    },
    { title: "Mail", url: "mailto:geovalente@proton.me" },
  ],
};

const titleToIcon = [
  {
    title: "Github",
    icon: <i className="bi bi-github"></i>,
  },
  {
    title: "ValenteCreativo IG",
    icon: <i className="bi bi-instagram"></i>,
  },
  {
    title: "Instagram",
    icon: <i className="bi bi-instagram"></i>,
  },
  {
    title: "Twitter",
    icon: <i className="bi bi-twitter"></i>,
  },
  {
    title: "LinkedIn",
    icon: <i className="bi bi-linkedin"></i>,
  },
  {
    title: "Mail",
    icon: <i className="bi bi-envelope"></i>,
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
      backgroundImage: "url('https://i.ibb.co/Pgfg30c/blackmarmol.jpg')",
      color: "white",
      textAlign: "center",
      fontFamily: "Arial, sans-serif", // Fuente personalizada
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
      <h2
        style={{
          textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        {profile.title}
      </h2>
      <h5
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)", fontSize: "1rem" }}
      >
        {profile.subtitle}
      </h5>
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
      {profile.links?.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          style={{ textDecoration: "none" }}
        >
          <button
            style={{
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "none",
              padding: "12px",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "rgba(128, 128, 128, 0.5)")
            }
            onMouseOut={(e) =>
              (e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)")
            }
          >
            {link.title}
          </button>
        </a>
      ))}
    </div>

    <div style={{ display: "flex", gap: 16 }}>
      {profile.socials?.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          style={{
            fontSize: "1.5rem",
            color: "rgba(255, 255, 255, 0.8)",
            transition: "color 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "rgba(255, 255, 255, 1)")}
          onMouseOut={(e) =>
            (e.target.style.color = "rgba(255, 255, 255, 0.8)")
          }
        >
          {titleToIcon.find((ti) => ti.title === link.title).icon}
        </a>
      ))}
    </div>
  </div>
);
