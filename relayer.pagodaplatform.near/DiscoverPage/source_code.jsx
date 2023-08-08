const DiscoverPage = styled.div`
    width: 100%;
    
`;

const HightLightText = styled.h1`
  background: -webkit-linear-gradient(#0019FF, #931FD4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

return (
  <div className="w-100 container-fluid text text-light">
    <div className="d-flex flex-row row">
      <div className="col-lg-5">
        <img
          style={{ maxWidth: "100%" }}
          src={`https://ipfs.near.social/ipfs/bafybeiejengae7z4qa3uxq6yk7pttdqfq5ryasaoyillpkabfqhbzckzta`}
          alt="uploaded"
        />
      </div>
      <div className="d-flex flex-column col-lg-7 justify-content-center">
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
        <a href="#" className="text-decoration-underline text-light">
          Try it out
        </a>
      </div>
    </div>
  </div>
);
