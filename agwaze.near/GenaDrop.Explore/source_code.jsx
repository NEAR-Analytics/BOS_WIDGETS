initState({
  collectionData: {},
  inputCollectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  collectionSlug: "genadrop-contract.nftgen.near" || "nft.genadrop.near",
  searchTerm: "",
  nftData: [],
  filteredNFTData: [],
  chainRate: "",
  chain: "near",
  conversion: 0,
});

const currentChain = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};

function fetchData() {
  State.update({ nftData: [] });

  if (state.chain !== "near") {
    const response = fetch("https://api.indexer.xyz/graphql", {
      method: "POST",
      headers: {
        "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
        "x-api-user": "Banyan",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query MyQuery {
  ${state.chain}{
    crypto_rates(where: {fiat: {_eq: "USD"}}) {
      crypto
      rate
    }
    nfts(order_by: {rarity: asc}) {
      id
      name
      media_url
      ranking
      rarity
      contract_id
      token_id
      listings {
        price
      }
    }
  }
}`,
      }),
    });
    response === []
      ? ""
      : State.update({
          nftData: response.body.data[state.chain].nfts,
          chainRate: response.body.data[state.chain].crypto_rates[4].rate,
        });

    const priceConvert = (chain) => {
      switch (chain) {
        case "stacks":
          return State.update({ conversion: 10000000000 });
        case "sui":
          return State.update({ conversion: 10000000000 });
        case "aptos":
          return State.update({ conversion: 100000000 });
        default:
          return 0;
      }
    };
    priceConvert(state.chain);
  } else {
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
                }
                }
            }
        `,
        }),
      }
    );

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
          return State.update({ error: true });
        }
        if (!fetchIPFSData.ok) {
          return "Loading NFTS from IPFS";
        }
        if (fetchIPFSData.ok) {
          const nft = fetchIPFSData.body;

          let nftObject = {};
          nftObject.contract_id = data.id;
          nftObject.sold = data.isSold;
          nftObject.isListed = data.isListed;
          nftObject.owner = data.owner.id;
          nftObject.price = data.price;
          nftObject.token_id = data.tokenID;
          nftObject.name = nft?.name;
          nftObject.description = nft?.description;
          nftObject.media_url = nft?.image.replace(
            "ipfs://",
            "https://ipfs.io/ipfs/"
          );
          return nftObject;
        }
      });
      State.update({
        nftData: nftBody,
      });
    }
  }
}

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

const isPriceValid = typeof nft.listings[0]?.price === "number";

const handleDropdownChange = (event) => {
  State.update({ chain: event.target.value });
};

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      state.chain ?? "near"
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
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
   button{
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

const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hero = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-image: url(https://www.genadrop.com/static/media/banner-marketplace.e5c03bb6.svg);
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

const ChainPrice = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
  img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;

const SelectChain = styled.div`
    select {
    margin: 0 10px;
    border: 1px solid #0d99ff;
    cursor: pointer;
    border-radius: 7px;
    height: 35px;
    background: transparent;
   }
   select:focus {
    outline: none;
   }
`;

return (
  <>
    <Hero className="w-100">
      <PageTitle>
        View NFTs on <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />{" "}
        <SelectChain>
          <select value={chain} onChange={handleDropdownChange}>
            <option value="near">Near</option>
            <option value="aptos">Aptos</option>
            <option value="sui">Sui</option>
          </select>
        </SelectChain>
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a
              href={`#/agwaze.near/widget/GenaDrop.NFTDetails?contractId=${nft.contract_id}&tokenId=${nft.token_id}&chainState=${state.chain}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard className="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2"></div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
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
                    {nft.owner ? (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px", color: "#0d99ff" }}>
                          {nft.owner.length > 12
                            ? nft.owner.slice(0, 12) + "..."
                            : nft.owner}
                        </p>
                      </div>
                    ) : (
                      nft.nft_state && (
                        <div>
                          <div style={{ color: "#a4a9b6" }}>Owner</div>
                          <p style={{ fontSize: "14px" }}>
                            {nft.nft_state.owner.length > 12
                              ? nft.nft_state.owner.slice(0, 12) + "..."
                              : nft.nft_state.owner}
                          </p>
                        </div>
                      )
                    )}
                  </div>
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
                      {nft.listings && nft.listings[0] ? (
                        typeof nft.listings[0].price === "number" ? (
                          <ChainPrice>
                            <img src={currentChain[state.chain].img} alt="" />
                            <PriceArea>
                              <h6>{`${
                                nft.listings[0].price.toFixed(2) /
                                state.conversion
                              }`}</h6>
                              <span>{`(${getUsdValue(
                                nft.listings[0].price.toFixed(2) /
                                  state.conversion
                              )})`}</span>
                            </PriceArea>
                          </ChainPrice>
                        ) : (
                          <div>Not for Sale</div>
                        )
                      ) : nft.price ? (
                        <ChainPrice>
                          <img src={currentChain[state.chain].img} alt="" />
                          <PriceArea>
                            <h6>
                              {(nft.price / 1000000000000000000000000).toFixed(
                                2
                              )}
                            </h6>
                            <span>
                              (
                              {getUsdValue(
                                nft.price / 1000000000000000000000000
                              )}
                              )
                            </span>
                          </PriceArea>
                        </ChainPrice>
                      ) : (
                        <ChainPrice>
                          <img src={currentChain[state.chain].img} alt="" />
                          <PriceArea>
                            <h6>0.00</h6>
                            <span>($0.00)</span>
                          </PriceArea>
                        </ChainPrice>
                      )}
                    </div>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a
              href={`#/mob.near/widget/MyPage?accountId=${nft.nft_state.owner}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <NFTCard classNmae="card">
                <ImageCard>
                  <img
                    src={nft.media_url}
                    alt={nft.name}
                    width="100%"
                    height="100%"
                    className="rounded-3"
                  />
                </ImageCard>
                <NFTCardText>
                  <hr />
                  <div className="d-flex my-4 justify-content-between w-100 px-2">
                    <div>{nft.nft_state_lists[0].list_contract.name}</div>
                  </div>
                  <div className="px-2">
                    <div style={{ color: "#a4a9b6" }}>Name</div>
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
                        {nft.token_id.length > 30
                          ? `${nft.token_id.slice(0, 30)}...`
                          : nft.token_id}
                      </p>
                    </div>
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.nft_state.owner.length > 12
                            ? nft.nft_state.owner.slice(0, 12) + "..."
                            : nft.nft_state.owner}
                        </p>
                      </div>
                    )}
                  </div>
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
                      {nft.listings && nft.listings[0] ? (
                        typeof nft.listings[0].price === "number" ? (
                          <ChainPrice>
                            <img src={currentChain[state.chain].img} alt="" />
                            <PriceArea>
                              <h6>{`${
                                nft.listings[0].price.toFixed(2) /
                                state.conversion
                              }`}</h6>
                              <span>{`(${getUsdValue(
                                nft.listings[0].price.toFixed(2) /
                                  state.conversion
                              )})`}</span>
                            </PriceArea>
                          </ChainPrice>
                        ) : (
                          <div>Not for Sale</div>
                        )
                      ) : nft.price ? (
                        <ChainPrice>
                          <img src={currentChain[state.chain].img} alt="" />
                          <PriceArea>
                            <h6>
                              {(nft.price / 1000000000000000000000000).toFixed(
                                2
                              )}
                            </h6>
                            <span>
                              (
                              {getUsdValue(
                                nft.price / 1000000000000000000000000
                              )}
                              )
                            </span>
                          </PriceArea>
                        </ChainPrice>
                      ) : (
                        <ChainPrice>
                          <img src={currentChain[state.chain].img} alt="" />
                          <PriceArea>
                            <h6>0.00</h6>
                            <span>($0.00)</span>
                          </PriceArea>
                        </ChainPrice>
                      )}
                    </div>
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
      <NoNFTLoading>
        <img
          src="https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu"
          alt=""
        />
      </NoNFTLoading>
    )}
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </>
);
