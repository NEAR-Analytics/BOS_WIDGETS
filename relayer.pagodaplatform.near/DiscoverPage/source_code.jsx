const DiscoverPage = styled.div`
  padding-top: 22vh
`;

const HightLightText = styled.h1`
  background: -webkit-linear-gradient(#0019FF, #931FD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const IntroSection = styled.div`
  padding: 0 120px
`;

return (
  <DiscoverPage className="w-100 container-fluid text text-light bg-black">
    <IntroSection className="position-relative">
      <div className="d-flex flex-row row">
        <div className="col-lg-6">
          <img
            style={{ maxWidth: "100%" }}
            src={`https://ipfs.near.social/ipfs/bafkreihxxhopgpwqbo4otuah4brtehlzgxkw5v4dh3ddelsba2xsihrcf4`}
            alt="uploaded"
          />
        </div>
        <div className="d-flex flex-column col-lg-6 justify-content-center">
          <span className="mb-5 d-flex flex-row">
            <h1 className="me-2">Welcome To</h1>
            <HightLightText>WeData</HightLightText>
          </span>
          <p>
            Cloudy is a free platform for everyone to share, exchange and
            contribute the data. Cloudy provides a large storage capacity beyond
            that of blockchain. Still decentralized - totally. And sharing
            instantly.
          </p>
          <div>
            <button className="btn rounded text-black bg-white ">
              Try it out
            </button>
          </div>
        </div>
      </div>
      <img
        style={{ maxWidth: "30vw", zIndex: "1", translate: "35% -50%" }}
        className="position-absolute top-0 end-0"
        src={`https://ipfs.near.social/ipfs/bafkreie2xpl6z3sffhw5x6hhd3gurzdabljzlu622lq3rgn5ghvxv2bjoa`}
        alt="uploaded"
      />
    </IntroSection>
  </DiscoverPage>
);
