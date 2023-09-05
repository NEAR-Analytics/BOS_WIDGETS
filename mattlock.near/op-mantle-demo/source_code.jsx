// for goerli
const MNT_CONTRACT_GOERLI = `0xc1dC2d65A2243c22344E725677A3E3BEBD26E604`;
const MNT_SPENDER_GOERLI = `0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330`;
const MNT_CONTRACT_MANTLE_GOERLI = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;
const MNT_MIN_GAS = `200000`;

const OP_BRIDGE_DEPOSIT_CONTRACT = "0x636Af16bf2f682dD3109e60102b8E1A089FedAa8";
const OP_BRIDGE_WITHDRAW_CONTRACT =
  "0x4200000000000000000000000000000000000010";
const ETH_ADDR = "0x0000000000000000000000000000000000000000";
const ETH_ADDR_L1 = `0xdeaddeaddeaddeaddeaddeaddeaddeaddead0000`;
const DEFAULT_AMOUNT_ETH = "0.01";
const DEFAULT_AMOUNT = ethers.utils.parseUnits(DEFAULT_AMOUNT_ETH, 18);
const L2_OUTPUT_ORACLE_CONTRACT = `0xE6Dfba0953616Bacab0c9A8ecb3a9BBa77FC15c0`;
const L1_OPTIMISM_PORTAL_CONTRACT = `0x5b47E1A08Ea6d985D6649300584e6722Ec4B1383`;
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
// Withdrawal target TX info
// Call initiateWithdraw so the L2 message is passed
// Following TX example here: https://goerli-optimism.etherscan.io/tx/0xb59ff0af1db39be0cc03e7410621ed21ce60e5833f8c4bf97d8747bd8d033bc8
// Manually adjusted amount to 0.01
const ETH_WITHDRAWAL_MESSAGE = `0x32b7006d000000000000000000000000deaddeaddeaddeaddeaddeaddeaddeaddead0000000000000000000000000000000000000000000000000000002386f26fc10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000`;
const L2_L1_MESSAGE_PASSER_CONTRACT = `0x4200000000000000000000000000000000000016`;
const ETH_WITHDRAWAL_TARGET = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;

// Storage keys
const STORAGE_RESOLVED = "__STORAGE_RESOLVED";
const STORAGE_MESSAGE_SLOT = "__STORAGE_MESSAGE_SLOT";
const STORAGE_L2_INDEX = "__STORAGE_L2_INDEX";

State.init({
  console: "Welcome!",
  gettingAllowance: false,
  allowance: "0",
  allowanceFormatted: "0",
});

const { chainId } = state;
const isMainnet = chainId === 1 || chainId === 10;
const isMantleGoerli = chainId === 5001;
const isGoerli = chainId === 5;

const opGoerliProvider = new ethers.providers.JsonRpcProvider(
  "https://optimism-goerli.gateway.tenderly.co/"
);
const opGoerliProviderOG = new ethers.providers.JsonRpcProvider(
  "https://goerli.optimism.io"
);
const goerliProvider = new ethers.providers.JsonRpcProvider(
  "https://rpc.ankr.com/eth_goerli"
);

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

// abis

const mntAbi = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        type: "address",
      },
      {
        type: "address",
      },
      {
        type: "uint256",
      },
      {
        type: "uint32",
      },
      {
        type: "bytes",
      },
    ],
    name: "depositERC20",
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    name: "allowance",
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
const mntIface = new ethers.utils.Interface(mntAbi);
const mntContractGoerli = new ethers.Contract(
  MNT_CONTRACT_GOERLI,
  mntIface,
  provider.getSigner()
);

// functional

if (sender) {
  Ethers.provider()
    .getNetwork()
    .then(({ chainId }) => {
      State.update({ chainId });
    });

  function getMNTAllowance() {
    if (!isGoerli) return;
    if (state.gettingAllowance) return;
    State.update({ gettingAllowance: true });
    console.log(`getMNTAllowance`);

    mntContractGoerli
      .allowance(sender, MNT_SPENDER_GOERLI)
      .then((allowanceRaw) => {
        const allowance = allowanceRaw.toString();
        State.update({
          allowance,
          allowanceFormatted: ethers.utils.formatEther(allowance),
        });
      });
  }

  getMNTAllowance();
}

function handleDepositMNT() {
  mntContractGoerli.depositERC20(
    MNT_CONTRACT_GOERLI,
    MNT_CONTRACT_MANTLE_GOERLI,
    state.allowance,
    MNT_MIN_GAS,
    []
  );
}

// end functional

if (!sender) {
  return (
    <div className="w3button">
      <Web3Connect connectLabel="Connect to a wallet" />
    </div>
  );
}

return (
  <div>
    <h3>Console:</h3>
    <p>{state.console}</p>
    {!isGoerli && !isMantleGoerli && (
      <p>Please switch to ETH Goerli or OP Goerli</p>
    )}
    {isGoerli && (
      <>
        <h3>Deposits</h3>
        <p>Allowance to Bridge: {state.allowanceFormatted}</p>
        <button onClick={handleDepositMNT}>Bridge</button>
      </>
    )}
  </div>
);
