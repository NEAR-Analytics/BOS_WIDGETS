const Page = styled.div`
  position: relative;
`

const Container = styled.div`
   display: flex;
   .containerItem{
    flex: 1;
    margin-right: 24px;
    margin-bottom: 24px;
   }
   @media (max-width: 900px) {
    display:none;
    .containerItem{
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
    display:none;
    }
`
const Tab = styled.div`
    display: flex;
    margin-left:auto;
    gap: 1px;
    background:rgba(76, 80, 107, 1);
    border-radius: 8px;
    padding:3px;
    height: 36px;
    line-height:20px;
    margin-bottom:26px;
`;
const TabItem = styled.div`
    border-radius: 8px;
    flex: 1;
    padding: 6px 8px;
    font-size: 14px;
    font-weight:500;
    cursor: pointer;
    color:${(props) => props.isActive ? '#181A27' : '#979ABE'};
    background: ${(props) => (props.isActive) ? "#E9F456" : "#4C506B"};    
`;

const Search = styled.div`
display: flex;
position: absolute;
top: -60px;
right: 180px;
  input{
     color: #ffffff;
     background: transparent;
     border: none;
     border-bottom: 1px #373A53 solid;
     padding-right: 24px;
   }
   input:focus {
     outline: none;
     color: #ffffff;
     background: transparent;
     border: none;
     box-shadow: none;
     border-bottom: 1px #373A53 solid;
   }
   svg {
    margin-left: -24px;
    margin-top:10px;
  }
  @media (max-width: 900px) {
    display:none;
  }
`;

const ContaineMobile = styled.div`
  display: none;
  @media (max-width: 900px) {
    display:block;
  }
`

const data = [
  {
    title: 'NEAR',
    src: 'near.org',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreigbanjhoyscw22thkpqr7filqw7ijv3gl7ol7zxjsteqh73b4tjzm',
    chainId: '1313161554',
    technology: 'NEAR Protocol',
    bgColor: '#21AB8A',
    token: 'NEAR',
    childen: [
      {
        name: 'NEAR All-in-one',
        icon: 'https://ipfs.near.social/ipfs/bafkreigq5clxrflxne3bwmtxhwmji774eye5hm6nlrbospjaljuocesyuy',
        tags: ["Bridge", "Dexes", "Lending", "Staking"],
      },
      {
        name: 'NEAR Staking',
        icon: 'https://ipfs.near.social/ipfs/bafkreihiv2dr4rruznpehhd7eoxaem2otpokj7y2uj6tzqpgmb2otlcynq',
        tags: ["Staking"],
      }
    ],
    new: false,
    opacity: false,
  },
  {
    title: 'Polygon zkEVM',
    src: 'polygon.technology/polygon-zkevm',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreibn7uyk2occlbrhdhb7nwcd7s3b4gxdrqadc6rghxzu6d7oh75wja',
    chainId: '1101 (0x44d)',
    technology: 'ZK Rollup',
    bgColor: '#794FDD',
    token: 'ETH',
    childen: [
      {
        name: 'Polygon zkEVM All-in-one',
        icon: 'https://ipfs.near.social/ipfs/bafkreig76pbidppzivd4upcnr5fij7pjcogtt2a72u3ttfni2infmxqlhm',
        tags: ["Dexes", "Bridge", "Lending", "Liquidity Manage"],
      },
      {
        name: 'ETH-Polygon zkEVM Bridge',
        icon: 'https://ipfs.near.social/ipfs/bafkreidudil2t6ecglawpninvt3k74g6bn33v34gahxvqyrsnojrz3sewy',
        tags: ["Bridge"],
      },
      {
        name: 'Polygon zkEVM Dex',
        icon: 'https://ipfs.near.social/ipfs/bafkreihbw36one4ytfwxyw5drrpu2a7kz4gm7q4wwrluzvke3wr7qd5tda',
        tags: ["Dexes"],
      },
      {
        name: 'Gamma-Polygon zkEVM',
        icon: 'https://ipfs.near.social/ipfs/bafkreibiadof4iyjdjjgqfzokkh7ol5ybc72zpi543gsxapvqj2x4t6hom',
        tags: ["Liquidity Manage"],
      },
      {
        name: 'AAVE v3',
        icon: 'https://ipfs.near.social/ipfs/bafkreig26prcw7wzmw3g2ylh2yrjzsijdvfacs36zznybslln3mxn53rki',
        tags: ["Lending"],
      }
    ],
    new: false,
    opacity: false,
  },
  {
    title: 'Base',
    src: 'base.org',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreick2vfuo3zjqrclgmdqeviwpddq7zwflxe75c45iq5sbih6hscaf4',
    chainId: '8453 (0x2105)',
    technology: 'Optimistic Rollup',
    bgColor: '#0042C1',
    token: 'TBD🔥',
    childen: [
      {
        name: 'BASE All-in-one',
        icon: 'https://ipfs.near.social/ipfs/bafkreibenniuf3cuaf5ev77e4jbsz4y3dfrjs3agp2xvjbufpephbmk2ae',
        tags: ["Dexes", "Bridge"],
      },
      {
        name: 'BASE Dex',
        icon: 'https://ipfs.near.social/ipfs/bafkreidtr73enl2tsdp6h5pugw4h5dgi5g2ldhic7zcrpwijzxjogn75dm',
        tags: ["Dexes"],
      },
    ],
    new: true,
    opacity: false,
  },
  {
    title: 'Mantle',
    src: 'near.org',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreiaxfmzfdzciksyjjju4lvtyklb5txwmsj5nsnwoqqdfpp6vgyghoq',
    chainId: '5000 (0x1388)',
    technology: 'Optimistic Chain',
    bgColor: '#03514C',
    token: 'MNT',
    childen: [
      {
        name: 'Mantle All-in-one',
        icon: 'https://ipfs.near.social/ipfs/bafkreibxzdgxbkb4zok2u4pzrmjce6zhgmmp2fl4soqz5gqv7uzomhmzqe',
        tags: ["Bridge", "Dexes", "Lending", "Staking"],
      },
    ],
    new: false,
    opacity: false,
  },
  {
    title: 'zkSync',
    src: 'zksync.io',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreie3rxllt4uknrcjhqcldharoxad3bbkfhjbmeceapiefjyi77cewe',
    chainId: '324 (0x144)',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'TBD🔥',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Arbitrum',
    src: 'arbitrum.io',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreicllncakveo5yjhs6xru7y75d4u6hmszz6rvtzgsvlcxmoxfkzqi4',
    chainId: '42161 (0xa4b1) ',
    technology: 'Optimistic Chain',
    bgColor: '#373A53',
    token: 'ARB',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Avalanche',
    src: 'avax.network',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreiac3ckkfhrxdwhqwvznrkcwj3nmrxpu6wywirpoza32p3lpjsydnm',
    chainId: '43114 (0xa86a)',
    technology: 'Optimistic Rollup',
    bgColor: '#373A53',
    token: 'AVAX',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'BSC',
    src: 'bnbchain.org',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreihd5x2zp6pctt2oyzlggezm5av6nbb3bm4m35rgohgr3nnxutsply',
    chainId: '10',
    technology: 'Optimistic Rollup',
    bgColor: '#373A53',
    token: 'OP',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Polygon',
    src: 'polygon.technology',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreie3rxllt4uknrcjhqcldharoxad3bbkfhjbmeceapiefjyi77cewe',
    chainId: '137 (0x89)',
    technology: 'Optimistic Rollup',
    bgColor: '#373A53',
    token: 'MATIC',
    childen: [],
    new: 0,
    opacity: true,
  },
  {
    title: 'optimism',
    src: 'optimism.io',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreidgmfb4v3hxoos7vve6d7thj7zdjzcgtd5k2dychpvv3ak3bxbgiq',
    chainId: '10',
    technology: 'Optimistic Rollup',
    bgColor: '#373A53',
    token: 'OP',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Linea',
    src: 'linea.build',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreieiiy47s274eawepifyyptsdx4n47b5lrcq6oqplmjnd45loescn4',
    chainId: '59144 (0xe708)',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'TBD🔥',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Scroll',
    src: 'scroll.io',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreiby3cyobzcghobisrmqfumunfixmnlu7dpmjwp6a2qo4qcultzbcq',
    chainId: '534352 (0x82750)',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'TBD🔥',
    childen: [],
    new: 0,
    opacity: true,
  },
  {
    title: 'Gnosis',
    src: 'metis.io',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreiea7fmpsak7jjgyzkpnrfs2r34z6ckwub6wzvyukqyuq3cixtzgde',
    chainId: '100 (0x64)',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'xDAI',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Taiko L2',
    src: 'taiko.xyz',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreie57upboqc2we3gwu36sxhfrkuzoivkzziwtuf3wjoz5ei37du6eu',
    chainId: '167005(0x28c5d)',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'TBD🔥',
    childen: [],
    new: false,
    opacity: true,
  },
  {
    title: 'Manta',
    src: 'manta.network',
    bannerIcon: 'https://ipfs.near.social/ipfs/bafkreictdfko5mdagu6fikha4wfhfabatru6ivwqhgssfb6h7335nrg4qy',
    chainId: '3441005',
    technology: 'ZK Rollup',
    bgColor: '#373A53',
    token: 'TBD🔥',
    childen: [],
    new: false,
    opacity: true,
  },
]

const SearchIcon = (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#EBF479" strokeWidth="2" />
    <rect x="14.9141" y="9.64941" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9141 9.64941)" fill="#EBF479" />
  </svg>

);

const savedIsDeposit = Storage.get('isDeposit');

State.init({
  isDeposit: savedIsDeposit,
  searchValue: "",
});

const {
  isDeposit,
} = state;

const changeMode = (isDeposit) => {
  State.update({ isDeposit });
  Storage.set('isDeposit', isDeposit);
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
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
      />
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
              key={item.src + '-col-0-' + id}
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
              key={item.src + '-col-1-' + id}
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
              key={item.src + '-col-2-' + id}
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
          key={item.src + '-col-2-' + id}
          props={{
            ...item,
            isDeposit: state.isDeposit,
          }}
        />
      ))}
    </ContaineMobile>
  </Page>
);