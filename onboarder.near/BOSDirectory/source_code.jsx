const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const H1 = styled.h1`
  font-family: "FK Grotesk", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 90px;
  line-height: 1;
  text-align: center;
  letter-spacing: -0.03em;
  color: #000;
  margin: 0;
  max-width: 700px;

  span {
    display: inline-block;
    background: #6CE89F;
    border-radius: 20px;
    position: relative;
    padding: 0.1em 0.2em 0;

    svg {
      position: absolute;
      bottom: -8px;
      right: -10px;
      width: 24px;
    }
  }

  @media (max-width: 900px) {
    font-size: 50px;

    span {
      border-radius: 12px;
      svg {
        position: absolute;
        bottom: -6px;
        right: -7px;
        width: 16px;
      }
    }
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

const social = {
  data: [
    {
      key: 1,
      name: "NEAR Social",
      url: "https://near.social",
      image:
        "https://ipfs.near.social/ipfs/bafybeiewpf55q4ubml3cnbqdu62kamwyph2z4qqaiupz5md7ydlh4ghwwq",
      description:
        "Social Data Protocol On NEAR. The first gateway. Built in social features like custom domains, reports, link previews + more!",
      category: ["NEAR", "EVM", "Social"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnearsocial%2Fviewer&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist",
      github: "https://github.com/NEARSocial/viewer",
    },
    {
      key: 2,
      name: "NEAR",
      url: "https://near.org",
      image:
        "https://ipfs.near.social/ipfs/bafkreifv5wmqng43g3la2mgwenyhcuzp6g5grnp4ucrwqaciz2ibpqfdgi",
      description:
        "A new category that enables visionaries, builders, and believers to deliver on the promise of the Open Web. Built in EVM, FastAuth w/ Metatransactions",
      category: ["NEAR", "EVM", "Social"],
      deploy: null,
      github: "https://github.com/near/near-discovery",
    },
    {
      key: 2,
      name: "Mantle Gateway",
      url: "https://bos.fusionx.finance/",
      image:
        "https://ipfs.near.social/ipfs/bafybeiczyp75wbo73m45jwgntr6bkma2rhe6vjem3vac74vurlzu4533u4",
      description: "A Mantle gateway featuring top DeFi Apps on Mantle network",
      category: ["DeFi", "EVM", "Mantle"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneardefi%mantle-bos-gateway&build-command=pnpm%20run%20build&env=NEXT_PUBLIC_NETWORK_ID,NEXT_PUBLIC_HOSTNAME&envDescription=mainnet-near.org&envLink=https%3A%2F%2Fgithub.com%2FNearDeFi%2Fmantle-bos-gateway%2Fblob%2Fmain%2F.env.example",
      github: "https://github.com/NearDeFi/mantle-bos-gateway",
    },
    {
      key: 2,
      name: "zkEVM Gateway",
      url: "https://bos.quickswap.exchange",
      image:
        "https://ipfs.near.social/ipfs/bafkreifihbw7snvqkkhmicbr7x7jevtnw6mtvln4wlgmuq6jnhy4netyke",
      description:
        "A zkEVM by Quickswap featuring PancakeSwap, Quickswap, Gamma, and Balancer. ",
      category: ["DeFi", "EVM", "zkEVM"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneardefi%2Fpolygon-bos-gateway&build-command=pnpm%20run%20build&env=NEXT_PUBLIC_NETWORK_ID,NEXT_PUBLIC_HOSTNAME&envDescription=mainnet-near.org&envLink=https%3A%2F%2Fgithub.com%2FNearDeFi%2Fpolygon-bos-gateway%2Fblob%2Fmain%2F.env.example",
      github: "https://github.com/NearDeFi/polygon-bos-gateway",
    },
        {
      key: 2,
      name: "PotLock",
      url: "https://app.potlock.org",
      image:
        "https://ipfs.near.social/ipfs/bafkreid5dizxzafvgzzlcennqctrigkw5lnxjrhnrcznr4lie67cqjkrse",
      description:
        "Public goods funding ",
      category: ["NEAR", "PublicGoods", "zkEVM"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fneardefi%2Fpolygon-bos-gateway&build-command=pnpm%20run%20build&env=NEXT_PUBLIC_NETWORK_ID,NEXT_PUBLIC_HOSTNAME&envDescription=mainnet-near.org&envLink=https%3A%2F%2Fgithub.com%2Fpotlock%2Fbos-gateway%2Fblob%2Fmain",
      github: "https://github.com/potlock/bos-gateway",},
 
    {
      key: 5,
      name: "DiscoverBOS",
      url: "https://discoverBOS.org/",
      image:
        "https://ipfs.near.social/ipfs/bafkreibvkbftan5qp7z3bfhhug4wyylv4jqusagxghaay23ur6h55pxr6a",
      description:
        "Discover • Explore • Connect • Learn about the World of BOS",
      category: ["NEAR", "Ecosystem"],
      deploy: null,
      github: "https://github.com/NEARBuilders/discoverbos",
    },
    {
      key: 5,
      name: "Calimero Chat",
      url: "https://portal.calimero.network/",
      image:
        "https://ipfs.near.social/ipfs/bafkreid3dxlktgfofh5quqozhpjodbcwz35tr7mmfym324qckssaizqkgy",
      description: "Decentralized slack on Calimero's community shard",
      category: ["Chat", "Social", "NEAR"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "Coin98 dApp Store",
      url: "https://dapps.coin98.com/menu/bos",
      image:
        "https://ipfs.near.social/ipfs/bafkreif2drapmwrnkuesydwvs33oalc5znw3zfhhmccicrsh5fz3ndumg4",
      description:
        "r dapp store offers hassle-free interaction with the most exciting L2s in the market.",
      category: ["DeFi", "EVM"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "DapDap",
      url: "https://alpha.dapdap.net/",
      image:
        "https://ipfs.near.social/ipfs/bafkreienulavlellluopn6eq7432xjeczfajvdjkdvnsvvsdz52ekodkdm",
      description:
        "Your universal entry point to L2s. All of DeFi in one stop.",
      category: ["DeFi", "EVM"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "Uniswap on Linea",
      url: "https://linea.dapdap.net/",
      image:
        "https://ipfs.near.social/ipfs/bafkreiha2jdblwwbcj63b5u5huxlapicovlaxrvfshym2tqp7ghf42jzdq",
      description: "Uniswap V3 on Linea w no fees",
      category: ["DeFi", "EVM", "Linea"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "Jutsu.ai",
      url: "https://jutsu.ai/",
      image:
        "https://ipfs.near.social/ipfs/bafkreibihmmux4uch7tmbf3k5zgbkapacronaamhmsyqb6g6nmem2tgnwy",
      description:
        "A gateway dedicated to developers. Switch between testnet, built in tutorials, easily estimate storage costs, and collaborate live",
      category: ["Dev", "EVM"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "Flipside Crypto",
      url: "https://bos.flipsidecrypto.xyz/",
      image:
        "https://ipfs.near.social/ipfs/bafkreiefoqklm6c6wl4gvzwdyrlu5sulatidglz5le2gjwdrfr3hjtiyay",
      description: "Data analytics gateways",
      category: ["Data", "NEAR"],
      deploy: null,
      github: "https://github.com/FlipsideCrypto/near-bos-gateway",
    },

    {
      key: 5,
      name: "NDC",
      url: "https://app.neardc.org/",
      image:
        "https://ipfs.near.social/ipfs/bafkreifjozsyr2bmgth3holokwxv5uwzlhm5fggqozwznwyze46lexe4xy",
      description:
        "The NDC is a Grassroots Movement, led by the NEAR Community to create Decentralized Web 3.0 Governance on NEAR.",
      category: ["Social", "NEAR"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcodingshot%2Fneardc-gateway&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist",
      github: "https://github.com/codingshot/neardc-gateway",
    },
    {
      key: 5,
      name: "BuildDAO",
      url: "https://nearbuilders.org/",
      image:
        "https://ipfs.near.social/ipfs/bafybeiesuksvxvmsuv4cjqe4xb42zufidgarw6otdvpc7xxn6pd7kc4f6u",
      description: "Empowering builders for a multichain ecosystem",
      category: ["Social", "NEAR"],
      deploy: null,
      github: null,
    },

    {
      key: 4,
      name: "NEAR Atlas",
      url: "https://nearatlas.com/",
      image:
        "https://ipfs.near.social/ipfs/bafkreid4rcvq5gqjwydwsxkpgp3mpwddwsyoqrezzjd7kizfb3naonkx44",
      description:
        "A viewer for NEAR Analytics powered by the Flipside Crypto API built by the NEAR Foundation",
      category: ["NEAR", "Data"],
      deploy: null,
      github: null,
    },
    {
      key: 10,
      name: "ShardDog Social",
      url: "https://sharddog.social/",
      image:
        "https://ipfs.near.social/ipfs/bafkreibjlc2hyxfve55gp2fg6lojf6eliptgiiawprhbg4dyc2wbpzy7tm",
      description: "Token gated rich media supported social feeds",
      category: ["NEAR", "Social", "NFT"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoe-rlo%2FNearSocial-viewer&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist",
      github: "https://github.com/joe-rlo/NearSocial-viewer",
    },
    {
      key: 3,
      name: "Cantopia",
      url: "https://bos-viewer.pages.dev/",
      image:
        "https://ipfs.near.social/ipfs/bafkreifqzppapwceuwvecotf4uczonrc7gtvjqlmlxpy2hdo4hau3m6svm",
      description:
        "An example viewer of the Canto's blockchain, CantoSwap viewer",
      category: ["DeFi", "EVM", "Canto"],
      deploy: null,
      github: null,
    },
    {
      key: 3,
      name: "CPlanet",
      url: "https://cplanet.org/",
      image:
        "https://ipfs.near.social/ipfs/bafybeia3q6ea377j5zuvtzedjjbm6kin4dtecmwkbbpkujh7srhpsy2b2q",
      description: "The portal for creatives in the NEAR Ecosystem",
      category: ["Art", "NEAR", "NFT"],
      deploy: null,
      github: "https://github.com/Jikugodwill/bos-cplanet",
    },
    {
      key: 6,
      name: "Genadrop Gateway",
      url: "https://bos.genadrop.io/",
      image:
        "https://ipfs.near.social/ipfs/bafkreidx4rvihxc5ycpvlyaod7dscotlb6bmoffimjl7s2zvarhmxtymma",
      description: "A gateway dedicated to NFTs across different chains",
      category: ["NEAR", "EVM", "NFT"],
      deploy:
        "https://vercel.com/new/clone/hidden?repository-url=https%3A%2F%2Fgithub.com%2Fcodingshot%2Fgenadrop-bos&build-command=npm+run+build&install-command=npm+--force+install&output-directory=dist",
      github: "https://github.com/codingshot/genadrop-bos",
    },
    {
      key: 8,
      name: "Everything",
      url: "https://everything.dev/#/",
      image:
        "https://ipfs.near.social/ipfs/bafybeibfjlibj5bubf4sbwcis3wpmbmwhnpicsncniuzhe4ywpwp5muxqy",
      description: "Everything +  Data Visualizations for social.near",
      category: ["NEAR", "Data", "Dev"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnear-everything%2Fviewer%2Ftree%2Fmaster%2Fsrc",
      github: "https://github.com/near-everything/viewer/",
    },

    {
      key: 9,
      name: "Proof Of Vibes",
      url: "https://app.ProofOfVibes.com/",
      image:
        "https://ipfs.near.social/ipfs/bafkreievzivskwxnjqetpr2yc2yaxjzvpdn5w3fvmp67vknjvz5eotpfjq",
      description:
        "A feed of vibe checks and DAO dashboard for global network of tastemakers w/ SBT + NFT integration",
      category: ["NFT", "NEAR", "Social"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnearbos%2Fvibes-bos&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist",
      github: "https://github.com/nearbos/vibes-bos",
    },
    {
      key: 10,
      name: "BOS HACKS",
      url: "https://boshacks.com/",
      image:
        "https://ipfs.io/ipfs/bafkreifx6figu3o7xurc3coshzfewhcujczl62emuf3g4gof4ftjbqkvhi",
      description: "BOS HACKS gateway and hackathon platform",
      category: ["Hackathon", "NEAR", "Social"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcodingshot%2Fboshacks&build-command=npm%20run%20build&install-command=npm%20--force%20install&output-directory=dist",
      github: "https://github.com/codingshot/boshacks/",
    },
    {
      key: 9,
      name: "Harmonic Guild",
      url: "https://gateway.harmonicguild.io/",
      image:
        "https://ipfs.near.social/ipfs/bafkreigdysucr6zujjhgl6et3ba6sdops3hyjjwwlw7upb2byd22eht53u",
      description: "Music distribution platform on NEAR",
      category: ["NFT", "NEAR", "Music"],
      deploy:
        "https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fharmonic-guild%2Fviewer%2Ftree%2Ffathom",
      github: "https://github.com/Harmonic-Guild/viewer",
    },
    {
      key: 7,
      name: "Welldone Gateway",
      url: "https://welldone-gateway.vercel.app/",
      image:
        "https://ipfs.near.social/ipfs/bafkreiayw3qfvtg7sspgs3vquvrkqa467ju7vwkudyxlkkvu7nv5r6p2ka",
      description:
        "Welldone Gateway uses the Welldone Wallet to Swap on Sui, Aptos, NEAR and ETH (currently on testnet)",
      category: ["NEAR", "Sui", "Aptos"],
      deploy: null,
      github: null,
    },
  ],
};

State.init({ uniqueCategories: null, searchValue: null });
const setCategories = () => {
  const categoriesList = [];
  social.data.map((gateway) => categoriesList.push(...gateway.category));

  // console.log(categoriesList);
  const cats = [
    "All",
    ...categoriesList.filter(
      (gateway, index) => categoriesList.indexOf(gateway) === index
    ),
  ];
  //   console.log(cats);
  State.update({
    uniqueCategories: cats,
  });
};
setCategories();

const Cards = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 4rem;
`;

const Card = styled.div`
  width: 25%;
  min-width: 250px;
  display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   align-items:center;
  //  background-color:#09011a;
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.1);
  box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 8px;
  //  color: #fff;
   margin: 0 auto;
   max-width: 400px;
   flex:1;
   &:hover img{
     transform:scale(1.05);
   }
   & img{
    width: 100%;
    height: 100%;
    object-fit:cover;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
   }
`;

const Hero = styled.div`
  height: 20vh;
  display: flex;
  align-items:center;
  justify-content: center;
  align-content:center;
  // background-color:#09011a;
  // color: white;
`;

const CardHeading = styled.h5`
  font-size: 1.25rem;
  font-weght: 500;
  color:#09011a;
`;

const Text = styled.div`
  opacity: .6;
`;

const ImageCard = styled.div`
  height:200px;
  width: 100%;
  border-radius: inherit;
  overflow:hidden;
  margin-bottom: .5rem;
  &>img{
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  }
  &>img:hover{
    transform:scale(1.05);
  }
`;

const displayCategories = (value) => {
  state.searchValue !== null;
  value = value.join(" ");
  State.update({ searchValue: value });
  console.log("search value", state.searchValue);

  const newArray = social.data.filter((item) =>
    item.category.join(" ").includes(state.searchValue)
  );
  //   social.data.filter((item) =>
  //     item.category.some((cat) => {
  //       //   console.log("cat", cat);
  //       return cat.includes(state?.searchValue);
  //     })
  //   );
  console.log(
    "searched",
    // social.data.filter((item) =>
    //   item.category.join(" ").includes(state.searchValue)
    // )
    // currentCat.filter((cat) => cat.includes(state.searchValue))
    newArray
  );
  const dataNow = allCategories(newArray);
  //   console.log(
  //     "data:",
  //     social.data.map((item) => item.category.join(" "))
  //   );
  State.update({
    viewableCats: dataNow,
  });
};

const words = ["hello", "world", "hi", "there"];
const search = "hello";

const result = words.filter((word) => search.includes(word));
console.log(result);

const allCategories = (filteredCats) =>
  filteredCats.map((gateway) => (
    <Card key={gateway.key}>
      <ImageCard>
        <a href={gateway.url} target="_blank" rel="noopener noreferrer">
          <img src={gateway.image} alt="..." />
        </a>
      </ImageCard>
      <div className="card-body p-2 mt-3">
        <CardHeading>{gateway.name}</CardHeading>
        <Text className="pb-3 text-secondary">
          {`${gateway.description.trim().slice(0, 36)}...`}
        </Text>
      </div>
      {false && <div>{gateway.category.map((cat) => cat).join(" ")}</div>}

      <div className="row my-3">
        <div className="d-flex justify-content-between">
          <div className="float-left mx-3">
            {gateway.github && (
              <Widget
                src="ndcplug.near/widget/Deploy.GithubButton"
                props={{ link: gateway.github }}
              />
            )}
          </div>
          {gateway.deploy && (
            <Widget
              src="ndcplug.near/widget/Deploy.VercelButton"
              props={{ link: gateway.deploy }}
            />
          )}
        </div>
      </div>
    </Card>
  ));

const dispData = null;
if (!state.searchValue || state.searchValue === "") {
  dispData = allCategories(social.data);
} else if (state.viewableCats.length > 0) {
  dispData = state.viewableCats;
} else {
  dispData = "No gateways found with all these categories";
}
return (
  <div className="row">
    <Wrapper>
      <Container>
        <H1>
          Gateway{" "}
          <span>
            {" "}
            Directory{" "}
            <svg viewBox="0 0 26 24" fill="none" aria-hidden="true">
              <path
                d="M24.3767 8.06326L1.51965 0.0649912C1.10402 -0.0830767 0.639031 0.026026 0.327308 0.340346C0.0181841 0.657263 -0.0831256 1.12225 0.0701378 1.53788L8.071 23.2519C8.23726 23.7013 8.66587 24 9.14385 24H9.14644C9.62702 24 10.0556 23.6961 10.2167 23.2441L13.734 13.495L24.3325 10.2349C24.8053 10.0895 25.13 9.65824 25.1378 9.16468C25.1482 8.67112 24.8391 8.22691 24.3715 8.06326H24.3767Z"
                fill="#323330"
              />
            </svg>
          </span>
        </H1>
      </Container>
    </Wrapper>
    <div className="input-group  row w-75 text-center mx-auto">
      <Typeahead
        options={state.uniqueCategories.slice(1)}
        multiple
        onChange={(value) => {
          displayCategories(value);
        }}
        placeholder="Choose a tag to filter..."
      />
    </div>
    <Cards>{dispData}</Cards>
  </div>
);
