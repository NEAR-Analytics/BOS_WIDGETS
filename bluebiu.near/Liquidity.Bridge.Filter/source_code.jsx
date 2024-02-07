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
  background: rgba(33, 35, 48, 0.5);
`
const Pool = styled.div`
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 8px;
  color: #FFF;
  font-size: 14px;
  border: 1px solid transparent;
  &.active {
    border-color: #373A53;
    background: #32364B;
  }
`
const Search = styled.div`
  position: relative;
  width: 276px;
  height: 40px;
  padding-left: 40px;
  border-radius: 8px;
  border: 1px solid #373A53;
  background: rgba(33, 35, 48, 0.5);
`
const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  padding: 0;
  width: 100%;
  height: 100%;
  color: #FFF;
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
const ChainsWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`
const Chains = styled.div`
  display: flex;
  padding: 4px;
  border: 1px solid #373A53;
  border-radius: 8px;
  background: rgba(33, 35, 48, 0.5);
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


// const SvgIconSearch = styled("Switch.Root")`
//   position: absolute;

// `

const {
  token,
  chains,
  categoryIndex,
  chainIndex,
  onSearchInput,
  onChangeCategoryIndex,
  onChangeChainIndex,
} = props
const SearchIcon = (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#979ABE" stroke-width="2" />
    <rect x="14.9141" y="9.64941" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9141 9.64941)" fill="#979ABE" />
  </svg>
)
return (
  <Wrapper>
    <Pools>
      <Pool className={categoryIndex === 0 ? 'active' : ''} onClick={() => onChangeCategoryIndex(0)}>All pools</Pool>
      <Pool className={categoryIndex === 1 ? 'active' : ''} onClick={() => onChangeCategoryIndex(1)}>Your pools</Pool>
    </Pools>
    <Search>
      <SvgIcon className="icon-search">
        {SearchIcon}
      </SvgIcon>
      <Input placeholder="search by token" onInput={(event) => onSearchInput(event)} />
    </Search>
    <ChainsWrapper>
      <Chains>
        {chains && chains.map((chain, index) => {
          return <Chain key={index} className={index === chainIndex ? 'active' : ''} onClick={() => onChangeChainIndex(index)}>
            <img src={chain.logo} alt={chain.name} />
          </Chain>
        })}
      </Chains>
    </ChainsWrapper>
  </Wrapper>
)