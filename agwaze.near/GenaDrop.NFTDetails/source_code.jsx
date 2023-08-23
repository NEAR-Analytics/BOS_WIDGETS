const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const currentChain = {
  near: "https://ipfs.near.social/ipfs/bafkreidptf634houwtbxryegonzyys3wnz3m75zqyxfcot5u42slwdtb2e",
  sui: "https://blog.sui.io/content/images/2023/04/Sui_Droplet_Logo_Blue-3.png",
  aptos:
    "data:image/png;base64,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",
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
      if (!token && props.nftState === "near") {
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
          }
        );
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
      props.chainState ?? "near"
    }&vs_currencies=usd`
  );
  if (res.ok) {
    const multiplyBy = Object.values(res?.body)[0]?.usd;
    const value = multiplyBy * price.toFixed(2);
    return value.toFixed(4) !== "NaN" ? `$${value.toFixed(2)}` : 0;
  }
};

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
              href={`https://explorer.near.org/?query=${
                state.owner || "genadrop-contract.nftgen.near"
              }`}
            >
              <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                {state.owner.length > 12
                  ? state.owner.slice(0, 12) + "..."
                  : state.owner ||
                    "genadrop-contract.nftgen.near".slice(0, 12) +
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
                    <img src={currentChain[props.chainState]} />
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
                      ? (state.price / 1000000000000000000000000).toFixed(2)
                      : "0.00"
                  }`}
                </h6>
                <span>{` (${
                  state.listings.price
                    ? getUsdValue(
                        state.listings.price / 1000000000000000000000000
                      )
                    : state.price
                    ? getUsdValue(state.price / 1000000000000000000000000)
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
            <span>{state.description || "Ai generated sunset cliffs"}</span>
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
                href={`https://explorer.near.org/?query=${
                  state.owner || "genadrop-contract.nftgen.near"
                }`}
              >
                {state.owner.length > 12
                  ? state.owner.slice(0, 12) + "..." + "near"
                  : state.owner ||
                    "genadrop-contract.nftgen.near".slice(0, 8) +
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
