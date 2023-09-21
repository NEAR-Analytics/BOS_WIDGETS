State.init({
  activePair: defaultPair,
  isPoolFetching: false,
  isUserPositionsFetching: false,
  chainId: "",
});

const MAINNET_CHAIN_ID = 59144;

const chainIdToSwitch = `0x${MAINNET_CHAIN_ID.toString(16)}`;

const ALL_DATA_URL = "https://wire2.gamma.xyz/lynex/linea/hypervisors/allData";

const USER_DATA_BASE = "https://wire2.gamma.xyz/lynex/linea/user/";

const CHAIN_CONFIG = {
  chainId: chainIdToSwitch,
  chainName: "Linea",
  nativeCurrency: {
    name: "Linea",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.linea.build"],
  blockExplorerUrls: ["https://lineascan.build/"],
};

const tableSrc = "bluebiu.near/widget/Linea.Liquidity.GAMMA.gamma-table";

const vaultSrc = "bluebiu.near/widget/Linea.Liquidity.GAMMA.gamma-vault";

const addresses = {
  USDC: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
  WETH: "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
  BUSD: "0x7d43aabc515c356145049227cee54b608342c0ad",
  USDT: "0xa219439258ca9da29e9cc4ce5596924745e12b93",
  MATIC: "0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8",
  WBTC: "0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4",

  "N USDC-WETH-0": "0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079",
  "S BUSD-USDT-0": "0x32e27ff479454e32868ff67ee9f06bafdc1e908f",
  "N BUSD-WETH-0": "0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c",
  "N MATIC-WETH-0": "0x8421c6102ee8a147facc01977df3b159f7921d54",
  "N WBTC-WETH-0": "0x8a9570ec97534277ade6e46d100939fbce4968f0",
  "S USDC-BUSD-0": "0xd6cc4a33da7557a629e819c68fb805ddb225f517",
  "N USDT-WETH-0": "0xf3b1125c8505f038503e002e61a78253610d4f60",
};

const pairs = [
  {
    id: "N USDC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDC",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "S BUSD-USDT-0",
    strategy: "Dynamic",
    strategy2: "Stable",
    token0: "BUSD",
    token1: "USDT",
    decimals0: 18,
    decimals1: 6,
  },
  {
    id: "N BUSD-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "BUSD",
    token1: "WETH",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N MATIC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "MATIC",
    token1: "WETH",
    decimals0: 18,
    decimals1: 18,
  },
  {
    id: "N WBTC-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "WBTC",
    token1: "WETH",
    decimals0: 8,
    decimals1: 18,
  },
  {
    id: "S USDC-BUSD-0",
    strategy: "Dynamic",
    strategy2: "Stable",
    token0: "USDC",
    token1: "BUSD",
    decimals0: 6,
    decimals1: 18,
  },
  {
    id: "N USDT-WETH-0",
    strategy: "Dynamic",
    strategy2: "Narrow",
    token0: "USDT",
    token1: "WETH",
    decimals0: 6,
    decimals1: 18,
  },
];

const proxyAddress = "0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621";

const defaultPair = {
  id: "N USDC-WETH-0",
  strategy: "Dynamic",
  strategy2: "Narrow",
  token0: "USDC",
  token1: "WETH",
  decimals0: 6,
  decimals1: 18,
};
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

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 32px;
  color: #ffffff;
  @media (max-width: 900px) {
    display: none;
  }
`;

if (!sender)
  return (
    <>
      <TitleText>Liquidity Manage</TitleText>
      <ContainerLogin
        style={{
          display: "flex",
          maxWidth: "500px",
          flexDirection: "column",
          margin: "80px auto auto auto",
        }}
      >
        <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>

        <Web3Connect
          className="web3-connect"
          connectLabel="Connect ETH wallet"
        />
      </ContainerLogin>
    </>
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

if (state.chainId !== MAINNET_CHAIN_ID) {
  return (
    <>
      <TitleText>Liquidity Manage</TitleText>
      <SwitchWrapper>
        <img src="https://ipfs.near.social/ipfs/bafkreibmhq4fseqpcbywiq4hfojghxvhj47mjsri2trggt7d5h5od4y6kq"></img>
        <h4>Please switch to {CHAIN_CONFIG.chainName} </h4>
        <button onClick={switchChain}>
          Switch to {CHAIN_CONFIG.chainName}
        </button>
        <p>**Please refresh once after switch chain**</p>
      </SwitchWrapper>
    </>
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
  userPositions,
  isPoolFetching,
  isUserPositionsFetching,
} = state;

return (
  <VStack>
    <div className="tableTitle">Active Liquidity</div>
    <Wrapper>
      <Widget
        src={tableSrc}
        props={{
          handlePairClick,
          poolsData,
          userPositions,
          addresses,
          pairs,
          proxyAddress,
          defaultPair,
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
          src={vaultSrc}
          props={{
            ...props,
            pair: activePair,
            refetch: postRefetch,
            can_add_action: state.add_action,
            poolsData,
            addresses,
            pairs,
            proxyAddress,
            defaultPair,
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
      </div>
    </Wrapper>
  </VStack>
);
