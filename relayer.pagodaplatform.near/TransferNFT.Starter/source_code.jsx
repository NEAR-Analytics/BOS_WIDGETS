let token = props.token;
let defaultDestinationAddress = "0x27F7e8d7C63C414Eae2BB07E1a9B9057a1D382cf";

return (
  <div className="EventDetail container card shadow my-5 p-5">
    <h1 className="text-center mb-3">{token.title}</h1>
    <div className="container">
      <div className="card shadow-sm">
        <img src={token.image} width={300} alt={token.title} />

        <div className="card-body">
          <p className="card-text">{token.description}</p>

          <input
            type="text"
            placeholder="Enter Destination Address"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            className="form-control mb-3"
          />

          <button
            className="btn btn-primary m-3"
            onClick={(clicktoken) =>
              transferNFT(clicktoken, token.address, token.tokenId)
            }
          >
            Transfer NFT
          </button>
        </div>
      </div>
    </div>
  </div>
);
