initState({
  collectionData: {},
  searchTerm: "",
  nftData: [],
  singleNftProps: {},
  isNFTButtonClicked: false,
  filteredNFTData: [],

  chain: 1313161554,
});

const PRICE_CONVERSION_VALUE = 0.000000000000000001;

const currentChain = {
  1313161554: {
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    livePrice: "ethereum",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  42161: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYo9YwixfzDbW3cQ3ObNHxifNbQhmuJYpyhbXZTBS7w&s",
    id: "42161",
    chain: "Arbitrum",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  42220: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIkhIs47BB_bEeLqnfu_4-lvs1uJIh8PeduKZsmyQFjLw2mQvt1UvT57G5kvOQGSw5rs&usqp=CAU",
    id: "42220",
    livePrice: "celo",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  137: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOt8M-N1nbwMCiCiCNBv3-QI1tLBuL-BmcwowhGxce&s",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
};

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChain[state.chain].livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(3);
  }
};

const fetchData = () => {
  return fetch(`${currentChain[state.chain].subgraph}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            query MyQuery {
             nfts(orderBy: createdAtTimestamp ) {
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
  });
};

const data = fetchData();
if (!data.ok) {
  return "Loading";
}

const body = data.body.data.nfts;

if (body) {
  const nftBody = body.map((data) => {
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
      nftObject.id = data.id;
      nftObject.sold = data.isSold;
      nftObject.isListed = data.isListed;
      nftObject.owner = data.owner.id;
      nftObject.price = data.price;
      nftObject.tokenId = data.tokenID;
      nftObject.name = nft?.name;
      nftObject.transactions = data.transactions;
      nftObject.attributes = nft.properties;
      nftObject.chain = data.chain;
      nftObject.description = nft?.description;
      nftObject.image = nft?.image;
      return nftObject;
    }
  });
  State.update({
    nftData: nftBody,
  });
}

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

const Logo = styled.div`
    &>img {
        width: 55px;
        border-radius: 100%;
    }
`;
const InputContainer = styled.div`
    width:80%;
    max-width: 900px;
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

const MyAcc = styled.p`
    margin: 0;
    margin-left: 8px;
    color: #0a2830;
    background: transparent;
    border: 1px solid #0d99ff;
    padding: 5px;
    border-radius: 10px;
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
const HandleViewNft = (nft) => {
  console.log("CAPital LETTER A", nft);
  State.update({ singleNftProps: nft, isNFTButtonClicked: true });
};

const handleDropdownChange = (event) => {
  State.update({ chain: event.target.value });
};

const getSender = () => {
  return !state.sender
    ? ""
    : state.sender.substring(0, 6) +
        "..." +
        state.sender.substring(state.sender.length - 4, state.sender.length);
};

if (state.sender === undefined) {
  const accounts = Ethers.send("eth_requestAccounts", []);
  if (accounts.length) {
    State.update({ sender: accounts[0] });
  }
}

const handleCloseNft = () => State.update({ isNFTButtonClicked: false });

return state.isNFTButtonClicked ? (
  <>
    <Widget
      src="agwaze.near/widget/GenaDrop.EVMSingleNFT"
      props={{ state, handleCloseNft }}
    />
  </>
) : (
  <>
    <Hero className="w-100">
      <PageTitle>
        Find, Buy and Sell NFTs across chains in <br />
        💧GenaDrop
      </PageTitle>
      <InputContainer>
        <input
          type="search"
          value={state.searchTerm}
          placeholder="Search NFTs"
          onChange={seachInputHandler}
        />
        <SelectChain>
          <select value={chain} onChange={handleDropdownChange}>
            <option value="1313161554">Aurora</option>
            <option value="42220">Celo</option>
            <option value="137">Polygon</option>
            <option value="42161">Arbitrum</option>
          </select>
        </SelectChain>
        {state.sender ? (
          <div>
            <MyAcc>{state.sender ? getSender() : "0x00..."}</MyAcc>
          </div>
        ) : (
          <Web3Connect connectLabel="Connect Wallet" className="w-50" />
        )}
      </InputContainer>
    </Hero>
    {state.nftData.length > 0 ? (
      <NFTCards>
        {state.searchTerm === "" ? (
          state.nftData.map((nft) => (
            <a style={{ textDecoration: "none", color: "inherit" }}>
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
                    {nft.nft_state && (
                      <div>
                        <div style={{ color: "#a4a9b6" }}>Owner</div>
                        <p style={{ fontSize: "14px" }}>
                          {nft.owner.length > 12
                            ? nft.owner.slice(0, 12) + "..."
                            : nft.owner}
                        </p>
                      </div>
                    )}
                    <Logo>
                      <img src={currentChain[state.chain].logoUrl} />
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
                          {(nft.price * PRICE_CONVERSION_VALUE).toFixed(2)}
                        </h6>
                        <span>
                          (${getUsdValue(nft.price * PRICE_CONVERSION_VALUE)})
                        </span>
                      </PriceArea>
                    </div>
                    <button onClick={() => HandleViewNft(nft)}>
                      {state.sender === nft.owner && nft.isListed
                        ? "List"
                        : "View"}
                    </button>
                  </div>
                </NFTCardText>
              </NFTCard>
            </a>
          ))
        ) : state.filteredNFTData.length > 0 ? (
          state.filteredNFTData.map((nft) => (
            <a style={{ textDecoration: "none", color: "inherit" }}>
              <NFTCard className="card">
                <ImageCard>
                  <img
                    src={nft?.image?.replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/"
                    )}
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
                      <img src={currentChain[state.chain].logoUrl} />
                    </Logo>
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
                      {nft.nft_state_lists && nft.nft_state_lists[0] && (
                        <PriceArea>
                          <h6>{nft.price * PRICE_CONVERSION_VALUE}</h6>
                          <span>(${})</span>
                        </PriceArea>
                      )}
                    </div>
                    <button onClick={() => HandleViewNft(nft)}>
                      {state.sender === nft.owner && nft.isListed
                        ? "List"
                        : "View"}
                    </button>
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
