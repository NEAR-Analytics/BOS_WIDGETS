const Page = styled.div`
  position: relative;
  @media (max-width: 900px) {
    padding: 0px 12px;
  }
`;

const Container = styled.div`
  display: flex;
  .containerItem {
    flex: 1;
    margin-right: 24px;
    margin-bottom: 24px;
  }
  @media (max-width: 900px) {
    display: none;
    .containerItem {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const Switcher = styled.div`
  position: absolute;
  top: -60px;
  right: 0;
  @media (max-width: 900px) {
    display: none;
  }
`;
const Tab = styled.div`
  display: flex;
  margin-left: auto;
  gap: 1px;
  background: rgba(76, 80, 107, 1);
  border-radius: 8px;
  padding: 3px;
  height: 36px;
  line-height: 20px;
  margin-bottom: 26px;
`;
const TabItem = styled.div`
  border-radius: 8px;
  flex: 1;
  padding: 6px 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  color: ${(props) => (props.isActive ? "#181A27" : "#979ABE")};
  background: ${(props) => (props.isActive ? "#E9F456" : "#4C506B")};
`;

const Search = styled.div`
  display: flex;
  position: absolute;
  top: -60px;
  right: 180px;
  input {
    color: #ffffff;
    background: transparent;
    border: none;
    border-bottom: 1px #373a53 solid;
    padding-right: 24px;
  }
  input:focus {
    outline: none;
    color: #ffffff;
    background: transparent;
    border: none;
    box-shadow: none;
    border-bottom: 1px #373a53 solid;
  }
  svg {
    margin-left: -24px;
    margin-top: 10px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const ContaineMobile = styled.div`
  display: none;
  @media (max-width: 900px) {
    display: block;
  }
`;

const data = [
  {
    title: "NEAR",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreigbanjhoyscw22thkpqr7filqw7ijv3gl7ol7zxjsteqh73b4tjzm",
    src: "near.org",
    pathUrl: '/near',
    chainId: "1313161554",
    technology: "NEAR Protocol",
    token: "NEAR",
    bgColor: "#21AB8A",
    new: false,
    opacity: false,
    childen: [
      {
        name: "NEAR All-in-one",
        icon: "https://ipfs.near.social/ipfs/bafkreigq5clxrflxne3bwmtxhwmji774eye5hm6nlrbospjaljuocesyuy",
        widgetSrc: "juaner.near/widget/ref-home",
        tags: ["Bridge", "Dexes", "Lending", "Staking"],
      },
      {
        name: "NEAR-Ethereum Bridge",
        icon: "https://ipfs.near.social/ipfs/bafkreidt7vuqqkkdhq4hm24izay4y7vrratoju3jou6szecv3xvuv5a3b4",
        tags: ["Bridge"],
        widgetSrc: "/rainbow-bridge",
      },
      {
        name: "Near Staking Collection",
        icon: "https://ipfs.near.social/ipfs/bafkreihiv2dr4rruznpehhd7eoxaem2otpokj7y2uj6tzqpgmb2otlcynq",
        tags: ["Staking"],
        widgetSrc: "ref-admin.near/widget/xBox",
      },
      {
        name: "Metapool",
        icon: "https://ipfs.near.social/ipfs/bafkreigfx7sqaspeqr2unhh6zydyk6b5lsifpypmqs256g6coq2tfutvju",
        tags: ["Staking"],
        widgetSrc: "bluebiu.near/widget/MetaPool.Stake",
      },
    ],
  },
  {
    title: "Polygon zkEVM",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreibn7uyk2occlbrhdhb7nwcd7s3b4gxdrqadc6rghxzu6d7oh75wja",
    src: "polygon.technology/polygon-zkevm",
    pathUrl: '/polygon-zkevm',
    chainId: "1101 (0x44d)",
    technology: "ZK Rollup",
    token: "MATIC",
    bgColor: "#794FDD",
    new: false,
    opacity: false,
    childen: [
      {
        name: "Polygon zkEVM All-in-one",
        icon: "https://ipfs.near.social/ipfs/bafkreig76pbidppzivd4upcnr5fij7pjcogtt2a72u3ttfni2infmxqlhm",
        tags: ["Dexes", "Bridge", "Lending", "Liquidity Manage"],
        widgetSrc: "bluebiu.near/widget/ZKEVM-all-in-one",
      },
      {
        name: "ETH-Polygon zkEVM Bridge",
        icon: "https://ipfs.near.social/ipfs/bafkreidudil2t6ecglawpninvt3k74g6bn33v34gahxvqyrsnojrz3sewy",
        tags: ["Bridge"],
        widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-bridge",
      },
      {
        name: "Polygon zkEVM Dex",
        icon: "https://ipfs.near.social/ipfs/bafkreihbw36one4ytfwxyw5drrpu2a7kz4gm7q4wwrluzvke3wr7qd5tda",
        tags: ["Dexes"],
        widgetSrc: "guessme.near/widget/ZKEVMSwap.zkevm-swap",
      },
      {
        name: "Gamma-Polygon zkEVM",
        icon: "https://ipfs.near.social/ipfs/bafkreibiadof4iyjdjjgqfzokkh7ol5ybc72zpi543gsxapvqj2x4t6hom",
        tags: ["Liquidity Manage"],
        widgetSrc: "guessme.near/widget/ZKEVM.GAMMA",
      },
      {
        name: "0vix Lending",
        icon: "https://ipfs.near.social/ipfs/bafkreihf73onkriuxrajsirkm2usq2kgzdb4ectoewn3f77oe5yurjdpn4",
        tags: ["Lending"],
        widgetSrc: "bluebiu.near/widget/0vix.Lending",
      },
    ],
  },
  {
    title: "Mantle",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiaxfmzfdzciksyjjju4lvtyklb5txwmsj5nsnwoqqdfpp6vgyghoq",
    src: "mantle.xyz",
    pathUrl: '/mantle',
    chainId: "5000 (0x1388)",
    technology: "Optimium",
    token: "MNT",
    bgColor: "#03514C",
    new: true,
    opacity: false,
    childen: [
      {
        name: "Mantle All-in-one",
        icon: "https://ipfs.near.social/ipfs/bafkreibxzdgxbkb4zok2u4pzrmjce6zhgmmp2fl4soqz5gqv7uzomhmzqe",
        tags: ["Dexes", "Bridge"],
      },
      {
        name: "Mantle Dex Collection",
        icon: "https://ipfs.near.social/ipfs/bafybeihwxgpyehxj4htnu4xlfj23qlkr3efckx5dqun32hyfsokji2xg7a",
        tags: ["Dexes"],
        widgetSrc: "bluebiu.near/widget/Mantle.Swap",
      },
    ],
  },
  {
    title: "Base",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreick2vfuo3zjqrclgmdqeviwpddq7zwflxe75c45iq5sbih6hscaf4",
    src: "base.org",
    pathUrl: '/base',
    chainId: "8453 (0x2105)",
    technology: "Optimistic Rollup",
    token: "TBD🔥",
    bgColor: "#0042C1",
    new: true,
    opacity: false,
    childen: [
      {
        name: "BASE All-in-one",
        icon: "https://ipfs.near.social/ipfs/bafkreibenniuf3cuaf5ev77e4jbsz4y3dfrjs3agp2xvjbufpephbmk2ae",
        tags: ["Dexes", "Bridge"],
      },
      {
        name: "BASE Dex Collection",
        icon: "https://ipfs.near.social/ipfs/bafkreidtr73enl2tsdp6h5pugw4h5dgi5g2ldhic7zcrpwijzxjogn75dm",
        tags: ["Dexes"],
        widgetSrc: "bluebiu.near/widget/Base.BaseDex",
      },
    ],
  },
  {
    title: "BSC",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreicps7mvmngueqhfu5xdnyz72eaxvdy425svdth3nwjnnjvzlq7woa",
    src: "bnbchain.org",
    chainId: "56 (0x38)",
    technology: "EVM",
    token: "BNB",
    bgColor: "#D7AA3E",
    new: true,
    opacity: false,
    childen: [{
      name: "BSC Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreiey6kxcanznfeby76mu4pmt5dshrl3vxozk2z2msjpshgr6e7gcmq",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Bsc.Swap.Dex",
    },],
  },
  {
    title: "Arbitrum",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreicllncakveo5yjhs6xru7y75d4u6hmszz6rvtzgsvlcxmoxfkzqi4",
    src: "arbitrum.io",
    chainId: "42161 (0xa4b1) ",
    technology: "Optimistic Rollup",
    token: "ARB",
    bgColor: "#33549C",
    new: true,
    opacity: false,
    childen: [{
      name: "Arbitrum Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreif46wmrr5gncdechco4ahfenxkqlpnpvao3r4bocxc7cqqkuvpvwu",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Arbitrum.Swap.Dex",
    }, {
      name: "Pendle",
      icon: "https://ipfs.near.social/ipfs/bafkreicve6gai55aod5yi3rte6em2krobbts2ybfqnhf4t2ktsa35kjcdi",
      tags: ["Yield"],
      widgetSrc: "bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets",
    },],
  },
  {
    title: "Polygon",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreigcm4smhy5x5i4sf74c52rnpbk7lhxlh5jmfdp3pjra6kl2wwu4vu",
    src: "polygon.technology",
    chainId: "137 (0x89)",
    technology: "-",
    token: "MATIC",
    bgColor: "#4C0098",
    new: true,
    opacity: false,
    childen: [{
      name: "Polygon Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreif3ojgwn5pv4n3tnturq3ard3czyzwkey3nxlet6wadivmsxjiumu",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Polygon.Swap.Dex",
    }],
  },
  {
    title: "optimism",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreidgmfb4v3hxoos7vve6d7thj7zdjzcgtd5k2dychpvv3ak3bxbgiq",
    src: "optimism.io",
    chainId: "10 (0xa)",
    technology: "Optimistic Rollup",
    token: "OP",
    bgColor: "#373A53",
    new: false,
    opacity: true,
    childen: [],
  },
  {
    title: "Avalanche",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiac3ckkfhrxdwhqwvznrkcwj3nmrxpu6wywirpoza32p3lpjsydnm",
    src: "avax.network",
    chainId: "43114 (0xa86a)",
    technology: "Optimistic Rollup",
    token: "AVAX",
    bgColor: "#373A53",
    new: false,
    opacity: true,
    childen: [],
  },
  {
    title: "zkSync",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreie3rxllt4uknrcjhqcldharoxad3bbkfhjbmeceapiefjyi77cewe",
    src: "zksync.io",
    chainId: "324 (0x144)",
    technology: "ZK Rollup",
    token: "TBD🔥",
    bgColor: "#3B6BDC",
    new: true,
    opacity: false,
    childen: [{
      name: "zkSync Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreigomjjvfq2l6ob6pqokc5hn2tjvwc4kzt3h4y6jcmtjnbpclcff6m",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/zkSync.Swap.Dex",
    }],
  },
  {
    title: "Linea",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreieiiy47s274eawepifyyptsdx4n47b5lrcq6oqplmjnd45loescn4",
    src: "linea.build",
    chainId: "59144 (0xe708)",
    technology: "ZK Rollup",
    token: "TBD🔥",
    bgColor: "#218FBE",
    new: true,
    opacity: false,
    childen: [{
      name: "Linea Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreidje7lrgeyfxl2hybj5jl2in2uzo23v73wnodqfg3gdppk2lffety",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Linea.Swap.Dex",
    }, {
      name: "Gamma",
      icon: "https://ipfs.near.social/ipfs/bafkreibiadof4iyjdjjgqfzokkh7ol5ybc72zpi543gsxapvqj2x4t6hom",
      tags: ["Liquidity Manage"],
      widgetSrc: "bluebiu.near/widget/Linea.Liquidity.GAMMA.GAMMA",
    },],
  },
  {
    title: "Scroll",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiby3cyobzcghobisrmqfumunfixmnlu7dpmjwp6a2qo4qcultzbcq",
    src: "scroll.io",
    chainId: "534352 (0x82750)",
    technology: "ZK Rollup",
    token: "TBD🔥",
    bgColor: "#373A53",
    new: 0,
    opacity: true,
    childen: [],
  },
  {
    title: "Gnosis",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiea7fmpsak7jjgyzkpnrfs2r34z6ckwub6wzvyukqyuq3cixtzgde",
    src: "gnosis.io",
    chainId: "100 (0x64)",
    technology: "ZK Rollup",
    token: "GNO",
    bgColor: "#04795B",
    new: true,
    opacity: false,
    childen: [{
      name: "Gnosis Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreif7rumkd7zlfy2ihuvbfwexrpfx6sjckdts2jfrgeh7itmhny54gq",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Gnosis.Swap.Dex",
    },],
  },
  {
    title: "Metis",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiap675hyi2p4dav6pogmtwjqnlkzr55bsvn3n7v7siuq5tb4rgeda",
    src: "metis.io",
    chainId: "1088 (0x440)",
    technology: "ZK Rollup",
    token: "METIS",
    bgColor: "#008E85",
    new: true,
    opacity: false,
    childen: [{
      name: "Metis Dex Collection",
      icon: "https://ipfs.near.social/ipfs/bafkreihhxzxqqdjoxe7kjef76apqgnsxz6yqutf3uyh3yjlbttg7lgel7i",
      tags: ["Dexes"],
      widgetSrc: "bluebiu.near/widget/Metis.Swap.Dex",
    },],
  },
  {
    title: "BeraChain",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreib6czzrb6gsnhggbvpdciz7fc5fuiugqr4btsi63xh46bg6n3zwye",
    src: "berachain.com",
    chainId: "-",
    technology: "-",
    token: "TBD🔥",
    bgColor: "#373A53",
    new: false,
    opacity: true,
    childen: [],
  },
  {
    title: "Monad",
    src: "monad.xyz",
    chainId: "-",
    technology: "-",
    token: "TBD🔥",
    bgColor: "#373A53",
    new: false,
    opacity: true,
    childen: [],
  },
  {
    title: "Taiko L2",
    bannerIcon:
      "https://ipfs.near.social/ipfs/bafkreiemi6v6uy2aaizz2v33mapkyngyxtjirq5ojdx4q2ofkd3xhl3fj4",
    src: "taiko.xyz",
    chainId: "167005(0x28c5d)",
    technology: "ZK Rollup",
    token: "TBD🔥",
    bgColor: "#373A53",
    new: false,
    opacity: true,
    childen: [],
  },
];

const SearchIcon = (
  <svg
    width="21"
    height="15"
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7.01829"
      cy="7.01829"
      r="6.01829"
      stroke="#EBF479"
      strokeWidth="2"
    />
    <rect
      x="14.9141"
      y="9.64941"
      width="6.141"
      height="2.63186"
      rx="1.31593"
      transform="rotate(30 14.9141 9.64941)"
      fill="#EBF479"
    />
  </svg>
);

const savedIsDeposit = Storage.get("isDeposit");

State.init({
  isDeposit: savedIsDeposit,
  searchValue: "",
});

const { isDeposit } = state;

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
  Storage.set("isDeposit", isDeposit);
};

const handleSearchChange = (e) => {
  const value = e.target.value;
  State.update({
    searchValue: value,
  });
};

const filteredData = data.filter((item) =>
  item.title.toLowerCase().includes(state.searchValue.toLowerCase())
);

return (
  <Page>
    <Search>
      <input type="text" value={searchValue} onChange={handleSearchChange} />
      {SearchIcon}
    </Search>
    <Switcher>
      <Tab>
        <TabItem isActive={isDeposit} onClick={() => changeMode(true)}>
          Collapse
        </TabItem>
        <TabItem isActive={!isDeposit} onClick={() => changeMode(false)}>
          Expand
        </TabItem>
      </Tab>
    </Switcher>

    <Container>
      <div className="containerItem">
        {filteredData
          .filter((_, index) => index % 3 === 0)
          .map((item, id) => (
            <Widget
              src="bluebiu.near/widget/AllChains.AllChainsPageCard"
              key={item.src + "-col-0-" + id}
              props={{
                ...item,
                isDeposit: state.isDeposit,
              }}
            />
          ))}
      </div>
      <div className="containerItem">
        {filteredData
          .filter((_, index) => index % 3 === 1)
          .map((item, id) => (
            <Widget
              src="bluebiu.near/widget/AllChains.AllChainsPageCard"
              key={item.src + "-col-1-" + id}
              props={{
                ...item,
                isDeposit: state.isDeposit,
              }}
            />
          ))}
      </div>
      <div className="containerItem">
        {filteredData
          .filter((_, index) => index % 3 === 2)
          .map((item, id) => (
            <Widget
              src="bluebiu.near/widget/AllChains.AllChainsPageCard"
              key={item.src + "-col-2-" + id}
              props={{
                ...item,
                isDeposit: state.isDeposit,
              }}
            />
          ))}
      </div>
    </Container>

    <ContaineMobile>
      {data.map((item) => (
        <Widget
          src="bluebiu.near/widget/AllChains.AllChainsPageCard"
          key={item.src + "-col-2-" + id}
          props={{
            ...item,
            isDeposit: state.isDeposit,
          }}
        />
      ))}
    </ContaineMobile>
  </Page>
);
