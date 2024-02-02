const $ = VM.require("sdks.near/widget/Loader");
const { useSharedContext } = $("@sdks/hooks");

const NEARFRENS_LOGO =
  "https://ipfs.near.social/ipfs/bafkreibmkg7wbgfnliss4ow7uy4tn2trd7qejpfjzblhf45p2ffw2ppryu";

const Main = styled.div`
    border-radius:15px;
    overflow:hidden;
    background: #fff;
    border: 2px solid rgba(0,0,0,.05);
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
`;

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

const Header = styled.div`
    display:flex;
    position:relative;
    padding:3rem 2rem;
    min-width:500px;
    background-color:rgba(0,0,0,.02);
    margin:40px 25px 40px;
    border-radius:20px;
    align-items:center;
    

    @media screen and (max-width:850px) {
      flex-wrap:wrap;
    }

    h1 {
      font-weight:bold;
      font-size:3.3rem;
    }

    p {
        max-width:500px;
        margin:10px 0 30px;
    }

    @keyframes levitate {
      0% {
        transform:translateY(0);
      }

      50% {
        transform:translateY(5px);
      }

      100% {
        transform:translateY(0);
      }
    }

    div:first-of-type {
        position:relative;
        z-index:1;
        width:100%;
        height:100%;
        max-width:650px;
        min-height:300px;
        animation: levitate 1s;
        animation-iteration-count:infinite;
        animation-fill-mode:backwards;

        @media screen and (max-width:1050px) {
          max-width:400px;
        }
    }

    img {
      position:absolute;
      width:100%;
      max-width:500px;
      top:-30px;
      left:-100px;
      right:0;
      margin:auto;
      transform:rotate(-10deg);
      transform-origin: top left;
    }
`;

const Circle = styled.div`

    @keyframes levitate {
        0% {
            margin-top:3px;
            box-shadow: 0 0 10px 10px #fffdea;
        }

        50% {
            margin-top:-3px;
            box-shadow: 0 0 20px 20px #fffdea;
        }

        100% {
            margin-top:3px;
            box-shadow: 0 0 10px 10px #fffdea;
        }
    }

    position:relative;
    width:100px;
    height:100px;
    border-radius:100%;
    background-color:#fffdea;
    border: 3px solid #87B697;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:8px;
    box-shadow: 0 0 10px 10px #fffdea;
    animation-name: levitate;
    animation-duration: 2s;
    animation-fill-mode:forwards;
    animation-iteration-count:infinite;
    z-index:0;
    
    > img {
      z-index:9999;
    }

    ::after {
      display:block;
      z-index:1;
      content:'';
      width:calc(100% - 4px);
      height:calc(100% - 4px);
      position:absolute;
      border-radius:100%;
      margin:10px;
      border: 1.5px solid #87B697;
      background-color:rgba(255,255,255,.3);
    }

    ::before {
      @keyframes opacity {
        0% {
            opacity:0;
            width:100%;
            height:100%;
        }

        50% {
            opacity:.5;
            width:calc(100% + 20px);
            height:calc(100% + 20px);
        }

        100% {
            opacity:0;
            width:100%;
            height:100%;
        }
    }

      display:block;
      z-index:1;
      content:'';
      width:calc(100% + 20px);
      height:calc(100% + 20px);
      position:absolute;
      border-radius:100%;
      margin:10px;
      border: 2px solid rgba(0,0,0,.05);
      animation-name: opacity;
      animation-duration: 2s;
      animation-fill-mode:forwards;
      animation-iteration-count:infinite;
    }

`;

const ButtonPrimary = styled.a`
    border-radius:20px;
    font-weight:bold;
    color:#000;
    background-color:#f2f2f2;
    border:1px solid rgba(0,0,0,.05);
    padding:.5rem 1.2rem;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;
    text-decoration:none!important;
    margin-right:10px;
    
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        color:#000;
    }
`;

const ButtonSecondary = styled.a`
    border:3px solid rgba(0,0,0,.05);
    padding:4.8px 12.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        color:#000;
    }
`;

const Modal = styled.div`
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:2;
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

const Menu = styled.div`
  display:flex;
  align-items:center;
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
  padding:5px 15px;
  border-radius:10px;
  background-color:rgba(0,0,0,.05);
  font-size:.8rem;

  :not(:last-of-type) {
    margin-right:15px;
  }
`;

return (
  <>
    <Main>
      {state.displayModal && (
        <Modal>
          <Widget
            src="mattb.near/widget/NearBadger.Components.Modal"
            props={{
              onClose: () => {
                State.update({
                  displayModal: false,
                });
              },
            }}
          />
        </Modal>
      )}
      <Wrapper>
        <Toolbar>
          <Menu>
            <Logo>
              <img src={NEARFRENS_LOGO} />
            </Logo>
            <Search type="text" placeholder="Search frens"></Search>
            <MenuOptions>
              <Option>Home</Option>
              <Option>Explore</Option>
              <Option>NEAR Frens</Option>
            </MenuOptions>
          </Menu>
          <button>
            <span>
              <img src="https://ipfs.near.social/ipfs/bafkreiggkmczb7v43nicdia4n7xqkgynopby5k3nxs3zj6fij5eeurh23i" />
            </span>
            Login
          </button>
        </Toolbar>
        <Header>
        <div>
          <img src={NEARFRENS_LOGO} />
        </div>
          <div>
            <h1>
              Frens are Near
              <br />
              using Lens
            </h1>
            <p>
              Discover new frensly people on NEAR Protocol with a verified Lens
              Protocol profile
            </p>
            <ButtonPrimary>Discover frens</ButtonPrimary>
            <ButtonPrimary
              target="_blank"
              href="mattb.near/widget/NearBadger.Pages.Main"
            >
              Verify my profile
            </ButtonPrimary>
          </div>
        </Header>
        <Widget
          src="mattb.near/widget/NearBadger.Components.RecentlyVerified"
          props={{
            title: "New frens!",
          }}
        />
      </Wrapper>
    </Main>
  </>
);
