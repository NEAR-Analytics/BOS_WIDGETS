const owner = "sdks.near";
const constants = VM.require(`${owner}/widget/SDKs.Lens.Constants`);
const interfaces = VM.require(`${owner}/widget/SDKs.Lens.Interfaces`);
const LightClient = VM.require(`${owner}/widget/SDKs.LightClient`);

const LensSDK = {
  auth: interfaces.AUTH_INTERFACE,
  challenge: interfaces.AUTH_CHALLENGE_INTERFACE,
  tokenLifespan: constants.JWT_TOKEN_LIFESPAN_SECONDS,
  refreshTokenLifespan: constants.JWT_REFRESH_TOKEN_LIFESPAN_SECONDS,
  testnet: false,
  profileId: "",
  enableTestnet: () => LightClient.url = constants.TESTNET_URL,
  enableMainnet: () => LightClient.url = constants.MAINNET_URL,
  init: () => {
    LensSDK.enableMainnet();

    return LensSDK;
  },
  health: {
    ping: () => {},
  },
  authentication: {
    login: () => {},
    refresh: () => {},
    revoke: () => {},
    verify: () => {},
    list: () => {},
    isAuthenticated: () => false,
    getAccessToken: () => LensSDK.auth.accessToken,
    getProfileId: () => LensSDK.profileId,
  },
  profile: {
    create: () => {},
    fetch: (profileId) => {},
    fetchAll: (profileIds) => {},
    stats: (profileId) => {},
    recommendations: (profileId) => {},
    interests: (profileId) => {},
    report: (profileId) => {},
    block: (profileId) => {},
    history: () => {},
    onChainIdentity: (profileId) => {},
    isFollowedByMe: (profileId) => {},
    isBlockedByMe: (profileId) => {},
    isFollowingMe: (profileId) => {},
    canFollow: (profileId) => {},
    canUnfollow: (profileId) => {},
    canBlock: (profileId) => {},
    canUnblock: (profileId) => {},
    fetchPublications: (profileId) => LensSDK.fetchAll(profileId),
  },
  publication: {
    fetch: (publicationId) => {},
    fetchAll: (profileId) => {},
    stats: (publicationId) => {},
    whoActed: (publicationId) => {},
    comments: (publicationId) => {},
    upvote: (publicationId) => {},
    downvote: (publicationId) => {},
    hide: (publicationId) => {},
    report: (publicationId) => {}
  },
  search: {
    profiles: (searchTerm) => {},
    publications: (searchTerm) => {}
  },
  notifications: {
    fetch: () => {}
  },
  transaction: {
    status: () => {},
    txIdToTxHash: () => {}
  }
};

return LensSDK.init();