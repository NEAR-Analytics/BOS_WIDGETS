const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 30px;
    justify-content: center;
    .head, .community {
        margin-top: 30px;
        display: flex;
        align-items: center;
        flex-direction: column
    }
    .community {
        margin-top: 92px;
    }
    h1 {
        color: #000;
        font-family: Helvetica Neue;
        font-size: 64px;
        font-style: normal;
        font-weight: 500;
        text-align: center;
        line-height: normal;
    }
    span {
        color: #B0B0B0;
        text-align: center;
        font-family: Helvetica Neue;
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        line-height: 131.3%; /* 31.512px */
    }
    .nfts {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-top: 20px;
        flex-wrap: wrap;
    }
    .daos {
        margin-top: 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
    .all {
      color: black;
      cursor: pointer;
      text-decoration: none;
      margin-top: 30px;
      border: 1px solid #000;
      transition: 0.3s ease-in-out;
      padding: 6px;
    }
    .all:hover {
      background: black;
      color: white;
    }
    .explore {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: center;
      align-items: center;
       .daos {
        margin-top: 40px;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
    }
    }
    @media (max-width: 600px) {
        h1 {
            font-size: 35px;
            
        }
        span {
            font-size: 20px;
        }
    }
`;

const Posts = styled.div`
  margin-top: 92px;
  h1 {
    color: #000;
    text-align: center;
    font-family: Helvetica Neue;
    font-size: 64px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-bottom: 12px;
  }
  div {
   .splide.is-initialized, .splide.is-rendered {
  visibility: visible;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
.splide__list {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: -ms-flexbox;
  display: flex;
  justify-content: center;
 position: 0 -200px;
  height: 100%;
  width: 100%;
  margin: 0 !important;
  padding: 0 !important;
   animation: moveSlideshow 30s linear infinite;
   transform: translate3d(0, 0, 0);
   &:hover{
    animation-play-state: paused;
   }
}
li{
    list-style: none;
}
.MediaBar_slide{
  display: flex;
  position: relative;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  z-index: 2;
}
img {
  width: 600px;
  height: 450px;
  margin-right: 20px;
  border-radius: 12px;
  background: #FFF;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.10);
}

.MediaBar_slide img {
  aspect-ratio: 3/2;
  object-fit: contain;
  filter:gray;
  -webkit-filter:grayscale(1);
  filter:grayscale(1);
  transition:all 0.2s;
}
.MediaBar_slide img:hover {
  filter:none;
  -webkit-filter:grayscale(0);
  filter:grayscale(0)
}
@keyframes moveSlideshow {  
  100% { 
    transform: translateX(-200%);  
    transform: translateX(-66.6666%);  
  }
}
  }
`;

const communities = [
  "marmaj.sputnik-dao.near",
  "daorecords.sputnik-dao.near",
  "vibes.sputnik-dao.near",
];

State.init({
  featuredNFTs: [],
});

const logo =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU";

const fetchStoreFrontData = () => {
  const response2 = fetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "anon",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query MyQuery {
  mb_views_nft_tokens(
    where: {nft_contract: {id: {_eq: "thekindao.mintbase1.near"}}}
    offset: 1
    limit: 3
  ) {
                media 
                owner
                token_id
                nft_contract_id
                description
                title
                listings {
                    price
                    unlisted_at
                    listed_by
 
            }
      }
}
`,
    }),
  });
  if (response2.ok) {
    State.update({
      featuredNFTs: response2?.body?.data?.mb_views_nft_tokens,
    });
  }
};

fetchStoreFrontData();

const posts = [
  "https://ipfs.near.social/ipfs/bafkreigb57p7hyymzudyg2oapuf422fi7fhbbdgu2tnimpf7pl4pepg5wy",
  "https://ipfs.near.social/ipfs/bafkreihganq76y6aos4thhyd5w5myy5n3timlyrmo2xm2b5bq7zupjer2u",
  "https://ipfs.near.social/ipfs/bafkreia2uqpz2krj574gpufd372ms6oaqvzssnlu4yogyhdi4g6wg6gpfe",
  "https://ipfs.near.social/ipfs/bafkreihbb76hyo3g6xfkyszitl5xevuevcdxbngvvsrpuwlzyllyuv55gi",
  "https://ipfs.near.social/ipfs/bafkreicr75xgtqlwdyfbq3xn5757spc5wywz6b5om6rr2h6rm6x556j72e",
];

return (
  <Root>
    <div className="head">
      <h1>Explore the NFTS</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="explore">
      <div className="daos">
        {state.featuredNFTs.length ? (
          state.featuredNFTs.map((data, index) => (
            <div key={index}>
              <Widget
                props={{
                  title: data.title,
                  description: data.description,
                  image: data.media,
                  owner: data.owner,
                  chainState: "near",
                  isGateway: props.isGateway,
                  logo,
                  onButtonClick: () =>
                    props.update({
                      tab: "singleNFT",
                      contractId: data.nft_contract_id,
                      tokenId: data.token_id,
                      chainState: "near",
                    }),
                  price: data.listings.length
                    ? (
                        data.listings.length / 1000000000000000000000000
                      ).toFixed(2)
                    : null,
                  isListed: data.listings.length ? "LISTED" : "NOT LISTED",
                  tokenId: data.token_id,
                  contractId: data.nft_contract_id,
                }}
                src="agwaze.near/widget/CPlanet.NFTCard.index"
              />
            </div>
          ))
        ) : (
          <div className="noNfts">
            <span>No NFTs to display right now</span>
          </div>
        )}
      </div>
      <a
        href={
          props.isGateway
            ? "#/agwaze.near/widget/CPlanet.Explore.index"
            : "#/agwaze.near/widget/CPlanet.index?tab=explore"
        }
        className="all"
        onClick={() => props.update({ tab: "explore" })}
      >
        Show All NFTs (50)
      </a>
    </div>
    <div className="community">
      <h1>Our Communties</h1>
      <span>DAOs funded by the Creatives DAO</span>
    </div>
    <div className="daos">
      {communities.map((data, index) => (
        <div key={index}>
          <Widget
            props={{
              daoId: data,
              isGateway: props.isGateway,
              onButtonClick: () =>
                props.update({ tab: "daoProfile", daoId: data }),
            }}
            src="agwaze.near/widget/CPlanet.DAO.Card"
          />
        </div>
      ))}
    </div>
    <a
      href={
        props.isGateway
          ? "#/agwaze.near/widget/CPlanet.DAO.Explore"
          : "#/agwaze.near/widget/CPlanet.index?tab=community"
      }
      className="all"
      onClick={() => props.update({ tab: "community" })}
    >
      Show All Communities (59)
    </a>
    <Posts>
      <h1>Featured Posts</h1>
      <div
        className="splide is-initialized splide--loop splide--ltr splide--draggable is-active"
        id="splide01"
        role="region"
        aria-roledescription="carousel"
      >
        <div
          className="splide__track splide__track--loop splide__track--ltr splide__track--draggable"
          id="splide01-track"
          style={{ paddingLeft: "0px", paddingRight: "0px" }}
          aria-live="off"
          aria-relevant="additions"
        >
          <ul className="splide__list" id="splide01-list" role="presentation">
            {posts.map((data, index) => (
              <div key={index}>
                <img
                  className="splide__slide splide__slide--clone"
                  id={`splide01-clone${
                    index + 1 > 9 ? index + 1 : "0" + index + 1
                  }`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${posts.length}`}
                  style={{ marginRight: "2rem" }}
                  aria-hidden="true"
                  src={data}
                />
              </div>
            ))}
          </ul>
        </div>
      </div>
    </Posts>
    <a
      href={
        props.isGateway
          ? "#/jgodwill.near/widget/CPlanet.MainPage.Social"
          : "#/agwaze.near/widget/CPlanet.index?tab=feed"
      }
      className="all"
      onClick={() => props.update({ tab: "community" })}
    >
      Check out the Social Feed
    </a>
  </Root>
);
