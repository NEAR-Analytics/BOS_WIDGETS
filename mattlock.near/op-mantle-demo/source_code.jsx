// for goerli
const MNT_CONTRACT_GOERLI = `0xc1dC2d65A2243c22344E725677A3E3BEBD26E604`;
const MNT_SPENDER_GOERLI = `0xc92470D7Ffa21473611ab6c6e2FcFB8637c8f330`;
const MNT_CONTRACT_MANTLE_GOERLI = `0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000`;
const MNT_MIN_GAS = `200000`;
const ERC20_APPROVE_GAS = `81942`;
const ERC20_TRANSFER_GAS = `192460`;
const HASH_ZERO =
  "0x0000000000000000000000000000000000000000000000000000000000000000";

State.init({
  console: "Welcome!",
  readingContract: false,
  // inputs
  bridgeAmountMNT: "0",
  // read from contract
  allowance: "0",
  allowanceFormatted: "0",
  balance: "0",
  balanceFormatted: "0",
});

const { chainId } = state;
const isMainnet = chainId === 1 || chainId === 10;
const isMantleGoerli = chainId === 5001;
const isGoerli = chainId === 5;

// const goerliProvider = new ethers.providers.JsonRpcProvider(
//   "https://rpc.ankr.com/eth_goerli"
// );

const provider = Ethers.provider();
const sender = Ethers.send("eth_requestAccounts", [])[0];

// abis

const mntAbi = [
  {
    constant: false,
    inputs: [
      {
        type: "address",
      },
      {
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
        type: "address",
      },
      {
        type: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
      },
    ],
    name: "allowance",
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        type: "address",
      },
    ],
    outputs: [
      {
        type: "uint256",
      },
    ],
    name: "balanceOf",
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
const mntSpenderGoerli = new ethers.Contract(
  MNT_SPENDER_GOERLI,
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
    if (state.readingContract) return;
    State.update({ readingContract: true });
    console.log(`getMNTAllowance`);

    mntContractGoerli
      .allowance(sender, MNT_SPENDER_GOERLI)
      .then((allowanceRaw) => {
        const allowance = allowanceRaw.toString();

        console.log(allowance);

        State.update({
          allowance,
          allowanceFormatted: ethers.utils.formatEther(allowance),
        });
      });

    mntContractGoerli.balanceOf(sender).then((balanceRaw) => {
      const balance = balanceRaw.toString();
      State.update({
        balance,
        balanceFormatted: ethers.utils.formatEther(balance),
      });
    });
  }

  getMNTAllowance();
}

function handleApproveMNT() {
  mntContractGoerli.approve(MNT_SPENDER_GOERLI, state.balance, {
    gasLimit: ERC20_APPROVE_GAS,
  });
}

function handleDepositMNT() {
  const amount = ethers.utils.parseUnits(state.bridgeAmountMNT, `ether`);
  if (Big(amount).gt(Big(state.allowance))) {
    State.update({ console: `Not enough balance` });
    return;
  }

  mntSpenderGoerli.depositERC20(
    MNT_CONTRACT_GOERLI,
    MNT_CONTRACT_MANTLE_GOERLI,
    amount,
    MNT_MIN_GAS,
    [],
    {
      gasLimit: ERC20_TRANSFER_GAS,
    }
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
        <p>MNT tokens: {state.balanceFormatted}</p>
        <p>Approved to Bridge: {state.allowanceFormatted}</p>
        <h4>Approve MNT Tokens to Bridge</h4>
        <button onClick={handleApproveMNT}>Approve</button>
        <br />
        <br />
        <h4>Bridge MNT Tokens</h4>
        <input
          value={state.bridgeAmountMNT}
          onChange={({ target: { value } }) =>
            State.update({ bridgeAmountMNT: value })
          }
        />
        <br />
        <button onClick={handleDepositMNT}>Bridge</button>
        <br />
        <br />
      </>
    )}
  </div>
);
