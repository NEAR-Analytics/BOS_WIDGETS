//include common
const widgetSrc = (component) => {
  if (context.networkId === "mainnet")
    return `monsters-bos.near/widget/${component}`;
  else
    return `monstersdev.testnet/widget/${component}`;
}
const ftContract = (context.networkId === "mainnet") ? "monsters-alpha.near" : "dev-1693882284306-75813657022630";
const nftContract = (context.networkId === "mainnet") ? "monsters-nfts.near" : "dev-1697387315613-37447934459971";

const App = styled.div`
	button {
			background-color: #563D7C;
			border: none;
			color: #EDEDED;
			padding: 10px 20px;
			text-align: center;
			text-decoration: none;
			display: inline-block;
			font-size: 16px;
			border-radius: 5px;
			box-shadow: 2px 2px 4px #000;
			transition: background-color 0.3s ease;
	}

	button:hover {
			background-color: #8C6BB1;
	}
`;



const Nav = styled.div`
  display: flex;
  align-items: center;

  ul {
    display: flex;
    list-style-type: none;
    margin: 0;
    padding: 0;
    .selected {
      text-decoration:underline;
    }
    
    li {
      margin: 0 10px;
      cursor: pointer;
    }
  }
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #FFD700;

  margin-right: auto; // Pushes it to the left
  cursor: pointer;
`;

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(to right, #120835, #8C6BB1);
  padding: 10px 50px;
  box-shadow: 0 2px 10px var(--blackA7);
  text-shadow: 1px 1px 2px black;
  a {
    text-decoration: none;
    color: #FFD700;
    transition: color 0.3s;

    &:hover {
      color: #FFA500;
    }
  }


`;

const NavItem = ({ section, label }) => {
  const navClassName = (section) => {
    return "";
  };

  return (
    <li onClick={() => selectSection(section)}>
      <a className={navClassName(section)} href={section}>{label}</a>
    </li>
  );
};

const Header = () => {
  return (
    <StyledHeader>
        <Logo>
          <a href="https://nearmonsters.com">
            NEAR Monsters
          </a>
        </Logo>
      <Nav>
        <ul>
          <NavItem section="purchase" label="Purchase ALPHA" />
          <NavItem section="openPack" label="Open" />
          <NavItem section="inventory" label="Inventory" />
          <li>
            <Widget
              src={widgetSrc("ProfileImage")}
              props={{
                profile,
                accountId,
                className: "float-start d-inline-block me-2",
              }}
            />
          </li>
        </ul>
      </Nav>
    </StyledHeader>
  );
};

return <Header />
