const LensLib = VM.require("mattb.near/widget/NearBadger.Libs.Lens");

const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiayxdc7zwztpcvtlo4x7axev5racawcl5xh4x7k6mfamidebbqqc4";

let recentlyVerified = LensLib.listRecentlyVerifiedProfiles({
  subscribe: true,
});

const Main = styled.div`
    background-color:#F3FBF6;
`;

const Wrapper = styled.div`
    position:relative;
    min-height:100vh;
    border-top:4px solid #87B697;
    overflow:hidden;
background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(255,255,255,.7) 100%);
`;

const Section = styled.div`
    height:100vh;
    overflow:hidden;

    h1 {
        font-weight:bold;
        margin-bottom:1.3rem;
        padding:1rem 1.8rem 0;
    }
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
      background-color: #87B697;
      padding:.5rem 1.2rem;
      transition:all .2s;

      :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        background-color: #87B697;
        color:#000;
      }
    }
`;

const Header = styled.div`
    display:flex;
    position:relative;
    padding:2rem 2rem;
    min-width:500px;

    h1 {
      font-weight:bold;
      font-size:3.3rem;
    }

    .image {
        position:relative;
        width:50%;

        > img {
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
            max-width:200px;
            opacity:.1;
            filter:blur(10px);
            transform:rotate(20deg);
        }
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
    width:60px;
    height:60px;
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
    background-color: #87B697;
    padding:6.8px 14.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;
    
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        transition: all .2s;
        color:#000;
    }
`;

const ButtonSecondary = styled.a`
    border:3px solid #87B697;
    padding:4.8px 12.8px;
    border-radius:20px;
    font-weight:bold;
    color:#000;
    font-size:13px;
    cursor:pointer;
    transition: all .2s;
    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        transition: all .2s;
        color:#000;
    }
`;

const Profile = styled.div`
  width:240px;
  height:300px;
  background-color:#fff;
  border:1px solid rgba(0,0,0,.05);
  border-radius:20px;
  box-shadow: 0 0 5px 5px rgba(0,0,0,.01);
  padding: 1rem;
  text-align:center;
  display:flex;
  flex-direction:column;

  * {
      flex-grow:0;
      align-self:center;
  }

  h1 {
    font-size:1.3rem;
  }

  p {
    position:relative;
    display:inline-block;
    border-radius:20px;
    padding:.4rem 2rem .4rem 20%;
    color:#000;
    font-size:.8rem;
    overflow:hidden;
    border:1px solid rgba(0,0,0,.1);
    z-index:0;
    cursor:pointer;
    transition:all .2s;
    background-color:rgba(0,0,0,.05);
    min-width:160px;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
    }

    .badge, .verified {
      border-radius:0;
      display:flex;
      align-items:center;
      justify-content:center;
      width:20%;
      min-width:35px;
      height:100%;
      position:absolute;
      left:0;
      top:0;
      border-right:1px solid rgba(0,0,0,.1);
      background-color:#fff;

      img {
        display:block;
        position:relative;
        padding:0;
        margin:0;
        left:1px;
        width:20px;
        height:20px;
        pointer-events:none;
      }
    }

    .verified {
        left:unset;
        right:0;
        background-color:transparent;
        border:0;
    }
  }

  button {
    border-radius:20px;
    padding:.3rem 2rem;
    font-weight:bold;
    background-color:#388909;
    border:1px solid rgba(0,0,0,.1);
    transition:all .2s;

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.1);
        background-color:#388909;
    }
  }
`;

const ProfileHeader = styled.div`
  height:30%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin-bottom:.8rem;
`;

const Image = styled.div`
  width:70px;
  height:70px;
  background-color:rgba(0,0,0,.05);
  border-radius:100%;
`;

const Carousel = styled.div`
  display:flex;
  flex-wrap:no-wrap;
  overflow-y:auto;
  padding:0 1.8rem 1rem;

  > div {
    :not(:last-of-type) {
      margin-right:15px;
    }
  }
`;

return (
  <>
    <Main>
      <Wrapper>
        <Toolbar>
          <img width={"200px"} src={LOGO_URL} />
          <Web3Connect
            connectLabel="Connect wallet"
            disconnectLabel="Disconnect"
          />
        </Toolbar>
        <Header>
          <div>
            <h1>
              Lens x
              <br />
              Near Protocol
            </h1>
            <p>
              Get a badge on NEAR Protocol for owning a verified Lens Protocol
              handle, and connect with other verified users.
            </p>
            <ButtonPrimary>Discover people</ButtonPrimary>
            <ButtonSecondary
              onClick={() => {
                Ethers.provider().send("wallet_switchEthereumChain", [
                  { chainId: ethers.utils.hexValue(137) },
                ]);

                Ethers.provider()
                  .send("eth_requestAccounts", [])
                  .then(([address]) => {
                    LensLib.createProof(
                      address,
                      context.accountId,
                      ({ handle, signature }) => {
                        console.log(
                          `Your handle ${handle} has been successfully verified and linked to ${context.accountId}`
                        );
                      }
                    );
                  });
              }}
            >
              Verify my handle
            </ButtonSecondary>
          </div>
          <div class="image">
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ethereum_logo.svg/1285px-Ethereum_logo.svg.png"
              }
            />
            <Circle>
              <img
                src="https://ipfs.near.social/ipfs/bafkreid622wknql44yrzupww3bmfgcdxppkwyzmb4upbmpdvgtos2hjhzy"
                width="100%"
              />
            </Circle>
            <Circle
              style={{
                top: "50px",
                left: "60px",
              }}
            >
              <img
                src="https://cryptologos.cc/logos/near-protocol-near-logo.png"
                width="60%"
              />
            </Circle>
          </div>
        </Header>
        <Section>
          <h1>Recently verified</h1>
          <Carousel>
            {recentlyVerified.map((verifiedProfile) => (
              <Profile>
                <ProfileHeader>
                  <Image></Image>
                </ProfileHeader>
                <h1>{verifiedProfile.accountId}</h1>
                <p>
                  <span className="badge">
                    <img
                      src="https://ipfs.near.social/ipfs/bafkreid622wknql44yrzupww3bmfgcdxppkwyzmb4upbmpdvgtos2hjhzy"
                      width="100%"
                    />
                  </span>
                  {verifiedProfile.value.name}
                  <span className="verified">
                    <img
                      src="https://ipfs.near.social/ipfs/bafkreidfh7bolog2hy6zfgre4tasxrsbaen6xmc6ottccvnf4db3gch3oi"
                      width="100%"
                    />
                  </span>
                </p>
                <button>FOLLOW</button>
              </Profile>
            ))}
          </Carousel>
        </Section>
      </Wrapper>
    </Main>
  </>
);
