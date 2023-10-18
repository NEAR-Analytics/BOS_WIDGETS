State.init({
  img: null,
});

const listViewAds = Social.index("viewBoenseAds", "viewBoenseAds", {
  limit: 10,
});

return (
  <div className="container row">
    <Widget src={`neutrino.near/widget/Bosense.Ads`} props={props} />
    <div>
      Image upload: <br />
      <IpfsImageUpload image={state.img} />
    </div>
    <div>
      Raw State:
      <pre>{JSON.stringify(state)}</pre>
    </div>
    <div className="mt-2">
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
          alt="uploaded"
        />
      )}
    </div>
    <div>Ads viewed by: {JSON.stringify(listViewAds)}</div>
  </div>
);
