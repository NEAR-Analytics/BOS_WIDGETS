//function VoteForProject({ provider, roundContractAddress }) {
const user = Ethers.send("eth_requestAccounts", [])[0];

if (!user) return <Web3Connect connectLabel="Connect" />;

// Grants Stack Round Implementation ABI
const abi = asyncFetch(
  "https://raw.githubusercontent.com/gitcoinco/grants-stack/9a5ec016a969f079ed15b1d981fa3d8d8f2fa47d/packages/builder/src/contracts/abis/RoundImplementation.json"
);

//https://builder.gitcoin.co/#/chains/42161/registry/0x/projects/0x73c60970e544f3fa2588f1cc3c6905ec27dcb82b417c8a09317b817dccfe79af
// Set up the provider and signer
//const provider = new ethers.providers.Web3Provider(window.ethereum);
//const signer = provider.getSigner(user);

// Create the contract instance with the ABI from asyncFetch
const contract = abi.then(
  (abiData) => new ethers.Contract(roundContractAddress, abiData, signer)
);

// Handle account request on component mount
asyncFetch("eth_requestAccounts", []).then((accounts) => {
  setUser(accounts[0]); // Using the first account
});

const handleVote = () => {
  if (!contract || !projectId || !amount) {
    setMessage("All fields are required and contract must be loaded!");
    return;
  }

  const signerWidget = VM.require("sdks.near/widget/SDKs.EthereumSigner");

  signerWidget
    .sign(`Vote for project ID ${projectId} with amount ${amount}`)
    .then((sig) => {
      setSignature(sig);
      // After signing, you might want to send the signature along with the vote
      return contract
        .vote(projectId, ethers.utils.parseEther(amount), sig)
        .then((tx) => tx.wait())
        .then(() => setMessage("Vote successfully recorded!"))
        .catch((error) => {
          console.error("Failed to vote:", error);
          setMessage("Failed to vote. See console for details.");
        });
    })
    .catch(console.error);
};

return (
  <div className="p-3 border bg-light">
    <h1>Vote for a Project</h1>
    <p>
      <b>OpenCann Project ID:</b>{" "}
      <a
        target="_blank"
        href="https://explorer.gitcoin.co/?utm_source=grants.gitcoin.co&utm_medium=internal_link&utm_campaign=gg19&utm_content=program-rounds#/round/42161/25/138"
      >
        0x73c60970e544f3fa2588f1cc3c6905ec27dcb82b417c8a09317b817dccfe79af
      </a>
    </p>
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
    <Widget src="opencann.near/widget/gitcoin.erc20" />
    <button onClick={handleVote}>Vote</button>
    <p>{message}</p>
    <hr />
    <Widget src="hack.near/widget/passport" props={{}} />
  </div>
);
