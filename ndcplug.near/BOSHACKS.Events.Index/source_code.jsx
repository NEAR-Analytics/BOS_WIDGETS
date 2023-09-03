/**
 * add filter for active and inactive and order acocrdingly
 * add prize amount
 * add date
 */
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

const hackathons = {
  data: [
    {
      key: 1,
      name: "BOS HACKS",
      url: "https://boshacks.com",
      image:
        "https://ipfs.near.social/ipfs/bafkreihkncb6ywpzwma7y4ocu6uip5yaxdz6zrhj75cgqeanhmivxr6xaq",
      description: "Virtual BOS native hackathon",
      category: ["IRL", "Hybrid", "Virtual", "BOS", "Multichain"],
      startDate: "8/25/2023",
      endDate: "9/10/2023",
      prizeAmount: "$17,000+",
      done: false,
      active: true,
      irlOnly: false,
    },
    {
      key: 2,
      name: "Web3Hackfest",
      url: "https://web3-hackfest.devfolio.co/",
      image:
        "https://web3-hackfest.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fa909e17962464185b4c03ef8f138d54c%2Fassets%2Fcover%2F231.png&w=1440&q=100",
      description:
        "large-scale hackathon festival for web2 & web3 startup builders, developers, and creators with a series of multichain developer bootcamps and workshops, sponsored by DevHub, Pagoda, Proximity Lab, Near Foundation, Web3Foundation, QuillAudit",
      category: ["NEAR", "BOS", "Social"],
      startDate: "8/7/2023",
      endDate: "8/28/2023",
      prizeAmount: "$110,000+",
      done: false,
      active: true,
      irlOnly: false,
    },
    {
      key: 2,
      name: "EthAccra",
      url: "https://www.ethaccra.xyz/",
      image:
        "https://ipfs.near.social/ipfs/bafkreibekiy4427bxa5glk7jgcdjxqehvgexa6y4mfyhxxzopix7qayyxq",
      description:
        "West Africa’s first Ethereum Event. ETHAccra will bring the Ethereum community to the most crypto friendly city in the heart of West Africa. The goal is to learn, hack, discuss and celebrate the future of decentralisation. The use cases developed at ETHAccra should aim in transforming Africa, and the people here that are building them.",
      category: ["ETH", "BOS", "IRL"],
      startDate: "9/7/2023",
      endDate: "9/9/2023",
      prizeAmount: "?????+",
      done: false,
      active: true,
      irlOnly: true,
    },
    {
      key: 2,
      name: "Encode x NEAR Horizon Hackathon",
      url: "https://www.encode.club/encode-near-horizon-hackathon",
      image:
        "https://ipfs.near.social/ipfs/bafybeieginwovr7btytjiwk3jwplbggk7tt4qsxdj7gw6lepk5ndv3p44e",
      description:
        "A 4-week hackathon centred around building on NEAR Protocol as a part of the NEAR Horizon initiative to support builders.",
      category: ["NEAR", "BOS", "Virtual"],
      startDate: "9/19/2023",
      endDate: "10/15/2023",
      prizeAmount: "$23,000+",
      done: false,
      active: false,
      irlOnly: false,
    },
    {
      key: 2,
      name: "NEARCON 2023",
      url: "https://nearcon.org/",
      image:
        "https://pages.near.org/wp-content/uploads/2023/06/Screenshot-2023-06-06-at-4.11.07-PM-600x333.png",
      description: "The biggest experience of the year is near",
      category: ["NEAR", "IRL", "BOS"],
      startDate: "11/7/2023",
      endDate: "11/10/2023",
      prizeAmount: "$180,000+",
      done: false,
      active: false,
      irlOnly: true,
    },
    {
      key: 2,
      name: "Eth Global Istanbul",
      url: "https://ethglobal.com/events/istanbul/",
      image:
        "https://ipfs.near.social/ipfs/bafkreibuqi257bd3krfuh5oiqajbkumirrvv7ijk2wnqulwc6guy6rpxrm",
      description:
        "lFrom November 17-19, we are welcoming builders from all around the globe to shape the future of Ethereum with us at ETHGlobal Istanbul! We look forward to reconnecting with around 1500 community members from both, the vibrant local community of Ethereum enthusiasts and our international hackers, travelling from afar.",
      category: ["Eth", "BOS", "Multichain", "IRL"],
      startDate: "11/17/2023",
      endDate: "11/19/2023",
      prizeAmount: "$500,000+",
      done: false,
      active: false,
      irlOnly: true,
    },
    {
      key: 2,
      name: "Eth Global New York",
      url: "https://web3-hackfest.devfolio.co/",
      image:
        "https://ipfs.near.social/ipfs/bafkreidzojeraepu3rcibnzj3jzkebkannd6d3er5yl3gprposeanuvv5e",
      description:
        "New York: The city that never sleeps when it comes to pushing the boundaries. Home to the largest stock exchange and traditional financial institutions, New York is rich in history and significance. But New York is also the dynamic hub of change to be reckoned with. A nurturing ground for disrupting the way we think, shaping how we engage with this new world - and reimagining a decentralized, distributed future. Join us from September 22-24 in one of the most iconic cities in the world. Hack with some of the most skilled web3 developers, designers and product builders from all around the globe for a weekend-long adventure to advance the Ethereum ecosystem. We hope the stunning views of Pier Sixty will inspire you to try your best as you get a chance to win over $450,000 USD in prizes! ",
      category: ["Eth", "BOS", "IRL"],
      startDate: "9/22/2023",
      endDate: "9/24/2023",
      prizeAmount: "$450,000+",
      done: false,
      active: false,
      irlOnly: true,
    },
  ],
};

State.init({ uniqueCategories: null, searchValue: null });
const setCategories = () => {
  const categoriesList = [];
  hackathons.data.map((gateway) => categoriesList.push(...gateway.category));

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
  .prize-amount {
    background-color: gray;
    color: white;
       border-radius: 10px;
       padding: 0.25em;
       text-align: center;

  }
    .date {
    background-color: black;
    color: white;
       border-radius: 10px;
       padding: 0.25em;
              text-align: center;

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

  const newArray = hackathons.data.filter((item) =>
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
            {gateway.prizeAmount && (
              <div className="prize-amount">{gateway.prizeAmount}</div>
            )}
            {gateway.startDate && gateway.endDate && (
              <div className="date">
                {gateway.startDate} - {gateway.endDate}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  ));

const dispData = null;
if (!state.searchValue || state.searchValue === "") {
  dispData = allCategories(hackathons.data);
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
          NEAR{" "}
          <span>
            {" "}
            HACKATHONS{" "}
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
