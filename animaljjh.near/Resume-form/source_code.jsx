State.init({ img: null, greeting: "Resume submission form", name: "" });

const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};

const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

const onNameChange = ({ target }) => {
  State.update({ name: target.value });
};

const onChange = ({ target }) => {
  State.update({ greeting: target.value });
};

return (
  <div className="d-inline-block">
    <div className="container border border-info p-3 min-vw-100">
      <p>
        <b>{state.greeting}</b>
      </p>
      <label className="text-left">
        <b>What is your name?</b>
      </label>
      <input
        className="form-control"
        onChange={onNameChange}
        value={state.name}
      />
    </div>
    <div className="mt-3">
      <b>{`'${state.name}'`}s Portfolio</b>
    </div>
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary mt-3"
      onChange={filesOnChange}
    >
      {state.img?.uploading ? <>Uploading</> : <>Show your life</>}
    </Files>
    <div className="mt-3">
      <b>{`'${state.name}'`}s Photograph</b>
      <br />
      <IpfsImageUpload image={state.img} />
    </div>
    {state.img ? (
      <img
        className="rounded w-100 h-100 mt-3"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview"
      />
    ) : (
      ""
    )}
  </div>
);
