const { assets } = VM.require(`memelol.near/widget/lol.Config`);

const Footer = () => {
  const twitterLink = "https://twitter.com/LOLMemecoin";
  const tgLink = "";

  const Section = styled.div`
    width: 100%;
    padding: 4rem;
  `;

  const FooterLogo = styled.img`
    width: 70px !important;
    height: 70px !important;
  `;

  const Socials = () => (
    <div className="d-flex d-flex justify-content-between align-items-center gap-3">
      <a href={twitterLink} target="_blank">
        <i className={`fs-2 text-black bi bi-twitter-x`} />
      </a>
      {/*<a href={tgLink} target="_blank">*/}
      {/*  <i className={`fs-2 text-black bi bi-telegram`} />*/}
      {/*</a>*/}
    </div>
  );

  return (
    <Section className="d-flex justify-content-center">
      <div className="d-flex align-items-end gap-3">
        <FooterLogo src="https://ipfs.near.social/ipfs/bafkreiaf4ztsvri5e5slfbzmjpu5mccgjy555m6liuq3updthosjdade54" />
        <Socials />
      </div>
    </Section>
  );
};

return { Footer };
