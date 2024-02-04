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
    name: "Frensly people",
    to: "frensly",
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
    transform-origin: top left;
    transition: all .2s;

    &.rotate {
      transform:rotate(-20deg);
    }
    
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

  li {
      :not(:last-of-type) {
        margin-right:15px;
      }
      
      a {
          display:block;
          border-radius:30px;
          border:0;
          font-size:.8rem;
          font-weight:bold;
          color:#000;
          background-color:#f2f2f2;
          border:1px solid rgba(0,0,0,.05);
          padding:.5rem 1.2rem;
          transition:all .2s;
      }
   }
`;

const SearchWrapper = styled.div`
   position:relative;
   width:250px;
   height:35px;
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
  transition: all .2s;

  :focus {
    z-index:9999;
    position:absolute;
    transition: all .2s;
    top:0;
    left:0;
    width:400px;
    height:70px;
    background-color:#fff;
    border:2px solid rgba(0,0,0,.05);
    box-shadow: 0 0 10px 5px rgba(0,0,0,.05);

    :hover {
      box-shadow: 0 0 10px 5px rgba(0,0,0,.05);
    }

    ~ div {
      transition: all .2s;
      opacity:1;
      pointer-events:all;
      height:200px;
    }
  }

  :hover {
      box-shadow: 0 0 0 3px rgba(0,0,0,.05);
      transition: all .2s;
      color:#000;
  }
`;

const SearchResults = styled.div`
  position:absolute;
  opacity:0;
  pointer-events:none;
  left:0;
  top:55px;
  z-index:9999999;
  width:400px;
  height:0;
  background-color:#fff;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  border:2px solid rgba(0,0,0,.05);
  margin-left:20px;
  border-top:0;
  transition: all .1s;

  .show {
    height:400px;
    opacity:1;
  }
`;

return (Store, status, { Route }) => {
  Route = Route || styled.a``;

  return (
    <Toolbar>
      <Menu>
        <Logo className={`${status.searching ? "rotate" : ""}`}>
          <img src={FRENSLY_LOGO} />
        </Logo>
        <SearchWrapper>
          <Search type="text" placeholder="Search frens" onFocus={() => Store.update({ searching: true })} onBlur={() => Store.update({ searching: false })}></Search>
          <SearchResults className="show"></SearchResults>
        </SearchWrapper>
        <MenuOptions>
          {routeMap.map((route) => (
            <li>
              <Route props={{ to: route.to }}>{route.name}</Route>
            </li>
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
