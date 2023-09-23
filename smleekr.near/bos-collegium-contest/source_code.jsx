State.init({
  chainId: 0,
  count: 0,
  message: "",
  address: "",
});
const messageContractAddress = "0x5eCebd454e890b49e9a74B81205a8bE9Ce7601a3";
const messageABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: true,
        internalType: "string",
        name: "receiver",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "MessageSent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getInboxCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "inbox",
    outputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "string",
        name: "receiver",
        type: "string",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "receiver",
        type: "string",
      },
      {
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "sendMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

if (Ethers.provider()) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
  const messageContract = new ethers.Contract(
    messageContractAddress,
    messageABI,
    Ethers.provider().getSigner()
  );
  messageContract
    .getInboxCount(0x138d466c8edcae595736999429262f05129340b1)
    .then((res) => {
      State.update({
        count: ethers.BigNumber.from(ethers.utils.parseEther(res)),
      });
    });
}

const sendMessage = async () => {
  const messageContract = new ethers.Contract(
    messageContractAddress,
    messageABI,
    Ethers.provider().getSigner()
  );
  State.update({ chainId: chainIdData.chainId });
  messageContract.sendMessage(state.address, state.message);
};

return (
  <>
    <div>Near Message</div>
    <input
      type="text"
      placeholder="Near Wallet Address"
      value={state.address}
    />
    <input type="text" placeholder="Message" value={state.message} />
    <button onClick={sendMessage}>SEND</button>
    <p>Total Message: {state.count} EA </p>
    <Web3Connect />
  </>
);
