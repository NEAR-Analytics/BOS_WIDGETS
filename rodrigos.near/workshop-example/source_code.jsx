// INIT STATE

State.init({
  chainId: undefined,
  userAddress: undefined,
  ethBalance: undefined,
  mpEthBalance: undefined,
  amount: "",
});

// CONSTANTS

const STAKING_ADDRESS = "0x748c905130CC15b92B97084Fd1eEBc2d2419146f";
const TOKEN_DECIMALS = 18;
const METAPOOL_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
        name: "_receiver",
        type: "address",
      },
    ],
    name: "depositETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

// CONFIGURE CHAIN

if (state.chainId === undefined && ethers !== undefined) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId !== undefined && state.chainId !== 5) {
  return <p>Switch to Goerli</p>;
}

// GET USER ADDRESS

if (state.userAddress === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ userAddress: accounts[0] });
  }
}

// GET ETH BALANCE

const getEthBalance = () => {
  return Ethers.provider()
    .getBalance(state.userAddress)
    .then((balance) => {
      State.update({
        ethBalance: Big(balance).div(Big(10).pow(18)).toFixed(5),
      });
    });
};

if (state.ethBalance === undefined && state.userAddress) {
  getEthBalance();
}

// GET MPETH BALANCE

const getMpEthBalance = () => {
  const iface = new ethers.utils.Interface(METAPOOL_ABI);
  const encodedData = iface.encodeFunctionData("balanceOf", [
    state.userAddress,
  ]);

  return Ethers.provider()
    .call({
      to: STAKING_ADDRESS,
      data: encodedData,
    })
    .then((rawBalance) => {
      const receiverBalanceHex = iface.decodeFunctionResult(
        "balanceOf",
        rawBalance
      );

      State.update({
        mpEthBalance: Big(receiverBalanceHex.toString())
          .div(Big(10).pow(TOKEN_DECIMALS))
          .toFixed(5),
      });
    });
};

if (state.mpEthBalance === undefined && state.userAddress) {
  getMpEthBalance();
}

// STAKE ETH

const stakeEth = (amount, receiver) => {
  const erc20 = new ethers.Contract(
    STAKING_ADDRESS,
    METAPOOL_ABI,
    Ethers.provider().getSigner()
  );

  const parseAmount = ethers.utils
    .parseUnits(amount, tokenDecimals)
    .toHexString();

  erc20
    .depositETH(receiver, { value: parseAmount })
    .then((txResp) => {
      txResp.wait().then(() => {
        getEthBalance();
        getMpEthBalance();
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

return (
  <div
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "center",
    }}
  >
    {state.userAddress ? (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "400px",
          alignItems: "center",
        }}
      >
        <div>ETH balance: {state.ethBalance || "loading..."}</div>
        <div>mpETH balance: {state.mpEthBalance || "loading..."}</div>
        <input
          placeHolder="Enter ETH amount"
          style={{ width: "200px" }}
          value={state.amount}
          onChange={(e) => State.update({ amount: e.target.value })}
        ></input>
        <button onClick={() => stakeEth(state.amount, state.userAddress)}>
          Stake
        </button>
      </div>
    ) : (
      <Web3Connect connectLabel="Connect with Ethereum wallet" />
    )}
  </div>
);
