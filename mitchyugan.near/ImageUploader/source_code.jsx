State.init({ img: null });

return (
  <>
    <h4>Image Uploader</h4>
    <div>
      <IpfsImageUpload image={state.img} />
    </div>
    <br />
    <div className="min-vw-10">
      <h5>Img: </h5>
      {state.img.cid && (
        <img
          className="min-vw-10"
          src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        />
      )}
    </div>
  </>
);
