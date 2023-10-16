//include common
const widgetSrc = (component) => {
  if (context.networkId === "mainnet")
    return `monsters-bos.near/widget/${component}`;
  else
    return `monstersdev.testnet/widget/${component}`;
}
const ftContract = (context.networkId === "mainnet") ? "monsters-alpha.near" : "dev-1693882284306-75813657022630";
const nftContract = (context.networkId === "mainnet") ? "monsters-nfts.near" : "dev-1697387315613-37447934459971";

const App = styled.div`
	button {
			background-color: #563D7C;
			border: none;
			color: #EDEDED;
			padding: 10px 20px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			border-radius: 5px;
			box-shadow: 2px 2px 4px #000;
			transition: background-color 0.3s ease;
	}

	button:hover {
			background-color: #8C6BB1;
	}
`;


const fullSetList = Near.view(nftContract, "full_set_listing", {});
const nftsOwned = Near.view(nftContract, "nft_tokens_for_owner", {account_id: context.accountId, limit:50000});
const ownedCount = nftsOwned.reduce((acc, nft) => {
  const tokenId = nft.token_id.split(':')[0];
  acc[tokenId] = (acc[tokenId] || 0) + 1;
  return acc;
}, {});

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const FilterPane = styled.div`
  width: 20%;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const CardGrid = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 20px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  text-align: center;
`;

const CardName = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const CardImage = styled.img`
  width: 278px;
  height: auto;
`;

State.init({error: null, owned: "all", rarity: "all", sort_by: "id"});
function setOwnedFilter(value) {
  State.update({ ...state, owned: value });
}
function setRarityFilter(value) {
  State.update({ ...state, rarity: value });
}
function setSortBy(value) {
  State.update({ ...state, sort_by: value });
}
function sortByCriteria(cardA, cardB) {
  if(state.sort_by === "id") {
    return cardA.id.localeCompare(cardB.id);
  } else if(state.sort_by === "name") {
    return cardA.name.localeCompare(cardB.name);
  } else if(state.sort_by === "issued_at") {
    //TODO lookup in owned
    return false;
  }

}
return (
  <App>
    <Widget src={widgetSrc("header")}/>
    <Container>
      <FilterPane>
        <div>
          <label>Owned:</label>
          <select onChange={(e) => setOwnedFilter(e.target.value)} value={state.ownedFilter}>
            <option value="all">All</option>
            <option value="owned">Owned Only</option>
            <option value="missing">Missing Only</option>
          </select>
        </div>
        
        <div>
          <label>Rarity:</label>
          <select onChange={(e) => setRarityFilter(e.target.value)} value={rarityFilter}>
            <option value="all">All</option>
            <option value="Common">Common</option>
            <option value="Uncommon">Uncommon</option>
            <option value="Rare">Rare</option>
            <option value="Land">Land</option>
          </select>
        </div>
        <div>
          <label>Sort by:</label>
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="id">Card ID</option>
            <option value="name">Name</option>
          </select>
        </div>

      </FilterPane>
      <CardGrid>
        {fullSetList.sort(sortByCriteria).map((item, index) => (
          (((state.owned == "owned" && (ownedCount[item.id] || 0) > 0) || (state.owned == "missing" && !ownedCount[item.id]) ||state.owned == "all") &&
           ((state.rarity == item.rarity) || state.rarity == "all")
          ) &&
            <Card key={index}>
              <CardName>{item.name} - {item.rarity}</CardName>
              <CardImage src={item.url} />
              <div>Copies Owned: {ownedCount[item.id] || 0}</div>
            </Card>
        ))}
      </CardGrid>
    </Container>
    <div>
      <span class="text-decoration-underline">{nftsOwned.length}</span> NEAR Monster NFTs collected
    </div>
  </App>
);
