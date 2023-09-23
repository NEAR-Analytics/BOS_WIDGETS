State.init({
  chainId: 1001,
  count: 0,
});

const messageContractAddress = "0x319125a559454a728034f380ff05e4e6b34cd7ad";
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

const sendMessage = async () => {
  const messageContract = new ethers.Contract(
    messageContractAddress,
    messageABI,
    Ethers.provider().getSigner()
  );
  const ETHColl = ethers.BigNumber.from(
    ethers.utils.parseEther(state.coll.toString())
  );
  messageContract.sendMessage("smleekr.near", "", {
    value: ETHColl,
  });
};

return (
  <>
    <div>Near Message</div>
    <input type="text" placeholder="Near Wallet Address" />
    <input type="text" placeholder="Message" />
    <button>SEND</button>
    <p>Total Message: {state.count} EA </p>
    <Web3Connect />
  </>
);
