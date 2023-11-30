props.fileType ||
  initState({
    json: `{"your JSON file": "here"}`,
  });

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;
function convertToJSON(text) {
  // Replace newline characters and tabs for proper formatting
  const formattedText = text.replace(/\n/g, "\\n").replace(/\t/g, "\\t");

  // Convert to JSON string
  const jsonString = JSON.stringify({ content: formattedText });

  return jsonString;
}

const UploadJson = () => {
  if (state.json.length) {
    const sanitizedJson = convertToJSON(state.json);

    const body = new Blob([sanitizedJson], { type: "application/json" });
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
