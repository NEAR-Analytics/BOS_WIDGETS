State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
  chainId: "",
});

const CONNECT_PROPS = {
  chainId: 1101,
  chainName: "Polygon zkEVM",
  noAccountTips: "Polygon zkEVM Liquidity",
  wrongNetworkTips: "To proceed, kindly switch to Polygon zkEVM Chain.",
};

const SwitchWrapper = styled.div`
  --text-color: rgb(121, 79, 221);
  --button-color: rgb(121, 79, 221);
`;

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender)
  return (
    <SwitchWrapper>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          isWrongNetwork: false,
        }}
      />
    </SwitchWrapper>
  );

Ethers.provider()
  .getNetwork()
  .then((data) => {
    State.update({
      chainId: data.chainId,
    });
  });

if (state.chainId !== 1101) {
  return (
    <SwitchWrapper>
      <Widget
        src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
        props={{
          ...CONNECT_PROPS,
          isWrongNetwork: true,
        }}
      />
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
  align-items: start;
  gap: 24px;
`;
const VStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  .tableTitle {
    font-size: 18px;
    color: #7c7f96;
    font-weight: 500;
    padding-left: 16px;
    margin-bottom: 5px;
  }
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
    <Wrapper>
      <Widget
        src="bluebiu.near/widget/ZKEVM.gamma-zkevm-vault"
        props={{
          pair: activePair,
          refetch: postRefetch,
          can_add_action: state.add_action,
          addAction: props.addAction,
          toast: props.toast,
          chainId: state.chainId,
        }}
      />
      <Widget
        src="bluebiu.near/widget/ZKEVM.gamma-zkevm-table"
        props={{ handlePairClick, poolsData, userPositions, activePair }}
      />
    </Wrapper>

    <Widget src="guessme.near/widget/ZKEVMWarmUp.generage-uuid" />
  </VStack>
);
