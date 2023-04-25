const fileAccept = props.fileAccept || "*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";

// if (!props.update) return "Update function is required";

State.init({
  uploading: false,
  cid: null,
});

const ipfsUrl = (cid) => `https://ipfs.near.org/ipfs/${cid}`;

return (
  <div>
    {state.cid ?
      <a href={ipfsUrl(state.cid)} download>Your file</a>
      : <></>}
    <Files
      multiple={false}
      accepts={[fileAccept]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={(files) => {
        if (!files) return;

        const [body] = files;

        State.update({ uploading: true, cid: null });
        asyncFetch(
          "https://ipfs.near.social/add",
          {
            method: "POST",
            headers: { Accept: "application/json" },
            body,
          }
        ).then(
          ({ body: { cid } }) => {
            State.update({ cid, uploading: false });
            // props.update(cid);
          }
        );
      }}
    >
      {state.uploading
        ? "Uploading"
        : state.cid
          ? "Replace"
          : buttonText}
    </Files>
  </div>
);
