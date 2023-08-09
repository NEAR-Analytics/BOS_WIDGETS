State.init({
  image: "",
});

return (
  <div>
    <div>Mint NFT</div>
    <div className="flex-grow-1">
      <IpfsImageUpload
        image={state.image}
        className="btn btn-outline-secondary border-0 rounded-3"
      />
    </div>
    <div>
      {state.image.cid && (
        <div className="mt-3">
          <h5>Preview:</h5>
          <img
            src={`https://ipfs.io/ipfs/` + state.image.cid}
            alt="Preview"
            style={{ maxWidth: "300px" }}
          />
        </div>
      )}
    </div>
    <div>
      {state.sender ? (
        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary mt-3"
            onClick={handleMint}
          >
            Mint to
          </button>
          <div>
            <Web3Connect
              className="btn mt-3"
              connectLabel="Connect with Ethereum Wallet"
            />
          </div>
        </div>
      ) : (
        <Web3Connect className="btn mt-3" connectLabel="Connect with Wallet" />
      )}
    </div>
  </div>
);
