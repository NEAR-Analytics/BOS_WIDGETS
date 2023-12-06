const [state, setState] = useState(null);

return (
  <div className="container row">
    <div>
      Image upload: <br />
      <IpfsImageUpload image={state} />
    </div>
    <div className="mt-2">
      {state.img.cid && (
        <img
          src={`https://ipfs.near.social/ipfs/${state.cid}`}
          alt="uploaded"
        />
      )}
    </div>
  </div>
);
