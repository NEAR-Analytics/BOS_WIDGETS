const LensLib = VM.require("mattb.near/widget/NearBadger.Libs.Lens");

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
const FRENSLY_SAD = "https://ipfs.near.social/ipfs/bafkreidulgxhimcprctnjwby7ar7grznr7htje57ivzleicq2rot3grra4";

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
  position:relative;
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

  &.searching, :focus {
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
      transition: all .15s;
      pointer-events:all;
      width:400px;
      min-height:200px;
      padding: 1rem 1rem 1rem 1rem;
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
  overflow:hidden;
  display:flex;
  flex-wrap:wrap;
  align-items:center;
  justify-content:center;
  pointer-events:none;
  left:0;
  top:55px;
  z-index:9999999;
  width:0;
  min-height:0;
  background-color:#fff;
  border-bottom-left-radius:20px;
  border-bottom-right-radius:20px;
  border:2px solid rgba(0,0,0,.05);
  margin-left:20px;
  border-top:0;
  transition: all .1s;
  padding:0;
  
  &.searching {
    transition: all .2s;
    opacity:1;
    pointer-events:all;
    width:400px;
    min-height:200px;
  }
`;

const SearchResultWrapper = styled.div`
  display:flex;
  flex-direction:column;
  min-width:100px;
  min-height:50px;
  max-height:150px;
  flex:1;
  padding:5px;
`;

const SearchResult = styled.div`
  display:flex;
  flex-direction:column;
  min-width:100px;
  min-height:50px;
  padding:.8rem;
  box-sizing:border-box;
  background-color:rgba(0,0,0,.05);
  border-radius:10px;
  align-items:center;
  justify-content:center;
  border:1px solid rgba(0,0,0,.05);
  font-size:.8rem;
  flex:1;
  text-align:center;
  overflow:hidden;
  
  p {
    margin:0;
    
    &.lens-handle {
      font-size:1rem;
      font-weight:bold;
      margin:10px 0 5px;
      max-width:100%;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:no-wrap;
    }
    
    &.near-account-id {
      opacity:.4;
    }
  }  
`;

const Avatar = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:40px;
  min-height:40px;
  border-radius:100%;
  background-position:center;
  background-size:cover;
  background-repeat:no-repeat;
  background-color:rgba(0,0,0,.05);
  box-shadow: 0 0 0 3px rgba(0,0,0,.05);
`;

const Loading = styled.div`
  width:100%;
  height:100%;
  position:absolute;
  top:0;
  left:0;
  display:flex;
  align-items:center;
  justify-content:center;
  transition: all .2s;
  pointer-events:none;
  background-color:rgba(255,255,255,1);
  z-index:9999;

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 5px solid rgba(0,0,0,.1);
    border-bottom-color: rgba(0,0,0,.4);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation .5s linear infinite;
  }
`;

const NoResult = styled.div`
  align-self:center;
  text-align:center;
  opacity:.4;
  
  p {
    font-weight:bold;
    font-size:1rem;
    margin-top:10px;
  }
 
  img {
    max-width:100px;
    width:100%;
  }
`;

return (Store, status, { Route }) => {
  Route = Route || styled.a``;

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const search = (searchTerm) => {
    Store.update({ loadingSearch: true });

    return new Promise((resolve, reject) => {
      let identities = Social.get("*/identity/lens/*", "final");

      let check = () => {
        setTimeout(() => {
          if (identities === null) {
            check();
          } else {
            if (searchTerm in identities) {
              resolve([{
                accountId: searchTerm,
                value: identities[searchTerm]
              }]);
            } else if (`${searchTerm}.near` in identities) {
              resolve([{
                accountId: `${searchTerm}.near`,
                value: identities[`${searchTerm}.near`]
              }]);
            } else {
              let foundKeys = Object.keys(identities).filter((profileName) => profileName.includes(searchTerm));

              if (foundKeys.length > 0) {
                resolve(Object.entries(identities).map(([key, value]) => foundKeys.includes(key) ? {
                  accountId: key,
                  value
                } : null).filter((val) => val));
              } else {
                resolve([]);
              }
            }

            Store.update({ loadingSearch: false });
          }
        }, 300);
      }

      check();
    });
  }

  return (
    <Toolbar>
      <Menu>
        <Logo className={`${status.searching || status.searchTerm ? "rotate" : ""}`}>
          <img src={FRENSLY_LOGO} />
        </Logo>
        <SearchWrapper>
          <Search type="text" id="search" name="search" placeholder="Search frens" onChange={(e) => {
            Store.update({
              searchTerm: e.target.value
            });

            if (e.target.value) {
              search(e.target.value).then((result) => {
                Store.update({
                  searchResult: result.map((info) => {
                    return {
                      accountId: info.accountId,
                      handle: info.value.identity.lens.name
                    };
                  })
                });
              });
            }
          }} className={status.searchTerm ? "searching" : ""} value={status.searchTerm} onFocus={() => Store.update({ searching: true })} onBlur={() => Store.update({ searchTerm: "", searching: false })}></Search>
          <SearchResults className={status.searchTerm ? "searching" : ""}>
            {status.searchTerm && status.searchResult?.length == 0 && <NoResult>
              <img src={FRENSLY_SAD} />
              <p>No frens found</p>
            </NoResult>}
            {status.loadingSearch && <Loading>
              <div className="spinner"></div>
            </Loading>}
            {status.searchTerm !== "" && status.searchResult && status.searchResult.map((result) => {
              return <SearchResultWrapper>
                <SearchResult>
                  <Avatar></Avatar>
                  <div>
                    <p className="lens-handle">@{result.handle}</p>
                    <p className="near-account-id">{result.accountId}</p>
                  </div>
                </SearchResult>
              </SearchResultWrapper>
            })}
          </SearchResults>
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
