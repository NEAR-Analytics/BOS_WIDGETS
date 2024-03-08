const accountId = props.accountId ?? "bos.genadrop.near";
const { mode } = props;
const { getInputLabelFontType } = VM.require(
  "bos.genadrop.near/widget/Mintbase.components"
);

const rightArrow = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    class="fill-current text-white dark:text-black"
  >
    <g clip-path="url(#clip0_2025_39245)">
      <path
        d="M12.0001 4.00003L10.5901 5.41003L16.1701 11L4.00006 11L4.00006 13L16.1701 13L10.5801 18.58L12.0001 20L20.0001 12L12.0001 4.00003Z"
        fill="currentColor"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0_2025_39245">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="translate(24) rotate(90)"
        ></rect>
      </clipPath>
    </defs>
  </svg>
);

const Home = styled.div``;

const Hero = styled.div`
  display: flex; /* flex */
  flex-direction: column;
  position: relative;
  height: 70vh; /* h-full */
  width: 100%; /* w-full */
  margin-top: 6rem; /* mt-24 */
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding-bottom: 7rem; /* md:pb-28 */
    margin-top: 7rem; /* md:mt-28 */
  }
  @media (min-width: 1280px) {
    margin-top: 5.5rem; /* xl:mt-22 */
    margin-bottom: 6rem; /* xl:mb-24 */
  }
  @media (min-width: 1600px) {
    margin-top: 7.5rem; /* xxxl:mt-30 */
  }
  justify-content: center; /* justify-center */

  .hero {
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    z-index: 30; /* z-30 */
    gap: 24px; /* gap-24 */
    align-items: center; /* items-center */
    text-align: center; /* text-center */
    padding: 16px; /* p-16 */
    width: 100%;
    h1 {
      color: #e087ff;
      font-size: 48px;
      line-height: 50px;
    }
    .subText {
      font-size: 24px; /* h2-90 */
      color: #cad0d8;
      font-weight: bold;
      text-align: center; /* text-center */
      max-width: 976px; /* max-w-screen-lg */
      z-index: 10; /* z-10 */
    }
  }
  .card {
    height: 100%; /* h-full */
    cursor: pointer; /* cursor-pointer */
    padding: 16px; /* p-24 */
    color: #d1d5db; /* text-purple-100 */
    background-color: rgba(12, 18, 33, 0.6); /* bg-opacity-50 */
    min-width: 169px;
    z-index: 30; /* z-30 */
    transition: 0.5s ease-in-out;
    border-radius: 8px; /* rounded */
    color: #e087ff;

    &:hover {
      background-color: rgb(12, 18, 33); /* hover:bg-mb-blackblue */
    }
    .innerCard {
      text-align: center; /* text-center */
      word-break: break-word; /* break-words */
      vertical-align: middle; /* align-middle */
      backdrop-filter: blur(50px);

      text-align: center; /* align-text-center */
      .cardText {
        ${getInputLabelFontType("big")}
        font-weight: bold;
        padding-right: 24px; /* pr-24 */
        padding-left: 24px; /* pl-24 */
      }
    }
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 200px);
    grid-gap: 10px;
    margin-top: 20px;
    margin-bottom: 70px;
  }
  .featuredCards {
    position: absolute;
    top: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 500px) {
    .hero {
      h1 {
        font-size: 35px;
      }
      .subText {
        font-size: 20px;
      }
    }
    .cards {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const Routes = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 40px;
  a {
    text-decoration: none;
    color: #4f59a2;
    padding: 10px;
    border-radius: 8px;
    transition: 0.5s ease-in-out;
    &:hover {
      background: #fff;
    }
  }
  @media (max-width: 500px) {
    overflow-x: scroll;
  }
`;

const Table = styled.div``;

const Gallery = styled.div`
  position: absolute;
  top: 80%;
  max-width: 1300px;
  display: flex;
  margin: 1rem auto;
  align-items: center;
  .arrow-l {
    rotate: 180deg;
  }
  .arrow-r,
  .arrow-l {
    cursor: pointer;
    border-radius: 50%;
    padding: 8px 10px 10px 10px;
    border: 1px solid black;
    background: black;
    svg {
      padding: 0;
      margin: 0;
    }
  }
  .slider-display {
    position: relative;
    width: 210rem;
    height: 357px;
    overflow: hidden;
    @media only screen and (max-width: 927px) {
      width: 32rem;
    }
    @media only screen and (max-width: 627px) {
      width: 20rem;
    }
  }
  .slider-track {
    transition: all 300ms ease;
    position: absolute;
    display: flex;
    gap: 2rem;
    justify-content: center;
    .nft-card {
      width: 15rem;
      height: 15rem;
      border-radius: 10px;
      overflow: hidden;
      img {
        transition: all 300ms ease-in-out;
      }
      :hover img {
        scale: 1.1;
      }
    }
  }
  @media (max-width: 500px) {
    top: 100%;
  }
`;

const FeaturedCard = styled.div`
  border-radius: 0.25rem; /* rounded */
  background-color: ${isDarkModeOn ? "#1f2130" : "#fff"};
  padding: 12px; /* p-12 */
  max-height: 600px;
  height: 357px;
  width: 418px;
  border: 0 solid;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (min-width: 768px) {
    padding: 24px; /* md:p-24 */
  }
  .head {
    display: flex;
    align-items: center;
    h1 {
      ${getInputLabelFontType("big")}
      font-weight: bold;
      margin-right: 4px;
      color: ${isDarkModeOn ? "#fff" : "#000"};
      font-size: 20px !important;
    }
    img {
      width: 50px;
      height: 60px;
      object-fit: cover;
      margin-right: 10px;
      border-radius: 4px;
    }
  }
  .stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .stat {
      padding: 12px;
      width: 179px;
      background-color: ${isDarkModeOn ? "#272a3a" : "#f9f9f9"};
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      height: 72px;
      span {
        ${getInputLabelFontType("medium")}
        color: ${isDarkModeOn ? "#fff" : "#000"};
      }
      p {
        margin-top: 20px;
        ${getInputLabelFontType("big")}
        color: ${isDarkModeOn ? "#fff" : "#000"};
      }
    }
  }
  .cards {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  @media (max-width: 500px) {
    width: 269px;
    height: 269px;
    .head {
      h1 {
        font-size: 17px !important;
      }
    }
    .cards {
      gap: 2px !important;
    }
  }
`;

const NFTCard = styled.div`
  width: 115px;
  height: 115px;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-size: cover;
  .amount {
    background: #000;
    border-radius: 4px;
    min-width: 50px;
    text-align: center;
    padding: 6px;
    margin-bottom: 7px;
    span {
      color: #fff;
      font-weight: 600;
      ${getInputLabelFontType("big")}
    }
  }
  @media (max-width: 500px) {
    width: 73px;
    height: 73px;
  }
`;

const size = "100%";

const [page, setPage] = useState(0);
const [featuredNFTs, setFeaturedNFTs] = useState([]);

function fetchNFTDetails() {
  asyncFetch("https://api.mintbase.xyz/explore", {
    method: "GET",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
  }).then((data) => {
    if (data.body) {
      const parsedData = JSON.parse(data.body);
      setFeaturedNFTs(Object.values(parsedData?.Featured));
    }
  });
}

fetchNFTDetails();

const HandleUpSlide = () => {
  if (page < featuredNFTs.length - 1) {
    setPage(page + 1);
  } else {
    setPage(0);
  }
};
const HandleDownSlide = () => {
  if (page > 0) {
    setPage(page - 1);
  } else {
    setPage(featuredNFTs.length - 1);
  }
};

const cardItems = [
  { name: "Developers", link: "" },
  { name: "Creator Drop", link: "" },
  { name: "Market", link: "" },
];

const pageRoutes = [
  {
    name: "AI",
    link: "",
  },
  {
    name: "Arts",
    link: "",
  },
  {
    name: "DAOs",
    link: "",
  },
  {
    name: "Gaming",
    link: "",
  },
  {
    name: "Music",
    link: "",
  },
  {
    name: "PFPs",
    link: "",
  },
  {
    name: "Philanthropy",
    link: "",
  },
  {
    name: "Utility",
    link: "",
  },
  {
    name: "New Listings",
    link: "",
  },
];
const YoctoToNear = (amountYocto) => {
  return new Big(amountYocto || 0).div(new Big(10).pow(24)).toString();
};

return (
  <Home>
    <Hero>
      <div style={{ width: "100%" }}>
        <div className="hero">
          <h1>The Digital Assets Factory</h1>
          <div className="subText">
            Easiest hub for brands, creators, and developers pioneering
            blockchain and AI
          </div>
          <div className="cards">
            {cardItems.map((data) => (
              <a>
                <div className="card">
                  <div className="innerCard">
                    <div className="cardText">{data.name}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <Routes>
          {pageRoutes.map((data) => (
            <a href={data.link}>
              <div>{data.name}</div>
            </a>
          ))}
        </Routes>
      </div>
      <Gallery>
        <div onClick={HandleDownSlide} className="arrow-l">
          {rightArrow}
        </div>
        <div className="slider-display">
          <div
            className="slider-track"
            style={{
              transform: `translateX(-${12 * page}rem)`,
            }}
          >
            {featuredNFTs.length > 0 &&
              featuredNFTs?.map((value, key) => (
                <FeaturedCard key={key}>
                  <div className="head">
                    <img src={value.storeData.profileImage} alt="" />
                    <h1>{value?.storeData?.displayName}</h1>
                  </div>
                  <div className="stats">
                    <div className="stat">
                      <span>Total Minted</span>
                      <p>{value?.totalMinted}</p>
                    </div>
                    <div className="stat">
                      <span>Owners</span>
                      <p>{value?.uniqueOwners}</p>
                    </div>
                  </div>
                  <div className="cards">
                    {value?.listings?.length > 0 &&
                      value?.listings?.map((data) => (
                        <NFTCard
                          bgImage={`https://image-cache-service-z3w7d7dnea-ew.a.run.app/small?url=${data.media}`}
                        >
                          <div className="amount">
                            <span>{YoctoToNear(data.price)}</span>
                            {NearIcon}
                          </div>
                        </NFTCard>
                      ))}
                  </div>
                </FeaturedCard>
              ))}
          </div>
        </div>
        <div onClick={HandleUpSlide} className="arrow-r">
          {rightArrow}
        </div>
      </Gallery>
    </Hero>
  </Home>
);
