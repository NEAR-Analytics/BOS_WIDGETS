const Root = styled.div`
    padding: 20px;
    width: 100%;
    h1 {
        color: var(--Black, #000);
        leading-trim: both;
        text-edge: cap;
        font-family: Helvetica Neue;
        font-size: 48px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
`;

const TopNFTS = styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
    margin: 20px 0;
    overflow-x: scroll;
`;

const SearchSection = styled.div`
    margin-top: 48px;
`;

const Search = styled.div`
margin-top: 32px;
display: flex;
flex-wrap: wrap;
input {
    border-radius: 32px;
    flex-shrink: 0;
    height: 48px;
    width: 65%;
    background: #F8F8F8;
    overflow: hidden;
    color: #B0B0B0;
    text-overflow: ellipsis;
    font-family: Helvetica Neue;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 148%; /* 29.6px */
}
`;

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    gap: 18px;
    margin-top: 32px;
    flex-wrap: wrap;
`;
const FilterDropdown = styled.div`
width: 192px;
height: 48px;
flex-shrink: 0;
border-radius: 4px;
background: #B0B0B0;
overflow: hidden;
color: #FFF;
font-family: Helvetica Neue;
font-size: 20px;
font-style: normal;
text-align: center;
font-weight: 400;
padding-top: 8px;
margin-left: 10px;

`;

State.init({
  nftData: [],
  filteredNFTData: [],
  searchTerm: "",
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

const fetchData = () => {
  let response = fetch(`${currentChainProps["near"].subgraph}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
            query MyQuery {
             nfts(orderBy: createdAtTimestamp) {
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
  if (!response.ok) {
    return "Loading";
  }
  const collectionData = response.body.data.nfts;
  if (collectionData) {
    const filteredNftData = [];

    for (const filteredData of collectionData) {
      try {
        const response = fetch(
          filteredData.tokenIPFSPath.replace("ipfs://", "https://ipfs.io/ipfs/")
        );
        if (response.body.name != undefined) {
          filteredNftData.push(filteredData);
        }
      } catch (error) {
        // Handle any errors that occur during the fetch if needed
        console.error(`Error fetching data: ${error}`);
      }
    }
    const nftBody = filteredNftData.map((data) => {
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
        nftObject.contract_id = data?.id;
        nftObject.sold = data?.isSold;
        nftObject.isListed = data?.isListed;
        nftObject.owner = data?.owner?.id;
        nftObject.price = data?.price;
        nftObject.token_id = data?.tokenID;
        nftObject.name = nft?.name;
        nftObject.description = nft?.description;
        nftObject.media_url = nft?.image
          ? nft?.image?.replace("ipfs://", "https://ipfs.io/ipfs/")
          : "https://ipfs.near.social/ipfs/bafkreidoxgv2w7kmzurdnmflegkthgzaclgwpiccgztpkfdkfzb4265zuu";
        return nftObject;
      }
    });
    State.update({
      nftData: nftBody,
    });
  }
};
fetchData();

return (
  <Root>
    <TopNFTS>
      {state.nftData.slice(0, 6).map((data, index) => (
        <div key={index}>
          <Widget
            props={{
              title: data.name,
              image: data.media_url,
            }}
            src="agwaze.near/widget/CPlanet.NFTCard.FeaturedNFT"
          />
        </div>
      ))}
    </TopNFTS>
    <SearchSection>
      <h1>Explore Creative NFTs</h1>
      <Search>
        <input
          value={state.searchTerm}
          type="search"
          onChange={seachInputHandler}
          placeholder="Search for NFTs"
        />
        <FilterDropdown>Filter / Dropdown</FilterDropdown>
      </Search>
    </SearchSection>
    <Cards>
      {state.searchTerm === ""
        ? state.nftData.map((data, index) => (
            <div key={index}>
              <Widget
                props={{
                  title: data.name,
                  description: data.description,
                  image: data.media_url,
                }}
                src="agwaze.near/widget/CPlanet.NFTCard.index"
              />
            </div>
          ))
        : state.filteredNFTData.map((data, index) => (
            <div key={index}>
              <Widget
                props={{
                  title: data.name,
                  description: data.description,
                  image: data.media_url,
                }}
                src="agwaze.near/widget/CPlanet.NFTCard.index"
              />
            </div>
          ))}
    </Cards>
  </Root>
);
