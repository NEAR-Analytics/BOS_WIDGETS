const DiscoverPage = styled.div`
  padding-top: 18vh
`;

const HightLightText = styled.h1`
  background: -webkit-linear-gradient(#0019FF, #931FD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Section = styled.div`
  padding: 0 120px;
  margin-bottom: 200px
`;

const WorkBlock = styled.div`
  width: 100%;
  padding: 20px 50px;
  border: 1px solid #fff;
  background: linear-gradient(155.18deg, rgba(103, 116, 234, 0.4) 14.6%, rgba(172, 39, 135, 0.46) 68.82%, rgba(255, 210, 121, 0.1) 119.1%);
  backdrop-filter: blur(20px);
`;

return (
  <DiscoverPage className="w-100 container-fluid text text-light bg-black">
    <Section className="position-relative">
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
    </Section>
    <Section className="d-flex flex-column text-center align-items-center">
      <h1 className="mb-5 w-75">How It Works</h1>
      <p className="mb-5 w-75">
        Trust. Confidentiality. Governance. We built our infrastructure with
        these tenents in mind. By combining blockchain and confidential
        computing, we're helping to build the next generation of the Internet,
        where resource providers connect with resource users.
      </p>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3">
            <WorkBlock className="rounded">
              <h2>Content</h2>
              <p>content</p>
              <img
                src={`https://ipfs.near.social/ipfs/bafkreia2xiio7flvv5c3ubcmnwvcayw7256u5fgqmnxrtquomzkfo4kv74`}
                style={{ maxWidth: "50%" }}
                alt="image"
              />
            </WorkBlock>
          </div>
          <div className="col-lg-3">
            <WorkBlock className="rounded">
              <h2>Content</h2>
              <p>content</p>
              <img
                src={`https://ipfs.near.social/ipfs/bafkreial2vswgyouhlq76ja7a6toxa2ydqng5wryuzg7pulmssapj4622u`}
                style={{ maxWidth: "50%" }}
                alt="image"
              />
            </WorkBlock>
          </div>
          <div className="col-lg-3">
            <WorkBlock className="rounded">
              <h2>Content</h2>
              <p>content</p>
              <img
                src={`https://ipfs.near.social/ipfs/bafkreiav3swli5x3fj7m7pnqsc66jag46lbmho5yh2hepsjeukbflampki`}
                style={{ maxWidth: "50%" }}
                alt="image"
              />
            </WorkBlock>
          </div>
          <div className="col-lg-3">
            <WorkBlock className="rounded">
              <h2>Content</h2>
              <p>content</p>
              <img
                src={`https://ipfs.near.social/ipfs/bafkreifxiaws7g366ieot5iz5zc3z7kh3u3twheccyifxszis73np7etam`}
                style={{ maxWidth: "50%" }}
                alt="image"
              />
            </WorkBlock>
          </div>
        </div>
      </div>
    </Section>
  </DiscoverPage>
);
