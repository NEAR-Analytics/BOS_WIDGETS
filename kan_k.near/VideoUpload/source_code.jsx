const accountId = props.accountId ?? context.accountId;
const vdoUrl = props.vdoUrl
  ? props.vdoUrl
  : "https://firebasestorage.googleapis.com/v0/b/component-dev-lab.appspot.com/o/uploads%2F1702888364122-CAMT%2020th%203%20Generations.mp4?alt=media&token=9f29b9a6-00ef-43c5-89e5-1dc2e0127bdb";

State.init({
  id: "",
  timestamp: Date.now(),
  title: "",
  description: "",
  owner: accountId,
  src: vdoUrl,
  thumbnail: "https://ipfs.near.social/ipfs/",
  tag: "",
  parentVdoId: props.parentVdoId || "",
});

const onTimestampChange = ({ target }) => {
  State.update({ timestamp: target.value });
};

const onTitleChange = ({ target }) => {
  State.update({ title: target.value });
};

const onDescriptionChange = ({ target }) => {
  State.update({ description: target.value });
};

const onOwnerChange = ({ target }) => {
  State.update({ owner: target.value });
};

const onSrcChange = ({ target }) => {
  State.update({ src: target.value });
};

const onThumbnailChange = ({ target }) => {
  State.update({ thumbnail: target.value });
};

const onTagChange = ({ target }) => {
  State.update({ tag: target.value });
};

const abi = fetch(
  `https://raw.githubusercontent.com/KapokProgramming/atomic-abi/main/Atomic.json`
);

if (!abi.ok) {
  return "Loading";
}

const onBtnClick = async () => {
  const body = {
    timestamp: Date.now(),
    title: state.title,
    description: state.description,
    owner: state.owner,
    src: vdoUrl,
    thumbnail: `https://ipfs.near.social/ipfs/${state.thumbnail.cid}`,
    tag: state.tag,
    parentVdoId: state.parentVdoId,
  };

  console.log(body);

  const CONTRACT_ADDRESS = "0xFEfa855e3CeAcD2eFCdE30d062ca7b83D6F614c9";
  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  contract.addVideo(body.title, body.description, body.src, body.thumbnail, 0, [
    body.tag,
  ]);
};

return (
  <div className="m-10 VStack Subtitle  w-1/3 gap-10">
    <div className="VStack justify-between h-full">
      <div className="VStack gap-4"></div>
      <div className="VStack gap-2">
        <p className=" text-md">Title</p>
        <input
          type="text"
          name=""
          id=""
          placeholder="title"
          onChange={onTitleChange}
          className="p-2 rounded-md System-background-blue"
        />
        <div className="VStack gap-2">
          <p className=" text-md">Description</p>
          <textarea
            name=""
            id=""
            cols={30}
            rows={7}
            onChange={onDescriptionChange}
            className="p-2 rounded-md System-background-blue"
            placeholder="lorem10"
          ></textarea>
        </div>

        <p className=" text-md">Tag</p>
        <input
          type="text"
          name=""
          id=""
          onChange={onTagChange}
          placeholder="tag"
          className="p-2 rounded-md System-background-blue"
        />
      </div>

      <div className="mt-2 mb-3">
        <p className=" text-md">Thumbnail</p>
        <IpfsImageUpload
          image={state.thumbnail}
          className="Button-primary rounded-md"
        />
      </div>
    </div>
    <div className="w-fullitems-end text-right mt-6">
      {" "}
      <button className="p-2 Button-primary rounded-md " onClick={onBtnClick}>
        Publish
      </button>
    </div>
  </div>
);
