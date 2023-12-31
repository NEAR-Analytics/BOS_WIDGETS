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

const NFTCards = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-content: center;
  padding: 20px 3rem 1rem 3rem;
  justify-items: center;
  width:100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const NoNFTLoading = styled.div`
  width: 100%;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NoData = styled.div`
    min-height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    
`;

const Search = styled.div`
margin-top: 32px;
    justify-content: center;
display: flex;
width: 100%;
gap: 10px;
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
    width: 100%;
    justify-content: center;
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

const Explore = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-contents: center;
`;

State.init({
  nftData: [],
  chain: "near",
  filteredNFTData: [],
  searchTerm: "",
});

const fetchingState = () => {
  const fetchDAOs = useCache(
    () =>
      asyncFetch(
        "https://raw.githubusercontent.com/GenaDrop/genadrop-bos-widgets/main/data/cdao-daos.json"
      ).then((data) => JSON.parse(data.body).daos),
    "mainnetRpcStatus",
    { subscribe: false }
  );
  console.log(fetchDAOs);
  if (fetchDAOs.length) {
    State.update({
      nftData: fetchDAOs,
    });
  }
};


fetchingState();

const seachInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = state.nftData.filter((daos) => daos.includes(value));
  State.update({
    searchTerm: value,
    filteredNFTData: searched,
  });
};

return (
  <Explore>
    <SearchSection>
      <h1>Explore Creative DAOs</h1>
      <Search>
        <input
          value={state.searchTerm}
          type="search"
          onChange={seachInputHandler}
          placeholder="Search for DAOs"
        />
      </Search>
    </SearchSection>
    <Cards>
      <NFTCards>
        {state.searchTerm === "" && state.nftData.length
          ? state.nftData.map((data, index) => (
              <div key={index}>
                <Widget
                  props={{
                    daoId: data,
                    daoContractId: data,
                    isGateway: props.isGateway,
                    onButtonClick: () =>
                      props.update({
                        tab: "daoProfile",
                        daoId: data,
                        daoContractId: data,
                      }),
                  }}
                  src="agwaze.near/widget/CPlanet.DAO.Card"
                />
              </div>
            ))
          : state.filteredNFTData.map((data, index) => (
              <div key={index}>
                <Widget
                  props={{
                    daoId: data,
                    daoContractId: data,
                    isGateway: props.isGateway,
                    onButtonClick: () =>
                      props.update({
                        tab: "daoProfile",
                        daoId: data,
                        daoContractId: data,
                      }),
                  }}
                  src="agwaze.near/widget/CPlanet.DAO.Card"
                />
              </div>
            ))}
      </NFTCards>
      ) : <div></div>
    </Cards>
  </Explore>
);
