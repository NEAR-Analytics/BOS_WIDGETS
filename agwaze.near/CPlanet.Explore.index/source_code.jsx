const Root = styled.div`
    padding: 20px;
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
`

const SearchSection = styled.div`
    margin-top: 48px;
`

const Search = styled.div`
margin-top: 32px;
display:flex;
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
`

const Cards = styled.div`
    display: flex;
    flex-direction: row;
    gap: 68px;
    margin-top: 32px;
    flex-wrap: wrap;
    width: 100%;
`
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

`

return (
  <Root>
    <TopNFTS>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <Widget src="agwaze.near/widget/CPlanet.FeaturedNFT.index" />
        </div>
      ))}
    </TopNFTS>
    <SearchSection>
    <h1>Explore Creative DAOs</h1>
    <Search>
        <input type="search" placeholder="Search for DAOs"  />
        <FilterDropdown>Filter / Dropdown</FilterDropdown>
    </Search>
    </SearchSection>
    <Cards>
        {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <Widget src="agwaze.near/widget/CPlanet.NFTCard.index" />
        </div>
      ))}
    </Cards>
  </Root>
);
