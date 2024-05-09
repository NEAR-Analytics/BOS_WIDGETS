// App Config
function getConfig(network) {
  switch (network) {
    case "mainnet":
      return {
        ownerId: "wormhole3.near",
        bindingContractId: "binding.wormhole3.near",
        nearSocialContractId: "social.near",
        senderId: "sender.wormhole3.near",
        nodeUrl: "https://rpc.mainnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        gateway: "near.org",
        wormhole3ApiUrl: "https://near-api.wormhole3.io",
      };
    case "testnet":
      return {
        ownerId: "wormhole3.testnet",
        bindingContractId: "binding.wormhole3.testnet",
        nearSocialContractId: "v1.social08.testnet",
        senderId: "sender.wormhole3.testnet",
        nodeUrl: "https://rpc.testnet.near.org",
        ipfsPrefix: "https://ipfs.near.social/ipfs",
        gateway: "test.near.org",
        wormhole3ApiUrl: "https://near-api-test.wormhole3.io",
      };
    default:
      throw Error(`Unconfigured environment '${network}'.`);
  }
}
const config = getConfig(context.networkId);

const accountId = props.accountId ?? context.accountId;
if (!accountId) {
  return "Please login first";
}

// Wormhole3 APIs
function getWh3TwitterAuthUrl() {
  const res = fetch(
    config.wormhole3ApiUrl + `/auth/register?nearId=${accountId}`
  );
  if (res.ok) {
    return res.body;
  }
}

function getTwitterInfoByNonce(nonce) {
  return asyncFetch(
    config.wormhole3ApiUrl + `/users/byNonce?nonce=${nonce}`
  ).then((res) => {
    if (res.ok) {
      return res.body;
    }
  });
}

function getTwitterInfoById(twitterId) {
  return asyncFetch(
    config.wormhole3ApiUrl + `/users/byTwitterId?twitterId=${twitterId}`
  ).then((res) => {
    if (res.ok) {
      return res.body;
    }
  });
}

// Wormhole3 Account Binding Contract
function getHandle() {
  return Near.asyncView(config.bindingContractId, "get_handle", {
    platform: "twitter",
    account_id: accountId,
  });
}

function getProposal() {
  return Near.asyncView(config.bindingContractId, "get_proposal", {
    platform: "twitter",
    account_id: accountId,
  });
}

function lookupAccount(twitterId) {
  return Near.asyncView(config.bindingContractId, "lookup_account", {
    platform: "twitter",
    handle: twitterId.toString(),
  });
}

// NEAR Social
function isPostPermissionGranted() {
  return Near.asyncView(
    config.nearSocialContractId,
    "is_write_permission_granted",
    {
      predecessor_id: config.senderId,
      key: `${accountId}/post`,
    }
  );
}

// Helper functions
const ONE_YOCTO = "1";
const FIVE_MIN_MS = 5 * 60 * 1000;
const { nonce, authUrl, updatedAt } = Storage.privateGet("twitterAuth");
const requestedTwitterAuth =
  nonce && updatedAt && updatedAt > Date.now() - FIVE_MIN_MS;

function updateTwitterAuthUrl(force) {
  // get twitter auth url
  if (
    state.handleChecked &&
    (!requestedTwitterAuth || force) &&
    !state.twitterAuthUrl
  ) {
    const { authUrl, nonce } = getWh3TwitterAuthUrl();
    console.log("now update twitter auth url");
    if (nonce && authUrl) {
      State.update({
        twitterAuthUrl: authUrl,
        nonce,
      });
      // save nonce to local storage
      Storage.privateSet("twitterAuth", {
        authUrl,
        nonce,
        updatedAt: Date.now(),
      });
    }
  }
}

// check whether binding proposal has been submitted
function checkProposal(handle) {
  getProposal().then((p) => {
    State.update({
      hasProposal: p != null && p.handle === handle,
    });
  });
}

// check whether post permission has been granted to sender
function checkPostPermission() {
  isPostPermissionGranted().then((permissionGranted) => {
    State.update({
      permissionGranted,
    });
  });
}

// Component states
State.init({
  twitterAuthorized: false,
  connected: false,
  twitterId: "",
  twitterUsername: "",
  twitterName: "",
  twitterAvatar: "",
  twitterAuthUrl: "",
  nonce: "",
  hasProposal: undefined,
  permissionGranted: undefined,
  handleChecked: false,
  boundAccountId: undefined,
});

const twitterInfoReady = state.twitterId || state.twitterAuthUrl;
const permissionReady =
  (state.twitterAuthUrl ||
    state.hasProposal !== undefined ||
    state.connected) &&
  state.permissionGranted !== undefined;
console.log("loading", {
  connected: state.connected,
  hasProposal: state.hasProposal,
  permissionGranted: state.permissionGranted,
  twitterInfoReady,
  permissionReady,
  requestedTwitterAuth,
});
const loading = !twitterInfoReady || !permissionReady;

function init(force) {
  if (!twitterInfoReady || force) {
    // get twitter handle binding
    getHandle().then((twitterId) => {
      State.update({
        handleChecked: true,
      });
      if (twitterId) {
        State.update({
          connected: true,
          twitterId,
        });
        // get twitter user name from twitter ID
        getTwitterInfoById(twitterId).then(
          ({ twitterUsername, twitterName, profileImg }) => {
            State.update({
              twitterUsername,
              twitterName,
              twitterAvatar: profileImg,
            });
          }
        );
      } else {
        // If twitter authorization has been done, retrieve my twitter ID,
        // and user can start propose binding and grant write permission
        if (requestedTwitterAuth) {
          // get twitter ID and username
          getTwitterInfoByNonce(nonce).then(
            ({ twitterId, twitterUsername, twitterName, profileImg }) => {
              console.log(
                "getTwitterInfoByNonce: twitter id",
                nonce,
                twitterId
              );
              if (twitterId) {
                // check proposal
                checkProposal(twitterId);
                // look up NEAR account with the twitter ID
                lookupAccount(twitterId).then((boundAccountId) => {
                  if (boundAccountId && accountId !== boundAccountId) {
                    State.update({
                      boundAccountId,
                    });
                    updateTwitterAuthUrl(true);
                  }
                  State.update({
                    twitterAuthorized: true,
                    twitterId,
                    twitterUsername,
                    twitterName,
                    twitterAvatar: profileImg,
                  });
                });
              } else {
                // Nonce is invalid, the auth URL is not used yet
                State.update({
                  twitterAuthUrl: authUrl,
                });
              }
            }
          );
        } else {
          // fetch twitter auth url if not yet requested auth url
          updateTwitterAuthUrl();
        }
      }
    });
  }
  // check post permission
  if (state.permissionGranted === undefined) {
    checkPostPermission();
  }
}

init();

if (loading) {
  return "Loading ...";
}

const {
  connected,
  twitterAuthorized,
  twitterUsername,
  twitterName,
  twitterAvatar,
  twitterAuthUrl,
  permissionGranted,
  hasProposal,
  boundAccountId,
} = state;

// Phase 4: Twitter account connected and post permission granted
const phase4 = connected && permissionGranted;

// Phase 2: User needs to grant permission when,
// 1. twitter authorized, but permission or proposal is not ready
// 2. handle has been bound, but post permission is not granted
const phase2 =
  !phase4 &&
  ((twitterAuthorized && (!permissionGranted || !hasProposal)) ||
    (connected && !permissionGranted));
// Phase 2 status
const phase2Fail = phase2 && boundAccountId; // bad status: twitter ID already bound
const phase2Good = phase2 && !boundAccountId; // good statue: continue to bind account

// Phase 3: Twitter authorized, permission granted, and proposed binding, waiting for result
const phase3 =
  twitterAuthorized && hasProposal && !connected && permissionGranted;

// If nothing in progress, start with phase 1 -- Welcome phase.
const phase1 = !phase2 && !phase3 && !phase4;

// polling account binding status
if (phase3) {
  const interval = setInterval(() => {
    console.log("checking...");
    if (connected) {
      clearInterval(interval);
    } else {
      init(true);
    }
  }, 2000);
}

function waitForPhase3() {
  const interval = setInterval(() => {
    console.log("waiting...");
    if (hasProposal && permissionGranted) {
      clearInterval(interval);
    } else {
      init(true);
    }
  }, 2000);
}

const Body = styled.div`
  position: relative;
  padding: 24px 15px;
  background: #0d1117;
  min-height: 75vh;
  color: white;
`;

const CardWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -30%);
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
`;

const Highlight = styled.span`
  font-weight: bolder;
`;

return (
  <div>
    <Widget
      src={`${config.ownerId}/widget/Wormhole3.Header`}
      props={{ config }}
    />
    <Body>
      <CardWrapper>
        <CardContainer>
          <Title>Sync Tweets to BOS</Title>

          {phase1 && (
            <Widget
              src={`${config.ownerId}/widget/Wormhole3.Twitter.Welcome`}
              props={{
                config,
                twitterAuthUrl,
              }}
            />
          )}

          {phase2Fail && (
            <Widget
              src={`${config.ownerId}/widget/Wormhole3.Twitter.AlreadyBound`}
              props={{
                config,
                data: state,
              }}
            />
          )}

          {phase2Good && (
            <Widget
              src={`${config.ownerId}/widget/Wormhole3.Twitter.GrantPermission`}
              props={{
                config,
                data: state,
                permissionReady,
                onClick: waitForPhase3,
              }}
            />
          )}

          {phase3 && (
            <Widget
              src={`${config.ownerId}/widget/Wormhole3.Twitter.Binding`}
              props={{
                config,
                data: state,
              }}
            />
          )}

          {phase4 && (
            <Widget
              src={`${config.ownerId}/widget/Wormhole3.Twitter.Connected`}
              props={{
                config,
                data: state,
              }}
            />
          )}
        </CardContainer>
      </CardWrapper>
    </Body>
  </div>
);
