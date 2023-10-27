const CHAIN_ID = 100;

const { defaultDex } = props.name;

const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "XDAI",
    name: "XDAI",
    icon: "https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe",
  },
  "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb": {
    chainId: CHAIN_ID,
    address: "0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb",
    decimals: 18,
    symbol: "GNO",
    name: "Gnosis Token on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreicldmi7glc46rvi5qhfvcvdwgr5ove3jwrrs7pfjluhgynbt74d3q",
  },
  "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d": {
    chainId: CHAIN_ID,
    address: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
    decimals: 18,
    symbol: "WXDAI",
    name: "Wrapped XDAI",
    icon: "https://ipfs.near.social/ipfs/bafkreieu6n7cav63nwjj5klcsxrk26eo5pqkc4u7xzfle2bjgi5ijm7ipe",
  },
  "0x524b969793a64a602342d89bc2789d43a016b13a": {
    chainId: CHAIN_ID,
    address: "0x524b969793a64a602342d89bc2789d43a016b13a",
    decimals: 18,
    symbol: "DONUT",
    name: "Donut on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreie7eokwmmskbml6sh35iiu7byl5zb4pttytqvczkiu2t2wzop74oq",
  },
  "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9": {
    chainId: CHAIN_ID,
    address: "0x71850b7e9ee3f13ab46d67167341e4bdc905eef9",
    decimals: 18,
    symbol: "HNY",
    name: "Honey",
    icon: "https://ipfs.near.social/ipfs/bafkreibs2v3zz24hntb4fg4znjvftoke3ybtlan3a6myhruzm6i453wily",
  },
  "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1": {
    chainId: CHAIN_ID,
    address: "0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  "0x8e5bbbb09ed1ebde8674cda39a0c169401db4252": {
    chainId: CHAIN_ID,
    address: "0x8e5bbbb09ed1ebde8674cda39a0c169401db4252",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC on xDai",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
};
const Container = styled.div`
  --text-color: #1ea784;
  --button-color: #04795b;
  --border-color: #1d3326;
  --input-border-color: #1d3326;
  --input-select-bg-color: rgba(4, 121, 91, 0.1);
  --secondary-text-color: #ccdfdd;
  --thirdary-text-color: #4f7565;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(4, 121, 91, 0.1);
`;
return (
  <Container>
    <Widget
      src="dapdap-dapp.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "Gnosis",
        displayChainName: "Gnosis",
        wethAddress: "0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreigvyjhvpypqzgv2gs2tildu7ummboy2y6jqychxwqvmkcqindcwee",
            style: {
              width: "140px",
              height: "210px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Gnosis Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Gnosis Chain.",
        },
        defalutDex: defaultDex || "Honeyswap",
        dexs: {
          Honeyswap: {
            name: "Honeyswap",
            logo: "https://ipfs.near.social/ipfs/bafkreigpb3scxgcvddqzongudv3m77bh363rzyxidzuudk6wx32qa6vgia",
            factoryAddress: "0xA818b4F111Ccac7AA31D0BCc0806d64F2E0737D7",
            routerAddress: "0x1C232F01118CB8B424793ae03F870aa7D0ac7f77",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb"],
              output: Tokens["0x71850b7e9ee3f13ab46d67167341e4bdc905eef9"],
            },
            tokens: [
              Tokens["0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb"],
              Tokens["0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d"],
              Tokens["0x524b969793a64a602342d89bc2789d43a016b13a"],
              Tokens["0x71850b7e9ee3f13ab46d67167341e4bdc905eef9"],
              Tokens["0x6A023CCd1ff6F2045C3309768eAd9E68F978f6e1"],
              Tokens["0x8e5bbbb09ed1ebde8674cda39a0c169401db4252"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
      }}
    />
  </Container>
);
