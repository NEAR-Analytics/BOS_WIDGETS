State.init({
  accountNumber: props.accountNumber,
  contractAddress: "",
  isDeployed: false,
  isFetched: false,
  isSupportedChain: true,
  multicallAddr: "0xEa5363305017B2A6fD0d72Ba830513c678a2f1fE",
  create2DeployerAddr: "0x2DA1A7AaB838960a49AC0D62480aD3412b2E8B5B",
});

// Data sources
const CREATE2DEPLOYER_ABI_URL =
  "https://raw.githubusercontent.com/SainyTK/contract-list/main/abis/Create2Deployer.json";
const CREATE2DEPLOYER_ABI = fetch(CREATE2DEPLOYER_ABI_URL).body;

const OWNABLE_PROXY_ABI_URL =
  "https://raw.githubusercontent.com/SainyTK/contract-list/main/abis/OwnableProxy.json";
const OWNABLE_PROXY_ABI = fetch(OWNABLE_PROXY_ABI_URL).body;

const OWNABLE_PROXY_BYTECODE_URL =
  "https://raw.githubusercontent.com/SainyTK/contract-list/main/bytecodes/OwnableProxy.txt";
const OWNABLE_PROXY_BYTECODE = fetch(OWNABLE_PROXY_BYTECODE_URL).body;

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
  try {
    const computedSalt = getSalt(props.accountNumber || "0");
    const codeHash = getCodeHash(OWNABLE_PROXY_ABI, OWNABLE_PROXY_BYTECODE, [
      state.multicallAddr,
      signer,
    ]);
    const create2Deployer = new ethers.Contract(
      state.create2DeployerAddr,
      CREATE2DEPLOYER_ABI,
      Ethers.provider().getSigner()
    );
    create2Deployer.computeAddress(computedSalt, codeHash).then((address) => {
      const isContract = checkIsContract(address);
      State.update({
        accountNumber: props.accountNumber || "0",
        contractAddress: address,
        isDeployed: isContract,
        isFetched: true,
        isError: false,
      });
      Storage.set(`contractAddress:${props.accountNumber || "0"}`, address);
      Storage.set(`isDeployed:${props.accountNumber || "0"}`, isContract);
    });
  } catch (e) {
    State.update({ isError: true, error: "Check address error" });
  }
}

function deploySuperCall() {
  const create2Deployer = new ethers.Contract(
    state.create2DeployerAddr,
    CREATE2DEPLOYER_ABI,
    Ethers.provider().getSigner()
  );
  const computedSalt = getSalt(props.accountNumber);
  const codeData = getCodeData(OWNABLE_PROXY_ABI, OWNABLE_PROXY_BYTECODE, [
    state.multicallAddr,
    signer,
  ]);
  create2Deployer.deploy(0, computedSalt, codeData);
}

if (ethers && signer) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        const supportedChainsCreate2Deployer = fetch(
          `https://raw.githubusercontent.com/SainyTK/contract-list/main/addresses/create2Deployer/supported-chains.json`
        );
        const supportedChainsMulticall = fetch(
          `https://raw.githubusercontent.com/SainyTK/contract-list/main/addresses/multicall/supported-chains.json`
        );
        if (
          !supportedChainsCreate2Deployer.error &&
          !supportedChainsMulticall.error
        ) {
          const supportedChains1 = JSON.parse(
            supportedChainsCreate2Deployer.body
          );
          const supportedChains2 = JSON.parse(supportedChainsMulticall.body);

          if (
            [...supportedChains1, ...supportedChains2].includes(
              chainIdData?.chainId.toString()
            )
          ) {
            const create2DeployerAddr = fetch(
              `https://raw.githubusercontent.com/SainyTK/contract-list/main/addresses/create2Deployer/${chainIdData?.chainId}.json`
            );
            const multicallAddr = fetch(
              `https://raw.githubusercontent.com/SainyTK/contract-list/main/addresses/multicall/${chainIdData?.chainId}.json`
            );
            if (!create2DeployerAddr.error && !multicallAddr.error) {
              console.log({
                multicallAddr: JSON.parse(multicallAddr.body).Multicall,
                create2DeployerAddr: JSON.parse(create2DeployerAddr.body)
                  .Create2Deployer,
              });
              State.update({
                multicallAddr: JSON.parse(multicallAddr.body).Multicall,
                create2DeployerAddr: JSON.parse(create2DeployerAddr.body)
                  .Create2Deployer,
                isDeployed: true,
                isFetched: true,
              });
            } else {
              State.update({ isDeployed: true, isFetched: true });
            }
          } else {
            State.update({ isSupportedChain: false });
          }
        } else {
          State.update({ isError: true, error: "Fetch chains error" });
        }
      }
    });
}

checkContractAddress();

if (!signer) {
  return (
    <div>
      <h3>Please connect your wallet</h3>
      <Web3Connect />
    </div>
  );
}

if (!state.isSupportedChain) {
  return <div>This chain is not supported</div>;
}

if (state.isError) {
  return <div>{state.error || "Something went wrong"}</div>;
}

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
