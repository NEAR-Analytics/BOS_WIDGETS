props.fileType ||
  initState({
    json: `{"your JSON file": "here"}`,
  });

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const UploadJson = () => {
  if (state.json.length) {
    const body = new Blob([state.json], { type: "application/json" });
    console.log(body);
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      console.log("CID", cid);
      State.update({
        file: {
          cid,
        },
      });
    });
  } else {
    State.update({
      file: null,
    });
  }
};

return (
  <>
    <textarea
      class="form-control mb-2"
      rows={5}
      value={state.json}
      onChange={(e) => {
        state.json = e.target.value;
        State.update();
      }}
    />
    <a type="button" class="btn btn-primary" onClick={() => UploadJson()}>
      Upload to Near Social IPFS
    </a>

    {state.file && (
      <div>
        Your file:
        <a href={ipfsUrl(state.file.cid)}>{state.file.cid}</a>
      </div>
    )}
  </>
);
