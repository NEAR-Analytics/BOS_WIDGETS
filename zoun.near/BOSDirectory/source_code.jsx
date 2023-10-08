const Wrapper = styled.div`
  --section-gap: 42px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }
`;

const H1 = styled.h1`

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
      name: "24H Playing the Demo",
      url: "https://near.social",
      image:
        "https://static.vecteezy.com/system/resources/previews/021/286/373/non_2x/24-hours-sign-on-transparent-background-free-png.png",
      description: "200 Gemukoins. Thank You.",
      category: ["24", "Play", "Social"],
      deploy: null,
      github: null,
    },
    {
      key: 2,
      name: "View Streams of our Demo",
      url: "https://near.org",
      image:
        "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/7DPAXDPDOZP5ZNAGIUVB42U2EY.jpg",
      description: "50 Gemukoins. Thank You.",
      category: ["Stream", "View", "Social"],
      deploy: null,
      github: null,
    },
    {
      key: 2,
      name: "Finish the Demo",
      url: "https://bos.fusionx.finance/",
      image: "https://cdn-icons-png.flaticon.com/512/1803/1803082.png",
      description: "100 Gemukoins. Thank You.",
      category: ["Win", "Play", "Award"],
      deploy: null,
      github: null,
    },
    {
      key: 2,
      name: "Discover the Easter Egg",
      url: "https://bos.quickswap.exchange",
      image:
        "https://surpriseprize.com/wp-content/uploads/2020/02/logo_open-1.png",
      description: "125 Gemukoins. Thank You.",
      category: ["Secret", "Up to You", "32"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "OVERPOWER",
      url: "https://jutsu.ai/",
      image:
        "https://community.cloudflare.steamstatic.com/economy/image/383p-cH7EYzaIvmhGOBG7SfaWoB5HXcIam49xBCuFXINlSQPUDgVlIZWMwRH8v-Hs6qh3-ZGpyKTf9sa8XVh-zRl5air7ymQU2ymZ9mUIqBGki3a1AbiHtzOeG7lKi6UUgb-B21B8A/360fx360f",
      description: "99 Gemukoins. Thank You",
      category: ["Win", "Award"],
      deploy: null,
      github: null,
    },
    {
      key: 5,
      name: "WHaT",
      url: "https://bos.flipsidecrypto.xyz/",
      image:
        "https://pic2-cdn.creality.com/model/2F313E2F7C830B4B97528792535E0C380.png",
      description: "1 Gemukoin. Thank You.",
      category: ["Data", "NEAR"],
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
          <img src={gateway.image} />
        </a>
      </ImageCard>
      <div className="card-body p-2 mt-3">
        <CardHeading>{gateway.name}</CardHeading>
        <Text className="pb-3 text-secondary">
          {`${gateway.description.trim().slice(0, 36)}`}
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
              <path src="logro.png" fill="#323330" />
            </svg>
          </span>
        </H1>
      </Container>
    </Wrapper>
    <Cards>{dispData}</Cards>
  </div>
);
