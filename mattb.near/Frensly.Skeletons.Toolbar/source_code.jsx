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
      border:1px solid rgba(0,0,0,0);
      padding:.5rem 1.2rem;
      transition:all .2s;
      color:transparent;

      img {
        max-width:20px;
        margin-right:5px;
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
    width:60px;
    height:45px;
    background-color:rgba(0,0,0,.05);
    border-radius:20px;
    
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
          color:transparent!important;
          background-color:rgba(0,0,0,.05);
          border:1px solid rgba(0,0,0,0);
          padding:.5rem 1.2rem;
          transition:all .2s;
      }
   }
`;

const Search = styled.input`
  border-radius:20px;
  color:#000;
  background-color:rgba(0,0,0,.05);
  border:0;
  padding:0 1rem;
  font-size:13px;
  cursor:pointer;
  transition: all .2s;
  outline-style:none!important;
  margin-left:20px;
  width:230px;
  height:35px;
`;

return (
  <Toolbar>
    <Menu>
      <Logo></Logo>
      <Search type="text"></Search>
      <MenuOptions>
        {routeMap.map((route) => (
          <li>
            <a>{route.name}</a>
          </li>
        ))}
      </MenuOptions>
    </Menu>
    <button>
      <span>
      </span>
      Login
    </button>
  </Toolbar>
);
