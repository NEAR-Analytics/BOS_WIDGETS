State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
  chainId: "",
});

const {
  MAINNET_CHAIN_ID,
  ALL_DATA_URL,
  USER_DATA_BASE,
  CHAIN_CONFIG,
  addresses,
  pairs,
  proxyAddress,
  defaultPair,
  prices,
} = props;

const CONNECT_PROPS = {
  ...props.connectProps,
  chainId: MAINNET_CHAIN_ID,
  chainName: CHAIN_CONFIG.chainName,
  noAccountTips: `${CHAIN_CONFIG.chainName} Liquidity`,
  wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_CONFIG.chainName} Chain.`,
};

const chainIdToSwitch = `0x${MAINNET_CHAIN_ID.toString(16)}`;

CHAIN_CONFIG.chainId = chainIdToSwitch;

const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender)
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: false,
      }}
    />
  );

Ethers.provider()
  .getNetwork()
  .then((data) => {
    State.update({
      chainId: data.chainId,
    });
  });

const switchChain = () => {
  Ethers.send("wallet_addEthereumChain", [CHAIN_CONFIG]);
};

if (state.chainId !== MAINNET_CHAIN_ID) {
  return (
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.ConnectButton"
      props={{
        ...CONNECT_PROPS,
        isWrongNetwork: true,
      }}
    />
  );
}
const fetchPoolsData = () => {
  State.update({
    isPoolFetching: true,
  });
  asyncFetch(ALL_DATA_URL).then((res) => {
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
  asyncFetch(USER_DATA_BASE + `${sender}`).then((res) => {
    if (!res.ok) return;

    State.update({
      userPositions: res.body[sender],
      isUserPositionsFetching: false,
    });
  });
};

const fetchFusionsData = () => {
  asyncFetch("https://api.lynex.fi/api/v1/fusions").then((res) => {
    if (!res.ok) return;
    State.update({
      fusionsData: res?.body?.data,
      // isUserPositionsFetching: false,
    });
  });
};

if (state.poolsData === undefined) {
  fetchPoolsData();
}
if (state.fusionsData === undefined) {
  fetchFusionsData();
}

if (sender && state.userPositions === undefined) {
  fetchUserData();
}

const refetch = () => {
  fetchPoolsData();
  fetchUserData();
  fetchFusionsData();
  console.log("refetching");
};

const postRefetch = () => {
  setTimeout(() => refetch(), 45_000);
};

const Wrapper = styled.div`
  display: flex;
  align-items: start;
  gap: 24px;

  @media (max-width: 736px) {
    flex-direction: column-reverse;
  }
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

    @media (max-width: 736px) {
      display: none;
    }
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
  fusionsData,
  userPositions,

  isPoolFetching,
  isUserPositionsFetching,
} = state;

return (
  <VStack>
    <div className="tableTitle">Active Liquidity</div>
    <Wrapper>
      <Widget
        src={"bluebiu.near/widget/Linea.Liquidity.GAMMA.gamma-table"}
        props={{
          handlePairClick,
          prices,
          poolsData,
          fusionsData,
          userPositions,
          addresses,
          pairs,
          proxyAddress,
          defaultPair,
          activePair: activePair || defaultPair,
        }}
      />

      <div
        className=""
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Widget
          src={"bluebiu.near/widget/Linea.Liquidity.GAMMA.gamma-vault"}
          props={{
            ...props,
            pair: activePair || defaultPair,
            refetch: postRefetch,
            can_add_action: state.add_action,
            poolsData,
            addresses,
            pairs,
            proxyAddress,
            defaultPair,
            handlePairClick,
            userPositions,
            chainName: CHAIN_CONFIG.chainName,
            addAction: props.addAction,
            toast: props.toast,
            chainId: state.chainId,
          }}
        />
      </div>
    </Wrapper>
  </VStack>
);
