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
    src: "bluebiu.near/widget/Mantle.All-in-one",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreifug44p2exzk6knoyhimjqaztvlvjaj43da3y53ly3iyqtn42ozku",
    icon: "https://ipfs.near.social/ipfs/bafkreicmbhykgsvj4rdujduh2fujbsrgp3mkqpqlw2weyuxdfqpwtka6la",
    tags: ["Bridge","Dexes","Lending"],
    bannerStyle: {
      background: "#05180A",
    },
  },
  {
    src: "bluebiu.near/widget/Mantle.Swap",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreie7a5cb6qj3je2dn5iatdulom3ottpwvtyxc7q2zodqqafizum6ge",
    icon: "https://ipfs.near.social/ipfs/bafybeihwxgpyehxj4htnu4xlfj23qlkr3efckx5dqun32hyfsokji2xg7a",
    tags: ["Dexes"],
    bannerStyle: {
      background: "#05180A",
    },
  },
  {
    src: "bluebiu.near/widget/Mantle.Lending",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreifug44p2exzk6knoyhimjqaztvlvjaj43da3y53ly3iyqtn42ozku",
    icon: "https://ipfs.near.social/ipfs/bafkreiccujcoir742fkxiwuxaic57xdcpmj36avz273sxiqaade7ku4wxi",
    tags: ["Lending"],
  },
  {
    src: "bluebiu.near/widget/Mantle.GAMMA",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreih77ecmgng2fpy6mblk2aipt3agwm3anjldcyktx2j6kssggpelue",
    icon: "https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa",
    tags: ["Liquidity Manager"],
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
        src="bluebiu.near/widget/Mantle.MantleTemplateCard"
        key={dapp.src}
        props={{
          ...dapp,
          bannerStyle: dapp.bannerStyle,
        }}
      />
    ))}
  </Container>
);
