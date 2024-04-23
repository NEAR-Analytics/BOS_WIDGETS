//function VoteForProject({ provider, roundContractAddress }) {
const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

{
  /*
const chain = Ethers.provider()
  .getNetwork()
  .{then}((chainIdData) => {
    console.log(chainIdData.chainId);
  });
*/
}

// Grants Stack Round Implementation ABI
const abi = fetch(
  "https://raw.githubusercontent.com/gitcoinco/grants-stack/9a5ec016a969f079ed15b1d981fa3d8d8f2fa47d/packages/builder/src/contracts/abis/RoundImplementation.json"
);

// Project on Arbitrum
const provider = new ethers.providers.JsonRpcProvider(
  "https://endpoints.omniatech.io/v1/arbitrum/one/public"
);
const signer = provider.getSigner(user);
// console.log("chain:", chain);
// console.log("signer:", signer);

//https://builder.gitcoin.co/#/chains/42161/registry/0x/projects/0x73c60970e544f3fa2588f1cc3c6905ec27dcb82b417c8a09317b817dccfe79af
const contractAddress =
  "0x73c60970e544f3fa2588f1cc3c6905ec27dcb82b417c8a09317b817dccfe79af";

// Parse ABI and contract endpoints
const parsedAbi = JSON.parse(abi.body);
const contract = new ethers.Contract(contractAddress, parsedAbi.abi, signer);
console.log(contract);

// Initialize constants
const [projectId, setProjectId] = useState("");
const [amount, setAmount] = useState("");
const [message, setMessage] = useState("");

// Define voting function
const handleVote = () => {
  if (!provider || !projectId || !amount) {
    alert("All fields are required!");
    return;
  }

  try {
    const signer = provider.getSigner(user);
    const roundContract = new Ethers.Contract(
      roundContractAddress,
      pasedAbi,
      signer
    );

    const tx = roundContract.vote(projectId, ethers.utils.parseEther(amount));
    tx.wait();
    alert("Vote successfully recorded!");
  } catch (error) {
    console.error("Failed to vote:", error);
    alert("Failed to vote. See console for details.");
  }
};

return (
  <div>
    <h1>Vote for a Project</h1>
    <input
      type="text"
      value={projectId}
      onChange={(e) => setProjectId(e.target.value)}
      placeholder="Project ID"
    />
    <input
      type="text"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="Amount to vote"
    />
    <button onClick={handleVote}>Vote</button>
  </div>
);

//export default VoteForProject;
