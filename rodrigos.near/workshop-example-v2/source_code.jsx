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

if (
  state.chainId === undefined &&
  ethers !== undefined &&
  Ethers.send("eth_requestAccounts", [])[0]
) {
  Ethers.provider()
    .getNetwork()
    .then((chainIdData) => {
      if (chainIdData?.chainId) {
        State.update({ chainId: chainIdData.chainId });
      }
    });
}

if (state.chainId !== undefined && state.chainId !== 5) {
  return <p style={{ textAlign: "center" }}>Switch to Goerli Network</p>;
}

// GET USER ADDRESS

if (state.userAddress === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ userAddress: accounts[0] });
  }
}

// UPDATE ETH BALANCE

const updateEthBalance = () => {
  return Ethers.provider()
    .getBalance(state.userAddress)
    .then((balance) => {
      State.update({
        ethBalance: Big(balance).div(Big(10).pow(18)).toFixed(5),
      });
    });
};

if (state.ethBalance === undefined && state.userAddress) {
  updateEthBalance();
}

// UPDATE MPETH BALANCE

const updateMpEthBalance = () => {
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
  updateMpEthBalance();
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
    .then((txResp) => txResp.wait())
    .then(() => {
      updateEthBalance();
      updateMpEthBalance();
      State.update({ amount: "" });
    })
    .catch((e) => {
      console.error(e);
    });
};

// STYLED COMPONENTS

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StakeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  align-items: center;
  border: 2px gray solid;
  padding: 16px;
  border-radius: 8px;
  margin: 20px;
  input{
    text-align: end
  }
  button{
    width: 100%;
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%
`;

return (
  <MainContainer>
    <StakeContainer>
      <h1>Stake ETH</h1>
      {state.userAddress ? (
        <>
          <BalanceContainer>
            <span>ETH balance:</span>
            <span>{state.ethBalance || "loading..."}</span>
          </BalanceContainer>
          <BalanceContainer>
            <span>mpETH balance:</span>
            <span>{state.mpEthBalance || "loading..."}</span>
          </BalanceContainer>
          <Widget
            src={`rodrigos.near/widget/MetaPoolStakeEth.Input`}
            props={{
              placeHolder: "0",
              value: state.amount,
              onChange: (e) => State.update({ amount: e.target.value }),
            }}
          />
          <button onClick={() => stakeEth(state.amount, state.userAddress)}>
            Stake
          </button>
        </>
      ) : (
        <Web3Connect connectLabel="Connect with Ethereum wallet" />
      )}
    </StakeContainer>
  </MainContainer>
);
