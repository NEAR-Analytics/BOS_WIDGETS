if (!props.update) return "Update function is required";

State.init({
  uploading: false,
  files: [],
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (files) => {
  State.update({
    uploading: true,
    files: [],
  });
  if (files?.length > 0) {
    files.map((file, index) => {
      const body = file;
      asyncFetch("https://ipfs.near.social/add", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body,
      }).then((res) => {
        const cid = res.body.cid;
        props.update({ index: index, cid: cid });
      });
    });
    State.update({ uploading: false });
    props.viewing(false);
  } else {
    State.update({
      uploading: false,
      files: null,
    });
  }
};

return (
  <div className="d-inline-block">
    {state.files}
    <Files
      multiple={true}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      onChange={filesOnChange}
      className="btn btn-outline-dark"
      style={{ borderRadius: "20px", width: "155px" }}
    >
      {state.uploading ? Uploading : "Upload Slide(s)"}
    </Files>
  </div>
);
