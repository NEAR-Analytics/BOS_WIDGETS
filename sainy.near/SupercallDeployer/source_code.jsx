// Data sources
const CREATE2DEPLOYER_ABI_URL =
  "https://gist.githubusercontent.com/SainyTK/92a39e1e9b2c15d1d4a0cc48ca699266/raw/ea246a9999580aa4ec03f9cf193f299fb078820d/create2deployer-abi.json";
const CREATE2DEPLOYER_ABI = fetch(CREATE2DEPLOYER_ABI_URL).body;

const OWNABLE_PROXY_ABI_URL =
  "https://gist.githubusercontent.com/SainyTK/cdbc9ba5715f4df12ff1dd05fa75c5af/raw/ec374671ff9b2ce86d3f126e2d85b5b026525f30/ownable-proxy-abi.json";
const OWNABLE_PROXY_ABI = fetch(OWNABLE_PROXY_ABI_URL).body;

const OWNABLE_PROXY_BYTECODE_URL =
  "https://gist.githubusercontent.com/SainyTK/29eb181fd3eabec3460d8aaddcd2d859/raw/5bbc0602250d6b8f72047e363675c3b6028eacbf/ownable-proxy-bytecode.txt";
const OWNABLE_PROXY_BYTECODE = fetch(OWNABLE_PROXY_BYTECODE_URL).body;

const multicallAddr = "0xcA11bde05977b3631167028862bE2a173976CA11";
const create2DeployerAddr = "0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2";

// Preparation
const signer = Ethers.send("eth_requestAccounts", [])[0];

// Functions
function getSalt(input) {
  const utf8BytesValue = ethers.utils.toUtf8Bytes(input);
  return ethers.utils.keccak256(utf8BytesValue);
}

function getCodeData(abi, bytecode, args) {
  const iface = new ethers.utils.Interface(abi);
  bytecode = bytecode.startsWith("0x") ? bytecode : "0x" + bytecode;
  return ethers.utils.concat([bytecode, iface.encodeDeploy(args)]);
}

function getCodeHash(abi, bytecode, args) {
  const data = getCodeData(abi, bytecode, args);
  return ethers.utils.keccak256(data);
}

function checkIsContract(address) {
  try {
    const code = Ethers.send("eth_getCode", [address]);
    const isContract = code !== undefined && code !== null && code !== "0x";
    return isContract;
  } catch (error) {}
}

function checkContractAddress() {
  const computedSalt = getSalt(props.accountNumber);
  const codeHash = getCodeHash(OWNABLE_PROXY_ABI, OWNABLE_PROXY_BYTECODE, [
    multicallAddr,
    signer,
  ]);
  const create2Deployer = new ethers.Contract(
    create2DeployerAddr,
    CREATE2DEPLOYER_ABI,
    Ethers.provider().getSigner()
  );
  create2Deployer.computeAddress(computedSalt, codeHash).then((address) => {
    const isContract = checkIsContract(address);
    State.update({
      accountNumber: props.accountNumber,
      contractAddress: address,
      isDeployed: isContract,
      isFetched: true,
    });
    console.log(`contractAddress:${props.accountNumber} = ${address}`);
    Storage.set(`contractAddress:${props.accountNumber}`, address);
    Storage.set(`isDeployed:${props.accountNumber}`, isContract);
  });
}

function deploySuperCall() {
  const create2Deployer = new ethers.Contract(
    create2DeployerAddr,
    CREATE2DEPLOYER_ABI,
    Ethers.provider().getSigner()
  );
  const computedSalt = getSalt(props.accountNumber);
  const codeData = getCodeData(OWNABLE_PROXY_ABI, OWNABLE_PROXY_BYTECODE, [
    multicallAddr,
    signer,
  ]);

  create2Deployer.deploy(0, computedSalt, codeData);
}

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

if (state.chainId === undefined && ethers !== undefined && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({
          chainId: chainIdData.chainId,
          isDeployed: true,
          isFetched: true,
        });
      }
    });
}

// Main part
initState({
  accountNumber: props.accountNumber,
  contractAddress: "",
  isDeployed: false,
  isFetched: false,
});

checkContractAddress();

return (
  <div>
    {state.isFetched && !state.isDeployed && (
      <div>
        <button className="mb-2 bg-blue-400 rounded" onClick={deploySuperCall}>
          Create
        </button>
      </div>
    )}
  </div>
);
