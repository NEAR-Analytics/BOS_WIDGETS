const CHAIN_ID = 8453;
const { defaultDex } = props;

const Tokens = {
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22": {
    chainId: CHAIN_ID,
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    symbol: "cbETH",
    name: "Coinbase Wrapped Staked ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreif6fax6u2xtetbjv5c27ubxedwqjzrqsreytqbppflryagvm5ix7u",
  },
  "0x4200000000000000000000000000000000000006": {
    chainId: CHAIN_ID,
    address: "0x4200000000000000000000000000000000000006",
    decimals: 18,
    symbol: "WETH",
    name: "Wrapped Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreihyzmiuawyekwiyofkzm25xzrrfenhvadi6lb42juvq7tah2u7ha4",
  },
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "ETH",
    name: "Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },
  "0xEB466342C4d449BC9f53A865D5Cb90586f405215": {
    chainId: CHAIN_ID,
    address: "0xEB466342C4d449BC9f53A865D5Cb90586f405215",
    decimals: 6,
    symbol: "axlUSDC",
    name: "Axelar Wrapped USDC",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9": {
    chainId: CHAIN_ID,
    address: "0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9",
    decimals: 18,
    symbol: "BSWAP",
    name: "Baseswap Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibchdnwitwvrkaudvkokxpg4lgtmtpakmpbtgaxfijlyzjjn5ij7u",
  },
  "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb": {
    chainId: CHAIN_ID,
    address: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
    decimals: 18,
    symbol: "DAI",
    name: "Dai Stablecoin",
    icon: "https://ipfs.near.social/ipfs/bafkreieuxntkdzi2mzkzdcbk6kahwxqpftxnipxcwc4oe4p4jm2rhj2xhu",
  },
  "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA": {
    chainId: CHAIN_ID,
    address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA",
    decimals: 6,
    symbol: "USDbC",
    name: "USD Base Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreidvlzvrojji7ezvfrcxnjkmdfhxnau6qp7wngfctmxcvurqpeddb4",
  },
  "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09": {
    chainId: CHAIN_ID,
    address: "0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09",
    decimals: 18,
    symbol: "RCKT",
    name: "RocketSwap",
    icon: "https://ipfs.near.social/ipfs/bafkreid2h5b7or52vtn2micbmjmzssh6b26uvzfvzurd66lqvyarkekdpy",
  },
  "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8": {
    chainId: CHAIN_ID,
    address: "0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8",
    decimals: 18,
    symbol: "BALD",
    name: "Bald",
    icon: "https://ipfs.near.social/ipfs/bafkreibokl4gvnodznfnzvnwfhzsssqcpqp2th4qrumxvmsd5oi3drwxsu",
  },
  "0xd07379a755A8f11B57610154861D694b2A0f615a": {
    chainId: CHAIN_ID,
    address: "0xd07379a755A8f11B57610154861D694b2A0f615a",
    decimals: 18,
    symbol: "BASE",
    name: "BASE Token",
    icon: "https://ipfs.near.social/ipfs/bafkreidhivnirorddkdudcd6oca6gvhps66audqn3lppsoehlyvorf6p4i",
  },
  "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2": {
    chainId: CHAIN_ID,
    address: "0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2",
    decimals: 18,
    symbol: "SYNTH",
    name: "Synth Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibgq3x3f5sxegvmwbgqfpkccbxhduj2rjgiex7oirco3wn5urww2m",
  },
  "0x081AD949deFe648774C3B8deBe0E4F28a80716dc": {
    chianId: CHAIN_ID,
    address: "0x081AD949deFe648774C3B8deBe0E4F28a80716dc",
    decimals: 18,
    symbol: "HZN",
    name: "Horizon",
    icon: "https://ipfs.near.social/ipfs/bafkreiehzfpq27pwv4nsoqp45ehekfpfevfpt2l63wm7fmzgcjn5cmhvzm",
  },
  "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22": {
    chainId: CHAIN_ID,
    address: "0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22",
    decimals: 18,
    symbol: "cbETH",
    name: "Coinbase Wrapped Staked ETH",
    icon: "https://ipfs.near.social/ipfs/bafkreif6fax6u2xtetbjv5c27ubxedwqjzrqsreytqbppflryagvm5ix7u",
  },
};
const Container = styled.div`
  --text-color: #3d76ff;
  --button-color: #004bfc;
  --border-color: #2c334b;
  --input-border-color: #332c4b;
  --input-select-bg-color: #222436;
  --secondary-text-color: #82a7ff;
  --thirdary-text-color: #4f5375;
  --dex-active-text-color: #fff;
  --button-text-color: #fff;
  --dex-hover-bg-color: rgba(0, 75, 252, 0.1);
`;
return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "Base",
        displayChainName: "BASE",
        wethAddress: "0x4200000000000000000000000000000000000006",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreigkxrlezj5i7jk3sfm4rmv2kui7oxz4skngjyiopl5rvbvvllnnja",
            style: {
              width: "404px",
              height: "220px",
              marginTop: "60px",
            },
          },
          noAccountTips: "Base Swap Collection",
          wrongNetworkTips: "To proceed, kindly switch to Base Chain.",
        },
        defalutDex: defaultDex || "BaseSwap",
        dexs: {
          BaseSwap: {
            name: "BaseSwap",
            logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F1348261154-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252F2l8R5PBQEb9j87AEVFTv%252Ficon%252FfO1NO60iKDdgbEaPqmpQ%252FBaseswap_Logo.png%3Falt%3Dmedia%26token%3Dc22d4fa3-7fc5-4927-b4c1-0ccc3f337cdb",
            factoryAddress: "0xFDa619b6d20975be80A10332cD39b9a4b0FAa8BB",
            routerAddress: "0x327Df1E6de05895d2ab08513aaDD9313Fe505d86",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9"],
            },
            tokens: [
              Tokens["0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["native"],
              Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
              Tokens["0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9"],
              Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
              Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
            ],
          },
          RocketSwap: {
            name: "RocketSwap",
            logo: "https://app.rocketswap.cc/_next/image?url=https%3A%2F%2Ftoken.g34gsgv.top%2Flogo.png&w=256&q=75",
            factoryAddress: "0x1B8128c3A1B7D20053D10763ff02466ca7FF99FC",
            routerAddress: "0x4cf76043B3f97ba06917cBd90F9e3A2AAC1B306e",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09"],
            },
            tokens: [
              Tokens["0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["native"],
              Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
              Tokens["0xd07379a755A8f11B57610154861D694b2A0f615a"],
              Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
            ],
          },
          SwapBased: {
            name: "SwapBased",
            logo: "https://swapbased.finance/static/media/base-logo.8e4c7d33.png",
            factoryAddress: "0x04C9f118d21e8B767D2e50C946f0cC9F6C367300",
            routerAddress: "0xaaa3b1F1bd7BCc97fD1917c18ADE665C5D31F066",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xd07379a755A8f11B57610154861D694b2A0f615a"],
            },
            tokens: [
              Tokens["0x6653dD4B92a0e5Bf8ae570A98906d9D6fD2eEc09"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["native"],
              Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
              Tokens["0xd07379a755A8f11B57610154861D694b2A0f615a"],
              Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
              Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
            ],
          },
          Synthswap: {
            name: "Synthswap",
            logo: "https://www.synthswap.io/_next/image?url=%2Fimages%2Fsynth.png&w=48&q=75",
            factoryAddress: "0x4bd16d59A5E1E0DB903F724aa9d721a31d7D720D",
            routerAddress: "0x8734B3264Dbd22F899BCeF4E92D442d538aBefF0",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2"],
            },
            tokens: [
              Tokens["0xbd2DBb8eceA9743CA5B16423b4eAa26bDcfE5eD2"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["native"],
              Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
              Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
            ],
          },
          HorizonDEX: {
            name: "HorizonDEX",
            logo: "https://ipfs.near.social/ipfs/bafkreiaqpbeth37uxmbe6iwqduoad76dncozbuoa3bwgcbcxcmputkuzfu",
            factoryAddress: "0x07AceD5690e09935b1c0e6E88B772d9440F64718",
            routerAddress: "0x99AEC509174Cbf06F8F7E15dDEeB7bcC32363827",
            quoterAddress: "0x94ddDe405A00180891eD79Dc1147F0d841c30D73",
            uniType: "v3",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x081AD949deFe648774C3B8deBe0E4F28a80716dc"],
            },
            tokens: [
              Tokens["0x081AD949deFe648774C3B8deBe0E4F28a80716dc"],
              Tokens["0x2Ae3F1Ec7F1F5012CFEab0185bfc7aa3cf0DEc22"],
              Tokens["0x4200000000000000000000000000000000000006"],
              Tokens["native"],
              Tokens["0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb"],
              Tokens["0xEB466342C4d449BC9f53A865D5Cb90586f405215"],
              Tokens["0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA"],
              Tokens["0x78a087d713Be963Bf307b18F2Ff8122EF9A63ae9"],
              Tokens["0x27D2DECb4bFC9C76F0309b8E88dec3a601Fe25a8"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        quoterV3: "bluebiu.near/widget/Base.BaseQuoterV3",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        handlerV3: "bluebiu.near/widget/Base.HandlerV3",
      }}
    />
  </Container>
);
