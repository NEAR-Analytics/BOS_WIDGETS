let { title, description, image, address, tokenId, destination } = props;

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h1 className="text-center mb-3">{title}</h1>
    <div className="container">
      <div className="card shadow-sm">
        <img src={image} width={300} alt={title} />

        <div className="card-body">
          <p className="card-text">{description}</p>

          <input
            type="text"
            placeholder="Enter Destination Address"
            value={destination}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />

          <button
            className="btn btn-primary m-3"
            onClick={(clicktoken) => transferNFT(clicktoken, address, tokenId)}
          >
            Transfer NFT
          </button>
        </div>
      </div>
    </div>
  </div>
);
