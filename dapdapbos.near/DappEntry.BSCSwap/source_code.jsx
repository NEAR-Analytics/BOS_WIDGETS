const { defaultDex } = props;

const CHAIN_ID = 56;
const Tokens = {
  native: {
    chainId: CHAIN_ID,
    address: "native",
    decimals: 18,
    symbol: "BNB",
    name: "BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
  },
  "0x2170Ed0880ac9A755fd29B2688956BD959F933F8": {
    chainId: CHAIN_ID,
    address: "0x2170Ed0880ac9A755fd29B2688956BD959F933F8",
    decimals: 18,
    symbol: "ETH",
    name: "Binance-Peg Ethereum Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibspnls7q67q25r2ifv2rrfmvzl744pzuh3s5ekigeqkmyycl2auq",
  },

  "0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11": {
    chainId: CHAIN_ID,
    address: "0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11",
    decimals: 18,
    symbol: "THE",
    name: "THENA",
    icon: "https://ipfs.near.social/ipfs/bafkreig4qvfooeyjhjhfobueyipuxxzxdxf5cqycsup35wll6qc3qijghi",
  },

  "0xCdC3A010A3473c0C4b2cB03D8489D6BA387B83CD": {
    chainId: CHAIN_ID,
    address: "0xCdC3A010A3473c0C4b2cB03D8489D6BA387B83CD",
    decimals: 18,
    symbol: "liveTHE",
    name: "liveThe",
    icon: "https://ipfs.near.social/ipfs/bafkreicsajtjaej7icx44jaflxswdkdlpbb62ywtucfsgvd4drhwn5smqy",
  },

  "0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827": {
    chainId: CHAIN_ID,
    address: "0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827",
    decimals: 18,
    symbol: "ankrBNB",
    name: "Ankr Staked BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiazxoiq645ur3vv2cyc2mhh47ke3bhlahg3hccka64q6s4ydnvit4",
  },

  "0x64048A7eEcF3a2F1BA9e144aAc3D7dB6e58F555e": {
    chainId: CHAIN_ID,
    address: "0x64048A7eEcF3a2F1BA9e144aAc3D7dB6e58F555e",
    decimals: 18,
    symbol: "frxETH",
    name: "Frax Ether",
    icon: "https://ipfs.near.social/ipfs/bafkreig2u6c72b4gy5nu3d57xlqzjb6ycf2luqnofdzq6btqzav3tqrqnq",
  },

  "0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275": {
    chainId: CHAIN_ID,
    address: "0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275",
    decimals: 18,
    symbol: "BNBx",
    name: "Liquid Staking BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiaw2yydqsipgor2jilgogehuitxhe7hodgw5fyi5j2q7zfhpau22y",
  },

  "0xc2E9d07F66A89c44062459A47a0D2Dc038E4fb16": {
    chainId: CHAIN_ID,
    address: "0xc2E9d07F66A89c44062459A47a0D2Dc038E4fb16",
    decimals: 18,
    symbol: "stkBNB",
    name: "Staked BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreideov3wvuqwgwu5irionwnkka7jqeflqoedzqpf6m2ylqewmto4ei",
  },

  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c": {
    chainId: CHAIN_ID,
    address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    decimals: 18,
    symbol: "WBNB",
    name: "Wrapped BNB",
    icon: "https://ipfs.near.social/ipfs/bafkreiaeq6ca67je5ocago6vk2efwxiqurxgemputx7p2nt6n2p3zo65xq",
  },
  "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c": {
    chainId: CHAIN_ID,
    address: "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
    decimals: 18,
    symbol: "BTCB",
    name: "Binance-Peg BTCB Token",
    icon: "https://ipfs.near.social/ipfs/bafkreig2h2vpf7u7ukbgomgurcvvfyujl66qdrbsp6u2bcga3wdyxladii",
  },
  "0x55d398326f99059fF775485246999027B3197955": {
    chainId: CHAIN_ID,
    address: "0x55d398326f99059fF775485246999027B3197955",
    decimals: 18,
    symbol: "BSC-USD",
    name: "Binance-Peg BSC-USD",
    icon: "https://ipfs.near.social/ipfs/bafkreigefu6rjc52vz5nfa4zd7p43ry5x4gam4dhkjxihnoszhdg46csvq",
  },
  "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d": {
    chainId: CHAIN_ID,
    address: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
    decimals: 18,
    symbol: "USDC",
    name: "Binance-Peg USD Coin",
    icon: "https://ipfs.near.social/ipfs/bafkreie4jihoa76mgyzxhw2yrapihzu2qhkjz6m7u4opoxjebzg6zc2lla",
  },
  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56": {
    chainId: CHAIN_ID,
    address: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
    decimals: 18,
    symbol: "BUSD",
    name: "Binance-Peg BUSD Token",
    icon: "https://ipfs.near.social/ipfs/bafkreibp36dfkfjzgnnbb7u4jxh57gpjmfjerc6pefmyzhueulz5ovd5xy",
  },
  "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1": {
    chainId: CHAIN_ID,
    address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
    decimals: 18,
    symbol: "BSW",
    name: "Biswap",
    icon: "https://ipfs.near.social/ipfs/bafkreihwjl6o3j42bbetjurgfpiemxipw7evqm6aumk4bgy2zmspejpiwm",
  },
  "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95": {
    chainId: CHAIN_ID,
    address: "0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95",
    decimals: 18,
    symbol: "BANANA",
    name: "ApeSwapFinance Banana",
    icon: "https://ipfs.near.social/ipfs/bafkreifglo7ltnhvlhns7vdroqdboaenya4zkldleandcwwwjffpmr3hjm",
  },
  "0xeD00Fc7D48B57B81FE65D1cE71c0985e4CF442CB": {
    chainId: CHAIN_ID,
    address: "0xeD00Fc7D48B57B81FE65D1cE71c0985e4CF442CB",
    decimals: 18,
    symbol: "CHRP",
    name: "Chirpley Token",
    icon: "https://ipfs.near.social/ipfs/bafkreiey7bmhii4r7eywnehfsdlfsc2xbth64yavdwbn6aktadpijklrje",
  },
  "0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66": {
    chainId: CHAIN_ID,
    address: "0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66",
    decimals: 18,
    symbol: "CEEK",
    name: "CEEK",
    icon: "https://ipfs.near.social/ipfs/bafkreiav2q7czoy3725mgxjrprbfvkepe3xn4yl4vszp7dxpjltqzo7coy",
  },
  "0x10393c20975cF177a3513071bC110f7962CD67da": {
    chainId: CHAIN_ID,
    address: "0x10393c20975cF177a3513071bC110f7962CD67da",
    decimals: 18,
    symbol: "JONES",
    name: "Jones DAO",
    icon: "https://arbiscan.io/token/images/jonesdaoarb_32.png",
  },
  "0xe4CA1F75ECA6214393fCE1C1b316C237664EaA8e": {
    chainId: CHAIN_ID,
    address: "0xe4CA1F75ECA6214393fCE1C1b316C237664EaA8e",
    decimals: 8,
    symbol: "ORN",
    name: "Orion Protocol",
    icon: "https://ipfs.near.social/ipfs/bafkreibx6e6tsab3xxd6s7alev2tgvbjs4welhfndrrunsedvgopv2hmj4",
  },
  "0xa2B726B1145A4773F68593CF171187d8EBe4d495": {
    chainId: CHAIN_ID,
    address: "0xa2B726B1145A4773F68593CF171187d8EBe4d495",
    decimals: 18,
    symbol: "INJ",
    name: "Injective Protocol",
    icon: "https://ipfs.near.social/ipfs/bafkreihd5xzcl7q3ad7nxutohajxob6cw5z254wczuy2fflxjnmz4v4vse",
  },
};
const Container = styled.div`
  --text-color: #f3ba2f;
  --button-color: #f3ba2f;
  --border-color: #352e24;
  --input-border-color: #4b3f2c;
  --input-select-bg-color: #363022;
  --secondary-text-color: #8a7133;
  --thirdary-text-color: #6a624b;
  --dex-active-text-color: #000;
  --button-text-color: #000;
  --dex-hover-bg-color: rgba(243, 186, 47, 0.1);
`;
return (
  <Container>
    <Widget
      src="dapdapbos.near/widget/Swap.SwapConnector"
      props={{
        ...props,
        chainId: CHAIN_ID,
        chainName: "BSC",
        displayChainName: "BSC",
        wethAddress: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
        connectProps: {
          imgProps: {
            src: "https://ipfs.near.social/ipfs/bafkreiajfajinsydy3ewmc3elgnpahc3n3v4cophn6ip5bzr3ym7ypn5vm",
            style: {
              width: "282px",
              height: "167px",
              marginTop: "80px",
            },
          },
          noAccountTips: "BSC Dex Collection",
          wrongNetworkTips: "To proceed, kindly switch to BSC Chain.",
        },
        defalutDex: defaultDex || "Biswap",
        dexs: {
          Biswap: {
            name: "Biswap",
            logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F3913055502-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MYxuX082CiatAs0SbU8%252Favatar-1619452090567.png%3Fgeneration%3D1619452091011230%26alt%3Dmedia",
            factoryAddress: "0x858E3312ed3A876947EA49d572A7C42DE08af7EE",
            routerAddress: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x965F527D9159dCe6288a2219DB51fc6Eef120dD1"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x2170Ed0880ac9A755fd29B2688956BD959F933F8"],
              Tokens["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"],
              Tokens["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"],
              Tokens["0x55d398326f99059fF775485246999027B3197955"],
              Tokens["0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"],
              Tokens["0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"],
              Tokens["0x965F527D9159dCe6288a2219DB51fc6Eef120dD1"],
            ],
          },
          Apeswap: {
            name: "Apeswap",
            logo: "https://www.gitbook.com/cdn-cgi/image/width=40,dpr=2,height=40,fit=contain,format=auto/https%3A%2F%2F4031390532-files.gitbook.io%2F~%2Ffiles%2Fv0%2Fb%2Fgitbook-legacy-files%2Fo%2Fspaces%252F-MTJ1qyFf3rQZjewhth_%252Favatar-1615657020974.png%3Fgeneration%3D1615657021220196%26alt%3Dmedia",
            factoryAddress: "0x0841BD0B734E4F5853f0dD8d7Ea041c241fb0Da6",
            routerAddress: "0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95"],
            },
            tokens: [
              Tokens["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"],
              Tokens["0x2170Ed0880ac9A755fd29B2688956BD959F933F8"],
              Tokens["0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95"],
              Tokens["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"],
              Tokens["0x55d398326f99059fF775485246999027B3197955"],
              Tokens["0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"],
              Tokens["0xeD00Fc7D48B57B81FE65D1cE71c0985e4CF442CB"],
              Tokens["0xe0F94Ac5462997D2BC57287Ac3a3aE4C31345D66"],
            ],
          },
          Orion: {
            name: "Orion",
            logo: "https://ipfs.near.social/ipfs/bafkreidzcztdcx6mez6hhhmhglfv7m7vh45ijgshmikhnforoksmbczlrq",
            factoryAddress: "0xE52cCf7B6cE4817449F2E6fA7efD7B567803E4b4",
            routerAddress: "0x45A664993f6c3e978A1257c6EF7bBB512af9F098",
            uniType: "v2",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0xe4CA1F75ECA6214393fCE1C1b316C237664EaA8e"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0x2170Ed0880ac9A755fd29B2688956BD959F933F8"],
              Tokens["0xe4CA1F75ECA6214393fCE1C1b316C237664EaA8e"],
              Tokens["0xa2B726B1145A4773F68593CF171187d8EBe4d495"],
              Tokens["0x55d398326f99059fF775485246999027B3197955"],
              Tokens["0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"],
              Tokens["0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"],
            ],
          },
          "THENA V1": {
            name: "THENA V1",
            logo: "https://ipfs.near.social/ipfs/bafkreidps2jipljarabsxbqtiuj6lyupfhvpsesiffmsjzjt4zb73r7qfq",
            factoryAddress: "0xAAA35aaEa18B0187E82A3A7f2996C9ee7Bad9696",
            routerAddress: "0xd4ae6eca985340dd434d38f470accce4dc78d109",
            uniType: "solidly",
            defaultCurrencies: {
              input: Tokens["native"],
              output: Tokens["0x55d398326f99059fF775485246999027B3197955"],
            },
            tokens: [
              Tokens["native"],
              Tokens["0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11"],
              Tokens["0x55d398326f99059fF775485246999027B3197955"],
              Tokens["0xCdC3A010A3473c0C4b2cB03D8489D6BA387B83CD"],
              Tokens["0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827"],
              Tokens["0x2170Ed0880ac9A755fd29B2688956BD959F933F8"],
              Tokens["0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d"],
              Tokens["0x64048A7eEcF3a2F1BA9e144aAc3D7dB6e58F555e"],
              Tokens["0x1bdd3Cf7F79cfB8EdbB955f20ad99211551BA275"],
              Tokens["0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c"],
              Tokens["0xc2E9d07F66A89c44062459A47a0D2Dc038E4fb16"],
            ],
          },
        },
        amountOutFn: "bluebiu.near/widget/Arbitrum.Swap.AmountOutV2",
        handlerV2: "bluebiu.near/widget/Arbitrum.Swap.HandlerV2",
        QuoterSolidly: "bluebiu.near/widget/Arbitrum.Swap.QuoterSolidly",
        handlerSolidly: "bluebiu.near/widget/Arbitrum.Swap.handlerSolidly",
      }}
    />
  </Container>
);
