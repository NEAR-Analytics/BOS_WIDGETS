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
  width:100%;
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

const defaultDaos = [
  "marmaj.sputnik-dao.near",
  "incubadora.sputnik-dao.near",
  "cudo.sputnik-dao.near",
  "muti.sputnik-dao.near",
  "beat-dao.sputnik-dao.near",
  "nxm.sputnik-dao.near",
  "gambiarra-dao.sputnik-dao.near",
  "metaverse-dao.sputnik-dao.near",
  "nomadelabel.sputnik-dao.near",
  "mintbase.sputnik-dao.near",
  "filipino-artist-guild.sputnik-dao.near",
  "demonstra.sputnik-dao.near",
  "arrozcriativo.sputnik-dao.near",
  "thekindao.sputnik-dao.near",
  "creatives.sputnik-dao.near",
  "kalakendradao.sputnik-dao.near",
  "inav2.sputnik-dao.near",
  "afrostar.sputnik-dao.near",
  "vr-dao.sputnik-dao.near",
  "fradao.sputnik-dao.near",
  "onboarding-dao.sputnik-dao.near",
  "near-writers-collective.sputnik-dao.near",
  "goa-dao.sputnik-dao.near",
  "hype.sputnik-dao.near",
  "nearhub-dao.sputnik-dao.near",
  "motiondao.sputnik-dao.near",
  "spiritual-dao.sputnik-dao.near",
  "the-philosophers-dao.sputnik-dao.near",
  "3xr.sputnik-dao.near",
  "nearxart.sputnik-dao.near",
  "feminu-dao.sputnik-dao.near",
  "vn-artists-dao.sputnik-dao.near",
  "blaqkstereo.sputnik-dao.near",
  "youngfresh.sputnik-dao.near",
  "garden-collective.sputnik-dao.near",
  "the-auction.sputnik-dao.near",
  "daorecords.sputnik-dao.near",
  "the-clan.sputnik-dao.near",
  "octopode-dao.sputnik-dao.near",
  "55sp.sputnik-dao.near",
  "svara.sputnik-dao.near",
  "graffiti.sputnik-dao.near",
  "free-horses.sputnik-dao.near",
  "lens.sputnik-dao.near",
  "jazzdao.sputnik-dao.near",
  "black-cat-cinema.sputnik-dao.near",
  "burlesque.sputnik-dao.near",
  "gruta.sputnik-dao.near",
  "hypedao.sputnik-dao.near",
  "vandao.sputnik-dao.near",
  "dimension.sputnik-dao.near",
  "c1foundation.sputnik-dao.near",
  "dedeukwushryne.sputnik-dao.near",
  "indiaverse.sputnik-dao.near",
  "master-minds.sputnik-dao.near",
  "1-million-nfts.sputnik-dao.near",
  "loozr-dao.sputnik-dao.near",
  "familydao.sputnik-dao.near",
  "apex-trybe.sputnik-dao.near",
  "thespians.sputnik-dao.near",
];

const seachInputHandler = (e) => {
  const value = e.target.value.toLowerCase();
  const searched = defaultDaos.filter((daos) => daos.includes(value));
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
        <FilterDropdown>Filter/Dropdown</FilterDropdown>
      </Search>
    </SearchSection>
    <Cards>
      <NFTCards>
        {state.searchTerm === ""
          ? defaultDaos.map((data, index) => (
              <div key={index}>
                <Widget
                  props={{
                    daoId: data,
                    onButtonClick: () =>
                      props.update({
                        tab: "daoProfile",
                        daoId: data,
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
                    onButtonClick: () =>
                      props.update({
                        tab: "daoProfile",
                        daoId: data,
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
