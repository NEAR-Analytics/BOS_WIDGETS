const accountId = props.accountId ?? context.accountId;
const CONTRACT_ADDRESS =
  props.contractAddress || "0x5BfC487da8Da663CcCAEb6aF594F953D976cf9f3";
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
  isSuccess: false,
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

function getSigner() {
  return Ethers.provider().getSigner();
}

const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "video_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "comment_message",
        type: "string",
      },
    ],
    name: "addComment",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "string",
            name: "_title",
            type: "string",
          },
          {
            internalType: "string",
            name: "_description",
            type: "string",
          },
          {
            internalType: "string",
            name: "_url",
            type: "string",
          },
          {
            internalType: "string",
            name: "_thumb_url",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_duration",
            type: "uint256",
          },
          {
            internalType: "string[]",
            name: "_keywords",
            type: "string[]",
          },
        ],
        internalType: "struct Atomic.VideoAdd",
        name: "_video_add",
        type: "tuple",
      },
      {
        internalType: "uint256[]",
        name: "_attributions",
        type: "uint256[]",
      },
      {
        internalType: "string",
        name: "_near_id",
        type: "string",
      },
    ],
    name: "addVideo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "video_id",
        type: "uint256",
      },
    ],
    name: "adminDeleteVideo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_video_id",
        type: "uint256",
      },
    ],
    name: "deleteVideo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "addr",
        type: "address",
      },
    ],
    name: "getAddressNearID",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "video_id",
        type: "uint256",
      },
    ],
    name: "getAttributions",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "video_id",
        type: "uint256",
      },
    ],
    name: "getComments",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "poster",
            type: "address",
          },
          {
            internalType: "string",
            name: "message",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct Atomic.Comment[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "size",
        type: "uint256",
      },
    ],
    name: "getLatestVideos",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "thumb_url",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "keywords",
                type: "string[]",
              },
              {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct Atomic.Video",
            name: "video",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "near_id",
            type: "string",
          },
        ],
        internalType: "struct Atomic.VideoWithNearID[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "video_id",
        type: "uint256",
      },
    ],
    name: "getVideo",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "thumb_url",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "keywords",
                type: "string[]",
              },
              {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct Atomic.Video",
            name: "video",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "near_id",
            type: "string",
          },
        ],
        internalType: "struct Atomic.VideoWithNearID",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_near_id",
        type: "string",
      },
    ],
    name: "getVideoByNearID",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "thumb_url",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "keywords",
                type: "string[]",
              },
              {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct Atomic.Video",
            name: "video",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "near_id",
            type: "string",
          },
        ],
        internalType: "struct Atomic.VideoWithNearID[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "terms",
        type: "string[]",
      },
    ],
    name: "getVideosByTerm",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "url",
                type: "string",
              },
              {
                internalType: "string",
                name: "thumb_url",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "keywords",
                type: "string[]",
              },
              {
                internalType: "uint256",
                name: "duration",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "timestamp",
                type: "uint256",
              },
            ],
            internalType: "struct Atomic.Video",
            name: "video",
            type: "tuple",
          },
          {
            internalType: "string",
            name: "near_id",
            type: "string",
          },
        ],
        internalType: "struct Atomic.VideoWithNearID[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_near_id",
        type: "string",
      },
    ],
    name: "setNearID",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

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

  const signer = Ethers.provider().getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  contract
    .addVideo(
      {
        _title: body.title,
        _description: body.description,
        _url: body.src,
        _thumb_url: body.thumbnail,
        _duration: 12,
        _keywords: [body.tag],
      },
      parentVdoId ? [parentVdoId] : [],
      body.owner
    )
    .then((res) => {
      if (res.hash) {
        console.log("Success! " + res.hash);
        State.update({ isSuccess: true });
      } else {
        console.log("Failed!");
      }
    });
};

return (
  <div className="m-10 VStack Subtitle  w-1/3 gap-10">
    <div className="VStack justify-between h-full">
      <div className="VStack gap-4">
        <Widget
          src={`kan_k.near/widget/Alert`}
          props={{ isOpen: state.isOpen, children: "<a href='/'>Back</a>" }}
        />
      </div>
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
      {isSuccess && (
        <a href="/">
          {" "}
          <button
            className="p-2 Button-primary rounded-md "
            onClick={onBtnClick}
          >
            Finish
          </button>
        </a>
      )}
    </div>
  </div>
);
