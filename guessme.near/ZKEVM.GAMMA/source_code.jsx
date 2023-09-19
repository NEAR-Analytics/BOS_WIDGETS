State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
  chainId: "",
});

const sender = Ethers.send("eth_requestAccounts", [])[0];
const ContainerLogin = styled.div`
  display: flex;
  max-width: 500px;

  flex-direction: column;
  margin: 80px auto auto auto;

  .web3-connect {
    width: 480px;
    height: 60px;
    border-radius: 10px;
    background-color: #fff;
    color: #0f1126;
    font-size: 18px;
    font-weight: 500;
    border: none;
    margin-top: 20px;
  }

  @media (max-width: 736px) {
    max-width: 100%;
    .web3-connect {
      width: 100%;

      font-size: 16px;
      height: 40px;
    }
  }
`;
if (!sender)
  return (
    <ContainerLogin>
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>

      <Web3Connect className="web3-connect" connectLabel="Connect ETH wallet" />
    </ContainerLogin>
  );

// const { chainId } = Ethers.getNetwork();
Ethers.provider()
  .getNetwork()
  .then((data) => {
    State.update({
      chainId: data.chainId,
    });
  });
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
  font-family: "Inter";
  max-width: 500px;
  color: #fff;
  margin: auto;
  text-align: center;
  border-radius: 12px;
  padding: 16px 0;
  align-items: center;
  gap: 12px;
  margin-top: 80px;
  button {
    background: #8247e5;
    border: none;
    &:hover {
      background: #8257f5;
    }
  }

  @media (max-width: 736px) {
    max-width: 100%;
    img {
      width: 100%;
    }
  }
`;

if (state.chainId !== 1101) {
  return (
    <SwitchWrapper>
      <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>
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
    console.log("res: ", res.body);

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
const TableWrapper = styled.div`
  flex-grow: 1;
`;
const VaultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  @media (max-width: 736px) {
    width: 100%;
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
    <div className="tableTitle">Active Liquidity</div>
    <Wrapper>
      <TableWrapper>
        <Widget
          src="guessme.near/widget/ZKEVM.gamma-zkevm-table"
          props={{ handlePairClick, poolsData, userPositions }}
        />
      </TableWrapper>

      <VaultWrapper>
        <Widget
          src="guessme.near/widget/ZKEVM.gamma-zkevm-vault"
          props={{
            ...props,
            pair: activePair,
            refetch: postRefetch,
            can_add_action: state.add_action,
            poolsData,

            handlePairClick,
          }}
        />

        <div
          style={{
            width: "350px",
            paddingTop: "20px",
          }}
        >
          <Widget
            src="guessme.near/widget/ZKEVMWarmUp.add-to-quest-card"
            props={{
              add: state.add_action,
              onChangeAdd: (value) => {
                State.update({
                  add_action: value,
                });
              },
            }}
          />
        </div>
      </VaultWrapper>
    </Wrapper>
  </VStack>
);
