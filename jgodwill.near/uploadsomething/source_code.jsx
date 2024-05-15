const [img, setImg] = useState(null);
const { UploadField } = VM.require("buildhub.near/widget/components");
const [msg, setMsg] = useState(<UploadField />);

const uploadFile = (files) => {
  setMsg("Uploading...");

  const file = files[0];

  const uploadPromise = asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: {
      "Content-Type": file.type, // Set content type based on file
    },
    body: file,
  })
    .then((response) => {
      if (!response.ok) {
        setMsg("Upload failed!");
        return Promise.reject(new Error("Upload failed"));
      }
      return response.body;
    })
    .then((data) => {
      setImg(data.cid);
    })
    .catch((error) => {
      console.error("Upload error:", error);
      setMsg("Upload failed!");
    })
    .finally(() => {
      setMsg(<UploadField />);
    });

  uploadPromise
    .then(() => {
      console.log("Upload successful!");
    })
    .catch((error) => {
      console.error("Upload failed:", error);
    });
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
