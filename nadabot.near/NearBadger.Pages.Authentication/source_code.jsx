const { accountId, showPlatform, code, state } = props;

const $ = VM.require("sdks.near/widget/Loader") || (() => {});
const { LensSDK } = $("@sdks/lens-sdk");
const { EthereumSigner } = $("@sdks/eth-signer");
LensSDK = new LensSDK(State, state);

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
const X_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreighn2xduhiqyf3kqn5nmlmdkekspde7lgk3rpf7xfhigntrgsobsi";
const X_BLACK_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreie3fgyixcxtqccylopewsodmfmci2ub7xwpx6aurimhuzxqytbyka";

const GOOGLE_LOGO_URL =
  "https://ipfs.near.social/ipfs/bafkreidnwejlnl4b4kdlqwoivcro4n46fmnq43imzoy3c4ttlrfc2qs4vu";

const REGISTRY_CONTRACT = "checks.integrations.near";
const NADABOT_CONTRACT = "v1.nadabot.near";
const TWITTER_AUTH_URL = `https://twitter.com/i/oauth2/authorize?state=twitter.${
  context.accountId + "." + Math.floor(Math.random() * 10000000)
}&code_challenge_method=plain&code_challenge=nearbadger&client_id=MjJLQ1U4aTdJWjgwMTZyb0o3YUg6MTpjaQ&response_type=code&redirect_uri=https%3A%2F%2Fnear.social%2Fnadabot.near%2Fwidget%2FNearBadger.Pages.Authentication&scope=users.read%20tweet.read`;
const GOOGLE_AUTH_URL = "";

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
const [displayHandle, setDisplayHandle] = useState("");
const [loadingEvmAddress, setLoadingEvmAddress] = useState(false);
const [onInit, setOnInit] = useState(true);
const [twitterUrl, setTwitterUrl] = useState("");
const [challenge, setChallenge] = useState("");
const [loading, setLoading] = useState(false);
const [loadingTwitterChallenge, setLoadingTwitterChallenge] = useState(false);
const timeout = null;

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
    min-width:250px;
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
    display:block;
    margin:0;

    margin-bottom:10px;

    :last-of-type {
        margin-bottom:10px;
    }

    &[href] {
      text-decoration:none!important;
      :last-of-type {
        margin-bottom:20px;
      }
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
    min-width:150px;
    display:flex;
    align-items:center;
    justify-content:center;

    &.disabled {
      pointer-events:none;
      opacity:.5;
    }
    
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

const Spinner = styled.div`
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

const ErrorModal = ({ children }) => {
  return (
    <>
      {displayError && (
        <ErrorPill>
          {children.length ? (
            children
          ) : (
            <>
              Looks like there was an error verifying your profile ownership.
              Please, review each step and try again.
            </>
          )}
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
      handle: cleanSelectedHandle || "",
      proof,
      challenge: challenge || "",
    }),
  }).then(
    ({
      ok,
      body: { expirationBlockHeight, signature, handle: customHandle },
    }) => {
      if (ok) {
        setSuccess(true);

        const registryTx = {
          contractName: registryContract || REGISTRY_CONTRACT,
          methodName: "register_social",
          args: {
            platform,
            signature,
            handle: customHandle || cleanSelectedHandle,
            proof,
            max_block_height: expirationBlockHeight,
          },
          gas: 300000000000000,
          deposit: 0.01 * Math.pow(10, 24),
        };
        const nadabotVerifyTx = {
          contractName: NADABOT_CONTRACT,
          methodName: "add_stamp",
          args: {
            provider_id: `checks.integrations.near:connected_to_${provider}`,
          },
          gas: 300000000000000,
          deposit: 0.02 * Math.pow(10, 24),
        };
        Near.call([registryTx, nadabotVerifyTx]);
        // Near.call(
        //   registryContract || REGISTRY_CONTRACT,
        //   "register_social",
        //   {
        //     platform,
        //     signature,
        //     handle: customHandle || cleanSelectedHandle,
        //     proof,
        //     max_block_height: expirationBlockHeight,
        //   },
        //   null,
        //   0.01 * Math.pow(10, 24)
        // );
      } else {
        setDisplayError(true);
      }
      setLoading(false);
    }
  );
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
  setLoadingTwitterChallenge(true);

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

    setLoadingTwitterChallenge(false);
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
  if (code && state) {
    setLoading(true);
    const [statePlatform] = state.split(".");
    setPlatform(statePlatform);
    setProof(code);
  }
}, []);

useEffect(() => {
  if (platform === "twitter" && proof) {
    verifyProof("twitter");
  }
}, [platform, challenge, proof]);

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
        as="a"
        style={context.accountId ? {} : disabledAuthButtonStyles}
        href={TWITTER_AUTH_URL}
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
      <AuthButton
        as="a"
        style={disabledAuthButtonStyles}
        href={GOOGLE_AUTH_URL}
        background="#FFF"
        color="#000"
        border="rgba(0,0,0,.15)"
        badgeSize="17px"
      >
        <span className="badge">
          <img src={GOOGLE_LOGO_URL} width="100%" />
        </span>
        Authenticate on Google
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

const updateSelectedHandle = (handle) => {
  setSelectedHandle(handle);
};

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
          Verify profile
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
            placeholder="@handle"
            onChange={({ target: { value: text } }) => {
              if (timeout) {
                clearTimeout(timeout);
              }

              timeout = setTimeout(() => {
                setSelectedHandle(text);
              }, 300);
            }}
          />
        </StepDescription>
        <Step>4. Sign a proof</Step>
        <StepDescription>
          <button onClick={() => signProof("farcaster")}>Sign proof</button>
        </StepDescription>
        <ErrorModal />
        <FinishButton onClick={() => verifyProof("farcaster")}>
          Verify profile
        </FinishButton>
      </AuthProcessWrapper>
    ),
    twitter: (
      <AuthProcessWrapper>
        <Header>
          <img src={X_BLACK_LOGO_URL} width="100%" />
        </Header>
        <Step>Something went wrong...</Step>
        <StepDescription>
          Ouch! It looks like we weren't able to verify your information this
          time. But don't worry, you can try it again.
          <br />
          <br />
          <br />
          <FinishButton as="a" href={TWITTER_AUTH_URL}>
            Try again
          </FinishButton>
        </StepDescription>
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
      {!loading && (
        <>
          <RequireNearAccount />
          <Auth />
          <Success />
        </>
      )}
      {loading && (
        <>
          <Spinner>
            <span className="spinner"></span>
          </Spinner>
          <p>Verifying proof...</p>
        </>
      )}
    </Modal>
  </Main>
);
