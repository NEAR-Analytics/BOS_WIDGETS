const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px 36px;
  color: #fff;

  @media (max-width: 900px) {
    padding-left: 12px;
    padding-right: 12px;
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

const templates = [
  {
    src: "bluebiu.near/widget/ZKEVM-all-in-one",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreicwk2fqkrtkwhyioz7l6tkgmduxsw4ey7t6pd7isahu3bex7etbgu",
  },
  {
    src: "guessme.near/widget/ZKEVMSwap.zkevm-swap",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreihwkwijwsazh5dp3rxc2lwgi4algusd3b447o3xcfcnndbgaura3q",
  },
  {
    src: "guessme.near/widget/ZKEVMSwap.zkevm-bridge",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreievrd4imhglvabvg2vgcqxmpk4vog6p3dw5cy3rsay4ocsyu3y7w4",
  },
  {
    src: "guessme.near/widget/ZKEVM.GAMMA",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreih77ecmgng2fpy6mblk2aipt3agwm3anjldcyktx2j6kssggpelue",
  },
  // {
  //   src: "guessme.near/widget/ZKEVM.AAVE",
  //   bannerImg:
  //     "https://ipfs.near.social/ipfs/bafkreibmqzfwki7zye6ruqi3hifgexs6g5nv4qvzcmrm73lnra5mbkdrxe",
  // },
  {
    src: "bluebiu.near/widget/0vix.Lending",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreifnrbp6mlafevojcdygdwcucondxucvzydizza63adkokll5pbkdq",
  },
];

State.init({
  searchValue: "",
}); // 初始化状态

const handleSearchChange = (e) => {
  const value = e.target.value;
  State.update({
    searchValue: value,
  }); // 更新状态值
};

const metadataPromises = templates.map(({ src }) =>
  Social.get(`${src}/metadata/**`, "final")
);

const updatedTemplates = templates.map((template, index) => ({
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
    {filteredTemplates.map(({ src, bannerImg }, index) => (
      <Widget
        src="guessme.near/widget/ZKEVM.Template-card"
        key={index}
        props={{
          src,
          bannerImg,
        }}
      />
    ))}
    <Widget src="guessme.near/widget/ZKEVMWarmUp.generage-uuid" />
  </Container>
);
