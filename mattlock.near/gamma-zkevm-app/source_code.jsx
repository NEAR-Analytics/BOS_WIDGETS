State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
});

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender)
  return (
    <div
      style={{
        display: "flex",
        maxWidth: "480px",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <Web3Connect connectLabel="Connect with Web3 to use the app." />
    </div>
  );

const { chainId } = Ethers.getNetwork();
const chainIdToSwitch = "0x44D";

const switchChain = () => {
  const zkevmChain = {
    chainId: "0x44D",
    chainName: "Polygon zkEVM",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://zkevm-rpc.com"],
    blockExplorerUrls: ["https://zkevm.polygonscan.com"],
  };

  Ethers.send("wallet_addEthereumChain", [zkevmChain]);
};

const SwitchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #1d1e1f;
  font-family: 'Inter';
  max-width: 480px;
  color: #fff;
  margin: auto;
  text-align: center;
  border-radius: 12px;
  padding: 16px 0;
  align-items: center;
  gap: 12px;
  button {
    background: #8247E5;
    border: none;
    &:hover {
      background: #8257F5;
    }
  }
`;

if (chainId !== 1101) {
  return (
    <SwitchWrapper>
      <h4>Please switch to Polygon zkEVM</h4>
      <button onClick={switchChain}>Switch to Polygon zkEVM</button>
      <p>**Please refresh once after switch chain**</p>
    </SwitchWrapper>
  );
}

const fetchPoolsData = () => {
  State.update({
    isPoolFetching: true,
  });
  asyncFetch(
    "https://wire2.gamma.xyz/quickswap/polygon-zkevm/hypervisors/allData"
  ).then((res) => {
    if (!res.ok) return;

    State.update({
      poolsData: res.body,
      isPoolFetching: false,
    });
  });
};

const fetchUserData = () => {
  State.update({
    isUserPositionsFetching: true,
  });
  asyncFetch(
    `https://wire2.gamma.xyz/quickswap/polygon-zkevm/user/${sender}`
  ).then((res) => {
    if (!res.ok) return;

    State.update({
      userPositions: res.body[sender],
      isUserPositionsFetching: false,
    });
  });
};

if (state.poolsData === undefined) {
  fetchPoolsData();
}

if (sender && state.userPositions === undefined) {
  fetchUserData();
}

const refetch = () => {
  fetchPoolsData();
  fetchUserData();
  console.log("refetching");
};

const postRefetch = () => {
  setTimeout(() => refetch(), 45_000);
};

const defaultPair = {
  id: "N WETH-USDC",
  token0: "WETH",
  token1: "USDC",
  decimals0: 18,
  decimals1: 6,
};

const Wrapper = styled.div`
    display:flex;
    align-items: start;
    flex-wrap:wrap;
    gap: 24px;
`;
const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const Button = styled.button`
    background: #1d1e1f;
    border-radius: 4px;
    border: none;
    max-width: 640px;
    width: 100%;
    color: #fff;
    padding: 8px 0;
    font-weight: 600;
    font-size: 14px;
    position: relative;
    min-height: 37px;
    &:hover {
      background: #2b2a2b;
    }
    &:disabled {
      background: #333;
      color: #ccc;
    }
`;

const handlePairClick = (pair) => {
  State.update({
    activePair: pair,
  });
};

const {
  activePair,
  poolsData,
  userPositions,
  isPoolFetching,
  isUserPositionsFetching,
} = state;

return (
  <VStack>
    <Button
      disabled={isPoolFetching || isUserPositionsFetching}
      onClick={refetch}
    >
      {isPoolFetching || isUserPositionsFetching
        ? "Fetching Table Data..."
        : "Refresh"}
    </Button>
    <Wrapper>
      <Widget
        src="mattlock.near/widget/gamma-zkevm-table"
        props={{ handlePairClick, poolsData, userPositions }}
      />

      <Widget
        src="james-cordova423.near/widget/gamma-zkevm-vault"
        props={{ pair: activePair, refetch: postRefetch }}
      />
    </Wrapper>
  </VStack>
);
