const routeMap = [
  {
    name: "Home",
    to: "home",
  },
  {
    name: "Explore",
    to: "explore",
  },
  {
    name: "NEAR Frens",
    to: "frens",
  },
];

const FRENSLY_LOGO =
  "https://ipfs.near.social/ipfs/bafkreibmkg7wbgfnliss4ow7uy4tn2trd7qejpfjzblhf45p2ffw2ppryu";
const LENS_MINI_LOGO =
  "https://ipfs.near.social/ipfs/bafkreiggkmczb7v43nicdia4n7xqkgynopby5k3nxs3zj6fij5eeurh23i";

const Toolbar = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:1.8rem 1.8rem 0;

    button {
      border-radius:30px;
      border:0;
      font-size:.8rem;
      font-weight:bold;
      color:#000;
      background-color:#f2f2f2;
      border:1px solid rgba(0,0,0,.05);
      padding:.5rem 1.2rem;
      transition:all .2s;

      img {
        max-width:20px;
        margin-right:5px;
      }

      :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        border:1px solid rgba(0,0,0,.05);
        background-color:#f2f2f2;
        color:#000;
      }
    }
`;

const Menu = styled.div`
  display:flex;
  align-items:center;
`;

const Logo = styled.div`
    display:flex;
    align-items:flex-end;
    justify-content:flex-end;
    
    img {
       max-width:60px;
    }

    p {
        padding:0;
        margin:0;
        font-size:1.6rem;
        font-weight:bold;
        margin-left:10px;
        text-decoration:underline;
    }
`;

const MenuOptions = styled.ul`
  display:flex;
  list-style:none;
  align-items:center;
  padding:0;
  margin:0;
  margin-left:20px;
`;

const Option = styled.li`
  border-radius:30px;
  border:0;
  font-size:.8rem;
  font-weight:bold;
  color:#000;
  background-color:#f2f2f2;
  border:1px solid rgba(0,0,0,.05);
  padding:.5rem 1.2rem;
  transition:all .2s;

  :not(:last-of-type) {
    margin-right:15px;
  }
`;

const Search = styled.input`
  border-radius:20px;
  color:#000;
  background-color:#f2f2f2;
  border:1px solid rgba(0,0,0,.05);
  padding:0 1rem;
  font-size:13px;
  cursor:pointer;
  transition: all .2s;
  outline-style:none!important;
  margin-left:20px;
  width:230px;
  height:35px;

  :hover {
      box-shadow: 0 0 0 3px rgba(0,0,0,.05);
      transition: all .2s;
      color:#000;
  }
`;

return (State, store, { Route }) => {
  Route = Route || ((props) => <>{props.children}</>);

  return (
    <Toolbar>
      <Menu>
        <Logo>
          <img src={FRENSLY_LOGO} />
        </Logo>
        <Search type="text" placeholder="Search frens"></Search>
        <MenuOptions>
          {routeMap.map((route) => (
            <Route to={route.to}>
              <Option>{route.name}</Option>
            </Route>
          ))}
        </MenuOptions>
      </Menu>
      <button>
        <span>
          <img src={LENS_MINI_LOGO} />
        </span>
        Login
      </button>
    </Toolbar>
  );
};
