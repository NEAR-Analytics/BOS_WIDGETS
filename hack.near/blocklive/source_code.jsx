const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

// const abiData = fetch(
//   "https://raw.githubusercontent.com/jlwaugh/ABIs/main/blocklive.json"
// );
// if (!abiData.ok) {
//   return "ERROR";
// }

const [maxSupply, setMaxSupply] = useState(0);

const contractAddress = "0x579BFA1f028896CaA394793E2803DeCa5eFF7F16";
const abi = [
  {
    inputs: [],
    name: "totalMaxSupply",
    outputs: [
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const contract = new ethers.Contract(contractAddress, abi, signer);

const getMaxSupply = () => {
  contract
    .totalMaxSupply()
    .then((result) => {
      console.log("Total Max Supply:", result);
      setMaxSupply(result);
    })
    .catch((error) => {
      console.error("Error fetching max supply:", error);
    });
};

return (
  <div className="m-1">
    <button onClick={getMaxSupply} className="btn btn-dark m-2">
      Get Max Supply
    </button>
    <br />
    <p className="m-2">{maxSupply}</p>
  </div>
);
