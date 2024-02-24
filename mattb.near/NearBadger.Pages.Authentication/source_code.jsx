const { accountId, showPlatform, code, state } = props;

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
const X_LOGO_URL = "https://ipfs.near.social/ipfs/bafkreighn2xduhiqyf3kqn5nmlmdkekspde7lgk3rpf7xfhigntrgsobsi";
const X_BLACK_LOGO_URL = "https://ipfs.near.social/ipfs/bafkreie3fgyixcxtqccylopewsodmfmci2ub7xwpx6aurimhuzxqytbyka";

const REGISTRY_CONTRACT = "checks.integrations.near";

const [platform, setPlatform] = useState("");
const [evmAddress, setEvmAddress] = useState("");
const [loadedProfiles, setLoadedProfiles] = useState(false);
const [lensProfiles, setLensProfiles] = useState([]);
const [selectedHandle, setSelectedHandle] = useState("");
const [proof, setProof] = useState("");
const [finished, setFinished] = useState(false);
const [displayError, setDisplayError] = useState(false);
const [success, setSuccess] = useState(false);
const cleanSelectedHandle = useMemo(() => {
  let cleanAddress =
    selectedHandle[0] == "@"
      ? selectedHandle.substring(1, selectedHandle.length)
      : selectedHandle;

  return cleanAddress.split(".eth").shift();
}, [selectedHandle]);
const [loadingEvmAddress, setLoadingEvmAddress] = useState(false);
const [onInit, setOnInit] = useState(true);
const [twitterUrl, setTwitterUrl] = useState("");
const [challenge, setChallenge] = useState("");

if (showPlatform) {
  setPlatform(showPlatform);
}

if (!evmAddress && Ethers.provider()) {
  if (Ethers.provider().provider?.isMetaMask) {
    const [account] = Ethers.provider().provider._state.accounts;
    setEvmAddress(account);
  } else if (Ethers.provider().provider?.connector) {
    const [account] = Ethers.provider().provider.connector.accounts;
    setEvmAddress(account);
  } else {
    Ethers.provider()
      .send("eth_requestAccounts", [])
      .then(([account]) => {
        setEvmAddress(account);
      });
  }
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
        if (profiles.length > 0) {
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
    display:flex;
    justify-content:center;
    align-items:center;
`;

const Modal = styled.div`
    display:flex;
    max-width:350px;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    border:1px solid rgba(0,0,0,.1);
    border-radius:20px;
    padding:5rem 2rem;
    margin-top:auto;
    margin-bottom:auto;
    background-color:#fff;
    flex-grow:0;
    flex-shrink:1;
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

const AuthButton = styled.button`
    position:relative;
    padding:.4rem .7rem .4rem 2.7rem;
    border-radius:7px;
    background-color:${({ background }) => `${background || "#f2f2f2"}`};
    font-size:.8rem;
    font-weight:bold;
    border:1px solid ${({ border }) => `${border || "rgba(0,0,0,.05)"}`};
    color:${({ color }) => `${color || "#000"}`};
    min-width:240px;
    text-align:center;
    cursor:pointer;
    box-shadow: 0 0 0 0px rgba(0,0,0,.05);
    transition: all .2s;

    margin-bottom:10px;

    :last-of-type {
        margin-bottom:20px;
    }

    :hover, :focus {
        box-shadow: 0 0 0 3px rgba(0,0,0,.05);
        transition: all .2s;
        border:1px solid ${({ border }) => `${border || "rgba(0,0,0,.05)"}`};
        color:${({ color }) => `${color || "#000"}`};
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
    max-width:300px;
    font-size:.7rem;
    text-align:center;
    margin-bottom:7px;
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
    margin-bottom:15px;
    
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
    border:0;
    padding: .5rem;
    border:1px solid rgba(0,0,0,.1);
    border-radius:10px;
`;

const ErrorPill = styled.div`
  background-color: #D32F2F;
  border-color: #B71C1C;
  border-style: solid;
  border-width: 1px;
  border-radius: 8px;
  padding: 20px;
  color: white;
  max-width: 300px;
  margin: auto;
  margin-bottom:1rem;
  font-size:.8rem;
`;

const ErrorModal = () => {
  return (
    <>
      {displayError && (
        <ErrorPill>
          Looks like there was an error verifying your profile ownership.
          Please, review each step and try again.
        </ErrorPill>
      )}
    </>
  );
};

const signProof = (platform) => {
  asyncFetch(`${NEARBADGER_VERIFIERS_API}/challenge/${platform}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accountId: context.accountId,
      handle: cleanSelectedHandle,
    }),
  }).then(({ ok, body: { challenge } }) => {
    if (ok) {
      EthereumSigner.sign(challenge.toString()).then((proof) => {
        setProof(proof);
      });
    } else {
      setDisplayError(true);
    }
  });
};

const verifyProof = (platform, registryContract) => {
  setDisplayError(false);
  asyncFetch(`${NEARBADGER_VERIFIERS_API}/verify/${platform}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accountId: context.accountId,
      handle: cleanSelectedHandle,
      proof,
      challenge,
    }),
  }).then(({ ok, body: { expirationBlockHeight, signature } }) => {
    if (ok) {
      setSuccess(true);
      Near.call(registryContract || REGISTRY_CONTRACT, "register_social", {
        platform,
        signature,
        handle: cleanSelectedHandle,
        proof,
        max_block_height: expirationBlockHeight,
      });
    } else {
      setDisplayError(true);
    }
  });
};

const disabledAuthButtonStyles = {
  opacity: ".5",
  pointerEvents: "none",
};

const storePlatform = (platform) => {
  Storage.set(
    "platform",
    JSON.stringify({
      platform: platform,
      expiration: Date.parse(new Date()) + 6 * 100000,
    })
  );
};

const checkStoredPlatform = () => {
  if (storedPlatform) {
    const { platform, expiration } = JSON.parse(storedPlatform);
    if (expiration > Date.parse(new Date())) {
      setPlatform(platform);
      Storage.set("platform", null);
    }
  }
};

const getTwitterChallenge = () => {
  asyncFetch(`${NEARBADGER_VERIFIERS_API}/challenge/${platform}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      accountId: context.accountId,
      handle: cleanSelectedHandle,
    }),
  }).then(({ ok, body: { challenge } }) => {
    if (ok) {
      setTwitterUrl(challenge);
    } else {
      setDisplayError(true);
    }
  });
};

const storedPlatform = null;

if (onInit) {
  storedPlatform = Storage.get("platform");
  checkStoredPlatform();
  setOnInit(false);
}

useEffect(() => {
  checkStoredPlatform();
}, [storedPlatform]);

useEffect(() => {
  if (platform === "twitter") {
    getTwitterChallenge(selectedHandle);
  }
}, [selectedHandle]);

useEffect(() => {
  if (code && state) {
    const [statePlatform, stateChallenge] = state.split(".");
    setPlatform(statePlatform);
    setChallenge(stateChallenge);
    setProof(code);
    
    verifyProof("twitter", "staging.integrations.near"); 
  }
}, []);

const AuthMethods = () => {
  return (
    <>
      <AuthButton
        style={context.accountId ? {} : disabledAuthButtonStyles}
        onClick={() => {
          setPlatform("lens");
          storePlatform("lens");
        }}
      >
        <span className="badge">
          <img src={LENS_LOGO_URL} width="100%" />
        </span>
        Authenticate on Lens
      </AuthButton>
      <AuthButton
        style={context.accountId ? {} : disabledAuthButtonStyles}
        onClick={() => {
          setPlatform("farcaster");
          storePlatform("farcaster");
        }}
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
      <AuthButton
        style={context.accountId ? {} : disabledAuthButtonStyles}
        onClick={() => {
          setPlatform("twitter");
        }}
        background="#000"
        color="#FFF"
        border="rgba(255,255,255,.15)"
        badgeSize="14px"
      >
        <span className="badge">
          <img src={X_LOGO_URL} width="100%" />
        </span>
        Authenticate on X
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

const Auth = () => {
  return (
    <>
      {!success && (
        <>
          {!platform && <AuthMethods />}
          {platform && <AuthProcess platform={platform} />}

          <Disclaimer>
            Authenticating your profile <b>doesn't grant</b> nearbadger write
            access to your account.
          </Disclaimer>
          <Disclaimer>
            Each issued verification will remain <b>valid for 3 months</b>.
          </Disclaimer>
        </>
      )}
    </>
  );
};

const Success = () => (
  <>
    {success && (
      <>
        <div style={{ textAlign: "center" }}>
          <Header>Identity successfully verified!</Header>
          <p>You may now get back to the app you were browsing</p>
        </div>
      </>
    )}
  </>
);

const AuthProcess = ({ platform }) => {
  const process = {
    lens: (
      <AuthProcessWrapper>
        <Header>
          <img src={LENS_LOGO_URL} width="100%" />
          Lens Protocol
        </Header>
        <Step>1. Connect your Ethereum wallet</Step>
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
          <button onClick={() => signProof("lens")}>Sign proof</button>
        </StepDescription>
        <ErrorModal />
        <FinishButton onClick={() => verifyProof("lens")}>
          Claim profile
        </FinishButton>
      </AuthProcessWrapper>
    ),
    farcaster: (
      <AuthProcessWrapper>
        <Header>
          <img src={FARCASTER_BLACK_LOGO_URL} width="100%" />
          Farcaster
        </Header>
        <Step>1. Link your Ethereum address to your Farcaster profile</Step>
        <StepDescription>
          To do so, go to the Warpcast app and click{" "}
          <b>
            Settings {">"} Connected addresses {">"} Connect address
          </b>
          <br />
          <br />
          If you already did it, you can skip this step
        </StepDescription>
        <Step>2. Connect your Ethereum wallet</Step>
        <StepDescription>
          <Web3Connect
            connectLabel="Connect wallet"
            disconnectLabel="Disconnect wallet"
          />
        </StepDescription>
        <Step>3. Write down your Farcaster handle</Step>
        <StepDescription>
          <ProfileInput
            value={selectedHandle}
            placeholder="@handle"
            onChange={({ target: { value: text } }) => setSelectedHandle(text)}
          />
        </StepDescription>
        <Step>4. Sign a proof</Step>
        <StepDescription>
          <button onClick={() => signProof("farcaster")}>Sign proof</button>
        </StepDescription>
        <ErrorModal />
        <FinishButton onClick={() => verifyProof("farcaster")}>
          Claim profile
        </FinishButton>
      </AuthProcessWrapper>
    ),
    twitter: (
      <AuthProcessWrapper>
        <Header>
          <img src={X_BLACK_LOGO_URL} width="100%" />
        </Header>
        <Step>1. Write down your X handle</Step>
        <StepDescription>
          <ProfileInput
            value={selectedHandle}
            placeholder="@handle"
            onChange={({ target: { value: text } }) => setSelectedHandle(text)}
          />
        </StepDescription>
        <ErrorModal />
        <FinishButton as="a" href={twitterUrl}>
          Claim profile
        </FinishButton>
      </AuthProcessWrapper>
    ),
  };

  return process[platform] || <>Auth method not found</>;
};

const RequireNearAccount = () => {
  return (
    <>
      {!success && (
        <p style={{ textAlign: "center" }}>
          {context.accountId == null ? (
            <>Connect your NEAR account to start the verification process</>
          ) : (
            <>
              This app requires <b>{accountId || context.accountId || "you"}</b>{" "}
              to verify a profile
            </>
          )}
        </p>
      )}
    </>
  );
};

return (
  <Main>
    <Modal>
      <Logo src={LOGO_URL}></Logo>
      <RequireNearAccount />
      <Auth />
      <Success />
    </Modal>
  </Main>
);
