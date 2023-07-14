State.init({ img: null });

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

return (
  <div className="d-inline-block">
    <>
      <div class="container border border-info p-3 text-center">
        <h1>
          Welcome to Near Türkiye
          {props.name}
        </h1>
        <h2>upload an image and proove your humanity</h2>
      </div>
    </>
    {state.img ? (
      <img
        class="rounded w-100 h-100"
        style={{ objectFit: "cover" }}
        src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
        alt="upload preview"
      />
    ) : (
      ""
    )}
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.img?.uploading ? <> Uploading </> : "Upload an Image"}
    </Files>
  </div>
);
