const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 36px;
  color: #fff;
  @media (max-width: 900px) {
    padding: 0 12px;
  }
`;

const Search = styled.div`
  display: flex;
  position: fixed;
  top: 112px;
  right: 32px;
  input {
    color: #ffffff;
    background: transparent;
    border: none;
    border-bottom: 1px #373a53 solid;
    padding-right: 24px;
  }
  input:focus {
    outline: none;
    color: #ffffff;
    background: transparent;
    border: none;
    box-shadow: none;
    border-bottom: 1px #373a53 solid;
  }
  svg {
    margin-left: -24px;
    margin-top: 10px;
  }
  @media (max-width: 900px) {
    display: none;
  }
`;

const SearchIcon = (
  <svg
    width="21"
    height="15"
    viewBox="0 0 21 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="7.01829"
      cy="7.01829"
      r="6.01829"
      stroke="#EBF479"
      strokeWidth="2"
    />
    <rect
      x="14.9141"
      y="9.64941"
      width="6.141"
      height="2.63186"
      rx="1.31593"
      transform="rotate(30 14.9141 9.64941)"
      fill="#EBF479"
    />
  </svg>
);

const dapps = [
  {
    src: "bluebiu.near/widget/Arbitrum.All-in-one",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreiagman5kszm4uk4znday3gj3sfk74djaqcgj6zl5ortzd7fmlox4a",
    icon: "https://ipfs.near.social/ipfs/bafkreihtp5vexzm2mul6jaqs2qwdy5th4ctmaj7tcqc6b43tebjq5rocku",
    tags: ["Bridge","Dexes","Lending"],
  },
  {
    src: "bluebiu.near/widget/Arbitrum.Swap.Dex",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreiagman5kszm4uk4znday3gj3sfk74djaqcgj6zl5ortzd7fmlox4a",
    icon: "https://ipfs.near.social/ipfs/bafkreihtp5vexzm2mul6jaqs2qwdy5th4ctmaj7tcqc6b43tebjq5rocku",
    tags: ["Dexes"],
  },
  {
    src: "bluebiu.near/widget/Arbitrum.Lending",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreigzufesirrjsbtqjcjlzt6m4rnyzhyzvh2732bn44h5vbpzsq67iq",
    icon: "https://ipfs.near.social/ipfs/bafkreicoeaezefzsgadszuqjnzg5p7vh3zaou7h2phzdcwef4w7xmak3t4",
    tags: ["Lending"],
  },
  {
    src: "bluebiu.near/widget/Arbitrum.Pendle.TradeMarkets",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafybeiexzrgrlevy3x5gqr524tvhdf2owupafcnfgabr75rzuaullau3em",
    icon: "https://ipfs.near.social/ipfs/bafkreibcsptbgmv2coqwhrr7o7sgtilcbztxl7ehrd32nck4vbnab772ua",
    tags: ["Yield"],
  },
];

State.init({
  searchValue: "",
});

const handleSearchChange = (e) => {
  const value = e.target.value;
  State.update({
    searchValue: value,
  });
};

const metadataPromises = dapps.map(({ src }) =>
  Social.get(`${src}/metadata/**`, "final")
);

const updatedTemplates = dapps.map((template, index) => ({
  ...template,
  name: metadataPromises[index]?.name || "",
}));

const filteredTemplates = updatedTemplates.filter(({ name }) =>
  name.toLowerCase().includes(state.searchValue.toLowerCase())
);

return (
  <Container>
    <Search>
      <input type="text" value={searchValue} onChange={handleSearchChange} />
      {SearchIcon}
    </Search>
    {filteredTemplates.map((dapp) => (
      <Widget
        src="bluebiu.near/widget/Arbitrum.DappCard"
        key={dapp.src}
        props={{
          ...dapp,
        }}
      />
    ))}
  </Container>
);
