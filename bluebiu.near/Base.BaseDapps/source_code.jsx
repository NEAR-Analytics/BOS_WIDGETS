const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 36px;
  color: #fff;
`;

const Search = styled.div`
display: flex;
position: fixed;
top: 112px;
right: 32px;
  input{
     color: #ffffff;
     background: transparent;
     border: none;
     border-bottom: 1px #373A53 solid;
     padding-right: 24px;
   }
   input:focus {
     outline: none;
     color: #ffffff;
     background: transparent;
     border: none;
     box-shadow: none;
     border-bottom: 1px #373A53 solid;
   }
   svg {
    margin-left: -24px;
    margin-top:10px;
  }
  @media (max-width: 900px) {
    display:none;
  }
`;

const SearchIcon = (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.01829" cy="7.01829" r="6.01829" stroke="#EBF479" strokeWidth="2" />
    <rect x="14.9141" y="9.64941" width="6.141" height="2.63186" rx="1.31593" transform="rotate(30 14.9141 9.64941)" fill="#EBF479" />
  </svg>

);

const dapps = [
  {
    src: "bluebiu.near/widget/Base.BaseDex",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreih6mzl5vxgoodw53byblg4wvgsdvrzn573zrhoo3ccnkhgup7mebu",
    icon: "https://ipfs.near.social/ipfs/bafkreigpgcamevg6gqoazybmzcz4rvlk3x4twqfvbbd4llx5wrtqi7peqa",
    tags: ["Dexes", "BASE"],
  },
];

State.init({
  searchValue: "",
})   // 初始化状态

const handleSearchChange = (e) => {
  const value = e.target.value;
  State.update({
    searchValue: value,
  }) // 更新状态值
};

const metadataPromises = dapps.map(({ src }) =>
  Social.get(`${src}/metadata/**`, 'final')
);

const updatedTemplates = dapps.map((template, index) => ({
  ...template,
  name: metadataPromises[index]?.name || '',
}));

const filteredTemplates = updatedTemplates.filter(({ name }) =>
  name.toLowerCase().includes(state.searchValue.toLowerCase())
);


return (
  <Container>
    <Search>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {SearchIcon}
    </Search>
    {filteredTemplates.map((dapp) => (
      <Widget
        src="bluebiu.near/widget/Base.BaseDappCard"
        key={dapp.src}
        props={{
          ...dapp,
        }}
      />
    ))}
  </Container>
);
