State.init({
  videoes: [],
  isNotEmpty: false,
});

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
        internalType: "struct Atomic.Video[]",
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
    name: "getVideoByNearID",
    outputs: [
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
        internalType: "struct Atomic.Video[]",
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
        name: "video_id",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "attributions",
        type: "uint256[]",
      },
    ],
    name: "setAttributions",
    outputs: [],
    stateMutability: "nonpayable",
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

const CONTRACT_ADDRESS = "0xFEfa855e3CeAcD2eFCdE30d062ca7b83D6F614c9";
const signer = Ethers.provider().getSigner();
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

function fetchVdo() {
  contract.getLatestVideos(5).then((res) => {
    console.log(res);
    if (res.hash) {
      console.log("Success! " + res);
      State.update({ videoes: res.data, isNotEmpty: true });
    } else {
      console.log("Failed!");
    }
  });
}
fetchVdo();

return <div>Hi</div>;
