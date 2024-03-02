const mapImageUrl =
  "https://cyan-interesting-takin-110.mypinata.cloud/ipfs/QmNyem7UNRXAFkxTC5XySDwPAZpnyoQVWpRhbXenmun24j";

State.init({
  showModal: false,
});

return (
  <>
    <div className="d-flex flex-row m-2 justify-content-between">
      <h3 className="m-1">Create Your Own World</h3>
      <button onClick={() => State.update({ showModal: true })} className="m-2">
        Explore
      </button>
    </div>
    {state.showModal && (
      <Widget
        src="hack.near/widget/map.explore"
        props={{
          handleClose: () => State.update({ showModal: false }),
        }}
      />
    )}
    <img src={mapImageUrl} alt="map" />
  </>
);
