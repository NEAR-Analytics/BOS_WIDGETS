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
    src: "bluebiu.near/widget/Linea.All-in-one",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreihlp4eqtmee2etir6abfw7chjydyc27mt2i4sefxdejyhx3jwpl34",
    icon: "https://ipfs.near.social/ipfs/bafkreicjziybpod3isxnkw3q6w4ld57bacs4hddmipzx57k6ebv4wtzx4e",
    tags: ["Bridge", "Dexes", "Lending"],
  },
  {
    src: "bluebiu.near/widget/Linea.Swap.Dex",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreihlp4eqtmee2etir6abfw7chjydyc27mt2i4sefxdejyhx3jwpl34",
    icon: "https://ipfs.near.social/ipfs/bafkreicjziybpod3isxnkw3q6w4ld57bacs4hddmipzx57k6ebv4wtzx4e",
    tags: ["Dexes"],
  },
  {
    src: "bluebiu.near/widget/Linea.Lending",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreifbxs3ubqbl3wjpk33bzzdhmosybmwr6dglmh3h463yjyxrne6tni",
    icon: "https://ipfs.near.social/ipfs/bafkreih42ufviwxtxk5oab24mdt46gm73jbhm5rhxsyq6l6fqngt5zc424",
    tags: ["Lending"],
  },
  {
    src: "bluebiu.near/widget/Linea.Liquidity.GAMMA.GAMMA",
    bannerImg:
      "https://ipfs.near.social/ipfs/bafkreih77ecmgng2fpy6mblk2aipt3agwm3anjldcyktx2j6kssggpelue",
    icon: "https://ipfs.near.social/ipfs/bafkreial4i3eb5uuxkhecn7nwos76km3qvb7jzxmups57rkxizr5i7dyaa",
    tags: ["Liquidity Manage"],
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

if (metadataPromises.every((m) => !m)) {
  return "";
}

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
