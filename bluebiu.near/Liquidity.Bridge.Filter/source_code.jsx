const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const Pools = styled.div`
  margin-right: 16px;
  display: flex;
  padding: 4px;
  border: 1px solid #373A53;
  border-radius: 8px;
  background: var(--agg-secondary-color,rgba(33, 35, 48, 0.5));
  &.layer {
    border-radius: 22px;
  }
`
const Pool = styled.div`
  cursor: pointer;
  color: var(--agg-primary-color,#FFF);
  font-size: 14px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid transparent;
  &.active {
    border-color: #373A53;
    background: #32364B;
  }
  &.layer {
    border-radius: 22px;
    display: flex;
    align-items: center;
    padding: 0 26px;
    height: 44px;
    font-family: "Inter Tight";
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border: none;
    &.active {
      color: #FFF;
      background: #000;
    }
  }
`
const StyledSearchAndChainsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  &.layer {
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
  }
`
const Search = styled.div`
  position: relative;
  width: 276px;
  height: 40px;
  padding-left: 40px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: var(--agg-secondary-color,rgba(33, 35, 48, 0.5));
`
const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  color: var(--agg-primary-color, #FFF);
  font-size: 14px;
`;
const SvgIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.icon-search {
    position: absolute;
    left: 12px;
    top: 12px;
  }
`
const ChainsOrMarketsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`
const Chains = styled.div`
  display: flex;
  padding: 4px;
  border: 1px solid #373A53;
  border-radius: 8px;
  background: var(--agg-secondary-color,rgba(33, 35, 48, 0.5));
`
const Chain = styled.div`
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 8px;
  border: 1px solid transparent;
  img {
    width: 24px;
  }
  &.active {
    border-color: #373A53;
    background: #32364B;
  }
`
const Markets = styled.div`
  /* width: 388px; */
  display: flex;
  align-items: center;
  height: 40px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1px solid #000;
  overflow: hidden;
`
const Market = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 5px;
  img {
    width: 20px;
  }
  span {
    color: #000;
    font-family: "Inter Tight";
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  &.active {
    background: #000;
    span {
      color: #FFF;
    }
  }
`



// const SvgIconSearch = styled("Switch.Root")`
//   position: absolute;

// `

const {
  from,
  markets,
  currentMarket,
  token,
  chains,
  categoryIndex,
  chainIndex,
  onSearchInput,
  onChangeCategoryIndex,
  onChangeChainIndex,
  onChangeMarket
} = props
const SearchIcon = (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#979ABE" stroke-width="2" />
    <rect x="14.9141" y="9.64941" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9141 9.64941)" fill="#979ABE" />
  </svg>
)
console.log('=markets', markets)
return (
  <Wrapper>
    <Pools className={[from].join(' ')}>
      <Pool className={[from, categoryIndex === 0 ? 'active' : ''].join(' ')} onClick={() => onChangeCategoryIndex(0)}>All pools</Pool>
      <Pool className={[from, categoryIndex === 1 ? 'active' : ''].join(' ')} onClick={() => onChangeCategoryIndex(1)}>Your pools</Pool>
    </Pools>
    <StyledSearchAndChainsContainer className={[from].join(' ')}>
      <Search>
        <SvgIcon className="icon-search">
          {SearchIcon}
        </SvgIcon>
        <Input placeholder="search by token" onInput={(event) => onSearchInput(event)} />
      </Search>
      <ChainsOrMarketsWrapper>
        {
          from === 'layer' ? (
            <Markets>
              {
                markets && markets.map((market, index) => {
                  return (
                    <Market key={index} className={[currentMarket?.basic?.name === market?.basic?.name ? 'active' : '']} onClick={() => onChangeMarket && onChangeMarket(market)}>
                      <img src={market?.basic?.icon} alt={market?.basic?.name} />
                      <span>{market?.basic?.name}</span>
                    </Market>
                  )
                })
              }
            </Markets>
          ) : (
            <Chains>
              {chains && chains.map((chain, index) => {
                return <Chain key={index} className={index === chainIndex ? 'active' : ''} onClick={() => onChangeChainIndex(index)}>
                  <img src={chain.logo} alt={chain.name} />
                </Chain>
              })}
            </Chains>
          )
        }

      </ChainsOrMarketsWrapper>
    </StyledSearchAndChainsContainer>
  </Wrapper >
)