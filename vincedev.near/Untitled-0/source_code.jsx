let title = "vince";

const menu = [
  { name: "Home" },
  {
    name: "About",
  },
  {
    name: "Contact",
  },
  {
    name: "Docs",
  },
];
const Logo = styled.h2`
font-size: 32px;
font-family:Orbitron;
`;
const Navbar = styled.div`
display: flex;
justify-content: space-between;
 align-items: center;
 font-family: Space Grotesk;
`;

const MenuStyle = styled.div`
display: flex;
gap:12px;
 align-items: center;
`;

const MenuItem = styled.h2`
font-size: 16px;
  &:hover {
    border: 1px solid;
    padding: 8px 16px;
    border-radius: 16px;
  }
`;

return (
  <div>
    <Navbar>
      <Logo>{title}</Logo>
      <MenuStyle>
        {menu.map((data, index) => (
          <MenuItem>{data.name}</MenuItem>
        ))}
      </MenuStyle>
      <button>ConnectWallet</button>
    </Navbar>
  </div>
);
