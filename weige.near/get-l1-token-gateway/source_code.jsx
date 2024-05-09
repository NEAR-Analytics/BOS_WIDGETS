const { inputToken, config, onLoad } = props;

if (inputToken.addressL1 === config.eth.addressL1) return "";

const router = config.bridges.l1GatewayRouter;

const getGateWayAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "getGateway",
    outputs: [
      {
        internalType: "address",
        name: "gateway",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const signer = Ethers.provider().getSigner();

const handleRequest = () => {
  const contract = new ethers.Contract(router, getGateWayAbi, signer);

  contract
    .getGateway(inputToken.addressL1)
    .then((address) => {
      onLoad(address);
    })
    .catch((e) => {
      onLoad("");
    });
};

handleRequest();

return "";
