initState({
  inputCollectionSlug: "genadrop-contract.nftgen.near",
  collectionSlug: "genadrop-contract.nftgen.near",
  collectionData: {},
  nftData: [],
});
const fetchData = () => {
  State.update({ nftData: [] });

  let response = fetch("https://byz-multi-chain-01.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "x-api-key": "ChRbeKE.c94220449dbb45973a67a614b1f590be",
      "Content-Type": "application/json",
      "Hasura-Client-Name": "near-social",
    },
    body: JSON.stringify({
      query: `
        query MyQuery {
      near {
        collection(where: {slug: {_eq: "${state.collectionSlug}"}}) {
          slug
      cover_image
      description
      floor
      usd_volume
      volume
      title
      collection_size
      nft_metas {
        image
        name
        rarity
        ranking
        token_id
        nft_state {
          owner
          staked
          staked_owner
        }
        nft_state_lists(
          where: {listed: {_eq: true}}
          limit: 1
          order_by: {list_contract: {name: desc}}
        ) {
          list_price
          listed
          list_contract {
            name
          }
        }
      }
        }
      }
    }`,
    }),
  });

  if (response) {
    const data = response;
    const collectionData = data.body.data.near.collection[0];
    let nftData = collectionData.nft_metas;

    // Sort NFTs based on list price (lowest to highest) and list status
    nftData.sort((a, b) => {
      const aListed = a.nft_state_lists && a.nft_state_lists[0];
      const bListed = b.nft_state_lists && b.nft_state_lists[0];

      if (aListed && bListed) {
        return aListed.list_price - bListed.list_price;
      } else if (aListed) {
        return -1;
      } else if (bListed) {
        return 1;
      } else {
        return 0;
      }
    });

    console.log(collectionData, nftData);
    State.update({ collectionData, nftData });
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
  font-size: 48px; 
  font-weight: bold; 
  margin-bottom: 20px; 
  `;

const NFTCard = styled.div`
   background-color: "#f0f0f0";
   border-radius: 10px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   padding: 20px;
   text-align: center;
  `;
const NFTCards = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  justify-content: center;
  margin-top: 20px;
`;

return (
  <div
    style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <PageTitle>💧 GenaDrop NEAR NFTs</PageTitle>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    ></div>
    {state.collectionData && (
      <Main>
        <Stats>
          <div>
            <p>USD Volume:</p>
            <p>{Math.round(state.collectionData.usd_volume)}</p>
          </div>
          <div>
            <p>Volume:</p>
            <p>
              {Math.round(
                state.collectionData.volume / 1000000000000000000000000
              )}{" "}
              N
            </p>
          </div>
          <div>
            <p>Collection Size:</p>
            <p>{state.collectionData.collection_size}</p>
          </div>
        </Stats>
      </Main>
    )}
    {state.nftData.length > 0 && (
      <NFTCards>
        {state.nftData.map((nft) => (
          <a
            href={`https://www.tradeport.xyz/near/collection/${state.collectionData.slug}/${nft.token_id}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <NFTCard classNmae="card">
              <img
                src={nft.image}
                alt={nft.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "5px",
                  objectFit: "cover",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ fontSize: "18px", margin: "0 0 10px" }}>
                {nft.name}
              </h3>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#3f51b5",
                    borderRadius: "20px",
                    color: "#fff",
                    display: "inline-block",
                    fontSize: "12px",
                    fontWeight: "bold",
                    padding: "3px 8px",
                  }}
                >
                  Rank: {Math.round(nft.ranking)}
                </span>
              </div>
              <p style={{ fontSize: "14px", marginBottom: "5px" }}>
                Token ID: {nft.token_id}
              </p>
              <p style={{ fontSize: "14px" }}>
                Collection: {nft.collection.slug}
              </p>
              {nft.nft_state_lists && nft.nft_state_lists[0] && (
                <p style={{ fontSize: "14px" }}>
                  Price:{" "}
                  {nft.nft_state_lists[0].list_price /
                    1000000000000000000000000}
                  {"N "}
                  {nft.nft_state_lists[0].list_contract.name}
                </p>
              )}
              {nft.nft_state && (
                <p style={{ fontSize: "14px" }}>
                  Owner:
                  {nft.nft_state.owner.length > 20
                    ? nft.nft_state.owner.slice(0, 20) + "..."
                    : nft.nft_state.owner}
                </p>
              )}
            </NFTCard>
          </a>
        ))}
      </NFTCards>
    )}
  </div>
);
