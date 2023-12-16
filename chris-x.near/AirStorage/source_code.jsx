const buttonText = props.buttonText || "Upload a file";

State.init({
  uploading: false,
  cid: null,
  filename: null,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

return (
  <>
    <h1>AirStorage</h1>
    <h1>AirStorage2</h1>
    <div>
      <Files
        multiple={false}
        accepts={[
          "image/*",
          "video/*",
          "audio/*",
          "font/*",
          "application/*",
          "font/*",
        ]}
        minFileSize={1}
        clickable
        className="btn btn-outline-primary"
        onChange={(files) => {
          if (!files || !files.length) return;

          const [body] = files;

          State.update({ uploading: true, cid: null });
          asyncFetch("https://ipfs.near.social/add", {
            method: "POST",
            headers: { Accept: "application/json" },
            body,
          }).then(({ body: { cid } }) => {
            State.update({ cid, filename: body.name, uploading: false });
            // props.update(cid);
          });
        }}
      >
        {state.uploading ? "Uploading" : state.cid ? "Replace" : buttonText}
      </Files>
    </div>
    <div>
      {state.cid ? (
        <>
          <h3>File Uploaded</h3>
          <a>{state.filename}</a>
          <a> | CID : {state.cid} | </a>
          <a href={ipfsUrl(state.cid)} target={"_blank"}>
            Link
          </a>
        </>
      ) : (
        <></>
      )}

      <h3>My Files</h3>
    </div>
  </>
);
