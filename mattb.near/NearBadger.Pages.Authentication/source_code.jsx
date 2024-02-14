const { accountId } = props;

const NEARBADGER_VERIFIERS_API = "https://api.nearbadger.vercel.app/";
const VERIFY_PLATFORM_ENDPOINT = "verify";
const CHALLENGE_ENDPONT = "challenge";
const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiagecke7lqgrdbzraafedvei47zshhtptelx5n2j4lldetm5or26q";
const LENS_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiggkmczb7v43nicdia4n7xqkgynopby5k3nxs3zj6fij5eeurh23i";
const FARCASTER_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreia2gbtoqi6ysk2grk3v3n2qkwgfjogml5icntyp5ykdij6q457lay";
const FARCASTER_BLACK_LOGO_URL = "https://ipfs.near.social/ipfs/bafkreif2ff55fa77acvcclxlccsidhyz5sos3abs5yln7daotbp35nwa7a";

const [platform, setPlatform] = useState("");

const Main = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    width:100%;
    height:100vh;
`;

const Modal = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    border:1px solid rgba(0,0,0,.1);
    border-radius:20px;
    padding:5rem 2rem;
`;

const Logo = styled.img`
    max-width:80px;
    margin-bottom:1rem;
    opacity:.8;
    + p {
      margin-bottom:1.5rem;
      font-size:.9rem;
    }
`;

const AuthButton = styled.div`
    position:relative;
    padding:.4rem .7rem .4rem 2.7rem;
    border-radius:7px;
    background-color:${({ background }) => `${background || "#eaeaea"}`};
    font-size:.8rem;
    font-weight:bold;
    border:1px solid ${({ border }) => `${border || "rgba(0,0,0,.05)"}`};
    color:${({ color }) => `${color || "#000"}`};
    min-width:240px;
    text-align:center;
    cursor:pointer;
    box-shadow: 0 0 0 0px rgba(0,0,0,.05);
    transition: all .2s;

    :not(:last-of-type) {
        margin-bottom:10px;
    }

    :hover {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
    }
    
    .badge {
      border-radius:0;
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      position:absolute;
      left:0;
      top:0;
      border-right:1px solid ${({ border }) =>
        `${border || "rgba(0,0,0,.05)"}`};
      padding:${({ padding }) => `${padding || "0 7px"}`};
      min-width:40px;

      img {
        display:block;
        position:relative;
        padding:0;
        margin:0;
        left:0;
        width:${({ badgeSize }) => `${badgeSize || "20px"}`};
        pointer-events:none;
      }
    }
`;

const Disclaimer = styled.p`
    margin-top:20px;
    max-width:300px;
    font-size:.7rem;
    text-align:center;
`;

const Header = styled.h3`
    display:flex;
    align-items:center;
    justify-content:center;
    font-weight:bold;
    margin-bottom:1.5rem;

    img {
        max-width:20px;
        margin-right:5px;
    }
`;

const Step = styled.p`
    display:flex;
    align-items:center;
    font-weight:bold;
`;

const StepDescription = styled.div`
    margin-bottom:2rem;
    font-size:.8rem;

    :last-of-type {
        margin-bottom:2.5rem;
    }

    button {
        align-self:center;
        border-radius:50px;
        font-weight:bold;
        color:#000;
        background-color:#F2F2F2;
        border:1px solid rgba(0,0,0,.05);
        padding:.3rem 1rem;
        font-size:.8rem;
        cursor:pointer;
        transition: all .2s;
        text-decoration:none!important;
        margin-right:10px;
        
        :hover {
            box-shadow: 0 0 0 3px rgba(0,0,0,.05);
            transition: all .2s;
            color:#000;
        }
    }
`;

const FinishButton = styled.a`
    align-self:center;
    border-radius:50px;
    font-weight:bold;
    color:#000;
    background-color:#F2F2F2;
    border:1px solid rgba(0,0,0,.05);
    padding:.8rem 2rem;
    font-size:17px;
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

const AuthProcessWrapper = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    justify-content:center;
`;

const AuthMethods = () => {
  return (
    <>
      <AuthButton onClick={() => setPlatform("lens")}>
        <span className="badge">
          <img src={LENS_LOGO_URL} width="100%" />
        </span>
        Authenticate on Lens
      </AuthButton>
      <AuthButton
        onClick={() => setPlatform("farcaster")}
        background="#8A63D1"
        color="#FFF"
        border="rgba(0,0,0,.15)"
        badgeSize="17px"
      >
        <span className="badge">
          <img src={FARCASTER_LOGO_URL} width="100%" />
        </span>
        Authenticate on Farcaster
      </AuthButton>
    </>
  );
};

const AuthProcess = ({ platform }) => {
  const process = {
    lens: (
      <AuthProcessWrapper>
        <Header>
          <img src={LENS_LOGO_URL} width="100%" />
          Lens Protocol
        </Header>
        <Step>1. Connect your EVM wallet</Step>
        <StepDescription>
            <Web3Connect 
                connectLabel="Connect wallet"
                disconnectLabel="Disconnect wallet"
            />
        </StepDescription>
        <Step>2. Choose a profile</Step>
        <StepDescription>
            No profiles to show yet.
        </StepDescription>
        <Step>3. Sign a message</Step>
        <StepDescription>
            <button>Sign message</button>
        </StepDescription>
        <FinishButton>Finish</FinishButton>
      </AuthProcessWrapper>
    ),
    farcaster: (
      <AuthProcessWrapper>
        <Header>
          <img src={FARCASTER_BLACK_LOGO_URL} width="100%" />
          Farcaster
        </Header>
        <Step>1. Connect your EVM wallet</Step>
        <StepDescription>
            <Web3Connect 
                connectLabel="Connect wallet"
                disconnectLabel="Disconnect wallet"
            />
        </StepDescription>
        <Step>2. Choose a profile</Step>
        <StepDescription>
            No profiles to show yet.
        </StepDescription>
        <Step>3. Sign a message</Step>
        <StepDescription>
            <button>Sign message</button>
        </StepDescription>
        <FinishButton>Finish</FinishButton>
      </AuthProcessWrapper>
    ),
  };

  return process[platform] || <>Auth method not found</>;
};

return (
  <Main>
    <Modal>
      <Logo src={LOGO_URL}></Logo>
      <p>This app requires {accountId || "you"} to verify a profile</p>
      {!platform && <AuthMethods />}
      {platform && <AuthProcess platform={platform} />}

      <Disclaimer>
        Authenticating your account doesn't grant nearbadger write access to your
        account
      </Disclaimer>
    </Modal>
  </Main>
);
