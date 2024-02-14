const { accountId } = props;

const $ = VM.require("sdks.near/widget/Loader");
const { LensSDK } = $("@sdks/lens-sdk");
const { EthereumSigner } = $("@sdks/eth-signer");

const NEARBADGER_VERIFIERS_API = "https://api.nearbadger.vercel.app";
const VERIFY_PLATFORM_ENDPOINT = "verify";
const CHALLENGE_ENDPONT = "challenge";
const LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiagecke7lqgrdbzraafedvei47zshhtptelx5n2j4lldetm5or26q";
const LENS_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreiggkmczb7v43nicdia4n7xqkgynopby5k3nxs3zj6fij5eeurh23i";
const FARCASTER_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreia2gbtoqi6ysk2grk3v3n2qkwgfjogml5icntyp5ykdij6q457lay";
const FARCASTER_BLACK_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreif2ff55fa77acvcclxlccsidhyz5sos3abs5yln7daotbp35nwa7a";

const REGISTRY_CONTRACT = "beta-v2.integrations.near";

const [platform, setPlatform] = useState("");
const [evmAddress, setEvmAddress] = useState("");
const [loadedProfiles, setLoadedProfiles] = useState(false);
const [lensProfiles, setLensProfiles] = useState([]);
const [selectedHandle, setSelectedHandle] = useState("");
const [proof, setProof] = useState("");
const [finished, setFinished] = useState(false);


if (!evmAddress && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then(([account]) => {
      setEvmAddress(account);
    });
}

useEffect(() => {
  if (!evmAddress) {
    return;
  }

  if (platform == "lens") {
    LensSDK = new LensSDK(State, state);
    LensSDK.authentication
      .profiles({
        for: evmAddress,
      })
      .then((profiles) => {
        if (profiles) {
          const handles = profiles.map(
            (profile) => `${profile.handle.fullHandle.split("/").pop()}.lens`
          );

          setSelectedHandle(handles[0]);
          setLensProfiles(handles);
        }
      });
  }
}, [platform]);

const Main = styled.div`
    width:100%;
    min-height:100vh;
    padding:3rem 0;
    background-color:#fafafa;
    border-radius:20px;
`;

const Modal = styled.div`
    display:flex;
    max-width:350px;
    margin:auto;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    border:1px solid rgba(0,0,0,.1);
    border-radius:20px;
    padding:5rem 2rem;
    margin-top:auto;
    margin-bottom:auto;
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
            border:1px solid rgba(0,0,0,.05);
            transition: all .2s;
            color:#000;
            background-color:#F2F2F2;
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

const Handle = styled.button`
    align-self:center;
    border-radius:50px;
    font-weight:bold;
    color:#000;
    background-color:#F2F2F2;
    border:1px solid rgba(0,0,0,.05);
    box-shadow: 0 0 0 ${({ selected }) =>
      selected ? "3px" : "0px"} rgba(0,0,0,.05);
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
`;

const ProfileInput = styled.input`
    
`;

const signProof = (platform) => {
    asyncFetch(`${NEARBADGER_VERIFIERS_API}/challenge/${platform}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          accountId: context.accountId,
          handle: selectedHandle,
        }),
      }).then(({ body: { challenge } }) => {
        EthereumSigner.sign(challenge.toString()).then((proof) => {
          setProof(proof);
        });
      });
}

const verifyProof = (platform) => {
    asyncFetch(`${NEARBADGER_VERIFIERS_API}/verify/${platform}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        accountId: context.accountId,
        handle: selectedHandle,
        proof,
      }),
    }).then(({ body: { expirationBlockHeight, signature } }) => {
      Near.call(REGISTRY_CONTRACT, "register_social", {
        platform,
        signature,
        handle: selectedHandle,
        proof,
        max_block_height: expirationBlockHeight,
      });
    });
}

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

const AvailableHandles = ({ handles }) => {
  return (
    <>
      {handles.map((handle) => (
        <Handle
          selected={selectedHandle == handle}
          onClick={() => setSelectedHandle(handle)}
        >
          {handle}
        </Handle>
      ))}
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
          {lensProfiles.length > 0 && (
            <AvailableHandles handles={lensProfiles} />
          )}
          {lensProfiles.length == 0 && "No profiles to show yet."}
        </StepDescription>
        <Step>3. Sign a proof</Step>
        <StepDescription>
          <button
            onClick={() => signProof("lens")}
          >
            Sign proof
          </button>
        </StepDescription>
        <FinishButton
          onClick={() => verifyHandle("lens")}
        >
          Finish
        </FinishButton>
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
        <Step>2. Write down your Farcaster handle</Step>
        <StepDescription>
            <ProfileInput value={selectedProfile} onChange={({ target: { value: text } }) => setSelectedProfile(text)} />
        </StepDescription>
        <Step>3. Sign a proof</Step>
        <StepDescription>
          <button onClick={signProof("farcaster")}>Sign proof</button>
        </StepDescription>
        <FinishButton onClick={verifyProof("farcaster")}>Finish</FinishButton>
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
        Authenticating your account doesn't grant nearbadger write access to
        your account
      </Disclaimer>
    </Modal>
  </Main>
);
