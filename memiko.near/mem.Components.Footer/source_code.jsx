const Footer = () => {
  const twitterLink = "https://twitter.com/MemikoNEAR";

  const Section = styled.div`
    width: 100%;
    padding: 3rem;
  `;

  const Socials = () => (
    <div className="d-flex d-flex justify-content-between align-items-center gap-3">
      <a
        href={twitterLink}
        target="_blank"
        style={{ transform: "scaleX(-1)" }}
        className={"opacity-60"}
      >
        <i className={`fs-2 text-black bi bi-twitter`} />
      </a>
      <span className={"opacity-60"}>2024 © near.org</span>
      <a href={twitterLink} target="_blank" className={"opacity-60"}>
        <i className={`fs-2 text-black bi bi-twitter`} />
      </a>
    </div>
  );

  return (
    <Section className="d-flex justify-content-center">
      <div className="d-flex align-items-end gap-3">
        <Socials />
      </div>
    </Section>
  );
};

return { Footer };
