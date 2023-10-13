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
