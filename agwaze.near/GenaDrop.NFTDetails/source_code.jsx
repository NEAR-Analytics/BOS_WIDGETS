const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const contractId = nft.contractId;
const tokenId = nft.tokenId;
const className = props.className ?? "img-fluid";
const style = props.style;
const alt = props.alt;
const thumbnail = props.thumbnail;
const fallbackUrl = props.fallbackUrl;
const loadingUrl =
  props.loadingUrl ??
  "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";

State.init({
  contractId,
  tokenId,
  description: "",
  listings: [],
  title: "",
  owner: "",
  imageUrl: null,
});

const currentChainProps = {
  near: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
    livePrice: "near",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/near-mainnet",
    chain: "near",
    id: "1112",
    logoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrJuxjGxj4QmyreE6ix4ygqm5pK9Nn_rdc8Ndw6lmJcd0SSnm2zBIc2xJ_My1V0WmK2zg&usqp=CAU",
  },
  aurora: {
    img: "https://s2.coinmarketcap.com/static/img/coins/200x200/14803.png",
    id: "1313161554",
    chain: "Aurora",
    livePrice: "ethereum",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/aurora-mainnet",
  },
  arbitrum: {
    img: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1680097630",
    id: "42161",
    chain: "Arbitrum",
    livePrice: "ethereum",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/arbitrum",
  },
  celo: {
    img: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1674707499",
    id: "42220",
    livePrice: "celo",
    chain: "Celo",
    subgraph: "https://api.thegraph.com/subgraphs/name/prometheo/celo-mainnet",
  },
  polygon: {
    img: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo.webp",
    id: "137",
    chain: "Polygon",
    livePrice: "matic-network",
    subgraph:
      "https://api.thegraph.com/subgraphs/name/prometheo/polygon-mainnet",
  },
  aptos: {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqBinSwbRdx76qY4A3qvVkM9g_mKoGCBDT0sqTT02TgRvKquV2Vlc8fSRmLyuhBS3-CaA&usqp=CAU",
  },
  sui: {
    img: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  },
};

const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const nftMetadata =
  nft.contractMetadata ?? Near.view(contractId, "nft_metadata");
const tokenMetadata =
  nft.tokenMetadata ??
  Near.view(contractId, "nft_token", {
    token_id: tokenId,
  }).metadata;

if (contractId !== state.contractId || tokenId !== tokenId) {
  State.update({
    contractId,
    tokenId,
    imageUrl: null,
  });
}

let imageUrl = null;

function fetchTokens() {
  asyncFetch("https://graph.mintbase.xyz/mainnet", {
    method: "POST",
    headers: {
      "mb-api-key": "omni-site",
      "Content-Type": "application/json",
      "x-hasura-role": "anonymous",
    },
    body: JSON.stringify({
      query: `
          query MyQuery {
              mb_views_nft_tokens(
              where: { nft_contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
              order_by: {minted_timestamp: desc}
            ) {
                attributes {
                    attribute_display_type
                    attribute_value
                }
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
  }).then((res) => {
    if (res.ok) {
      const tokens = res.body.data.mb_views_nft_tokens;
      const token = tokens[0];
      State.update({
        description: token.description,
        owner: token.owner,
        listings: token.listings[0],
        title: token.title,
      });
      if (!token && props.chainState !== ("aptos" || "sui")) {
        let response = fetch(currentChainProps[props.chainState]?.subgraph, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query MyQuery {
             nfts(where: {tokenID: "${tokenId}"}) {
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
        });
        const collectionData = response.body.data.nfts;

        if (collectionData) {
          const nftBody = collectionData.map((data) => {
            const fetchIPFSData = fetch(
              data.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
            );

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
              nftObject.attributes = nft?.properties;
              nftObject.image = nft?.image.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
              );
              return nftObject;
            }
          });
          State.update({
            title: nftBody[0].name,
            imageUrl: nftBody[0].image,
            owner: nftBody[0]?.owner,
            description: nftBody[0]?.description,
            price: nftBody[0].price,
          });
        }
      }
      if (!token) {
        const response = fetch("https://api.indexer.xyz/graphql", {
          method: "POST",
          headers: {
            "x-api-key": "Krqwh4b.bae381951d6050d351945c0c750f1510",
            "x-api-user": "Banyan",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `query MyQuery {
  ${props.chainState} {
    nfts(
      where: { contract_id: { _eq: "${contractId}" }, token_id: {_eq: "${tokenId}"}}
    ) {
      contract_id
      name
      media_url
      token_id
      media_type
      owner
      
      staked_owner
      listings {
        listed
        price
      }
      attributes {
        rarity
        value
        type
        score
      }
     }
     }
    }`,
          }),
        });
        const token = response.body.data[props.chainState].nfts;
        if (token) {
          State.update({
            title: token[0].name,
            listings: token[0].listings,
            attributes: token[0].attributes,
            imageUrl: token[0].media_url,
          });
        }
      }
    }
  });
}

fetchTokens();

if (props.contractId && props.tokenId && !state.title) {
  return (
    <NoNFTLoading>
      <img
        src="https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu"
        alt=""
      />
    </NoNFTLoading>
  );
}
if (nftMetadata && tokenMetadata) {
  let tokenMedia = tokenMetadata.media || "";

  imageUrl =
    tokenMedia.startsWith("https://") ||
    tokenMedia.startsWith("http://") ||
    tokenMedia.startsWith("data:image")
      ? tokenMedia
      : nftMetadata.base_uri
      ? `${nftMetadata.base_uri}/${tokenMedia}`
      : tokenMedia.startsWith("Qm") || tokenMedia.startsWith("ba")
      ? `https://ipfs.near.social/ipfs/${tokenMedia}`
      : tokenMedia;

  if (!tokenMedia && tokenMetadata.reference) {
    if (
      nftMetadata.base_uri === "https://arweave.net" &&
      !tokenMetadata.reference.startsWith("https://")
    ) {
      const res = fetch(`${nftMetadata.base_uri}/${tokenMetadata.reference}`);
      imageUrl = res.body.media;
    } else if (
      tokenMetadata.reference.startsWith("https://") ||
      tokenMetadata.reference.startsWith("http://")
    ) {
      const res = fetch(tokenMetadata.reference);
      imageUrl = JSON.parse(res.body).media;
    } else if (tokenMetadata.reference.startsWith("ar://")) {
      const res = fetch(
        `${"https://arweave.net"}/${tokenMetadata.reference.split("//")[1]}`
      );
      imageUrl = JSON.parse(res.body).media;
    }
  }

  if (!imageUrl) {
    imageUrl = false;
  }
}

const replaceIpfs = (imageUrl) => {
  if (state.oldUrl !== imageUrl && imageUrl) {
    const match = rex.exec(imageUrl);
    if (match) {
      const newImageUrl = `https://ipfs.near.social/ipfs/${match[1]}${
        match[2] || ""
      }`;
      if (newImageUrl !== imageUrl) {
        State.update({
          oldUrl: imageUrl,
          imageUrl: newImageUrl,
        });
        return;
      }
    }
  }
  if (state.imageUrl !== false) {
    State.update({
      imageUrl: false,
    });
  }
};

const thumb = (imageUrl) =>
  thumbnail && imageUrl && !imageUrl.startsWith("data:image/")
    ? `https://i.near.social/${thumbnail}/${imageUrl}`
    : imageUrl;

const img = state.imageUrl !== null ? state.imageUrl : imageUrl;
const src = img !== false ? img : fallbackUrl;

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
    width: 50%;
    min-width: 355px;
  border: 2px solid #cacdd5;
  margin-right: 20px;
  box-shadow: 2px 7px 22px rgba(28, 27, 28, 0.1);
  border-radius: 0.7em;
  &>img {
    width: 100%;
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

const Logo = styled.div`
    &>img {
        width: 30px;
        border-radius: 100%;
    }
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
    width: 100%;
    justify-content: space-between;
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

const HandleList = () => {
  console.log(props.singleNftProps);
};

const getUsdValue = (price) => {
  const res = fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${
      currentChainProps[props.chainState]?.livePrice
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};

const PRICE_CONVERSION_CONSTANT =
  props.chainState == "near" ? 1000000000000000000000000 : 1000000000000000000;

return (
  <Root>
    <MainContainer>
      <TopSection>
        <TopImageContainer>
          <HeaderText>{state.title || "AI Sunset"}</HeaderText>
          <img
            src={
              src ||
              "https://genadrop.mypinata.cloud/ipfs/QmZbtU8RnMymJAJRpTriZgDXVeeCpm5RyXMJNquGoVc4Rb"
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
            <a
              target="_blank"
              style={{ textDecoration: "none" }}
              href={
                state.owner && tokenId
                  ? `https://explorer.near.org/?query=${
                      state.owner || "genadrop-contract.nftgen.near"
                    }`
                  : "#"
              }
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {state.owner.length > 12
                  ? state.owner.slice(0, 12) + "..."
                  : !state.owner && tokenId
                  ? "----"
                  : "genadrop-contract.nftgen.near".slice(0, 8) +
                    "..." +
                    "near"}
              </span>
            </a>
          </div>
        </TopImageContainer>
        <RightSection>
          <PriceBucket>
            <div>
              <p style={{ color: "#b2b7c2", marginBottom: 0 }}>CURRENT PRICE</p>
              <PriceArea>
                {props.chainState ? (
                  <Logo>
                    <img src={currentChainProps[props.chainState]?.img} />
                  </Logo>
                ) : (
                  <Widget src="agwaze.near/widget/GenaDrop.NearLogo" />
                )}
                <h6>
                  {`${
                    state.listings.price
                      ? (
                          state.listings.price / 1000000000000000000000000
                        ).toFixed(2)
                      : state.price
                      ? (state.price / PRICE_CONVERSION_CONSTANT).toFixed(2)
                      : "0.00"
                  }`}
                </h6>
                <span>{` (${
                  state.listings.price
                    ? getUsdValue(
                        state.listings.price / 1000000000000000000000000
                      )
                    : state.price
                    ? getUsdValue(state.price / PRICE_CONVERSION_CONSTANT)
                    : "0.00"
                })`}</span>
              </PriceArea>
            </div>
            <div>
              {state.listings.price && context.contractId !== state.owner ? (
                <button>Buy</button>
              ) : state.owner === context.accountId ? (
                <a
                  href={`#/agwaze.near/widget/GenaDrop.NFTListing?tokenId=${tokenId}&contractId=${contractId}`}
                >
                  <button>List</button>
                </a>
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
          </PriceBucket>
          <Description>
            <h6>Description</h6>
            <span>
              {state.description
                ? state.description
                : tokenId && !state.description
                ? "--No Description--"
                : "Ai generated sunset cliffs"}
            </span>
          </Description>
          <Description>
            <h6>Attributes</h6>
            <AttributeContainer>
              {state.attributes ? (
                state.attributes.map((data) => (
                  <Attribute>
                    <div>
                      <span style={{ color: "#b2b7c2" }}>File Type</span>
                      <p style={{ marginTop: "10px" }}>{data.type}</p>
                    </div>
                    <div>
                      <span style={{ color: "#b2b7c2" }}>Rarity</span>
                      <p style={{ marginTop: "10px" }}>{data.rarity}%</p>
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
                href={
                  state.owner && tokenId
                    ? `https://explorer.near.org/?query=${
                        state.owner || "genadrop-contract.nftgen.near"
                      }`
                    : "#"
                }
              >
                {state.owner?.length > 12
                  ? state.owner.slice(0, 8) + "..." + props.chainState === "near" ? "near":state.owner.slice(39) 
                  : !state.owner && tokenId
                  ? "----"
                  : "genadrop-contract.nftgen.near".slice(0, 8) +
                    "..." +
                    "near"}
              </a>
            </MintDetails>
          </Description>
        </RightSection>
      </TopSection>
    </MainContainer>
    <Widget src="jgodwill.near/widget/GenaDrop.Footer" />
  </Root>
);
