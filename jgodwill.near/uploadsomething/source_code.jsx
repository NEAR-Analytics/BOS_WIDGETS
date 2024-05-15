const [img, setImg] = useState(null);
const { UploadField } = VM.require("buildhub.near/widget/components");
const [msg, setMsg] = useState(<UploadField />);

const uploadFile = (files) => {
  setMsg("Uploading...");

  const file = fetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: files[0],
  });

  setImg(file.body.cid);
  setMsg("Upload an Image");
};

return (
  <>
    <Files
      multiple={false}
      accepts={["image/*"]}
      clickable
      className=""
      onChange={uploadFile}
    >
      {msg}
    </Files>
    {img ? (
      <div>
        <img src={`https://ipfs.near.social/ipfs/${img}`} />
      </div>
    ) : (
      ""
    )}
  </>
);
