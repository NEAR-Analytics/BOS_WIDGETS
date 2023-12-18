const accountId = props.accountId ?? context.accountId;
const vdoUrl = props.vdoUrl;

State.init({
  id: "",
  timestamp: Date.now(),
  title: "",
  description: "",
  owner: accountId,
  src: vdoUrl,
  thumbnail: "https://ipfs.near.social/ipfs/",
  tag: "",
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

const onBtnClick = async () => {
  const body = {
    timestamp: Date.now(),
    title: state.title,
    description: state.description,
    owner: state.owner,
    src: state.src,
    thumbnail: `https://ipfs.near.social/ipfs/${state.thumbnail.cid}`,
    tag: state.tag,
  };

  console.log(body);

  //    const contract = new ethers.Contract(
  //         CONTRACT_ADDRESS,
  //         abi,
  //         getSigner()
  //     )
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
        <IpfsImageUpload image={state.thumbnail} />
      </div>
    </div>
    <div className="w-fullitems-end text-right mt-6">
      {" "}
      <button className=" p-2 Button-primary" onClick={onBtnClick}>
        Publish
      </button>
    </div>
  </div>
);
