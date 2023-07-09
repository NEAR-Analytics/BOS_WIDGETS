const ownerId = "minorityprogrammers.near"; // attribution
let accountId = context.accountId;
initState({
  inputCollectionSlug: "nft.regens.near",
  collectionSlug: "nft.regens.near",
  collectionData: {},
  searchTerm: "",
  nftData: [],
  singleNftProps: {},
  isNFTButtonClicked: false,
  filteredNFTData: [],
});

const PRICE_CONVERSION_VALUE = 1000000000000000000000000;

const nearLogo =
  "https://ipfs.near.social/ipfs/bafkreidptf634houwtbxryegonzyys3wnz3m75zqyxfcot5u42slwdtb2e";

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=Near&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(3);
  }
};

const fetchData = () => {
  State.update({ nftData: [] });

  let response = fetch(
    "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
            query MyQuery {
             nfts( orderBy: createdAtTimestamp) {
                category
                chain
                createdAtTimestamp
                id
                isSold
                isListed
                price
                tokenID
                owner {
                    id
                }
                tokenIPFSPath
                transactions {
                  price
                  txDate
                  txId
                  to {
                    id
                  }
                  owner: from {
                    id
                  }
                  type
                }
                }
            }
        `,
      }),
    }
  );

  console.log(response.body.data.nfts);
  if (!response.ok) {
    return "Loading";
  }
  const collectionData = response.body.data.nfts;

  if (collectionData) {
    const nftBody = collectionData.map((data) => {
      const fetchIPFSData = fetch(
        data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
      );

      if (fetchIPFSData.status === 403) {
        console.log(fetchIPFSData);
        return State.update({ error: true });
      }
      if (!fetchIPFSData.ok) {
        return "Loading NFTS from IPFS";
      }
      if (fetchIPFSData.ok) {
        const nft = fetchIPFSData.body;

        let nftObject = {};
        nftObject.id = data.id;
        nftObject.sold = data.isSold;
        nftObject.isListed = data.isListed;
        nftObject.owner = data.owner.id;
        nftObject.price = data.price;
        nftObject.tokenId = data.tokenID;
        nftObject.name = nft?.name;
        nftObject.description = nft?.description;
        nftObject.image = nft?.image;
        return nftObject;
      }
    });
    State.update({
      nftData: nftBody,
    });
  }
};
fetchData();

const updateInputCollectionSlug = (e) => {
  State.update({ inputCollectionSlug: e.target.value });
};

const handleFetchButtonClick = () => {
  State.update({ collectionSlug: state.inputCollectionSlug });
  fetchData();
};

const updateCollectionSlug = (e) => {
  State.update({ collectionSlug: e.target.value });
};

const getRarityColor = (rarity) => {
  if (rarity < 0.1) {
    return "#ee0000";
  } else if (rarity < 0.25) {
    return "#ff9900";
  } else if (rarity < 0.5) {
    return "#ffc300";
  } else {
    return "#61c700";
  }
};

const seachInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = state.nftData.filter((nft) =>
    nft.name.toLowerCase().includes(value)
  );
  State.update({
    searchTerm: value,
    filteredNFTData: searched,
  });
};

const Stats = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: "100%";
      max-width: 800px;
      gap: 20px;
  `;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
  `;

const PageTitle = styled.h1`
  text-align:center;
  font-size: 4vw; 
  font-weight: bold; 
  margin-bottom: 20px; 
  color: #0f1d40;
  `;

const NFTCard = styled.div`
   display: flex;
   flex-flow: column nowrap;
   -ms-flex-flow:column nowrap;
   align-items:center;
   background: #fff;
   border-radius: 10px;
   border: 1.41429px solid rgba(28,27,28,.2);
   box-shadow: 5.65714px 5.65714px 11.3143px rgba(28,27,28,.04);
   padding: 8px 0px;
   background-color:#fff;
   max-width: 350px;
   margin: 0 auto;
   &:hover &>div>img{
     transform:scale(1.05);
   }
   .button{
   padding: .75em 2em;
   border-radius: .7em;
   color: var(--main-color);
   border: 1px solid transparent;
   transition: all .3s;
   cursor: pointer;
    color: #fff;
    background: #0d99ff;
    &:hover{
        color: #0d99ff;
        background:#fff;
    }
  @media screen and (max-width: 540px){ 
    padding: .5em 2em;    
    }
    }
    .button.inactive{
      border: 1px solid transparent;
      background: #c4c4c4;
      color: #fff;
      padding: .5em 1em;
      cursor:not-allowed;
    }
  `;

const NFTCardText = styled.div`
  width: 100%;
  // padding: 0px 1rem;
  `;

const NFTCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  background: #e4f1fb;
  background: linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  background: -webkit-linear-gradient(180deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  background: -moz-linear-gradient(270deg,#e4f1fb 0%, rgba(0,255,0,0) 3%);
  padding: 20px 3rem 1rem 3rem;
  width:100%;
`;

const ImageCard = styled.div`
  height:250px;
  width: 96%;
  border-radius: 0.5rem;
  overflow:hidden;
  margin-bottom: .4rem;
  &>img{
  object-fit: cover;
  transition: all 0.3s ease-in-out;
  }
  &>img:hover{
    transform:scale(1.05);
  }
`;
const InputContainer = styled.div`
    width:80%;
    max-width: 700px;
    display: flex;
    align-items: center;
    justify-content:center;
    margin: 1rem auto 1rem auto;
    &>input{
        outline: none;
    }
    &>input:hover, &>input:focus{
      border: 1px solid #0d99ff;
      box-shadow: none;
    }
`;

const Hero = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-image: url(https://ipfs.near.social/ipfs/bafkreifdvqkjobvvanxqvgt4cq4tctpxdq22364744d4pwyssmiz7u7d7i);
  background-size: cover;
  background-repeat: no-repeat;
  background-positiion: center;
  width: 100%;
  padding: 2rem;
`;

const RankCard = styled.span`
  background-color: rgba(28,27,28,.06);
  border-radius: .5rem;
  color: #000;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  padding: 8px;
`;

const PriceArea = styled.div`
  display: flex;
  align-items: center;
  color: #0d99ff;
  &>*{
  margin: 0px;
  padding: 0px;
  }
  &>h6{
    font-weight: 700;
    font-size: 1.2rem;
  }
  &>span{
  font-size: 1.2rem;
  margin: 0px;
  }
`;
const Logo = styled.div`
    &>img {
        width: 55px;
        border-radius: 100%;
    }
`;
const HandleViewNft = (nft) => {
  State.update({ singleNftProps: nft, isNFTButtonClicked: true });
  console.log(nft);
};

if (state.isNFTButtonClicked) {
  return <Widget src="agwaze.near/widget/GenaDrop.NFTDetails" props={state} />;
}

console.log(state.nftData);
return (
  <>
    <Hero className="w-100">
      <PageTitle>
        ReFi Alliance
        <br />
        by 🌸NEAR ReFi
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search Collection"
          onChange={seachInputHandler}
        />
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a
              href={`/#/mob.near/widget/MyPage?accountId=${nft.owner}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard className="card">
                <ImageCard>
                  <img
                    src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>
                      Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(38)}
                    </RankCard>
                  </div>
                  <div className="px-2">
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.tokenId}
                      </p>
                    </div>
                    <Logo>
                      <img src={nearLogo} />
                    </Logo>
                  </div>
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      <PriceArea>
                        <h6>
                          {(nft.price / PRICE_CONVERSION_VALUE).toFixed(2)}
                        </h6>
                        <span>
                          (${getUsdValue(nft.price / PRICE_CONVERSION_VALUE)})
                        </span>
                      </PriceArea>
                    </div>
                    {accountId === nft.owner ? (
                      !nft.isListed && (
                        //Add logic from
                        <button className="button active">List</button>
                      )
                    ) : !nft.isListed ? (
                      //Add logic from
                      <button className="button inactive">Not Listed</button>
                    ) : !nft.isSold ? (
                      <button
                        // onClick={() => HandleViewNft(nft)}
                        className="button active"
                      >
                        Buy Now{" "}
                      </button>
                    ) : (
                      <button className="button inactive">Sold</button>
                    )}
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              href={`/#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard className="card">
                <ImageCard>
                  <img
                    src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <RankCard>
                      Owner: {nft.owner.slice(0, 6)}...{nft.owner.slice(38)}
                    </RankCard>
                  </div>
                  <div className="px-2">
                    <h3
                      style={{
                        fontSize: "16px",
                        margin: "0 0 10px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nft.name}
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div>
                      <div style={{ color: "#a4a9b6" }}>Token ID</div>
                      <p
                        style={{
                          fontSize: "14px",
                          marginBottom: "5px",
                          color: "#0d99ff",
                        }}
                      >
                        {nft.tokenId}
                      </p>
                    </div>
                    <Logo>
                      <img src={nearLogo} />
                    </Logo>
                  </div>
                  {/*<p style={{ fontSize: "14px" }} className="px-2">
                    Collection: {nft.collection.slug}
                  </p>*/}
                  <hr />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                    className="px-2"
                  >
                    <div className="px-2">
                      <div style={{ color: "#a4a9b6", fontSize: "1.1rem" }}>
                        Price
                      </div>
                      <PriceArea>
                        <h6>
                          {(nft.price / PRICE_CONVERSION_VALUE).toFixed(2)}
                        </h6>
                        <span>
                          (${getUsdValue(nft.price / PRICE_CONVERSION_VALUE)})
                        </span>
                      </PriceArea>
                    </div>
                    {accountId === nft.owner ? (
                      !nft.isListed && (
                        //Add logic from
                        <button className="button active">List</button>
                      )
                    ) : !nft.isListed ? (
                      //Add logic from
                      <button className="button inactive">Not Listed</button>
                    ) : !nft.isSold ? (
                      <button
                        // onClick={() => HandleViewNft(nft)}
                        className="button active"
                      >
                        Buy Now{" "}
                      </button>
                    ) : (
                      <button className="button inactive">Sold</button>
                    )}
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : (
          <div>No results found for "{state.searchTerm}".</div>
        )}
      </NFTCards>
    ) : (
      <div>No NFTs available.</div>
    )}
  </>
);
