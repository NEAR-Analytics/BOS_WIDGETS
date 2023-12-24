const PRICE_CONVERSION_VALUE = 0.000000000000000001;
const currentChain = {
  1313161554: {
    logoUrl: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    livePrice: "ethereum",
    explorer: "https://aurorascan.dev",
    contract: "0xe93097f7C3bF7A0E0F1261c5bD88F86D878667B5",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  42161: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCYo9YwixfzDbW3cQ3ObNHxifNbQhmuJYpyhbXZTBS7w&s",
    id: "42161",
    chain: "Arbitrum",
    livePrice: "ethereum",
    explorer: "https://arbiscan.io",
    contract: "0x27E52A81975F5Fb836e79007E3c478C6c0E6E9FB",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  42220: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScIkhIs47BB_bEeLqnfu_4-lvs1uJIh8PeduKZsmyQFjLw2mQvt1UvT57G5kvOQGSw5rs&usqp=CAU",
    id: "42220",
    explorer: "https://explorer.celo.org",
    livePrice: "celo",
    chain: "Celo",
    contract: "0x5616BCcc278F7CE8B003f5a48f3754DDcfA4db5a",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  137: {
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOt8M-N1nbwMCiCiCNBv3-QI1tLBuL-BmcwowhGxce&s",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    explorer: "https://polygonscan.com",
    contract: "0xd91cC6DE129D13F4384FB0bC07a1a99D4F858e72",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
};

const listAbi = [
  "function createMarketplaceItem(address nftContract, uint256 tokenId, uint256 price, string calldata category, address seller) public payable {}",
];

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    align-items: center;
    justify-content: center;
`;
const MainContainer = styled.div`
    padding: 30px;
    height: auto;
    max-width: 1300px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 600px) {
    justify-content: center;
    align-items: center;
  }
`;

const TopImageContainer = styled.div`
  padding: 1em;
  background: #ffffff;
    width: 40%;
    min-width: 355px;
  border: 2px solid #cacdd5;
  margin-right: 40px;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border-radius: 0.7em;
  &>img {
    width: 100%;
    max-height: 548px;
  }
`;

const HeaderText = styled.h1`
  font-size: 1.5rem;
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
    margin-left: 5px;
    margin-top: 4px;
    margin-right: 3px;
    font-size: 1.3rem;
  }
  &>span{
  font-size: 1.2rem;
  margin: 0px;
  }
`;

const PriceBucket = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
    margin-top: 30px;
  width: 100%;
`;

const RightSection = styled.div`
    width: 46%;
    min-width: 350px;
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 10px;
`;

const Description = styled.div`
     width: 100%;
    border-radius: 1em;
    background: #ffffff;
    border: 2px solid #eeeff2;
    padding: 1em;
    margin-top: 40px;
    box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
    &>h6{
        font-weight: 600;
        font-size: 1.5rem;
    }
    
`;

const AttributeContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const Attribute = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 0.5em;
    border-radius: 0.5em;
    width: 206px;
    background: #fafafb;
    margin-bottom: 20px;
    border: 1px solid #86ccff;
    border-radius: 10.6849px;
    &>*span {
        padding: 0;
        color: #b2b7c2;
    }
`;

const TransactionTable = styled.div`
     width: 100%;
  max-width: 70%;
  background: #ffffff;
  border: 2px solid #eeeff2;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border-radius: 16px;
  margin-bottom: 40px;
`;

const TableHeader = styled.div`
    width: 100%;
  padding: 0.5em;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: flex-start;
  gap: 1em;
  background: #f5f6f7;
  border-radius: 14px 14px 0px 0px;
  &>h1 {
    font-size: 24px;
  }
`;

const TableBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em;
    justify-content: space-between;
    border-bottom: 1px solid #dde1e6;
    a {
        cursor: pointer;
        text-decoration: none;
        display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    padding-left: 7px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    @media and screen
    p {
        margin: 0;
        border-bottom: 1px solid #e5e8eb;
        font-size: 12px;
        min-width: 100px;
        text-align: center;
    }
    span {
        font-size: 12px;
    }
    }
`;

const RowType = styled.div`
     display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5em;
  font-size: 0.75rem;
  padding: 0.25em 1em;
  border-radius: 0.7em;
  border: 1px solid #a4a9b6;
`;

const RowBody = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    padding-left: 7px;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    @media and screen
    p {
        margin: 0;
        border-bottom: 1px solid #e5e8eb;
        font-size: 12px;
        min-width: 100px;
        text-align: center;
    }
    span {
        font-size: 12px;
    }
`;

const MintDetails = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    color: #525c76;
    &>span {
        font-size: 14px;
    }
    &>a {
        cursor: pointer;
    }
`;

const Popup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px); /* Apply background blur */
  
`;

const PopupContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  align-items: center;
  max-width: 350px;
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #0d99ff;
  color: white;
  padding: 5px 15px;
  border: none;
    margin-top: 20px;
    margin-right: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const CloseNFT = styled.div`
  margin-right: 10px;
  display: flex;
  align-items: flex-start !important;
  justify-content: space-between !important; 
  img {
    width: 40px;  
    cursor: pointer;
    align-self: flex-start;
  }
`;

const CloseButton = styled.button`
    background-color: white;
    color: #0d99ff;
    margin-top: 20px;
    padding: 5px 15px;
    border: 1px solid #0d99ff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
`;

const MarketplaceListed = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  &>span {
    font-size: 14px;
    color: #525c76;
  }
  &>p {
    margin: 0;
    font-size: 14px
  }
`;

State.init({
  isOpen: false,
  error: false,
});

const getFormatedTxDate = (newDate) => {
  const now = new Date();
  const date = new Date(newDate * 1000);
  const diff = (now.getTime() - date.getTime()) / (1000 * 3600 * 24);
  if (diff < 0.04) return `${parseInt(diff * 24 * 60)} mins ago`;
  if (diff < 1) return `${parseInt(diff * 24)} hours ago`;
  if (diff < 31) return `${parseInt(diff)} days ago`;
  if (diff < 356) return `${parseInt(diff / 30)} months ago`;
  return `${diff / 30 / 12} years ago`;
};

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChain[props.state.singleNftProps.chain].livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4);
  }
};

const handleSendClick = () => {
  // Handle the send button click event
  console.log("Input value:", state.listingPrice, Number(state.listingPrice));
  console.log(
    "Input value:",
    Ethers.provider().getSigner(),
    currentChain[props.state.singleNftProps.chain].contract
  );
  const contract = new ethers.Contract(
    currentChain[props.state.singleNftProps.chain].contract,
    listAbi,
    Ethers.provider().getSigner()
  );
  console.log("Formed thee", contract);
  const nftContract = props.state.singleNftProps.id.split(
    props.state.singleNftProps.tokenId
  )[0];

  console.log(
    "Logged Thee",
    nftContract,
    props.state.singleNftProps.tokenId,
    (Number(state.listingPrice) * 1e18).toString()
  );

  contract
    .createMarketplaceItem(
      nftContract,
      props.state.singleNftProps.tokenId,
      (Number(state.listingPrice) * 1e18).toString(),
      "General",
      "0xB4bE310666D2f909789Fb1a2FD09a9bEB0Edd99D"
    )
    .then((transactionHash) => transactionHash.wait())
    .then((ricit) => {
      console.log("does not get hiere", ricit);
      State.update({
        isOpen: false,
        message: true,
        text: `${currentChain[props.state.singleNftProps.chain].explorer}/tx/${
          ricit.transactionHash
        }`,
      });
    })
    .catch((err) => {
      console.log("erro stuffs, baffles me", err);
      State.update({
        isOpen: false,
        error: true,
        text: err.reason,
      });
    });
};

const handleListing = () => {
  State.update({
    isOpen: true,
  });
};

const handleInputChange = (e) => {
  console.log("updator", e.target.value);
  State.update({
    listingPrice: e.target.value,
  });
};

const price = props.state.singleNftProps.price
  ? props.state.singleNftProps.price * PRICE_CONVERSION_VALUE
  : 0;

const handleClose = () => {
  props.isNFTButtonClicked = false;
};

return (
  <Root>
    <MainContainer>
      <TopSection>
        <CloseNFT onClick={() => props.handleCloseNft()}>
          <img
            src="https://cdn-icons-png.flaticon.com/256/109/109618.png"
            alt=""
          />
        </CloseNFT>
        <TopImageContainer>
          <HeaderText>
            {props.state.singleNftProps.name || "AI Sunset"}
          </HeaderText>
          <img
            src={
              props.state.singleNftProps.image
                ? props.state.singleNftProps?.image.replace(
                    "ipfs://",
                    "https://ipfs.io/ipfs/"
                  )
                : "https://ipfs.io/ipfs/QmZbtU8RnMymJAJRpTriZgDXVeeCpm5RyXMJNquGoVc4Rb"
            }
            alt="NFT"
            width="100%"
            height="100%"
            className="rounded-3"
          />
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                marginBottom: "0.5em",
                fontSize: "0.85rem",
                color: "#0d99ff",
              }}
            >
              Created by
            </p>
            <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
              {`${
                props.state.singleNftProps.owner
                  ? props.state.singleNftProps.owner.slice(0, 6)
                  : "0x022"
              }...${
                props.state.singleNftProps.owner
                  ? props.state.singleNftProps.owner.slice(36)
                  : "0454et"
              }`}
            </span>
          </div>
        </TopImageContainer>
        <RightSection>
          {state.error && (
            <span style={{ color: state.colour || "red" }}>{state.text}</span>
          )}
          {state.message && (
            <a href={`${state.text}`} target="_blank">
              View Transaction
            </a>
          )}
          <PriceBucket>
            <div>
              <p style={{ color: "#b2b7c2", marginBottom: 0 }}>CURRENT PRICE</p>
              <PriceArea>
                <h6>{price.toFixed(2)}</h6>
                <span>
                  ($
                  {getUsdValue(
                    props.state.singleNftProps.price * PRICE_CONVERSION_VALUE ||
                      0
                  )}
                  )
                </span>
              </PriceArea>
            </div>
            <div>
              {props.state.singleNftProps.isListed ? (
                <button
                  style={{
                    backgroundColor: "#525c76",
                    borderColor: "#525c76",
                    cursor: "not-allowed",
                  }}
                >
                  Listed
                </button>
              ) : props.state.singleNftProps.owner == props.state.sender ? (
                <button onClick={handleListing}>List</button>
              ) : (
                <button
                  style={{
                    backgroundColor: "#525c76",
                    borderColor: "#525c76",
                    cursor: "not-allowed",
                  }}
                >
                  Not Listed
                </button>
              )}
            </div>
            {state.isOpen && (
              <Popup>
                <div>
                  <PopupContent>
                    <div>
                      <Input
                        type="text"
                        value={state.listingPrice}
                        onChange={handleInputChange}
                        placeholder="Enter Listing Price"
                      />
                      <div
                        style={{
                          width: "100%",
                          display: flex,
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "row",
                          marginLeft: "40px",
                        }}
                      >
                        <Button onClick={handleSendClick}>List NFT</Button>
                        <CloseButton
                          onClick={() => State.update({ isOpen: false })}
                        >
                          Close
                        </CloseButton>
                      </div>
                    </div>
                  </PopupContent>
                </div>
              </Popup>
            )}
          </PriceBucket>
          <Description>
            <h6>Description</h6>
            <span>
              {props.state.singleNftProps.description ||
                "Ai generated sunset cliffs"}
            </span>
          </Description>
          <Description>
            <h6>Attributes</h6>
            <AttributeContainer>
              {props.state.singleNftProps.attributes ? (
                props.state.singleNftProps.attributes.map((data) => (
                  <Attribute>
                    <div>
                      <span style={{ color: "#b2b7c2" }}>File Type</span>
                      <p style={{ marginTop: "10px" }}>{data.trait_type}</p>
                    </div>
                    <div>
                      <span style={{ color: "#b2b7c2" }}>Rarity</span>
                      <p style={{ marginTop: "10px" }}>{data.value}</p>
                    </div>
                  </Attribute>
                ))
              ) : (
                <Attribute>
                  <div>
                    <span style={{ color: "#b2b7c2" }}>File Type</span>
                    <p style={{ marginTop: "10px" }}>PNG</p>
                  </div>
                  <div>
                    <span style={{ color: "#b2b7c2" }}>Rarity</span>
                    <p style={{ marginTop: "10px" }}>1%</p>
                  </div>
                </Attribute>
              )}
            </AttributeContainer>
          </Description>
          <Description>
            <h6>Details</h6>
            <MintDetails>
              <span>Mint Address</span>
              <a
                target="_blank"
                href={`${
                  currentChain[props.state.singleNftProps.chain].explorer
                }/address/${props.state.singleNftProps.owner || ""}`}
              >
                {`${
                  props.state.singleNftProps.owner
                    ? props.state.singleNftProps.owner.slice(0, 6)
                    : "0x022"
                }...${
                  props.state.singleNftProps.owner
                    ? props.state.singleNftProps.owner.slice(36)
                    : "0454et"
                }`}
              </a>
            </MintDetails>
          </Description>
        </RightSection>
      </TopSection>
    </MainContainer>
    <TransactionTable>
      <TableHeader>
        <h1>Transaction History</h1>
      </TableHeader>
      {props.state.singleNftProps.transactions ? (
        props.state.singleNftProps.transactions.map((data) => (
          <TableBody>
            <RowType>{data.type}</RowType>
            <a
              href={`${
                currentChain[props.state.singleNftProps.chain].explorer
              }/tx/${data.txId || ""}`}
              target="_blank"
            >
              <RowBody>
                <span>From</span>
                <p>
                  {`${data.owner ? data.owner.id.slice(0, 4) : ".."}...${
                    data.owner ? data.owner.id.slice(40) : "."
                  }`}
                </p>
                <span>To</span>
                <p>
                  {`${data.to ? data.to.id.slice(0, 4) : ".."}...${
                    data.to ? data.to.id.slice(40) : "."
                  }`}
                </p>
                <p>{getFormatedTxDate(data.txDate || "1662436482")}</p>
              </RowBody>
            </a>
          </TableBody>
        ))
      ) : (
        <TableBody>
          <RowType>Listing</RowType>
          <a>
            <RowBody>
              <span>From</span>
              <p>---</p>
              <span>To</span>
              <p>waze.near</p>
              <p>{getFormatedTxDate(data.txDate || "1662436482")}</p>
            </RowBody>
          </a>
        </TableBody>
      )}
    </TransactionTable>
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </Root>
);
