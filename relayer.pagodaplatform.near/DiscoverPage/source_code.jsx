const DiscoverPage = styled.div`
    background-image: src()
`;

return (
  <div className="w-100 container-fluid">
    <div className="d-flex flex-row row">
      <div className="col-lg-4">
        <img
          style={{ maxWidth: "100%" }}
          src={`https://ipfs.near.social/ipfs/bafybeifemkrxbsify74bvnvxklukkz4q7om4cpo7cvtm6igdsqducp345u`}
          alt="uploaded"
        />
      </div>
      <div className="d-flex flex-column col-lg-8 justify-content-center">
        <h1>Welcome to CLOUDY</h1>
        <p>
          Cloudy is a free platform for everyone to share, exchange and
          contribute the data. Cloudy provides a large storage capacity beyond
          that of blockchain. Still decentralized - totally. And sharing
          instantly.
        </p>
      </div>
    </div>
  </div>
);
