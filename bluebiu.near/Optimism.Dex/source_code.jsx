const CHAIN_ID = 10;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0x7F5c764cBc14f9669B88837ca1490cCa17c31607": {
    chainId: CHAIN_ID,
    address: "0x7F5c764cBc14f9669B88837ca1490cCa17c31607",
    decimals: 6,
    symbol: "USDC.e",
    name: "Bridged USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },

  "0x4200000000000000000000000000000000000042": {
    chainId: CHAIN_ID,
    address: "0x4200000000000000000000000000000000000042",
    decimals: 18,
    symbol: "OP",
    name: "Optimism",
    icon: "https://ipfs.near.social/ipfs/bafkreiemkl7qtrrqnk5mexf7r4cr3mkznna6qvxrzhovlmt4djbkx366ae",
  },

  "0x4200000000000000000000000000000000000006": {
    chainId: CHAIN_ID,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },

  "0x1610e3c85dd44Af31eD7f33a63642012Dca0C5A5": {
    chainId: CHAIN_ID,
    address: "0x1610e3c85dd44Af31eD7f33a63642012Dca0C5A5",
    decimals: 18,
    symbol: "msETH",
    name: "Metronome Synth ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreie4tthvfs7g4ktzbmxeitfpeikbb3iu52d2gnvcv6jmjqtpl7wfbm",
  },
  "0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97": {
    chainId: CHAIN_ID,
    address: "0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97",
    decimals: 18,
    symbol: "STG",
    name: "StargateToken",
    icon: "https://ipfs.near.social/ipfs/bafkreifqtmyhszs3sa33f2uockcdmkxbuur7pvlgwx6vs53xlgaz7m2pfq",
  },
  "0xdFA46478F9e5EA86d57387849598dbFB2e964b02": {
    chainId: CHAIN_ID,
    address: "0xdFA46478F9e5EA86d57387849598dbFB2e964b02",
    decimals: 18,
    symbol: "MAI",
    name: "Mai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreig3xz7vylch6y7ubyjco4kdzw724lnlgzohlizmgti6s6fc4ybsai",
  },
  "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9": {
    chainId: CHAIN_ID,
    address: "0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9",
    decimals: 18,
    symbol: "sUSD",
    name: "Synth sUSD",
    icon: "https://ipfs.near.social/ipfs/bafkreiaum6qcvs7gqjwfmbfoh5dde244fqd6bji4id5wlyn6q5e3vvsorm",
  },
  "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4": {
    chainId: CHAIN_ID,
    address: "0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4",
    decimals: 18,
    symbol: "SNX",
    name: "Synthetix Network Token",
    icon: "https://ipfs.near.social/ipfs/bafkreiblu4utwynt7ajvretbjzqtm2v7e7p2hkyyp7jamb742zkwpdzmu4",
  },
  "0x68f180fcCe6836688e9084f035309E29Bf0A2095": {
    chainId: CHAIN_ID,
    address: "0x68f180fcCe6836688e9084f035309E29Bf0A2095",
    decimals: 8,
    symbol: "WBTC",
    name: "Wrapped BTC",
    icon: "https://ipfs.near.social/ipfs/bafkreigdklwcldjo4w7viyrym54hdb43wgpv23mbicetszygzapttbgo7q",
  },
};
const Container = styled.div`
  --text-color: #ff96a2;
  --button-color: #ea3431;
  --border-color: #382426;
  --input-border-color: #382426;
  --input-select-bg-color: #212330;
  --secondary-text-color: #ff96a2;
  --thirdary-text-color: #5e5555;
  --dex-active-text-color: rgba(255, 255, 255, 0.6);
  --button-text-color: #fff;
  --dex-hover-bg-color: #ea3431;
`;
return (
  <Container>
    <Widget
      src="bluebiu.near/widget/Arbitrum.Swap.SwapConnector"
      props={{
        chainId: CHAIN_ID,
        chainName: "Optimism",
        displayChainName: "Optimism",
        wethAddress: "0x4200000000000000000000000000000000000006",
        connectProps: {
          imgProps: {
            src: "",
            style: {
              width: "179px",
              height: "143px",
              marginTop: "80px",
            },
          },
          noAccountTips: "Optimism Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to Optimism Chain.",
        },
        defalutDex: "Velodrome V1",
        dexs: {
          "Velodrome V1": {
            name: "Velodrome V1",
            logo: "https://ipfs.near.social/ipfs/bafkreieey4ie6pk6eyg3nrwnkdqlxb4gff3t4pkdq3ihaag2x3qbi3k7em",
            factoryAddress: "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746",
            routerAddress: "0x9c12939390052919aF3155f41Bf4160Fd3666A6f",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["0x7F5c764cBc14f9669B88837ca1490cCa17c31607"],
              output: Tokens["0x4200000000000000000000000000000000000042"],
            },
            tokens: [
              Tokens["0x7F5c764cBc14f9669B88837ca1490cCa17c31607"],
              Tokens["0x4200000000000000000000000000000000000042"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["0x1610e3c85dd44Af31eD7f33a63642012Dca0C5A5"],
              Tokens["0x296F55F8Fb28E498B858d0BcDA06D955B2Cb3f97"],
              Tokens["0xdFA46478F9e5EA86d57387849598dbFB2e964b02"],
              Tokens["0x8c6f28f2F1A3C87F0f938b96d27520d9751ec8d9"],
              Tokens["0x8700dAec35aF8Ff88c16BdF0418774CB3D7599B4"],
              Tokens["0x68f180fcCe6836688e9084f035309E29Bf0A2095"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        quoterV3: "bluebiu.near/widget/Arbitrum.Swap.QuoterV3",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Arbitrum.Swap.HandlerV3",
        QuoterSolidly: "bluebiu.near/widget/Arbitrum.Swap.QuoterSolidly",
        handlerSolidly: "bluebiu.near/widget/Arbitrum.Swap.handlerSolidly",
        ...props,
      }}
    />
  </Container>
);
